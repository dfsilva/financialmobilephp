<?php

class App extends Controller {

	function App(){
		parent::Controller();
	}

	function index(){
		session_start();
		if (!isset($_SESSION['idUsuario'])){
			$_SESSION['idUsuario'] = -1;
		}

		if(isset($_COOKIE["idUsuario"])){
			$_SESSION['idUsuario'] = $_COOKIE["idUsuario"];
		}

		if($_SESSION['idUsuario'] < 1){
			if($this->isMobile()){
				$this->load->view('login');
			}else{
				$this->load->view('appview');
			}
		}else{
			if($this->isMobile()){
				redirect('in/cwelcome','refresh');
			}else{
				$this->load->view('appview');
			}
		}
	}

	function login(){
		session_start();
		if ($this->input->get_post('usuario')){
			$u = $this->input->get_post('usuario');
			$pw = $this->input->get_post('senha');
			$usuario = $this->MUsuario->verificarUsuario($u,$pw);
			if ($usuario && isset($usuario['idUsuario'])){
				save_user($usuario['idUsuario'], $usuario['loginUsuario'], $usuario['idPerfil']);
				redirect('in/cwelcome','refresh');
			}else{
				$_SESSION['idUsuario'] = -1;
				$data['erro'] = 'Usuário ou senha inválidos';
				$this->load->vars($data);
				$this->load->view('login');
			}
		}
	}

	function loginjson($login = null, $senha=null){
		session_start();
		header('Content-type: application/json');
		
		$u = $this->input->get_post('usuario', TRUE) ? $this->input->get_post('usuario', TRUE) : $login ;
		$pw = $this->input->get_post('senha', TRUE) ? $this->input->get_post('senha', TRUE) : $senha;
		
		if ($u){
			$usuario =  $this->MUsuario->verificarUsuario($u,$pw);
			if ($usuario && isset($usuario['idUsuario'])){
				save_user($usuario['idUsuario'], $usuario['loginUsuario'], $usuario['idPerfil']);
				$data['success'] = true;
				$data['idUsuario'] = $usuario['idUsuario'];
				print json_encode($data);
			}else{
				$_SESSION['idUsuario'] = -1;
				$data['success'] = false;
				$data['debug'] = "Usuario: ".$u." Senha: ".$pw;
				print json_encode($data);
			}
		}else{
			$_SESSION['idUsuario'] = -1;
			$data['success'] = false;
			$data['msg'] = 'E necessario informar um usuario para efetuar login';
			print json_encode($data);
		}
	}

	function logout(){
		session_start();
		session_unset();
		setcookie("idUsuario","", time() - 360000000);
		setCookie("loginUsuario", "", time() - 360000000);
		setCookie("perfilUsuario", "", time() - 360000000);
		header('Content-type: application/json');
		$data['success'] = true;
		print json_encode($data);
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