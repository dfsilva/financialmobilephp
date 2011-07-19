Ext.ns('dashboard');

dashboard.CustosDiaGridPanel = Ext.extend(Ext.grid.GridPanel, {
			url : 'in/ccusto/buscarCustosDia',
			viewConfig : {
				forceFit : true,
				emptyText : '<center>Nenhum gasto para a data de Hoje('
						+ getDataAtual() + ')</center>'
			},
			tbar : [{
						text : 'Novo Custo',
						iconCls : 'icone-adicionar',
						scope : this,
						handler : function() {
							winCusto = new custo.CustoWindow({});
							winCusto.show();
						}
					}],
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : true
					}),
			columns : [{
				header : 'Descri&ccedil;&atilde;o',
				dataIndex : 'descricaoGasto',
				sortable : true,
				summaryType : 'count',
				width: 230,
				summaryRenderer : function(v, params, data) {
					return ((v === 0 || v > 1)
							? '(' + v + ' Custos)'
							: '(1 Custo)');
				}
			}, {
				header : 'Categoria',
				dataIndex : 'descCategoria',
				sortable : true
			}, {
				header : 'Parcela',
				dataIndex : 'numeroParcela',
				sortable : false,
				width: 60
			}, {
				header : 'Valor Gasto',
				dataIndex : 'valorParcela',
				sortable : true,
				renderer : 'brMoney',
				summaryType : 'sum'
			}],

			initComponent : function() {
				this.store = this.buildStore();
				dashboard.CustosDiaGridPanel.superclass.initComponent
						.call(this);
			},

			buildStore : function() {
				return {
					xtype : 'jsonstore',
					root : 'custos',
					autoLoad : true,
					proxy : new Ext.data.HttpProxy({
								method : 'POST',
								scope : this,
								prettyUrls : false,
								url : this.url
							}),
					fields : ['descricaoGasto', 'descCategoria',
							'numeroParcela', 'valorParcela'],
					sortInfo : {
						field : 'descricaoGasto',
						dir : 'ASC'
					}
				};
			}
		});

Ext.reg('custosDiaGridPanel', dashboard.CustosDiaGridPanel)