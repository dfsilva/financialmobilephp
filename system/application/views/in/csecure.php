<?php

class CSecure extends Controller {

	function CSecure(){
		parent::Controller();
		session_start();

		if (!isset($_SESSION['idUsuario'])){
			$_SESSION['idUsuario'] = -1;
		}

		if($_SESSION['idUsuario'] < 1){
			redirect('cautenticacao','refresh');
		}

	}

	function index(){
	}
}

?>