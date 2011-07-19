Ext.ns("relatorio");

relatorio.PnlGastosCategoriaMes = Ext.extend(Ext.Panel, {

	initComponent : function() {
		Ext.apply(this, {
					id : 'pnlGastosCategoriaMes',
					frame : true,
					border : false,
					title : 'Relat&oacute;rio de Gastos por Categoria Mensal',
					scope : this,
					layout : 'border',
					closable : true,
					items : [{
								xtype : 'fieldset',
								title : 'Filtros para consulta',
								region : 'north',
								height : 65,
								layout : 'fit',
								items : [{
											xtype : 'form',
											id : 'formDatasGastosCategoriaMes',
											layout : 'form',
											labelWidth : 85,
											items : [{
														xtype : 'datefield',
														fieldLabel : 'Per&iacute;odo Inicial',
														name : 'dtInicialGastosCatMes',
														id : 'dtInicialGastosCatMes',
														format : 'M Y',
														plugins: 'monthPickerPlugin',
														editable: false
													}, {
														xtype : 'datefield',
														fieldLabel : 'Per&iacute;odo Final',
														name : 'dtFinalGastosCatMes',
														id : 'dtFinalGastosCatMes',
														col : true,
														plugins: 'monthPickerPlugin',
														format: 'M Y',
						                                editable: false
													}]
										}]
							}, {
								region : 'center',
								xtype : 'graficoGastosCategoriaMes',
								itemId : 'graficoGastosCategoriaMes',
								scope : this,
								autoScroll : true
							}],
					tbar : [{
								text : 'Gerar Relat&oacute;rio',
								scope : this,
								handler : this.gerar,
								iconCls : 'icone-salvar'
							}, {
								text : 'Limpar',
								scope : this,
								handler : this.limpar,
								iconCls : 'seta-voltar'
							}]
				});
		relatorio.PnlGastosCategoriaMes.superclass.initComponent.call(this);
		Ext.getCmp("dtInicialGastosCatMes").setValue(new Date().add(Date.YEAR, -1));
		Ext.getCmp('dtFinalGastosCatMes').setValue(new Date());
	},
	gerar : function() {
		this.getComponent('graficoGastosCategoriaMes').gerar(Ext.getCmp("dtInicialGastosCatMes").getValue(),
				Ext.getCmp('dtFinalGastosCatMes').getValue());

	},
	limpar : function() {
		Ext.getCmp('formDatasGastosCategoriaMes').getForm().reset();
	}
});
