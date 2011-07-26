<?php

class CCusto extends MY_Controller {

	function CCusto(){
		parent::MY_Controller();
	}

	function index(){
		$this->verificaUsuarioLogado();
		$data['categorias'] = $this->MCategoria->findAllCategorias();
		$data['title'] = 'Cadastro de Custos';
		$data['main'] = 'in/custo';
		$data['isBarraNav'] = true;
		$this->load->vars($data);
		$this->load->view('in/template');
	}

	function cadastrarAlterar(){
		try{
			session_start();
			$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];
			header('Content-type: application/json');
			$retorno = Array();
			//indica que o lancamento e parcelado
			$lancamentoParcelado = $this->input->get_post('lancamentoParcelado', TRUE);

			//informa��es referente ao gasto
			$dadosGasto = array('idCusto' => $this->input->get_post('idCusto', TRUE),
				  'descricaoGasto' => $this->input->get_post('descricaoGasto', TRUE),
				  'idCategoriaGasto' => $this->input->get_post('idCategoriaGasto', TRUE),
				  'idUsuario' => $idUsuario
			);

			//inclui o custo
			$idCusto =  $this->MCusto->incluir($dadosGasto);

			//se veio idCusto da tela, quer dizer que � para atualizar
			if (isset($dadosGasto['idCusto']) && $dadosGasto['idCusto'] > 0){
				//preenchendo os dados da parcela
				$dadosParcela = array('idCusto' => $idCusto,
					  'numeroParcela' => $this->input->get_post('numeroParcela', TRUE),
					  'dataVencimento' => convertDateMysql($this->input->get_post('dataVencimento', TRUE)),
			  		  'valorParcela' =>convertNumberMysql($this->input->get_post('valorParcela', TRUE)));
				//atualizando a parcela
				$this->MParcelas->atualizar($dadosParcela);

				//preenchendo os dados para retorno
				$retorno['custo'] = array_merge((array)$dadosGasto, (array)$dadosParcela);
				$retorno['custo']['dataVencimento'] = convertDateNoSql($retorno['custo']['dataVencimento']);
			}else{
				if($lancamentoParcelado){//lancamento parcelado
					$tipoRepeticao = $this->input->get_post('tipoRepeticao', TRUE);
					$numParcelas = $this->input->get_post('qtdParcelas', TRUE);

					$dadosParcela = array('idCusto' => $idCusto,
					  'numeroParcela' => 1,
					  'dataVencimento' => convertDateMysql($this->input->get_post('dataVencimento', TRUE)),
			  		  'valorParcela' =>convertNumberMysql($this->input->get_post('valorParcela', TRUE)));

					$this->MParcelas->incluir($dadosParcela);

					for ($i = 2; $i <= $numParcelas; $i++) {
						switch ($tipoRepeticao) {
							case 1://semanas
								$dadosParcela['dataVencimento'] = strtotime(date("Y-m-d", strtotime($dadosParcela['dataVencimento'])) . " +1 week");
								$dadosParcela['dataVencimento'] = date("Y-m-d",$dadosParcela['dataVencimento']);
								break;
							case 2://quinzenas
								$dadosParcela['dataVencimento'] = strtotime(date("Y-m-d", strtotime($dadosParcela['dataVencimento'])) . " +2 week");
								$dadosParcela['dataVencimento'] = date("Y-m-d",$dadosParcela['dataVencimento']);
								break;
							case 3: //meses
								$dadosParcela['dataVencimento'] = strtotime(date("Y-m-d", strtotime($dadosParcela['dataVencimento'])) . " +1 month");
								$dadosParcela['dataVencimento'] = date("Y-m-d",$dadosParcela['dataVencimento']);
								break;
							case 4: //bimestres
								$dadosParcela['dataVencimento'] = strtotime(date("Y-m-d", strtotime($dadosParcela['dataVencimento'])) . " +2 month");
								$dadosParcela['dataVencimento'] = date("Y-m-d",$dadosParcela['dataVencimento']);
								break;
							case 5: //trimestres
								$dadosParcela['dataVencimento'] = strtotime(date("Y-m-d", strtotime($dadosParcela['dataVencimento'])) . " +3 month");
								$dadosParcela['dataVencimento'] = date("Y-m-d",$dadosParcela['dataVencimento']);
								break;
							case 6: //semestres
								$dadosParcela['dataVencimento'] = strtotime(date("Y-m-d", strtotime($dadosParcela['dataVencimento'])) . " +6 month");
								$dadosParcela['dataVencimento'] = date("Y-m-d",$dadosParcela['dataVencimento']);
						}
						$dadosParcela['numeroParcela'] = $i;
						$this->MParcelas->incluir($dadosParcela);
					}
				}else{//lancamento nao possui parcelas
					$dadosParcela = array('idCusto' => $idCusto,
					  'numeroParcela' => 1,
					  'dataVencimento' => convertDateMysql($this->input->get_post('dataVencimento', TRUE)),
			  		  'valorParcela' =>convertNumberMysql($this->input->get_post('valorParcela', TRUE)));
					$this->MParcelas->incluir($dadosParcela);
				}
			}
			$retorno['success'] = true;
			$retorno['idCusto'] = $idCusto;
			print json_encode($retorno);
		}catch (Exception $e){
			$retorno['success'] = false;
			$retorno['msg'] = $e->getMessage();
			print json_encode($retorno);
		}
	}

	function buscarPorPeriodo(){
		session_start();
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];
		header('Content-type: application/json');
		$dataInicial = $this->input->get_post('dataInicial', TRUE);
		$dataFinal = $this->input->get_post('dataFinal', TRUE);
		$data=  $this->MCusto->findCustosByPeriod($dataInicial, $dataFinal, $idUsuario);
		print json_encode($data);
	}

	function buscarCustoManutencao(){
		session_start();
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];
		header('Content-type: application/json');
		$baseBusca = array(
            'dataInicial'       => $this->input->get_post('dtInicialMan', TRUE),
            'dataFinal'         => $this->input->get_post('dtFinalMan', TRUE),
			'descricaoGasto'	=> $this->input->get_post('descricaoGasto', TRUE),
			'idCategoriaGasto'  => $this->input->get_post('idCategoriaGasto', TRUE)
		);
		$data['custos'] = $this->MCusto->findCustosByParameters($baseBusca, $idUsuario);
		print json_encode($data);
	}

	function findByParameters(){
		header('Content-type: application/json');
		$baseBusca = array(
            'dataInicial'       => $this->input->get_post('dataInicial', TRUE),
            'dataFinal'         => $this->input->get_post('dataFinal', TRUE),
            'idCategoriaGasto'  => $this->input->get_post('idCategoriaGasto', TRUE),
			'descricaoGasto'	=>  $this->input->get_post('descricaoGasto', TRUE)
		);

		$data = $this->MCusto->findCustosByParameters($baseBusca);
		print json_encode($data);
	}

	function buscarCustosDia(){
		session_start();
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];
		header('Content-type: application/json');
		$dataAtual = date('d/m/Y');
		$data['custos'] =  $this->MCusto->findCustosByData($dataAtual, $idUsuario);
		print json_encode($data);
	}

	/**
	 * Funcao que retorna a listagem dos custos do mes atual pelo usu�rio logado
	 * filtrando de acordo com o c�digo da categoria passada por par�metro
	 * @param $categoriaId
	 */
	function buscarCustosMesPelaCategoria(){
		session_start();
		header('Content-type: application/json');
		$categoriaId = $this->input->get_post('idCategoria', TRUE);
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];
		$dataInicio = "01/" . date("m") ."/" . date("Y");
		$dataFinal = date("t/m/Y");

		$data['custos'] =  $this->MCusto->findCustosByCategoryAndPeriod($dataInicio, $dataFinal, $categoriaId, $idUsuario);
		print json_encode($data);
	}

	function verificaExcluir(){
		header('Content-type: application/json');
		$idCusto  =  $this->input->get_post('idCusto', TRUE);
		$numParcela =  $this->input->get_post('numParcela', TRUE);
		if (strlen($idCusto) > 0) {

			$countParcelas = $this->MCusto->getQuantParcelasByCost($idCusto);

/* 			if($countParcelas > 1){
				$return = array(
				                'success' => FALSE,
                				'msg'     => 'Este custo possui '.$countParcelas.' parcelas.',
								'code'    =>  '1');
			}else{ */
				if($this->MCusto->deleteCostAndParcelas($idCusto, $numParcela)){
					$return = array('success'=>TRUE);
				}else{
					$return = array('success'=>FALSE, 'msg'=> 'Ocorreu um erro ao excluir o custo.');
				}
		//	}
		} else {
			$return = array(
                'success' => FALSE,
                'msg'     => 'Nenhum custo enviado para exclu&atilde;o.',
				'code'    =>  '1');
		}
		print json_encode($return);
	}

	function exclui(){
		header('Content-type: application/json');
		$idCusto  =  $this->input->get_post('idCusto', TRUE);
		$delParcelas =  $this->input->get_post('delParcelas', TRUE);

		$numParcela = $delParcelas == true ? $this->input->get_post('numParcela', TRUE) : null;

		if($this->MCusto->deleteCostAndParcelas($catId, $numParcela)){
			$return = array('success'=>TRUE);
		}else{
			$return = array('success'=>TRUE, 'msg'=> 'Ocorreu um erro ao excluir o custo.');
		}
		print json_encode($return);
	}

	/**
	 * Busca os custos e entrada do mes atual
	 * e retorna um json com a informacao
	 */
	function buscarCustosEntradaMesAtual(){
		session_start();
		header('Content-type: application/json');

		$return = array(
                'custosMes'     => $this->buscaSomatoriaCustosMes(),
				'entradasMes'    =>  $this->buscaSomatoriaEntradasMes());
		
		print json_encode($return);
	}

	private function buscaSomatoriaCustosMes(){
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];
		return $this->MCusto->buscarSomaCustosPeriodo("01/" . date("m") ."/" . date("Y"), date("t/m/Y"), $idUsuario);
	}

	private function buscaSomatoriaEntradasMes(){
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];
		return $this->MEntrada->buscarSomaEntradasPeriodo("01/" . date("m") ."/" . date("Y"), date("t/m/Y"), $idUsuario);
	}

	function geraGraficoEntradasCustos(){
		session_start();
		header('Content-type: text/xml; charset=utf-8');
		$somaCustosMes = $this->buscaSomatoriaCustosMes();
		$somaEntradasMes = $this->buscaSomatoriaEntradasMes();
		print "<chart numberPrefix='R$ ' showValues='1' rotateValues='0' placeValuesInside='1' decimalSeparator=',' thousandSeparator='.' decimals='2' formatNumberScale='0'><set label='Entradas' value='".$somaEntradasMes."' /><set label='Custos' value='".$somaCustosMes."' /></chart>";
	}

	function geraGraficoCustosCategoria(){
		session_start();
		header("Content-Type: text/xml; charset=utf-8");
		print pack ("C3",0xef, 0xbb, 0xbf);
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];

		$gastosCategoriaMes = $this->MCusto->buscarGastosCategoriaPeriodo("01/" . date("m") ."/" . date("Y"), date("t/m/Y"), $idUsuario);

		$xml='<?xml version="1.0" encoding="UTF-8"?>';
		$xml.= "<chart numberPrefix='R$ ' showValues='0' placeValuesInside='1' decimalSeparator=',' thousandSeparator='.' decimals='2' formatNumberScale='0'>";
		foreach ($gastosCategoriaMes as $g){
			$xml.= "<set label='".$g['descCategoria']."' value='".$g['total']."' link='javascript:updateGridGastosCatMes(".$g['idCategoria'].",\"".$g['descCategoria']."\","."\"01/" . date("m") ."/" . date("Y")."\",\"".date("t/m/Y")."\");'/>";
		}
		$xml.= "</chart>";
		print $xml;
	}

	function gerarGraficoCustosCategoriaMensal($dataInicial = null, $dataFinal = null){

		$dataInicial = explode("-",$dataInicial);
		$dataFinal = explode("-",$dataFinal);

		$dataInicial = "01/".$dataInicial[1]."/".$dataInicial[2];
		$dataFinal = "31/".$dataFinal[1]."/".$dataFinal[2];

		session_start();
		header("Content-Type: text/xml; charset=utf-8");
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];

		$categorias = $this->MCusto->buscarCategoriasMes($dataInicial, $dataFinal, $idUsuario);
		$mesesTotais = $this->MCusto->buscarGastosCategoriaTotaisMensal($dataInicial, $dataFinal, $idUsuario);

		print pack ("C3",0xef, 0xbb, 0xbf);
		$xml='<?xml version="1.0" encoding="UTF-8"?>';
		$xml.= "<chart numberPrefix='R$ ' showValues='0' decimalSeparator=',' thousandSeparator='.' decimals='2' formatNumberScale='0' numvdivlines='5'>";

		$xml.="<categories >";
		foreach ($mesesTotais as $mt){
			$xml.= "<category label='".$mt['mes']."' />";
		}
		$xml.="</categories>";

		foreach ($categorias as $c){
			$xml.="<dataset seriesName='".$c['descCategoria']."'>";
			$gastosCategoriaMes = $this->MCusto->buscarGastosCategoriaMensal($dataInicial, $dataFinal, $idUsuario, $c['idCategoria']);

			for($i = 0; $i < sizeof($mesesTotais); $i++)	{
				$mesVez = $mesesTotais[$i]['mes'];
				$gc0 = null;

				foreach ($gastosCategoriaMes as $gc){
					if($gc['mes'] == $mesVez){
						$gc0 = $gc;
					}
				}

				if($gc0 != null){
					$xml.="<set value='".$gc0['total']."' />";
				}else{
					$xml.="<set value='0'/>";
				}
			}

			$xml.="</dataset>";
		}

		$xml.= "</chart>";
		print $xml;
	}


	function gerarGraficoCustosEntradasMensal($dataInicial = null, $dataFinal = null){
		session_start();

		$dataFinal = explode("-",$dataFinal);
		$dataInicial = explode("-",$dataInicial);

		header("Content-Type: text/xml; charset=utf-8");
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];

		$custosEntradasMeses = $this->MCusto->buscarCustosEntradaAgrupadosMes("01/".$dataInicial[1]."/".$dataInicial[2], "31/".$dataFinal[1]."/".$dataFinal[2], $idUsuario);

		print pack ("C3",0xef, 0xbb, 0xbf);

		$xml='<?xml version="1.0" encoding="UTF-8"?>';
		$xml.= "<chart numberPrefix='R$ ' showValues='1' decimalSeparator=',' thousandSeparator='.' decimals='2' formatNumberScale='0' numvdivlines='5'>";

		$xml.="<categories >";
		foreach ($custosEntradasMeses as $mt){
			$xml.= "<category label='".$mt['mes']."' />";
		}
		$xml.="</categories>";

		$somaTotal = 0;
		$countMeses = 0;

		$xml.="<dataset seriesName='Entradas'>";
		foreach ($custosEntradasMeses as $c){
			$xml.="<set value='".$c['entradaSoma']."' />";
			$somaTotal+=$c['entradaSoma'];
			$countMeses++;
		}
		$xml.="</dataset>";

		$xml.="<dataset seriesName='Media Entradas' showValues='0'>";
		foreach ($custosEntradasMeses as $c){
			$xml.="<set value='".$somaTotal/$countMeses."' />";
		}
		$xml.="</dataset>";


		$somaTotal = 0;
		$countMeses = 0;
		$xml.="<dataset seriesName='Custos'>";
		foreach ($custosEntradasMeses as $c){
			$xml.="<set value='".$c['custoSoma']."' />";
			$somaTotal+=$c['custoSoma'];
			$countMeses++;
		}
		$xml.="</dataset>";


		$xml.="<dataset seriesName='Media Custos' showValues='0'>";
		foreach ($custosEntradasMeses as $c){
			$xml.="<set value='".$somaTotal/$countMeses."' />";
		}
		$xml.="</dataset>";

		$xml.= "</chart>";
		print $xml;
	}

	function geraGraficoCustosCategoriaTotaisPeriodo($dataInicial = null, $dataFinal = null){

		$dataInicial = explode("-",$dataInicial);
		$dataFinal = explode("-",$dataFinal);

		$dataInicial = "01/".$dataInicial[1]."/".$dataInicial[2];
		$dataFinal = "31/".$dataFinal[1]."/".$dataFinal[2];

		session_start();
		header("Content-Type: text/xml; charset=utf-8");
		print pack ("C3",0xef, 0xbb, 0xbf);
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];

		$gastosCategoriaMes = $this->MCusto->buscarGastosCategoriaTotaisPeriodo($dataInicial, $dataFinal, $idUsuario);

		$xml='<?xml version="1.0" encoding="UTF-8"?>';
		$xml.= "<chart numberPrefix='R$ ' showValues='1' placeValuesInside='1' decimalSeparator=',' thousandSeparator='.' decimals='2' formatNumberScale='0'>";
		foreach ($gastosCategoriaMes as $g){
			$xml.= "<set label='".$g['categoria']."' value='".$g['total']."'/>";
		}
		$xml.= "</chart>";
		print $xml;
	}

	function geraGraficoEntradasCustosPeriodo($dataInicial = null, $dataFinal = null){

		$dataInicial = explode("-",$dataInicial);
		$dataFinal = explode("-",$dataFinal);

		$dataInicial = "01/".$dataInicial[1]."/".$dataInicial[2];
		$dataFinal = "31/".$dataFinal[1]."/".$dataFinal[2];

		session_start();
		header('Content-type: text/xml; charset=utf-8');
		$idUsuario = $this->input->get_post('idUsuario', TRUE) ? $this->input->get_post('idUsuario', TRUE) : $_SESSION['idUsuario'];

		$somaCustosMes = $this->MCusto->buscarSomaCustosPeriodo($dataInicial, $dataFinal, $idUsuario);
		$somaEntradasMes = $this->MEntrada->buscarSomaEntradasPeriodo($dataInicial, $dataFinal, $idUsuario);
		print "<chart numberPrefix='R$ ' showValues='1' rotateValues='0' placeValuesInside='1' decimalSeparator=',' thousandSeparator='.' decimals='2' formatNumberScale='0'><set label='Entradas' value='".$somaEntradasMes."' /><set label='Custos' value='".$somaCustosMes."' /></chart>";
	}
}

?>