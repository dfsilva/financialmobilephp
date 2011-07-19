var todasCategoriasStore = new Ext.data.JsonStore({
			id : 'storeCategorias',
			autoLoad : true,
			proxy : new Ext.data.HttpProxy({
						method : 'POST',
						prettyUrls : false,
						url : 'in/ccategoria/getCategorias'
					}),
			root : 'categorias',
			fields : ['idCategoria', 'descCategoria']
		});

var storeNumParcelas = new Ext.data.ArrayStore({
			storeId : 'storeNumParcelas',
			idIndex : 0,
			autoLoad : true,
			fields : [{
						name : 'parcela'
					}],
			data : [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11],
					[12], [13], [14], [15], [16], [17], [18], [19], [20], [21],
					[22], [23], [24], [25], [26], [27], [28], [29], [30], [31],
					[32], [33], [34], [35], [36]]
		});

var storeRepeticaoParcela = new Ext.data.ArrayStore({
			storeId : 'storeRepeticaoParcela',
			idIndex : 0,
			autoLoad : true,
			fields : [{
						name : 'id'
					}, {
						name : 'desc'
					}],
			data : [[1, 'Semanas'], [2, 'Quinzenas'], [3, 'Meses'],
					[4, 'Bimestres'], [5, 'Trimestrais'], [6, 'Semestres']]
		});

Ext.util.Format.brMoney = function(v) {
	v = Ext.num(v, 0);
	v = (Math.round((v - 0) * 100)) / 100;
	v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v
			+ "0" : v);
	v = String(v);

	var ps = v.split('.');
	var whole = ps[0];
	var sub = ps[1] ? ',' + ps[1] : ',00';
	var r = /(\d+)(\d{3})/;

	while (r.test(whole)) {
		whole = whole.replace(r, '$1' + '.' + '$2');
	}

	v = whole + sub;

	if (v.charAt(0) == '-') {
		return '-R$' + v.substr(1);
	}

	return "R$ " + v;
}

function formataMoeda(v) {
	v = Ext.num(v, 0);
	v = (Math.round((v - 0) * 100)) / 100;
	v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v
			+ "0" : v);
	v = String(v);

	var ps = v.split('.');
	var whole = ps[0];
	var sub = ps[1] ? ',' + ps[1] : ',00';
	var r = /(\d+)(\d{3})/;

	while (r.test(whole)) {
		whole = whole.replace(r, '$1' + '.' + '$2');
	}

	v = whole + sub;

	if (v.charAt(0) == '-') {
		return v.substr(1);
	}

	return v;
}

function exibeAviso(msg, callback) {
	Ext.MessageBox.show({
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING,
				msg : msg,
				title : 'Aviso',
				scope : this,
				fn: callback ? callback : Ext.emptyFn
			});
}

function exibeInforme(msg, callback, instance) {
	this.instance = instance;
	Ext.MessageBox.show({
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO,
				msg : msg,
				title : 'Informa&ccedil;&atilde;o',
				scope : this,
				fn: callback ? callback : Ext.emptyFn
			});
}

function exibeErro(msg) {
	Ext.MessageBox.show({
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR,
				msg : msg,
				title : 'Erro',
				scope : this
			});
}

function onAfterAjaxReq(options, success, result) {
	Ext.getBody().unmask();
	if (success === true) {
		var jsonData;
		try {
			jsonData = Ext.decode(result.responseText);
		} catch (e) {
			exibeErro('Valor retornado n&atilde;o &eacute; v&aacute;lido!');
		}
		options.succCallback.call(options.scope, jsonData, options);

	} else {
		exibeErro('A transa&ccedil;&atilde;o falhou!');
	}
}

function updateGridGastosCatMes(idCat,descCat, dataInicio, dataFim) {
	Ext.getCmp('custosCatMesPanel').setTitle('Gastos do M&ecirc;s Atual - Categoria: '+Utf8.decode(descCat));
	Ext.getCmp('custosCatMesGridPanel').atualizarGrid(idCat);
}