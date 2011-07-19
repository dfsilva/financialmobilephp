Ext.ns("relatorio");

relatorio.PnlGastosPeriodo = Ext.extend(Ext.Panel, {

	initComponent : function() {
		// Force defaults
		Ext.apply(this, {
			id : 'pnlGastosPeriodo',
			frame : true,
			border : false,
			title : 'Relat&oacute;rio de Gastos Por Per&iacute;odo',
			scope : this,
			layout : 'border',
			closable : true,
			items : [ {
				xtype : 'fieldset',
				title : 'Filtros para consulta',
				region : 'north',
				height : 65,
				layout : 'fit',
				items : [ {
					xtype : 'form',
					id : 'formDatas',
					layout : 'form',
					labelWidth : 65,
					items : [ {
						xtype : 'datefield',
						fieldLabel : 'Data Inicial',
						name : 'dtInicial',
						id : 'dtInicial',
						dateFormat : 'd/m/Y',
						allowBlank : false
					}, {
						xtype : 'datefield',
						fieldLabel : 'Data Final',
						name : 'dtFinal',
						id : 'dtFinal',
						dateFormat : 'd/m/Y',
						col : true,
						allowBlank : false
					} ]
				} ]
			}, {
				xtype : 'fieldset',
				region : 'center',
				title : 'Dados Relat&oacute;rio',
				layout : 'hbox',
				itemId : 'fieldSetGridGastosPeriodo',
				ref : 'fieldSetGridGastosPeriodo',
				scope : this,
				layoutConfig : {
					align : 'stretch'
				},
				items : [ {
					xtype : 'gridGastosPeriodo',
					itemId : 'gridGastosPeriodo',
					ref : 'gridGastosPeriodo',
					scope : this,
					autoScroll : true,
					tbar : [ '->', {
						text : 'Remover do Relt&oacute;rio',
						iconCls : 'icone-excluir',
						scope : this,
						handler : this.onRemoverItem
					} ]
				}, {
					xtype : 'graficoGastosPeriodo',
					itemId : 'graficoGastosPeriodo',
					scope : this,
					autoScroll : true
				} ]
			} ],
			tbar : [ {
				text : 'Gerar Relat&oacute;rio',
				scope : this,
				handler : this.gerar,
				iconCls : 'icone-salvar'
			}, {
				text : 'Limpar',
				scope : this,
				handler : this.limpar,
				iconCls : 'seta-voltar'
			} ]
		});
		relatorio.PnlGastosPeriodo.superclass.initComponent.call(this);
		Ext.getCmp("dtInicial").setValue(new Date().add(Date.MONTH, -1));
		Ext.getCmp('dtFinal').setValue(new Date());
	},
	gerar : function() {
		this.getComponent('fieldSetGridGastosPeriodo').getComponent('gridGastosPeriodo').carregar({
			params : {
				dataInicial : Ext.util.Format.date(Ext.getCmp("dtInicial").getValue(), 'd/m/Y'),
				dataFinal : Ext.util.Format.date(Ext.getCmp("dtFinal").getValue(), 'd/m/Y')
			},
			callback : function(dados, op, success) {
				this.onCriarGrafico(dados);
			},
			scope : this
		});
	},
	onRemoverItem : function() {
		var grid = this.getComponent('fieldSetGridGastosPeriodo').getComponent('gridGastosPeriodo');
		var sel = grid.getSelected();
		grid.remove(sel);
		var store = grid.getStore();
		this.onCriarGrafico(store.data.items);
	},

	onCriarGrafico : function(dados) {
		// atualizando o valor do grafico
		var records = new Array();
		var catAtual = null;
		var somaCatAtual = 0.00;
		var pos = 0;
		var contCat = 0;

		Ext.each(dados, function(item, index, todosItems) {
			catAtual = item.data.descCategoria;
			if ((todosItems[index + 1] == undefined && catAtual != null)
					|| (catAtual != null && catAtual != todosItems[index + 1].data.descCategoria)) {
				var rec;
				if (contCat > 0) {
					rec = new Ext.data.Record({
						categoria : catAtual,
						total : (somaCatAtual + parseFloat(item.data.valorParcela))
					});
				} else {
					rec = new Ext.data.Record({
						categoria : catAtual,
						total : item.data.valorParcela
					});
				}
				records[pos++] = rec;
				somaCatAtual = 0.00;
				contCat = 0;
			} else {
				somaCatAtual += parseFloat(item.data.valorParcela);
				contCat++;
			}

		});
		this.getComponent('fieldSetGridGastosPeriodo').getComponent('graficoGastosPeriodo').atualizaStore(records);
	},
	limpar : function() {
		Ext.getCmp('formDatas').getForm().reset();
	}
});
