Ext.ns("custo");

custo.EditCustoWindow = Ext.extend(Ext.Window, {

	initComponent : function() {

		Ext.apply(this, {
			width : 400,
			height : 230,
			modal : true,
			draggable : true,
			id : 'editCustoWindow',
			title : 'Edi&ccedil;&atilde;o de Custo',
			layout : 'fit',
			center : true,
			closable : true,
			resizable : false,
			border : true,
			iconCls : 'icone-dinheiro',
			items : this.buildForm(),
			buttons : [{
						text : 'Atualizar',
						handler : this.handler || Ext.emptyFn,
						scope : this.scope || this
					}, {
						text : 'Cancelar',
						handler : function() {
							Ext.MessageBox
									.confirm(
											'Por favor confirme!',
											'Tem certeza que deseja cancelar esta opera&ccedil;&atilde;o?',
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

		custo.EditCustoWindow.superclass.initComponent.call(this);
		this.configValsCusto();
	},
	handler : function() {
		var form = this.getComponent('formCustosEdit');
		if (form.getForm().isValid()) {
			this.el.mask('Alterando custo, aguarde...', 'x-mask-loading');
			form.getForm().submit({
				success : function(form, action) {
					this.el.unmask();
					exibeInforme("Custo "+action.result.custo.descricaoGasto+" alterado com sucesso!");
					Ext.getCmp('custosDiaGridPanel').store.load();
					if (!Ext.isEmpty(this.custoEdit)) {
						this.custoEdit.set('idCusto', action.result.custo.idCusto);
						this.custoEdit.set('descricaoGasto', action.result.custo.descricaoGasto);
						this.custoEdit.set('idCategoriaGasto', action.result.custo.idCategoriaGasto);
						this.custoEdit.set('idCategoria', action.result.custo.idCategoria);
						this.custoEdit.set('dataVencimento', action.result.custo.dataVencimento);
						this.custoEdit.set('valorParcela', action.result.custo.valorParcela);
						this.custoEdit.set('numeroParcela', action.result.custo.numeroParcela);
						this.custoEdit.commit();
					}
					this.close();
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
			xtype : 'editCustoFormPanel',
			url : 'in/ccusto/cadastrarAlterar',
			labelAlign : 'right',
			defaults : formItemDefaults,
			scope : this
		};
	},

	configValsCusto : function() {
		if (!Ext.isEmpty(this.custoEdit)) {
			this.getComponent('formCustosEdit').setValues(this.custoEdit.json);
		}
	}
});