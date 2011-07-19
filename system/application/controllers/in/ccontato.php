<?php

class CContato extends MY_Controller {

	function CContato(){
		parent::MY_Controller();
	}

	function index(){
	}

	function enviarmsg(){
		session_start();
		header('Content-type: application/json');

		$assunto = $this->input->get_post('assunto', TRUE);
		$descricao = $this->input->get_post('descricao', TRUE);
		$idUsuario = $_SESSION['idUsuario'];
		$usuario = $this->MUsuario->findById($idUsuario);
		$this->enviarEmailRecuperacaoSenha($assunto, $descricao, $usuario['nomeUsuario']);
	
		print '{"success":true}';
	}

	function getAssuntos(){
		header('Content-type: application/json');
		$data['assuntos'] = $this->MContato->findAllAssuntos();
		print json_encode($data);
	}

	function enviarEmailRecuperacaoSenha($assunto, $descricao, $usuario){
		$this->email->from('financial@diegosilva.com.br', 'Financial Mobile');
		$this->email->to('diego@diegosilva.com.br');

		$this->email->subject('Sugestao - '.$assunto);
		$this->email->message('
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
       		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
				<head>
				</head>
				<body>
					O usu&aacute;rio '.$usuario.' enviou a seguinte mensagem: 
					<p>'.$descricao.'</p>
				</body>
			</html>
		');	
		$this->email->send();
	}
}

?>