Ext.ns("usuario");

usuario.CadastrarUsuarioWindow = Ext.extend(Ext.Window, {

	initComponent : function() {

		Ext.apply(this, {
					width : 380,
					height : 250,
					modal : true,
					draggable : true,
					title : 'Cadastro de Usu&aacute;rio',
					layout : 'fit',
					center : true,
					closable : true,
					resizable : true,
					animate : true,
					border : true,
					closeAction: 'hide',
					iconCls : 'icone-usuario',
					items : this.buildForm(),
					listeners : {
						scope : this//,
//						beforehide : function(panel) {
//							var teste = Ext.MessageBox
//									.confirm(
//											'Por favor confirme!',
//											'Tem certeza que deseja cancelar esse cadastro?',
//											function(btn) {
//												if (btn === 'yes') {
//													panel.close();
//												}else{
//													panel.show();
//												}
//											});
//						}
					},
					buttons : [{
								text : 'Cadastrar',
								handler : this.handler || Ext.emptyFn,
								scope : this.scope || this
							}, {
								text : 'Cancelar',
								handler : function() {
									this.hide();
								},
								scope : this.scope || this
							}]
				});

		usuario.CadastrarUsuarioWindow.superclass.initComponent.call(this);
	},
	handler : function() {
		var form = this.getComponent('formCadUsu');
		if (form.getForm().isValid()) {
			this.el.mask('Cadastrando usu&aacute;rio, aguarde...',
					'x-mask-loading');
			form.getForm().submit({
						success : function(form, action) {
							this.el.unmask();
							exibeInforme("Cadastro efetuado com sucesso!");
							this.close();
							this.destroy();
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
			anchor : '-5',
			listeners : {
				scope : this,
				specialkey : function(field, e) {
					if (e.getKey() === e.ENTER && this.handler) {
						this.handler.call(this.scope);
					}
				}
			}
		};
		return {
			xtype : 'usuarioFormPanel',
			url : 'in/cusuario/cadastrar',
			labelAlign : 'right',
			defaults : formItemDefaults
		};
	}

});