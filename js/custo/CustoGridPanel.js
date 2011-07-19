Ext.ns('custo');

custo.CustoGridPanel = Ext.extend(Ext.grid.GridPanel, {
	url : 'in/ccusto/buscarCustoManutencao',
	viewConfig : {
		forceFit : true,
		emptyText : '<center>A consulta n&atilde;o retornou nenhum resultado!</center>'
	},
	selModel : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
	columns : [{
				header : 'C&oacute;digo',
				dataIndex : 'idCusto',
				sortable : true,
				summaryType : 'count',
				summaryRenderer : function(v, params, data) {
					return ((v === 0 || v > 1)
							? '(' + v + ' Custos)'
							: '(1 Custo)');
				}
			}, {
				header : 'Descri&ccedil;&atilde;o',
				dataIndex : 'descricaoGasto',
				sortable : true
			}, {
				header : 'Categoria',
				dataIndex : 'descCategoria',
				sortable : true
			}, {
				header : 'Parcela Num.',
				dataIndex : 'numeroParcela',
				sortable : false
			}, {
				header : 'Vencimento',
				dataIndex : 'dataVencimento',
				sortable : true,
				renderer : Ext.util.Format.dateRenderer('d/m/Y')
			}, {
				header : 'Valor Gasto',
				dataIndex : 'valorParcela',
				sortable : true,
				renderer : 'brMoney',
				summaryType : 'sum'
			}],

	initComponent : function() {
		Ext.apply(this, {
					plugins : new Ext.ux.grid.GridSummary()
				});
		this.store = this.buildStore();
		custo.CustoGridPanel.superclass.initComponent.call(this);
	},

	buildStore : function() {
		return {
			xtype : 'jsonstore',
			root : 'custos',
			proxy : new Ext.data.HttpProxy({
						method : 'POST',
						scope : this,
						prettyUrls : false,
						url : this.url
					}),
			fields : ['idCusto', 'descricaoGasto', 'descCategoria', {
						name : 'dataVencimento',
						type : 'date',
						dateFormat : 'd/m/Y'
					}, 'numeroParcela', {
						name : 'valorParcela',
						type : 'float'
					}],
			sortInfo : {
				field : 'idCusto',
				dir : 'ASC'
			}
		};
	},
	loadData : function(d) {
		return this.store.loadData(d);
	},
	load : function(o) {
		return this.store.load(o);
	},
	removeAll : function() {
		return this.store.removeAll();
	},
	remove : function(r) {
		return this.store.remove(r);
	},
	getSelected : function() {
		return this.selModel.getSelections()[0];
	},
	createAndSelectRecord : function(o) {
		var record = new this.store.recordType(o);
		this.store.addSorted(record);
		var index = this.store.indexOf(record);
		this.getSelectionModel().selectRow(index);
		return record;
	}
});

Ext.reg('custoGridPanel', custo.CustoGridPanel)