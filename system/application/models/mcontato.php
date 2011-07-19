<?php

class MContato extends Model{
	function MContato(){
		parent::Model();
	}

	function findAllAssuntos(){
		$data = array();
		$Q = $this->db->get('assunto');
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