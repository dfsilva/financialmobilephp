Ext.ns("login");

login.LoginWindow = Ext.extend(Ext.Window, {

			initComponent : function() {
				// Force defaults
				Ext.apply(this, {
							width : 310,
							height : 130,
							modal : true,
							draggable : false,
							title : 'Autentica&ccedil;&atilde;o do Sistema',
							layout : 'fit',
							center : true,
							closable : false,
							resizable : false,
							border : false,
							iconCls : 'icone-cadeado',
							items : this.buildForm(),
							buttons : [{
										text : 'Recuperar Senha',
										iconCls : 'icone-ajuda',
										handler : this.actionRecuperar
												|| Ext.emptyFn,
										scope : this.scope || this
									}, {
										text : 'Cadastrar-se',
										iconCls : 'icone-usuario-adic',
										handler : this.actionCadastrar
												|| Ext.emptyFn,
										scope : this.scope || this
									}, {
										text : 'Entrar',
										iconCls : 'icone-porta-entrando',
										handler : this.handler || Ext.emptyFn,
										scope : this.scope || this
									}]
						});

				login.LoginWindow.superclass.initComponent.call(this);
			},
			actionRecuperar : function() {
				new usuario.RecuperarSenhaWindow({}).show()
			},
			actionCadastrar : function() {
				new usuario.CadastrarUsuarioWindow({}).show();
			},
			buildForm : function() {

				var formItemDefaults = {
					allowBlank : false,
					labelStyle: 'margin-left: 130px;',
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
					labelWidth : 50,
					frame : true,
					bodyStyle:'background:url(./img/logo_85_46.png) no-repeat left center;',
					url : 'app/loginjson',
					defaults : formItemDefaults,
					items : [{
								fieldLabel : 'Usu&aacute;rio',
								name : 'usuario',
								width : 100
							}, {
								inputType : 'password',
								fieldLabel : 'Senha',
								name : 'senha',
								width : 100
							}]
				};
			}

		});