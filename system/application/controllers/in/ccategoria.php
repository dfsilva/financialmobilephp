<?php

class CCategoria extends MY_Controller {

	function CCategoria(){
		parent::MY_Controller();
	}

	function index(){
		session_start();
		$data['title'] = 'Cadastro de Categorias';
		$data['main'] = 'in/categoria';
		$data['isBarraNav'] = true;
		$this->load->vars($data);
		$this->load->view('in/template');
	}

	function cadastrar(){
		session_start();
		header('Content-type: application/json');
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];
		$data = array(
            'idCategoria'           => $this->input->get_post('idCategoria', TRUE),
            'descCategoria'         => $this->input->get_post('descCategoria', TRUE),
            'descCompletaCategoria' => $this->input->get_post('descCompletaCategoria', TRUE),
			'idUsuario'	            => $idUsuario
		);
		$idCategoria = $this->MCategoria->incluir($data);
		$dataRet['success'] = true;
		$dataRet['idCategoria'] = $idCategoria;
		print json_encode($dataRet);
	}

	function excluir(){
		session_start();
		header('Content-type: application/json');
		$catId  =  $this->input->get_post('idCategoria', TRUE);
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];
		
		if (strlen($catId) > 0) {
			$custos = $this->MCusto->findCustosByCategoria($catId, $idUsuario);
			if(count($custos) > 0){
				$return = array(
				                'success' => FALSE,
                				'msg'     => 'Possui '.count($custos).' custos associados a ela.');
			}else{
				$return = $this->MCategoria->excluirCategoria($catId, $idUsuario);
			}
		} else {
			$return = array(
                'success' => FALSE,
                'msg'     => 'Nenhum codigo de categoria para exclusao'
                );
		}
		print json_encode($return);
	}


	function getCategorias($userId = null){
		session_start();
		header('Content-type: application/json');
		$idUsu = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $userId;
		$idUsuario =  $idUsu ? $idUsu : $_SESSION['idUsuario'];
		$data['categorias'] = $this->MCategoria->findAllCategorias($idUsuario);
		print json_encode($data);
	}

}

?>