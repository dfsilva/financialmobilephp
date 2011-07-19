Ext.ns('dashboard');

dashboard.CustosCatMesGridPanel = Ext.extend(Ext.grid.GridPanel, {
			url : 'in/ccusto/buscarCustosMesPelaCategoria',
			viewConfig : {
				forceFit : true,
				emptyText : '<center>Nenhum gasto a ser exibido</center>'
			},
			loadMask : true,
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
				header : 'Vencimento',
				dataIndex : 'dataVencimento',
				sortable : true,
				dateFormat : 'd/m/Y'
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
				dashboard.CustosCatMesGridPanel.superclass.initComponent
						.call(this);
			},

			buildStore : function() {
				return {
					xtype : 'jsonstore',
					root : 'custos',
					url : this.url,
					fields : ['descricaoGasto', 'dataVencimento', 'numeroParcela', 'valorParcela'],
					sortInfo : {
						field : 'dataVencimento',
						dir : 'ASC'
					}
				};
			},
			atualizarGrid : function(id) {
				this.getStore().load({
							params : {
								idCategoria : id
							},
							scope : this
						});
			}
		});

Ext.reg('custosCatMesGridPanel', dashboard.CustosCatMesGridPanel)