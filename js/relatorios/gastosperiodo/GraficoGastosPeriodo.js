Ext.ns("relatorio");

var store = new Ext.data.JsonStore({
			fields : ['categoria', 'total']
		});

relatorio.GraficoGastosPeriodo = Ext.extend(Ext.Panel, {

			atualizaStore : function(records) {
				store.removeAll(false);
				store.add(records);
			},

			initComponent : function() {
				Ext.apply(this, {
							title : 'Gr&aacute;fico',
							width : 400,
							frame : true,
							layout : 'fit',
							flex : 1,
							iconCls : 'icone-grafico-pizza',
							items : {
								xtype : 'piechart',
								dataField : 'total',
								categoryField : 'categoria',
								extraStyle : {
									legend : {
										display : 'left',
										padding : 2,
										font : {
											family : 'Tahoma',
											size : 9
										}
									}
								},
								store : store
							}
						});
				relatorio.GraficoGastosPeriodo.superclass.initComponent.call(this);
			}
		});
Ext.reg('graficoGastosPeriodo', relatorio.GraficoGastosPeriodo);