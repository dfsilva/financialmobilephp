Ext.ns("relatorio");

relatorio.GraficoGastosEntradaMes = Ext.extend(Ext.Panel, {

	gerar : function(dataInicial, dataFinal) {
		var cgemes = new NeoCharts(urlApp + "charts/MSLine.swf?ChartNoDataText=Nenhum gasto a ser exibido", "chart3Id", "100%",
				"100%", "0", "1");
		cgemes.setDataURL("in/ccusto/gerarGraficoCustosEntradasMensal/" + dataInicial.format("d-m-Y") + "/" + dataFinal.format("d-m-Y"));
		cgemes.render("divGrafGastosEntradasMensal");
		
		var cgemes2 = new NeoCharts(urlApp + "charts/Pie3D.swf?ChartNoDataText=Nenhum gasto a ser exibido", "chart3Id", "100%",
				"100%", "0", "1");
		cgemes2.setDataURL("in/ccusto/geraGraficoEntradasCustosPeriodo/" + dataInicial.format("d-m-Y") + "/" + dataFinal.format("d-m-Y"));
		cgemes2.render("divGrafGastosEntradasMensalTotais");
	},

	initComponent : function() {
		Ext.apply(this, {
			layout : 'hbox',
			layoutConfig : {
				align : 'stretch'
			},
			items : [ {
				title : 'Custos x Entradas / M&ecirc;s',
				xtype : 'panel',
				frame : true,
				autoScroll : true,
				flex : 2,
				id : 'grafGastEntMensal',
				iconCls : 'icone-grafico-pizza',
				html : '<div id="divGrafGastosEntradasMensal"></div>'
			}, {
				title : 'Totais no Per&iacute;odo',
				xtype : 'panel',
				frame : true,
				autoScroll : true,
				flex : 1,
				id : 'grafGastEntMensalTotal',
				iconCls : 'icone-grafico-pizza',
				html : '<div id="divGrafGastosEntradasMensalTotais"></div>'
			} ]
		})
		relatorio.GraficoGastosEntradaMes.superclass.initComponent.call(this);
	}
});
Ext.reg('graficoGastosEntradaMes', relatorio.GraficoGastosEntradaMes);