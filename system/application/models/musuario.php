<?php

class MUsuario extends Model{
	function MUsuario(){
		parent::Model();
	}

	function verificarUsuario($u,$pw){
		$this->db->select('loginUsuario, idUsuario, idPerfil');
		$this->db->where('loginUsuario',$u);
		$this->db->where('senhaUsuario', md5($pw));
		$this->db->where('ativo', true);
		$this->db->limit(1);
		$Q = $this->db->get('usuario');

		if ($Q->num_rows() > 0){
			return $Q->row_array();
		}else{
			return null;
		}
	}

	function findByEmail($email){
		$this->db->where('emailUsuario', $email);
		$Q = $this->db->get('usuario');
		return $Q->row_array();
	}
	
	function findByUserName($loginUsuario){
		$this->db->where('loginUsuario', $loginUsuario);
		$Q = $this->db->get('usuario');
		return $Q->row_array();
	}
	
	function findById($idUsuario){
		$this->db->where('idUsuario', $idUsuario);
		$Q = $this->db->get('usuario');
		return $Q->row_array();
	}
	
	function incluirAlterar($data){
		if (isset($data['idUsuario']) && $data['idUsuario'] > 0){
			$this->db->set($data);
			$this->db->where('idUsuario', $data['idUsuario']);
			$this->db->update('usuario');
			$idUsuario = $data['idUsuario'];
		}else{
			$this->db->insert('usuario', $data);
			$idUsuario =   $this->db->insert_id();
		}
		
		$this->db->where('idUsuario', $idUsuario);
		$Q = $this->db->get('usuario');
		return $Q->row_array();
	}
}
?>