Ext.ns("contato");

contato.ContatoWindow = Ext.extend(Ext.Window, {

	initComponent : function() {
		Ext.apply(this, {
					width : 380,
					height : 170,
					modal : true,
					draggable : true,
					title : 'Enviar mensagem para o respons&aacute;vel do site',
					layout : 'fit',
					center : true,
					closable : true,
					resizable : true,
					animate : true,
					border : true,
					iconCls : 'icone-email-enviar',
					items : this.buildForm(),
					buttons : [{
								text : 'Enviar',
								handler : this.handler || Ext.emptyFn,
								scope : this.scope || this
							}, {
								text : 'Cancelar',
								handler : function() {
									this.close();
									this.destroy();
								},
								scope : this.scope || this
							}]
				});
		contato.ContatoWindow.superclass.initComponent.call(this);
	},

	store : new Ext.data.JsonStore({
				scope : this,
				autoLoad : true,
				proxy : new Ext.data.HttpProxy({
							method : 'POST',
							prettyUrls : false,
							url : 'in/ccontato/getAssuntos'
						}),
				root : 'assuntos',
				fields : ['id', 'descricao']
			}),

	handler : function() {
		var form = this.getComponent('formContato');
		if (form.getForm().isValid()) {
			this.el.mask('Enviando mensagem, aguarde...', 'x-mask-loading');
			form.getForm().submit({
						success : function(form, action) {
							this.el.unmask();
							exibeInforme("Mensagem enviada com sucesso!");
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
			id : 'formContato',
			xtype : 'form',
			url : 'in/ccontato/enviarmsg',
			labelAlign : 'right',
			defaults : formItemDefaults,
			defaultType : 'textfield',
			bodyStyle : 'padding:10px',
			items : [new Ext.form.ComboBox({
								store : this.store,
								displayField : 'descricao',
								valueField : 'descricao',
								mode : 'local',
								forceSelection : false,
								triggerAction : 'all',
								fieldLabel : 'Assunto',
								name : 'assunto',
								allowBlank : false,
								emptyText : 'Selecione'
							}), {
						xtype : 'textarea',
						fieldLabel : 'Descri&ccedil;&atilde;o',
						name : 'descricao',
						id : 'descricao',
						allowBlank : false
					}]
		};
	}
});

Ext.reg('contatoWindow', contato.ContatoWindow);