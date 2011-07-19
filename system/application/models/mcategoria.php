<?php

class MCategoria extends Model{
	function MCategoria(){
		parent::Model();
	}

	function incluir($data){
		if (isset($data['idCategoria']) && $data['idCategoria'] > 0){
			$this->db->set($data);
			$this->db->where('idCategoria', $data['idCategoria']);
			$this->db->update('categoria');
			return $data['idCategoria'];
		}else{
			$this->db->insert('categoria', $data);
			return  $this->db->insert_id();
		}
	}

	function excluirCategoria($idCategoria = null, $idUsuario){
		if ($idCategoria) {
			$this->db->where('idCategoria', $idCategoria);
			$this->db->where('idUsuario', $idUsuario);
			$this->db->delete('categoria');
		}
		return array('success'=>TRUE);
	}

	function findAllCategorias($idUsuario){
		$data = array();
		$this->db->where('idUsuario = ', $idUsuario);
		$Q = $this->db->get('categoria');
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}
}
?>