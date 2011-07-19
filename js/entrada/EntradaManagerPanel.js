Ext.ns("entrada");

entrada.EntradaManagerPanel = Ext.extend(Ext.Panel, {
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	border : false,
	closable : true,
	id : 'pnlManterEntrada',
	title : 'Manter Entradas',
	msgs : {
		saving : 'Salvando entrada {0}...',
		saveSuccess : 'Registro {0} salvo com sucesso!',
		entSaveSuccess : 'Entrada {0} salva com sucesso!',
		erroSavingEntri : 'Ocorreu um erro ao salvar a entrada, tente outra vez !',
		confirmDelEntry : 'Confirma a <span style="color: red;"> exclus&atilde;o permanente</span> da entrada {0}?',
		deletingEntry : 'Excluindo entrada {0}...',
		deleteEntSuccess : 'Entrada {0} excluida com sucesso!',
		deleteEntFailure : 'Ocorreu o seguinte erro ao excluir a entrada {0}. <p><span style="color: red;">{1}</span><\p>'
	},

	initComponent : function() {
		this.items = [this.buildEntryForm(), this.buildListEntry()];

		entrada.EntradaManagerPanel.superclass.initComponent.call(this);
	},

	buildListEntry : function() {
		return {
			xtype : 'entradaGridPanel',
			itemId : 'entradaGridPanel',
			flex : 1,
			border : false,
			style : 'border-right: 1px solid #99BBE8;',
			title : 'Entradas',
			listeners : {
				scope : this,
				click : this.onClickTableEntry
			}
		};
	},

	buildEntryForm : function() {
		return {
			xtype : 'entradaFormPanel',
			itemId : 'entradaFormPanel',
			border : false,
			listeners : {
				scope : this,
				novaEntrada : this.onNewEntry,
				deletarEntrada : this.onDeleteEntry,
				salvarEntrada : this.onSaveEntry
			}
		};
	},

	onClickTableEntry : function() {
		var record = this.getComponent('entradaGridPanel').getSelected();
		if (record) {
			this.getComponent('entradaFormPanel').setValues(record.data);
		}
	},

	onNewEntry : function(selected) {
		this.getComponent('entradaGridPanel').getSelectionModel().clearSelections();
	},

	onDeleteEntry : function(formPanel, vals) {
		var msg = String.format(this.msgs.confirmDelEntry, vals.descricao);
		Ext.MessageBox.confirm('Exclus&atilde;o de Entrada!', msg,
				this.onConfirmDeleteEntry, this);
	},

	onConfirmDeleteEntry : function(btn) {
		if (btn === 'yes') {
			var vals = this.getComponent('entradaFormPanel').getValues();
			var msg = String.format(this.msgs.deletingEntry, vals.descricao);
			Ext.getBody().mask(msg, 'x-mask-loading');
			Ext.Ajax.request({
						url : 'in/centrada/excluir',
						scope : this,
						callback : onAfterAjaxReq,
						succCallback : this.onAfterDeleteEntry,
						params : {
							idEntrada : vals.idEntrada
						}
					});
		}
	},

	onAfterDeleteEntry : function(jsonData) {
		var msg, selected = this.getComponent('entradaGridPanel').getSelected();

		if (jsonData.success === true) {
			msg = String.format(this.msgs.deleteEntSuccess, selected.get('descricao'));
			exibeInforme(msg);
			selected.store.remove(selected);
			this.getComponent('entradaFormPanel').clearForm();
		} else {
			msg = String.format(this.msgs.deleteEntFailure, selected
							.get('descricao'), jsonData.msg);
			exibeErro(msg);
		}
		this.clearMask();
	},

	onSaveEntry : function(form, vals) {
		if (form.getForm().isValid()) {
			var msg = String.format(this.msgs.saving, vals.descricao);
			Ext.getBody().mask(msg, 'x-mask-loading');
			form.getForm().submit({
						url : 'in/centrada/cadastrar',
						scope : this,
						success : this.onEntSaveSuccess,
						failure : this.onEntSaveFailure
					});
		} else {
			exibeErro(this.msgs.errorsInForm);
		}
	},

	onEntSaveSuccess : function(form, action) {
		var record = this.getComponent('entradaGridPanel').getSelected();

		var vals = form.getValues();
		var msg = String.format(this.msgs.entSaveSuccess, vals.descricao);

		if (record) {
			record.set('idEntrada', action.result.entrada.idEntrada);
			record.set('descricao', vals.descricao);
			record.set('dataEntrada', vals.dataEntrada);
			record.set('valorEntrada', action.result.entrada.valorEntrada);
			record.commit();
		} else {
			var resultData = {
				idEntrada : action.result.entrada.idEntrada,
				descricao : vals.descricao,
				dataEntrada : vals.dataEntrada,
				valorEntrada : action.result.entrada.valorEntrada
			};
			this.getComponent('entradaGridPanel').createAndSelectRecord(resultData);
			this.getComponent('entradaFormPanel').setValues(resultData);
		}
		exibeInforme(msg);
		this.clearMask();
	},

	onCatSaveFailure : function() {
		this.clearMask();
		exibeErro(this.msgs.erroSavingEntry);
	},

	clearMask : function() {
		Ext.getBody().unmask();
	}
});

Ext.reg('entradaManagerPanel', entrada.EntradaManagerPanel);