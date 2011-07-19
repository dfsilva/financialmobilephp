Ext.ns("relatorio");

relatorio.GraficoGastosCategoriaMes = Ext.extend(Ext.Panel, {

	gerar : function(dataInicial, dataFinal) {
		var cgemes = new NeoCharts(
				urlApp+"charts/MSLine.swf?ChartNoDataText=Nenhum gasto a ser exibido",
				"chart3Id", "100%", "100%", "0", "1");
		cgemes.setDataURL("in/ccusto/gerarGraficoCustosCategoriaMensal/"+dataInicial.format("d-m-Y")+"/"+dataFinal.format("d-m-Y"));
		cgemes.render("divGrafGastosCategoriaMensal");
		
		var cgemes2 = new NeoCharts(
				urlApp+"charts/Pie3D.swf?ChartNoDataText=Nenhum gasto a ser exibido",
				"chart3Id", "100%", "100%", "0", "1");
		cgemes2.setDataURL("in/ccusto/geraGraficoCustosCategoriaTotaisPeriodo/"+dataInicial.format("d-m-Y")+"/"+dataFinal.format("d-m-Y"));
		cgemes2.render("divGrafGastosCategoriaTotal");
	},

	initComponent : function() {
		Ext.apply(this, {
			layout : 'hbox',
			layoutConfig : {
				align : 'stretch'
			},
			items : [ {
				title : 'Custos por Categoria Mensal',
				xtype: 'panel',
				frame : true,
				autoScroll : true,
				flex : 2,
				id : 'grafGastCatMensal',
				iconCls : 'icone-grafico-pizza',
				html : '<div id="divGrafGastosCategoriaMensal"></div>'
			},{
				title : 'Totais no Per&iacute;odo',
				xtype: 'panel',
				frame : true,
				autoScroll : true,
				flex : 1,
				id : 'grafGastCatTotal',
				iconCls : 'icone-grafico-pizza',
				html : '<div id="divGrafGastosCategoriaTotal"></div>'
			} ]
		});
		relatorio.GraficoGastosCategoriaMes.superclass.initComponent.call(this);
	}
});
Ext.reg('graficoGastosCategoriaMes', relatorio.GraficoGastosCategoriaMes);