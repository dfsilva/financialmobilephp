<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<noscript>
		Javascript desabilitado ! Por favor habilite !
	</noscript>
	
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <title><?php echo $title; ?></title>

<script type="text/javascript">
//<![CDATA[
	urlApp = '<?= base_url();?>';
//]]>
</script>

<?php $this->load->view('include-head');?>
</head>
<body id="appCorpo">
<div id="wrapper">
  <div id="header">
  <?php $this->load->view('in/header');?>
  </div>
  <?php if(isset($isBarraNav) && $isBarraNav){ ?>
	  <div id="nav">
	  <?php $this->load->view('in/navigation');?>
	  </div>
  <? }?>
  <div id="main">
  <?php $this->load->view($main);?>
  </div>
  
  <div id="footer"> 
  <?php $this->load->view('in/footer');?>
  </div>
</div>
</body>
</html>
