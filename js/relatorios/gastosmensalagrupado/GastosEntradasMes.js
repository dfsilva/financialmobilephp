Ext.ns("relatorio");

relatorio.PnlGastosEntradaMes = Ext.extend(Ext.Panel, {

	initComponent : function() {
		// Force defaults
		Ext.apply(this, {
					id : 'pnlGastosEntradaMes',
					frame : true,
					border : false,
					title : 'Relat&oacute;rio de Gastos x Entrada / M&ecirc;s',
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
											id : 'formDatasGastosEntradaMes',
											layout : 'form',
											labelWidth : 85,
											items : [{
														xtype : 'datefield',
														fieldLabel : 'Per&iacute;odo Inicial',
														name : 'dtInicialGastosMes',
														id : 'dtInicialGastosMes',
														format : 'M Y',
														plugins: 'monthPickerPlugin',
														editable: false
													}, {
														xtype : 'datefield',
														fieldLabel : 'Per&iacute;odo Final',
														name : 'dtFinalGastosMes',
														id : 'dtFinalGastosMes',
														col : true,
														format : 'M Y',
														plugins: 'monthPickerPlugin',
														editable: false
													}]
										}]
							}, {
								region : 'center',
								xtype : 'graficoGastosEntradaMes',
								itemId : 'graficoGastosEntradaMes',
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
		relatorio.PnlGastosEntradaMes.superclass.initComponent.call(this);
		Ext.getCmp("dtInicialGastosMes").setValue(new Date().add(Date.YEAR, -1));
		Ext.getCmp('dtFinalGastosMes').setValue(new Date());
	},
	gerar : function() {
		this.getComponent('graficoGastosEntradaMes').gerar(Ext.getCmp("dtInicialGastosMes").getValue(),
				Ext.getCmp('dtFinalGastosMes').getValue());

	},
	limpar : function() {
		Ext.getCmp('formDatasGastosEntradaMes').getForm().reset();
	}
});
