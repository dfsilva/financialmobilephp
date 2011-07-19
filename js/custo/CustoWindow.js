Ext.ns("custo");

custo.CustoWindow = Ext.extend(Ext.Window, {

	initComponent : function() {

		Ext.apply(this, {
			width : 400,
			height : 250,
			modal : true,
			draggable : true,
			id : 'cadCustoWindow',
			title : 'Cadastro de Custos',
			layout : 'fit',
			center : true,
			closable : true,
			resizable : false,
			border : true,
			iconCls : 'icone-dinheiro',
			items : this.buildForm(),
			buttons : [{
						text : 'Cadastrar',
						handler : this.cadastrar || Ext.emptyFn,
						scope : this.scope || this
					}, {
						text : 'Cancelar',
						handler : function() {
							Ext.MessageBox
									.confirm(
											'Por favor confirme!',
											'Tem certeza que deseja cancelar esse cadastro?',
											function(btn) {
												if (btn === 'yes') {
													this.close();
													this.destroy();
												}
											}, this);
						},
						scope : this.scope || this
					}]
		});

		custo.CustoWindow.superclass.initComponent.call(this);
	},
	cadastrar : function() {
		if (this.formCustos.getForm().isValid()) {
			this.el.mask('Cadastrando custo, aguarde...', 'x-mask-loading');
			this.formCustos.getForm().submit({
						success : function(form, action) {
							this.el.unmask();
							exibeInforme("Cadastro efetuado com sucesso!", function(){
								instance.formCustos.getForm().reset();
							}, this);
							Ext.getCmp('custosDiaGridPanel').store.load();
						},
						failure : function(form, action) {
							this.el.unmask();
							exibeErro(action.result.msg);
						},
						scope : this
					});
		}
	},
	buildForm : function() {
		var formItemDefaults = {
			allowBlank : false,
			anchor : '-5'
		};
		return {
			xtype : 'custoFormPanel',
			url : 'in/ccusto/cadastrarAlterar',
			labelAlign : 'right',
			ref: 'formCustos',
			defaults : formItemDefaults,
			title : null,
			scope : this,
			listeners : {
				scope : this,
				onParcelasCheck : this.parcelasCheck,
				onParcelasUnCheck : this.parcelasUncheck,
				specialkey : function(field, e) {
					alert(1);
					if (e.getKey() === e.ENTER && this.handler) {
						this.cadastrar();
					}
				}
			}
		};
	},
	parcelasCheck : function() {
		this.setHeight(320);
	},
	parcelasUncheck : function() {
		this.setHeight(250);
	}
});