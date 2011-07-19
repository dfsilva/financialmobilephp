<?php

class MParcelas extends Model{
	function MParcelas(){
		parent::Model();
	}

	function incluir($data){
		$this->db->insert('parcelas', $data);
	}

	function atualizar($data){
		$this->db->set($data);
		$this->db->where('idCusto', $data['idCusto']);
		$this->db->where('numeroParcela', $data['numeroParcela']);
		$this->db->update('parcelas');
		return $data['idCusto'];
	}
}
?>