<script type="text/javascript">
var gravando = false;

$(document).ready(function() {
	$("#dataGasto").val(getDataAtual());
});

function novo(){
	$("#codigoGasto").val('');
	$("#descricaoGasto").val('');
	$("#categoriaGasto").val('1');
	$("#dataGasto").val(getDataAtual());
	$("#valorGasto").val('');
}

function cadastrar(){
	if(!gravando && validaCampos()){
		gravando = true;
		$("#appCorpo").mask("Gravando custo, aguarde...");
		var descGasto = $("#descricaoGasto").val();
		var catGasto = $("#categoriaGasto").val();
		var dataGasto = $("#dataGasto").val();
		var valorGasto = $("#valorGasto").val();
		var url = urlApp+'in/ccusto/cadastrarAlterar';
		$.post(url, {descricaoGasto:descGasto, idCategoriaGasto:catGasto, dataVencimento:dataGasto, valorParcela:valorGasto}, cadastrarApos, "json");
	}
}

function validaCampos(){
	if($("#descricaoGasto").val() == ''){
		alert('Informe uma descricao!');
		$("#descricaoGasto").focus();
		return false;
	}
	
	if($("#categoriaGasto").val() == ''){
		alert('Informe uma categoria!');
		$("#categoriaGasto").focus();
		return false;
	}

	if($("#dataGasto").val() == ''){
		alert('Informe a data do gasto!');
		$("#dataGasto").focus();
		return false;
	}

	if($("#valorGasto").val() == ''){
		alert('Informe o valor do gasto!');
		$("#valorGasto").focus();
		return false;
	}
	
	if(isNaN(parseFloat($("#valorGasto").val()))){
		alert('Informe o valor correto!');
		$("#valorGasto").val('');
		$("#valorGasto").focus();
		return false;
	}else if(parseFloat($("#valorGasto").val()) <= 0.00){
		alert('Informe o valor maior que zero!');
		$("#valorGasto").val('');
		$("#valorGasto").focus();
		return false;
	}
	return true;
}

function cadastrarApos(data, result){
	if(data.success){
		$("#codigoGasto").val(data.idCusto);
		$("#appCorpo").unmask();
		alert('Cadastro efetuado com sucesso!');
	}else{
		$("#appCorpo").unmask();
		alert('Erro ao cadastrar gasto!');
	}
	gravando = false;
}

function pesquisar(){
}
</script>

<div id="divCustosBase">
	<table border="0" id="tblBase">
		<tr>
			<td> <label>C&oacute;digo</label> </td>
			<td> <input id="codigoGasto" name="codigoGasto" type="text" readonly="readonly" size="4" class="DISABLED"> </td>
		</tr>
		<tr>
			<td> <label>Descri&ccedil;&atilde;o</label> </td>
			<td> <input id="descricaoGasto" name="descricaoGasto" type="text" > </td>
		</tr>
		<tr>
			<td> <label>Categoria</label> </td>
			<td><select id="categoriaGasto" name="categoriaGasto">
					<?php
					  foreach ($categorias as $key){
						echo '<option value="'.$key['idCategoria'].'">'.$key['descCategoria'].'</option>';
					  }
					?>
				</select>
			</td>
		</tr>
	</table>
</div>
<div id="divSemParcelas">
	<table>
		<tr>
			<td><label>Data</label></td>
			<td><input id="dataGasto" name="dataGasto" type="text" onblur="formataData(this);" size="10"></td>
		</tr>
		<tr>
			<td><label>Valor</label></td>
			<td><input id="valorGasto" name="valorGasto" type="text" size="8" onblur="jQuery(this).format({format:'#,###.00', locale:'br'});"></td>
		</tr>
	</table>
</div>



