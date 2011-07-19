Ext.apply(Ext.form.VTypes, {
	password : function(value, field) {
		if (field.initialPasswordField) {
			var pwd = Ext.getCmp(field.initialPasswordField);
			this.passwordText = 'Confirma&ccedil;&atilde;o de senha inv&aacute;lida!';
			return (value == pwd.getValue());
		}

		this.passwordText = 'Senha deve conter no m&iacute;nimo 8 caracteres!';

		// var hasSpecial = value.match(/[0-9!@#\$%\^&\*\(\)\-_=\+]+/i);
		var hasLength = (value.length >= 8);

		return (hasLength);
	},
	passwordText : 'Senha deve conter no m&iacute;nimo 8 caracteres!'
});

Ext.apply(Ext.form.VTypes, {
			imagem : function(val, field) {
				var imagem = /[^\.]\.(jpg|JPG|jpeg|JPEG|gif|GIF|png|PNG)\s*$/;
				return imagem.test(val);
			},
			imagemText : 'O arquivo não é uma imagem: jpg, gif ou png.'
		});

Ext.apply(Ext.form.VTypes, {
			cpf : function(val, field) {
				if (val != '___.___.___-__') {
					if ((val = val.replace(/[^\d]/g, "").split("")).length != 11)
						return false;
					if (new RegExp("^" + val[0] + "{11}$").exec(val.join("")))
						return false;
					for (var s = 10, n = 0, i = 0; s >= 2; n += val[i++] * s--);
					if (val[9] != (((n %= 11) < 2) ? 0 : 11 - n))
						return false;
					for (var s = 11, n = 0, i = 0; s >= 2; n += val[i++] * s--);
					if (val[10] != (((n %= 11) < 2) ? 0 : 11 - n))
						return false;
					return true;
				} else {
					return true;
				}
			},
			cpfText : 'CPF informado é inválido!',
			cpfMask : /[0-9\.\-]/i
		});

Ext.apply(Ext.form.VTypes, {
			cnpj : function(val, field) {
				if (val != '__.___.___/____-__') {
					exp = /\.|\-|\//g
					var val = val.toString().replace(exp, "");
					var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
					if ((val = val.replace(/[^\d]/g, "").split("")).length != 14)
						return false;
					for (var i = 0, n = 0; i < 12; n += val[i] * b[++i]);
					if (val[12] != (((n %= 11) < 2) ? 0 : 11 - n))
						return false;
					for (var i = 0, n = 0; i <= 12; n += val[i] * b[i++]);
					if (val[13] != (((n %= 11) < 2) ? 0 : 11 - n))
						return false;
					return true;
				} else {
					return true;
				}
			},
			cnpjText : 'CNPJ informado é inválido!',
			cnpjMask : /[0-9\.\-//]/i
		});

Ext.apply(Ext.util.Format, {
			formata_moeda : function(v) {
				v = String(v);
				if (v < 0) {
					v = Math.abs(v);
					v = String(v);
					var h = '-';
				} else {
					var h = '';
				}
				if (isNaN(v)) {
					v = '0';
				}
				var c = v.substr(v.length - 2, 2);
				v = v.substr(0, v.length - 2);
				v = Math.floor((v * 100 + 0.5) / 100).toString();
				if (c.length < 2) {
					c = '0' + c;
				}
				for (var i = 0; i < Math.floor((v.length - (1 + i)) / 3); i++) {
					v = v.substring(0, v.length - (4 * i + 3)) + '.'
							+ v.substring(v.length - (4 * i + 3));
				}
				var r = v + ',' + c;
				if (h) {
					r = h + r;
				}
				return r;
			}
		});

Ext.apply(Ext.form.VTypes, {
			numero : function(val, field) {
				var numero = /[0-9]/;
				return numero.test(val);
			},
			numeroText : 'O valor informado é inválido',
			numeroMask : /[0-9]/i
		});

Ext.apply(Ext.form.VTypes, {
			hora : function(val, field) {
				var hora = /^([0-1]\d|2[0-3]):[0-5]\d$/;
				return hora.test(val);
			},
			horaText : 'A hora informada é inválida',
			horaMask : /[0-9]/i
		});

Ext.apply(Ext.form.VTypes, {
	ip : function(val, field) {
		var ip = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		return ip.test(val);
	},
	ipText : 'O IP digitado é inválido',
	ipMask : /[0-9]/i
});
