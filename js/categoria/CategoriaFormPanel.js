Ext.ns("categoria");

categoria.CategoriaFormPanel = Ext.extend(form.FormularioBase, {
			frame : true,
			autoScroll : true,
			bodyStyle : 'background-color: #DFE8F6; padding: 10px',
			layout : 'form',
			labelWidth : 120,
			defaultType : 'textfield',
			initComponent : function() {
				Ext.applyIf(this, {
							tbar : this.buildTbar(),
							items : this.buildForm()
						});

				categoria.CategoriaFormPanel.superclass.initComponent.call(this);

				this.addEvents({
							novaCategoria : true,
							salvarCategoria : true,
							deletarCategoria : true
						});
			},
			
			buildTbar : function() {
				return [{
							text : 'Salvar',
							iconCls : 'icone-salvar',
							scope : this,
							handler : this.onSave
						}, '-', {
							text : 'Novo',
							iconCls : 'icone-adicionar',
							scope : this,
							handler : this.onNew
						}, '-', {
							text : 'Excluir',
							iconCls : 'icone-excluir',
							scope : this,
							handler : this.onDelete
						}];
			},
			buildForm : function() {
				return [{
							xtype : 'textfield',
							fieldLabel : 'C&oacute;digo',
							name : 'idCategoria',
							readOnly : true,
							width : 80,
							cls: 'readonly'
						}, {
							xtype : 'textfield',
							fieldLabel : 'Descri&ccedil;&atilde;o',
							name : 'descCategoria',
							allowBlank : false
						}, {
							fieldLabel : 'Descri&ccedil;&atilde;o Completa',
							name : 'descCompletaCategoria',
							width : 400
						}];
			},

			onNew : function() {
				this.clearForm();
				this.fireEvent('novaCategoria', this);
			},
			onSave : function() {
				if (this.isValid()) {
					this.fireEvent('salvarCategoria', this, this.getValues());
				}
			},
			onDelete : function() {
				var vals = this.getValues();
				if (vals.idCategoria.length > 0) {
					this.fireEvent('deletarCategoria', this, vals);
				}
			}
		});

Ext.reg('categoriaFormPanel', categoria.CategoriaFormPanel);
