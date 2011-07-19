Ext.ns("entrada");

entrada.EntradaFormPanel = Ext.extend(form.FormularioBase, {
			frame : true,
			autoScroll : true,
			bodyStyle : 'background-color: #DFE8F6; padding: 10px',
			layout : 'form',
			labelWidth : 80,
			defaultType : 'textfield',
			initComponent : function() {
				Ext.applyIf(this, {
							tbar : this.buildTbar(),
							items : this.buildForm()
						});

				entrada.EntradaFormPanel.superclass.initComponent.call(this);

				this.addEvents({
							novaEntrada : true,
							salvarEntrada : true,
							deletarEntrada : true
						});
				Ext.getCmp('dataEntrada').setValue(new Date());
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
							name : 'idEntrada',
							readOnly : true,
							width : 80,
							cls : 'readonly'
						}, {
							xtype : 'datefield',
							fieldLabel : 'Data',
							name : 'dataEntrada',
							id : 'dataEntrada',
							dateFormat : 'd/m/Y',
							allowBlank : false
						}, {
							xtype : 'moneyfield',
							fieldLabel : 'Valor',
							id : 'valorEntrada',
							name : 'valorEntrada',
							width : 80,
							readOnly : true,
							allowBlank : false
						}, {
							xtype : 'textfield',
							fieldLabel : 'Descri&ccedil;&atilde;o',
							name : 'descricao',
							width : 250,
							allowBlank : false
						}];
			},

			onNew : function() {
				this.clearForm();
				this.fireEvent('novaEntrada', this);
			},

			onSave : function() {
				if (this.isValid()) {
					this.fireEvent('salvarEntrada', this, this.getValues());
				}
			},

			onDelete : function() {
				var vals = this.getValues();
				if (vals.idEntrada.length > 0) {
					this.fireEvent('deletarEntrada', this, vals);
				}
			},
			clearForm : function() {
				var vals = this.getForm().getValues();
				var clrVals = {};

				for (var vName in vals) {
					clrVals[vName] = '';
				}

				this.getForm().setValues(clrVals);
				Ext.getCmp('dataEntrada').setValue(new Date());
				this.data = null;
			},
			
			setValues : function(o) {
				var ret =  this.getForm().setValues(o || {});
				Ext.getCmp('valorEntrada').setValue(formataMoeda(Ext.getCmp('valorEntrada').value));
				return ret;
			}

		});

Ext.reg('entradaFormPanel', entrada.EntradaFormPanel);
