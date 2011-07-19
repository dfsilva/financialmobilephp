Ext.ns("usuario");

usuario.UsuarioManagerPanel = Ext.extend(Ext.Panel, {
			border : false,
			closable : true,
			id : 'pnlManterUsuario',
			title : 'Manter Usu&aacute;rio',
			initComponent : function() {
				this.items = [this.buildUsuarioForm()];
				usuario.UsuarioManagerPanel.superclass.initComponent.call(this);
			},

			buildUsuarioForm : function() {
				return new usuario.UsuarioFormPanel({
							border : false,
							record : new Ext.data.Record({
										idUsuario : idUsrLgd
									})
						});
			}

		});
Ext.reg('usuarioManagerPanel', usuario.UsuarioManagerPanel);