<?php

class CUsuario extends MY_Controller {

	function CUsuario(){
		parent::MY_Controller();
	}

	function index(){
	}
	
	function isAutenticate(){
		if(isUserAutenticate()){
			print '{"sucess": true}';
		}else{
			print '{"sucess": false}';
		}
	}

	function cadastrar(){
		header('Content-type: application/json');
		$data = array(
		    'idUsuario'   => $this->input->get_post('idUsuario', TRUE),
            'nomeUsuario'   => $this->input->get_post('nomeUsuario', TRUE),
            'emailUsuario'  => $this->input->get_post('emailUsuario', TRUE),
            'loginUsuario' 	=> $this->input->get_post('loginUsuario', TRUE),
			'senhaUsuario' 	=> $this->input->get_post('senhaUsuario', TRUE),
			'ativo' 	=> $this->input->get_post('ativo', TRUE),
			'idPerfil' 	=> $this->input->get_post('idPerfil', TRUE),
		);


		$usuario = $this->MUsuario->findByEmail($data['emailUsuario']);

		if($usuario){
			$dataRet['success'] = false;
			$dataRet['msg'] = 'J&aacute; existe um usu&aacute;rio cadastrado com o email informado!';
			$dataRet['usuario'] = $usuario;
			print json_encode($dataRet);
		}else{
			$usuario = $this->MUsuario->findByUserName($data['loginUsuario']);
			if($usuario){
				$dataRet['success'] = false;
				$dataRet['msg'] = 'J&aacute; existe um usu&aacute;rio cadastrado com o login informado!';
				$dataRet['usuario'] = $usuario;
				print json_encode($dataRet);
			}else{
				if(!isset($data['ativo']) || empty($data['ativo'])){
					$data['ativo'] = true;
				}

				if(!isset($data['idPerfil']) || $data['idPerfil'] < 1){
					$data['idPerfil'] = 1;
				}

				$usuarioEmail = $data;

				$data['senhaUsuario'] = md5($data['senhaUsuario']);

				$usuario = $this->MUsuario->incluirAlterar($data);

				$dataRet['success'] = true;
				$dataRet['usuario'] = $usuario;
				print json_encode($dataRet);
				$this-> cadastrarCategoriasPadroes($usuario['idUsuario']);
				$this -> enviarEmailBemVindo($usuarioEmail);
			}
		}
	}

	function cadastrarCategoriasPadroes($idUsuario){
		$categoria = array(
            'descCategoria'         => utf8_encode('Alimentação'),
            'descCompletaCategoria' => utf8_encode('Gastos com Alimentação em Geral'),
			'idUsuario'	            => $idUsuario
		);
		$this->MCategoria->incluir($categoria);

		$categoria = array(
            'descCategoria'         => utf8_encode('Higine/Limpeza'),
            'descCompletaCategoria' => utf8_encode('Gastos Limpeza e Higine em Geral'),
			'idUsuario'	            => $idUsuario
		);
		$this->MCategoria->incluir($categoria);

		$categoria = array(
            'descCategoria'         => utf8_encode('Moradia'),
            'descCompletaCategoria' => utf8_encode('Gastos com Moradia'),
			'idUsuario'	            => $idUsuario
		);
		$this->MCategoria->incluir($categoria);

		$categoria = array(
            'descCategoria'         => utf8_encode('Transporte'),
            'descCompletaCategoria' => utf8_encode('Gastos com Transporte'),
			'idUsuario'	            => $idUsuario
		);
		$this->MCategoria->incluir($categoria);

		$categoria = array(
            'descCategoria'         => utf8_encode('Saúde'),
            'descCompletaCategoria' => utf8_encode('Gastos com Saude Pessoal'),
			'idUsuario'	            => $idUsuario
		);
		$this->MCategoria->incluir($categoria);

		$categoria = array(
            'descCategoria'         => utf8_encode('Estudos'),
            'descCompletaCategoria' => utf8_encode('Gastos com Estudos em Geral'),
			'idUsuario'	            => $idUsuario
		);
		$this->MCategoria->incluir($categoria);
	}

	function atualizar(){
		header('Content-type: application/json');
		$data = array(
		    'idUsuario'   => $this->input->get_post('idUsuario', TRUE),
            'nomeUsuario'   => $this->input->get_post('nomeUsuario', TRUE),
            'emailUsuario'  => $this->input->get_post('emailUsuario', TRUE),
            'loginUsuario' 	=> $this->input->get_post('loginUsuario', TRUE),
			'senhaUsuario' 	=> $this->input->get_post('senhaUsuario', TRUE),
			'ativo' 	=> $this->input->get_post('ativo', TRUE),
			'idPerfil' 	=> $this->input->get_post('idPerfil', TRUE),
		);

		if(!isset($data['ativo'])){
			$data['ativo'] = true;
		}

		if(!isset($data['idPerfil']) || $data['idPerfil'] < 1){
			$data['idPerfil'] = 1;
		}

		$data['senhaUsuario'] = md5($data['senhaUsuario']);

		$usuario = $this->MUsuario->incluirAlterar($data);

		$dataRet['success'] = true;
		$dataRet['usuario'] = $usuario;
		print json_encode($dataRet);

	}

	function findById(){
		header('Content-type: application/json');
		$idUsuario  = $this->input->get_post('idUsuario', TRUE);
		$usuario = $this->MUsuario->findById($idUsuario);
		$usuario['senhaUsuario'] = null;

		$return = array(
                'success' => true,
                'data'    => $usuario
		);
		print json_encode($return);
	}

	function recuperarSenha(){
		header('Content-type: application/json');
		$email = $this->input->get_post('email', TRUE);
		if ($email){
			$usuario = $this->MUsuario->findByEmail($email);
			if($usuario){
				$usuario['senhaUsuario'] = $this->gerar_senha(8,true,true,false,false);
				$usuBase = $usuario;

				$usuario['senhaUsuario'] = md5($usuario['senhaUsuario']);

				$idUsuario =  $this->MUsuario->incluirAlterar($usuario);

				if($idUsuario && ($idUsuario > 0)){
					$this->enviarEmailRecuperacaoSenha($usuBase);
					$data['success'] = true;
					print json_encode($data);
				}
			}else{
				$data['success'] = false;
				$data['msg'] = 'N&atilde;o foi encontrado usu&aacute;rio para o email informado!';
				print json_encode($data);
			}
		}else{
			$data['success'] = false;
			$data['msg'] = 'E necessario informar um email para recuperar a senha!';
			print json_encode($data);
		}
	}

	function enviarEmailRecuperacaoSenha($usuario){
		$this->email->from('financial@diegosilva.com.br', 'Financial Mobile');
		$this->email->to($usuario['emailUsuario']);
		$this->email->bcc('diego@diegosilva.com.br');

		$this->email->subject('Sua nova senha!');
		$this->email->message('
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
       		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
				<head>
				</head>
				<body>
					Ol&aacute; '.$usuario['nomeUsuario'].', segue abaixo seus dados para acesso ao sistema Financial Mobile.
				<p>Usu&aacute;rio: '.$usuario['loginUsuario'].'</p>
				<p>Senha: '.$usuario['senhaUsuario'].'</p>
				</body>
			</html>
		');	

		$this->email->send();
	}

	function enviarEmailBemVindo($usuario){
		$this->email->from('financial@diegosilva.com.br', 'Financial Mobile');
		$this->email->to($usuario['emailUsuario']);
		$this->email->bcc('diego@diegosilva.com.br');

		$this->email->subject('Bem vindo ao sistema Financial Mobile');
		$this->email->message('
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
       		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
				<head>
				</head>
				<body>
					Ol&aacute; '.$usuario['nomeUsuario'].', segue abaixo seus dados para acesso ao sistema Financial Mobile.
				<p>Usu&aacute;rio: '.$usuario['loginUsuario'].'</p>
				<p>Senha: '.$usuario['senhaUsuario'].'</p>
				</body>
			</html>
		');	

		$this->email->send();
	}

	function gerar_senha($tamanho, $maiuscula, $minuscula, $numeros, $codigos){
		$maius = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
		$minus = "abcdefghijklmnopqrstuwxyz";
		$numer = "0123456789";
		$codig = '!@#$%&*()-+.,;?{[}]^><:|';
			
		$base = '';
		$base .= ($maiuscula) ? $maius : '';
		$base .= ($minuscula) ? $minus : '';
		$base .= ($numeros) ? $numer : '';
		$base .= ($codigos) ? $codig : '';
			
		srand((float) microtime() * 10000000);
		$senha = '';
		for ($i = 0; $i < $tamanho; $i++) {
			$senha .= substr($base, rand(0, strlen($base)-1), 1);
		}
		return $senha;
	}
}

?>