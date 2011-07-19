<html>
	<head>
	<title>::Financial Mobile - Beta::</title>
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<META NAME="description" content="Sistema para controle de gastos pessoais" />
	<META NAME="keywords" content="Controle de Gastos Pessoais, Finanças Pessoais, Finanças Pessoais Celular, Finanças Pessoais Mobile" />
	<META NAME="generator" content="SubmiTAY" />

		<link rel="stylesheet" type="text/css" href="<?=base_url();?>ext/resources/css/ext-all.css"/>
		<link rel="stylesheet" type="text/css" href="<?=base_url();?>css/styleExt.css"/>
		<link rel="shortcut icon" href="<?=base_url();?>/img/favicon.ico"/>
		
		<script type="text/javascript" src="<?=base_url();?>ext/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="<?=base_url();?>ext/ext-all.js"></script>
		<script type="text/javascript" src="<?=base_url();?>ext/src/locale/ext-lang-pt_BR.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/chart/charts.js"></script>
		
		<!-- Plugins / Extensoes genéricas -->				
		<script type="text/javascript" src="<?=base_url();?>js/plugins/GroupSummary.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/plugins/GridSummary.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/plugins/MonthPickerPlugin.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/overrides/FormPanel.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/overrides/Vtype.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/form/MoneyField.js"></script>
		
		<!-- utilitarios -->
		<script type="text/javascript" src="<?=base_url();?>js/utils/utf.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/utils/apputils.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/utils/dateUtils.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/utils/Loader.js"></script>
		
		<script type="text/javascript" src="<?=base_url();?>js/form/FormularioBase.js"></script>
		
		<script type="text/javascript" src="<?=base_url();?>js/login/LoginWindow.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/usuario/RecuperarSenhaWindow.js"></script>
		
		<script type="text/javascript" src="<?=base_url();?>js/usuario/UsuarioFormPanel.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/usuario/CadastrarUsuarioWindow.js"></script>
		
		<script type="text/javascript" src="<?=base_url();?>js/custo/CustoFormPanel.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/custo/CustoWindow.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/custo/EditCustoFormPanel.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/custo/EditCustoWindow.js"></script>
			
		<script type="text/javascript" src="<?=base_url();?>js/dashboard/CustosCatMesGridPanel.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/dashboard/CustosDiaGridPanel.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/dashboard/Portal.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/dashboard/PortalColumn.js"></script>
		<script type="text/javascript" src="<?=base_url();?>js/dashboard/Portlet.js"></script>
		
		<script type="text/javascript" src="<?=base_url();?>js/contato/ContatoWindow.js"></script>
		
		<!-- Arquivo Principal da Aplicação -->
		<script type="text/javascript" src="<?=base_url();?>js/principal/main.js"></script>
		
		<script type="text/javascript">
				urlApp = '<?= base_url();?>';
				idUsrLgd = <?= $_SESSION['idUsuario']; ?>;
				Ext.require.moduleUrl = '<?= base_url();?>js/';
				
				Ext.onReady(function(){
					Ext.BLANK_IMAGE_URL = '<?=base_url();?>/ext/resources/images/default/s.gif';
					Ext.chart.Chart.CHART_URL = '<?=base_url();?>/ext/resources/charts.swf';
					Ext.QuickTips.init();
					//Iniciando a aplicação
					principal.main.init();
				});
		</script>
		
		<script type="text/javascript">
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-8052654-1']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		
		</script>
	</head>
<body>

</body>
</html>
