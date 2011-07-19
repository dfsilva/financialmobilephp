<?php

class MCusto extends Model{
	function MCusto(){
		parent::Model();
	}

	function incluir($data){
		if (isset($data['idCusto']) && $data['idCusto'] > 0){
			$this->db->set($data);
			$this->db->where('idCusto', $data['idCusto']);
			$this->db->update('custo');
			return $data['idCusto'];
		}else{
			$this->db->insert('custo', $data);
			$idCusto = $this->db->insert_id();
			return $idCusto;
		}
	}

	function findAllCustos($idUsuario){
		$data = array();
		$this->db->from('custo');
		$this->db->where('idUsuario = ', $idUsuario);
		$Q = $this->db->get('custo');
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}

	function findCustosByPeriod($dataInicial, $dataFinal, $idUsuario){
		$data = array();
		$this->db->from('custo');
		$this->db->join('categoria', 'categoria.idCategoria = custo.idCategoriaGasto');
		$this->db->join('parcelas', 'parcelas.idCusto = custo.idCusto');
		if(isset($dataInicial) && isset($dataFinal)){
			$this->db->where('dataVencimento >= ',convertDateMysql($dataInicial));
			$this->db->where('dataVencimento <=',convertDateMysql($dataFinal));
		}
		$this->db->where('custo.idUsuario = ', $idUsuario);
		$this->db->order_by("descCategoria", "asc"); 
		$Q = $this->db->get();
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$row['dataVencimento'] = convertDateNoSql($row['dataVencimento']);
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}

	function findCustosByParameters($baseBusca, $idUsuario){
		$data = array();
		$this->db->from('custo');
		$this->db->join('categoria', 'categoria.idCategoria = custo.idCategoriaGasto');
		$this->db->join('parcelas', 'parcelas.idCusto = custo.idCusto');
		if(isset($baseBusca['dataInicial']) && isset($baseBusca['dataFinal'])){
			$this->db->where('dataVencimento >= ',convertDateMysql($baseBusca['dataInicial']));
			$this->db->where('dataVencimento <=',convertDateMysql($baseBusca['dataFinal']));
		}

		if(isset($baseBusca['idCategoriaGasto']) && $baseBusca['idCategoriaGasto'] > 0){
			$this->db->where('idCategoriaGasto = ', $baseBusca['idCategoriaGasto']);
		}

		if(isset($baseBusca['descricaoGasto']) && strlen($baseBusca['descricaoGasto']) > 0){
			$this->db->like('descricaoGasto', $baseBusca['descricaoGasto']);
		}

		$this->db->where('custo.idUsuario = ', $idUsuario);

		$Q = $this->db->get();
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$row['dataVencimento'] = convertDateNoSql($row['dataVencimento']);
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}

	function findCustosByCategoria($idCategoria = null, $idUsuario){
		$data = array();
		$this->db->from('custo');
		$this->db->where('idCategoriaGasto = ', $idCategoria);
		$this->db->where('idUsuario = ', $idUsuario);
		$Q = $this->db->get();
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}

	function findCustosByData($dataAtual, $idUsuario){
		$data = array();
		$this->db->from('custo');
		$this->db->join('categoria', 'categoria.idCategoria = custo.idCategoriaGasto');
		$this->db->join('parcelas', 'parcelas.idCusto = custo.idCusto');
		$this->db->where('dataVencimento = ', convertDateMysql($dataAtual));
		$this->db->where('custo.idUsuario = ', $idUsuario);

		$Q = $this->db->get();

		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}

	function getQuantParcelasByCost($idCusto){
		$this->db->from('parcelas');
		$this->db->where('idCusto = ', $idCusto);
		$Q = $this->db->get();

		$count = $Q->num_rows();

		$Q->free_result();

		return $count;
	}

	function deleteCostAndParcelas($idCusto = null, $idParcela = null){
		$this->db->where('idCusto', $idCusto);
		if ($idParcela) {
			$this->db->where('numeroParcela', $idParcela);
		}
		$this->db->delete('parcelas');

		$this->db->where('idCusto', $idCusto);
		$this->db->delete('custo');

		return true;
	}

	function buscarSomaCustosPeriodo($dataInicial, $dataFinal, $idUsuario){
		$this->db->select_sum('valorParcela');
		$this->db->from('custo');
		$this->db->join('parcelas', 'parcelas.idCusto = custo.idCusto');
		if(isset($dataInicial) && isset($dataFinal)){
			$this->db->where('dataVencimento >= ',convertDateMysql($dataInicial));
			$this->db->where('dataVencimento <=',convertDateMysql($dataFinal));
		}
		$this->db->where('custo.idUsuario = ', $idUsuario);
		$query = $this->db->get();
		return $query->row()->valorParcela;
	}

	/**
	 * Retorna uma lista de custos de acordo com o periodo informado de acordo com o código da categoria e código do usuário
	 * @param $dataInicio
	 * @param $dataFinal
	 * @param $categoriaId
	 * @param $idUsuario
	 */
	function findCustosByCategoryAndPeriod($dataInicio, $dataFinal, $categoriaId, $idUsuario){
		$data = array();
		$this->db->from('custo');
		$this->db->join('categoria', 'categoria.idCategoria = custo.idCategoriaGasto');
		$this->db->join('parcelas', 'parcelas.idCusto = custo.idCusto');
		$this->db->where('dataVencimento >= ',convertDateMysql($dataInicio));
		$this->db->where('dataVencimento <=',convertDateMysql($dataFinal));
		$this->db->where('idCategoriaGasto = ', $categoriaId);
		
		$this->db->where('custo.idUsuario = ', $idUsuario);

		$Q = $this->db->get();
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$row['dataVencimento'] = convertDateNoSql($row['dataVencimento']);
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}

	function buscarGastosCategoriaPeriodo($dataInicial, $dataFinal, $idUsuario){
		$data = array();
		$this->db->select(" idCategoria, descCategoria, sum(p.valorParcela) as total from custo c
		join categoria cat on cat.idCategoria = c.idCategoriaGasto 
		join parcelas p on p.idCusto = c.idCusto where 
			c.idUsuario=".$idUsuario." and
			p.dataVencimento between '".convertDateMysql($dataInicial)."' and '".convertDateMysql($dataFinal)."'
			group by descCategoria, idCategoria");

		$Q = $this->db->get();
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}

	function buscarGastosCategoriaTotaisMensal($dataInicial, $dataFinal, $idUsuario){
		$data = array();
		$this->db->select(" date_format(p.dataVencimento, '%c/%Y') AS mes, sum(p.valorParcela) as total from custo c
		join categoria cat on cat.idCategoria = c.idCategoriaGasto
		join parcelas p on p.idCusto = c.idCusto where
			c.idUsuario=".$idUsuario." and
			p.dataVencimento between '".convertDateMysql($dataInicial)."' and '".convertDateMysql($dataFinal)."'
			group by mes order by p.dataVencimento");

		$Q = $this->db->get();
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}
	
	function buscarGastosCategoriaTotaisPeriodo($dataInicial, $dataFinal, $idUsuario){
		$data = array();
		$this->db->select(" sum(p.valorParcela) as total, cat.descCategoria as categoria from custo c
		join categoria cat on cat.idCategoria = c.idCategoriaGasto
		join parcelas p on p.idCusto = c.idCusto where
			c.idUsuario=".$idUsuario." and 
			p.dataVencimento between '".convertDateMysql($dataInicial)."' and '".convertDateMysql($dataFinal)."'
			group by categoria order by p.dataVencimento");

		$Q = $this->db->get();
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}
	

	function buscarCategoriasMes($dataInicial, $dataFinal, $idUsuario){
		$data = array();
		$this->db->select(" distinct descCategoria, idCategoria from custo c
		join categoria cat on cat.idCategoria = c.idCategoriaGasto
		join parcelas p on p.idCusto = c.idCusto where
			c.idUsuario=".$idUsuario." and
			p.dataVencimento between '".convertDateMysql($dataInicial)."' and '".convertDateMysql($dataFinal)."'
     	 order by descCategoria", false);

		$Q = $this->db->get();
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$data[] = $row;
			}
		}

		$Q->free_result();
		return $data;
	}

	function buscarGastosCategoriaMensal($dataInicial, $dataFinal, $idUsuario, $idCategoria){
		$data = array();
		$this->db->select(" descCategoria, date_format(p.dataVencimento, '%c/%Y') AS mes, sum(p.valorParcela) as total from custo c
		join categoria cat on cat.idCategoria = c.idCategoriaGasto
		join parcelas p on p.idCusto = c.idCusto where
			c.idUsuario=".$idUsuario." and
			cat.idCategoria = ".$idCategoria." and
			p.dataVencimento between '".convertDateMysql($dataInicial)."' and '".convertDateMysql($dataFinal)."'
			group by descCategoria, mes
			order by p.dataVencimento", false);

		$Q = $this->db->get();
		if ($Q->num_rows() > 0){
			foreach ($Q->result_array() as $row){
				$data[] = $row;
			}
		}
		$Q->free_result();
		return $data;
	}
	

	/**
	 * Retorna a somatoria de custo e entradas agrupado por mes
	 * Enter description here ...
	 * @param $dataInicial
	 * @param $dataFinal
	 * @param $idUsuario
	 */
	function buscarCustosEntradaAgrupadosMes($dataInicial, $dataFinal, $idUsuario){
		$data = array();
		$this->db->select(" sum(valorParcela) custoSoma, 
		       (select sum(valorEntrada) from entrada where date_format(dataEntrada, '%c/%Y') = date_format(dataVencimento, '%c/%Y')
		        and idUsuario = 1) as entradaSoma, 
		       date_format(dataVencimento, '%c/%Y') as mes
		from custo join parcelas on(custo.idCusto = parcelas.idCusto) 
		where custo.idUsuario=".$idUsuario." and
		dataVencimento between '".convertDateMysql($dataInicial)."' and '".convertDateMysql($dataFinal)."'
		group by mes
		order by dataVencimento", false);

		$Q = $this->db->get();
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