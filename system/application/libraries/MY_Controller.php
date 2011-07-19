<?php

class MY_Controller extends Controller{
	function MY_Controller(){
		parent::Controller();
	}

	function verificaUsuarioLogado(){
		session_start();

		if (!isset($_SESSION['idUsuario'])){
			$_SESSION['idUsuario'] = -1;
		}else if(isset($_GET['idUsuario']) && $_GET['idUsuario'] > -1){
			$_SESSION['idUsuario'] = $_GET['idUsuario'];
		}else if(isset($_POST['idUsuario']) && $_POST['idUsuario'] > -1){
			$_SESSION['idUsuario'] = $_POST['idUsuario'];
		}

		if($_SESSION['idUsuario'] < 1){
			redirect('begin','refresh');
		}
	}


	function isMobile(){
		//identificar se é mobile verificar o indice do ua_type != bro e mobile_test != null quer dizer que é mobile
		$array = browser_detection('full');
		if($array['8'] != 'bro' && !empty($array['12'])){
			return true;
		}else{
			return false;
		}
	}

}

?>
