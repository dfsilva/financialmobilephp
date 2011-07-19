Ext.ns("usuario");

usuario.UsuarioFormPanel = Ext.extend(form.FormularioBase, {
	border : true,
	autoScroll : true,
	frame : true,
	bodyStyle : 'background-color: #DFE8F6; padding: 10px',
	layout : 'form',
	labelWidth : 120,
	defaultType : 'textfield',
	id : 'formCadUsu',
	defaults : {
		maxLength : 255,
		allowBLank : false
	},
	initComponent : function() {
		Ext.applyIf(this, {
					tbar : this.record ? this.buildTbar() : null,
					items : this.buildForm()
				});
		usuario.UsuarioFormPanel.superclass.initComponent.call(this);

		if (this.record) {
			this.on({
						scope : this,
						render : {
							single : true,
							fn : this.loadFormAfterRender
						}
					});
		}
	},
	loadFormAfterRender : function() {
		this.load({
					url : 'in/cusuario/findById',
					params : {
						idUsuario : this.record.get('idUsuario')
					}
				});
	},
	buildTbar : function() {
		return [{
					text : 'Atualizar',
					iconCls : 'icone-salvar',
					scope : this,
					handler : this.onUpdate
				}];
	},
	buildForm : function() {
		return [this.record ? {
					xtype : 'textfield',
					fieldLabel : 'C&oacute;digo',
					name : 'idUsuario',
					allowBlank : false,
					readOnly : true,
					width : 90,
					cls: 'readonly'
				} : null, this.record ? {
					xtype : 'hidden',
					name : 'ativo'
				} : null, this.record ? {
					xtype : 'hidden',
					name : 'idPerfil'
				} : null, {
					xtype : 'textfield',
					fieldLabel : 'Nome',
					name : 'nomeUsuario',
					allowBlank : false,
					readOnly : this.record ? true : false,
					width : 200,
					maxLength : 45
				}, {
					xtype : 'textfield',
					fieldLabel : 'Email',
					name : 'emailUsuario',
					vtype : 'email',
					readOnly : this.record ? true : false,
					allowBlank : false,
					width : 200,
					maxLength : 45
				}, {
					xtype : 'textfield',
					fieldLabel : 'Usu&aacute;rio',
					name : 'loginUsuario',
					allowBlank : false,
					readOnly : this.record ? true : false,
					maxLength : 15
				}, {
					xtype : 'textfield',
					fieldLabel : 'Senha',
					name : 'senhaUsuario',
					id : 'senhaUsuario',
					vtype : 'password',
					inputType : 'password',
					allowBlank : false
				}, {
					xtype : 'textfield',
					fieldLabel : 'Confirme a Senha',
					inputType : 'password',
					name : 'confSenhaUsuario',
					vtype : 'password',
					initialPasswordField : 'senhaUsuario',
					allowBlank : false
				}];
	},
	onUpdate : function() {
		if (this.getForm().isValid()) {
			this.el.mask('Salvando usu&aacute;rio, aguarde...',
					'x-mask-loading');
			this.getForm().submit({
				url : 'in/cusuario/atualizar',
				success : function(form, action) {
					this.el.unmask();
					Ext.MessageBox
							.alert('Sucesso',
									"Informa&ccedil;&otilde;es atualizadas com sucesso!");
				},
				failure : function(form, action) {
					this.el.unmask();
					exibeErro('Ocorreu um erro ao atualizar os dados do usu&aacute;rio!');
				},
				scope : this
			});
		}
	}
});

Ext.reg('usuarioFormPanel', usuario.UsuarioFormPanel);
