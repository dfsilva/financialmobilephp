Ext.ns("custo");

var winCusto;

custo.CustoManagerPanel = Ext.extend(Ext.Panel, {
	border : false,
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	closable : true,
	id : 'pnlManterCusto',
	itemId : 'pnlManterCusto',
	title : 'Manter Custos',
	msgs : {
		saving : 'Salvando custo {0}...',
		saveSuccess : 'Registro {0} salvo com sucesso!',
		catSaveSuccess : 'Custo {0} salvo com sucesso!',
		erroSavingCategory : 'Ocorreu um erro ao salvar o custo, tente novamente !',
		confirmDelCusto : 'Confirma a <span style="color: red;"> exclus&atilde;o permanente</span> do custo {0}?',
		deletingCusto : 'Excluindo custo {0}...',
		deleteCustoSuccess : 'Custo {0} excluido com sucesso!',
		deleteCustoFailure : 'Ocorreu o seguinte erro ao excluir o custo {0}. <p><span style="color: red;">{1}</span><\p>'
	},
	initComponent : function() {
		Ext.apply(this, {
			items : [this.buildCustoForm(), this.buildListCusto()]
		});
		custo.CustoManagerPanel.superclass.initComponent.call(this);
		this.getComponent('filtroCustoFormPanel').doLayout();
	},

	buildListCusto : function() {
		var tbar = ['<b>Custos</b>', '->', {
					text : 'Novo Custo',
					iconCls : 'icone-adicionar',
					scope : this,
					handler : this.onNovoCusto
				}, '-', {
					text : 'Editar Custo',
					iconCls : 'icone-editar',
					scope : this,
					handler : this.onEditarCusto
				}, '-', {
					text : 'Excluir Custo',
					iconCls : 'icone-excluir',
					scope : this,
					handler : this.onExcluirCusto
				}];
		return {
			xtype : 'custoGridPanel',
			itemId : 'custoGridPanel',
			flex : 1,
			tbar : tbar,
			border : false,
			style : 'border-right: 1px solid #99BBE8;',
			listeners : {
				scope : this,
				click : this.onClickTableCustos
			}
		};
	},

	buildCustoForm : function() {
		return new custo.FiltroCustoFormPanel({
					itemId : 'filtroCustoFormPanel',
					border : false,
					listeners : {
						scope : this,
						pesquisar : this.onPesquisar
					}
				});
	},

	onClickTableCustos : function() {
		this.onEditarCusto;
	},

	onEditarCusto : function() {
		var objCusto = this.getComponent('custoGridPanel').getSelected();
		winCusto = new custo.EditCustoWindow({custoEdit: objCusto});
		winCusto.show();
	},

	onExcluirCusto : function() {
		var custo = this.getComponent('custoGridPanel').getSelected();
		if (!Ext.isEmpty(custo)) {
			var msg = String.format(this.msgs.confirmDelCusto,
					custo.data.descricaoGasto);

			Ext.MessageBox.confirm('Exclus&atilde;o de Custo!', msg,
					this.onConfirmExcluirCusto, this);
		} else {
			exibeAviso('Selecione um custo para exclus&atilde;o');
		}
	},

	onConfirmExcluirCusto : function(btn) {
		if (btn === 'yes') {
			var custo = this.getComponent('custoGridPanel').getSelected();

			var msg = String.format(this.msgs.deletingCusto,
					custo.data.descricaoGasto);

			Ext.getBody().mask(msg, 'x-mask-loading');

			Ext.Ajax.request({
						url : 'in/ccusto/verificaExcluir',
						scope : this,
						failure : this.onFailureDeleteCusto,
						success : this.onSuccessDeleteCusto,
						params : {
							idCusto : custo.data.idCusto,
							numeroParcela : custo.data.numeroParcela
						}
					});
		}
	},

	onFailureDeleteCusto : function(response, opts) {
		var obj = Ext.decode(response.responseText);
	},

	onSuccessDeleteCusto : function(response, opts) {
		var msg, selectedCusto = this.getComponent('custoGridPanel')
				.getSelected();
		jsonData = Ext.decode(response.responseText);

		if (jsonData.success === true) {
			msg = String.format(this.msgs.deleteCustoSuccess, selectedCusto
							.get('descricaoGasto'));
			exibeInforme(msg);
			selectedCusto.store.remove(selectedCusto);
			Ext.getCmp('custosDiaGridPanel').store.load();
		} else {
			msg = String.format(this.msgs.deleteCustoFailure, selectedCusto
							.get('descricaoGasto'), jsonData.msg);
			exibeErro(msg);
		}

		this.clearMask();
	},

	onPesquisar : function() {
		if (this.getComponent('filtroCustoFormPanel').getForm().isValid()) {
			Ext.getBody().mask('Consultando gastos', 'x-mask-loading');
			var values = this.getComponent('filtroCustoFormPanel').getValues();
			this.getComponent('custoGridPanel').load({
						params : {
							dtInicialMan : values.dtInicialMan,
							dtFinalMan : values.dtFinalMan,
							descricaoGasto : values.descricaoGasto,
							idCategoriaGasto : values.idCategoriaGasto
						},
						scope : this,
						callback : this.clearMask
					});
		}
	},

	clearMask : function() {
		Ext.getBody().unmask();
	},

	onNovoCusto : function() {
		winCusto = new custo.CustoWindow({});
		winCusto.show();
	}
});

Ext.reg('custoManagerPanel', custo.CustoManagerPanel);