<script type="text/javascript">

function novo(){
	$("#idCategoria").val('');
	$("#descricaoCategoria").val('');
}

function cadastrar(){
	var descCateg = $("#descricaoCategoria").val();
	var descCompCateg = $("#descCompletaCategoria").val();
	var url = urlApp+'in/ccategoria/cadastrar';
	$("#appCorpo").mask("Gravando categoria, aguarde...");
	$.post(url, {descCategoria:descCateg, descCompletaCategoria:descCompCateg}, cadastrarApos, "json");
}

function cadastrarApos(data, result){
	if(data.success){
		$("#idCategoria").val(data.idCategoria);
		$("#appCorpo").unmask();
		alert('Cadastro efetuado com sucesso!');
	}else{
		$("#appCorpo").unmask();
		alert('Erro ao cadastrar gasto!');
	}
}
</script>

<div id="divCategoria">
	<table border="0" id="tblCategoria">
		<tr>
			<td> <label>C&oacute;digo</label> </td>
			<td> <input id="idCategoria" name="idCategoria" type="text" readonly="readonly" size="4" class="DISABLED"> </td>
		</tr>
		<tr>
			<td> <label>Descri&ccedil;&atilde;o</label> </td>
			<td> <input id="descCategoria" name="descCategoria" type="text" > </td>
		</tr>
		<tr>
			<td> <label>Descri&ccedil;&atilde;o Completa</label> </td>
			<td> <input id="descCompletaCategoria" name="descCompletaCategoria" type="text" > </td>
		</tr>
	</table>
</div>

<div id="divPesquisa">
	<table border="0" id="tblPesquisa">

	</table>
</div>

