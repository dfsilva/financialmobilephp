Ext.ns("relatorio");

Ext.ux.grid.GroupSummary.Calculations['valorTotal'] = function(v, record, field) {
	return v + record.data.valorParcela;
};

relatorio.GridGastosPeriodo = Ext.extend(Ext.grid.GridPanel, {
	url : 'in/ccusto/buscarPorPeriodo',
	carregar : function(data) {
		this.store.load(data);
	},
	getItemsDataStore : function() {
		return this.store.data.items;
	},

	initComponent : function() {
		Ext.apply(this, {
			plugins : [ new Ext.ux.grid.GroupSummary(), new Ext.ux.grid.GridSummary() ],
			title : 'Gastos por Categoria',
			viewConfig : {
				emptyText : '<center>A consulta n&atilde;o retornou nenhum resultado!</center>'
			},
			iconCls : 'icone-grid',
			scope : this,
			frame : true,
			flex : 2,
			loadMask : true,
			store : {
				xtype : 'groupingstore',
				scope : this,
				itemId : 'groupStoreGridGastosPeriodo',
				id : 'groupStoreGridGastosPeriodo',
				proxy : new Ext.data.HttpProxy({
					id : 'proxyCustoPer',
					method : 'POST',
					scope : this,
					prettyUrls : false,
					url : this.url
				}),
				sortInfo : {
					field : 'dataVencimento',
					direction : 'ASC'
				},
				groupField : 'descCategoria',
				autoLoad : false,
				reader : new Ext.data.JsonReader({
					fields : [ {
						name : 'idCusto',
						type : 'int'
					}, {
						name : 'descCategoria',
						type : 'string'
					}, {
						name : 'descricaoGasto',
						type : 'string'
					}, {
						name : 'dataVencimento',
						type : 'date',
						dateFormat : 'd/m/Y'
					}, {
						name : 'valorParcela',
						type : 'float'
					} ]
				})
			},
			columns : [ {
				id : 'descricaoGasto',
				header : 'Descri&ccedil;&atilde;o',
				width : 80,
				sortable : true,
				dataIndex : 'descricaoGasto',
				summaryType : 'count',
				hideable : false,
				summaryRenderer : function(v, params, data) {
					return ((v === 0 || v > 1) ? '(' + v + ' Custos)' : '(1 Custo)');
				}
			}, {
				header : 'Categoria',
				width : 20,
				sortable : true,
				dataIndex : 'descCategoria'
			}, {
				header : 'Data Vencimento',
				width : 25,
				sortable : true,
				dataIndex : 'dataVencimento',
				summaryType : 'max',
				renderer : Ext.util.Format.dateRenderer('d/m/Y')
			}, {
				id : 'valorParcela',
				header : 'Valor',
				width : 20,
				sortable : false,
				groupable : false,
				dataIndex : 'valorParcela',
				summaryType : 'sum',
				renderer : 'brMoney'
			} ],

			view : new Ext.grid.GroupingView({
				forceFit : true,
				showGroupName : false,
				enableNoGroups : false,
				enableGroupingMenu : false,
				hideGroupedColumn : true
			}),
			viewConfig : {
				forceFit : true
			}
		});
		relatorio.GridGastosPeriodo.superclass.initComponent.call(this);
	},
	remove : function(r) {
		return this.store.remove(r);
	},
	getSelected : function() {
		return this.selModel.getSelections()[0];
	},
	getStore : function() {
		return this.store;
	}
});
Ext.reg('gridGastosPeriodo', relatorio.GridGastosPeriodo);