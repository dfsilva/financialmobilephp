<?php
class CWelcome extends MY_Controller {

	function CWelcome(){
		parent::MY_Controller();
		$this -> verificaUsuarioLogado();
	}

	function index(){
		$data['title'] = 'Financial Mobile - Bem Vindo!';
		
		if($this -> isMobile()){
			$data['main'] = 'in/welcome';
			$this->load->vars($data);
			$this->load->view('in/template');
		}
	}
}
?>