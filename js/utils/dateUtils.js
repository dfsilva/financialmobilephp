// retorna a data atual no formado dd/MM/YYYY
function getDataAtual() {
	try {
		dataAtual = new Date();
		dia = dataAtual.getDate();
		mes = dataAtual.getMonth() + 1 <= 9
				? '0' + (dataAtual.getMonth() + 1)
				: dataAtual.getMonth() + 1;
		ano = dataAtual.getFullYear();
		dataAtual = dia + '/' + mes + '/' + ano;

		return dataAtual;
	} catch (e) {
		alert(e);
	}
}

// -----------------------------------------------------------------------------
// Formata um TextField como Data no formato dd/mm/yyyy
// -----------------------------------------------------------------------------
function formataData(campo) {
	data = $(campo).val().replace('/', '');
	data = data.replace('/', '');

	if (data.length != 8) {
		alert('Data Invalida');
		$(campo).val('');
		$(campo).focus();
	} else {
		dia = data.substring(0, 2);
		mes = data.substring(2, 4);
		ano = data.substring(4, 8);

		$(campo).val(dia + '/' + mes + '/' + ano);
	}
}