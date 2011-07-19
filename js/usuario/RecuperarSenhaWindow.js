Ext.ns("usuario");

usuario.RecuperarSenhaWindow = Ext.extend(Ext.Window, {

			initComponent : function() {

				Ext.apply(this, {
							width : 250,
							height : 100,
							modal : true,
							draggable : true,
							title : 'Recuperar Senha',
							layout : 'fit',
							center : true,
							closable : true,
							resizable : false,
							border : true,
							iconCls : 'icone-email-enviar',
							items : this.buildForm(),
							scope : this,
							buttons : [{
								text : 'Recuperar Senha',
								handler : this.handler,
								scope : this
							}]
						});

				usuario.RecuperarSenhaWindow.superclass.initComponent.call(this);
			},

			handler : function() {
				var form = this.getComponent('formRecPass');
				if (form.getForm().isValid()) {
					this.el.mask('Enviando email, aguarde...', 'x-mask-loading');
					form.getForm().submit({
								success : function() {
									this.el.unmask();
									exibeInforme("Email enviado com sucesso!");
									this.hide();
									this.destroy();
								},
								failure : function(form, action) {
									this.el.unmask();
									exibeErro(action.result.msg);
									this.getComponent('formRecPass').getForm().reset();
									this.getComponent('formRecPass').getForm().findField('email').focus();
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
					xtype : 'form',
					defaultType : 'textfield',
					id : 'formRecPass',
					itemId : 'formRecPass',
					labelWidth : 40,
					frame : true,
					url : 'in/cusuario/recuperarSenha',
					labelAlign : 'right',
					defaults : formItemDefaults,
					items : [{
								fieldLabel : 'Email',
								name : 'email',
								id   : 'email',
								vtype : 'email',
								width : 120
							}]
				};
			}

		});