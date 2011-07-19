Ext.ns("custo");

custo.FiltroCustoFormPanel = Ext.extend(form.FormularioBase, {
			frame : true,
			bodyStyle : 'background-color: #DFE8F6; padding: 10px',
			layout : 'form',
			labelWidth : 65,
			height : 130,
			initComponent : function() {
				Ext.applyIf(this, {
							tbar : this.buildTbar(),
							items : this.buildForm()
						});
				custo.FiltroCustoFormPanel.superclass.initComponent.call(this);
				this.getForm().findField('dtInicialMan').setValue(new Date().add(Date.MONTH, -1));
				this.getForm().findField('dtFinalMan').setValue(new Date());
				this.addEvents({
							pesquisar : true
						});
			},
			buildTbar : function() {
				return [{
							text : 'Pesquisar',
							iconCls : 'icone-lupa',
							scope : this,
							handler : this.onFind
						}, '-', {
							text : 'Limpar',
							iconCls : 'seta-voltar',
							scope : this,
							handler : this.onClear
						}];
			},
			buildForm : function() {
				return [{
							xtype : 'textfield',
							fieldLabel : 'Descri&ccedil;&atilde;o',
							name : 'descricaoGasto',
							width : 275
						}, new Ext.form.ComboBox({
									store : todasCategoriasStore,
									displayField : 'descCategoria',
									valueField : 'idCategoria',
									mode : 'local',
									hiddenName : 'idCategoriaGasto',
									valueField : 'idCategoria',
									forceSelection : true,
									triggerAction : 'all',
									fieldLabel : 'Categoria',
									name : 'idCategoriaGasto',
									allowBlank : true,
									emptyText : 'Selecione'
								}), {
							xtype : 'container',
							layout : 'hbox',
							items : [{
										xtype : 'container',
										layout : 'form',
										labelWidth : 65,
										items : [{
													xtype : 'datefield',
													fieldLabel : 'Data Inicial',
													name : 'dtInicialMan',
													id : 'dtInicialMan',
													itemId: 'dtInicialMan',
													dateFormat : 'd/m/Y',
													allowBlank : false
												}]
									}, {
										xtype : 'container',
										layout : 'form',
										labelWidth : 65,
										style : {
											marginLeft : '10px'
										},
										items : [{
													xtype : 'datefield',
													fieldLabel : 'Data Final',
													name : 'dtFinalMan',
													id : 'dtFinalMan',
													itemId: 'dtFinalMan',
													dateFormat : 'd/m/Y',
													allowBlank : false
												}]
									}]

						}];
			},
			onFind : function() {
				this.fireEvent('pesquisar', this);
			},
			onClear : function() {
				this.clearForm();
				this.getForm().findField('dtInicialMan').setValue(new Date()
						.add(Date.MONTH, -1));
				this.getForm().findField('dtFinalMan').setValue(new Date());
			}
		});

Ext.reg('filtroCustoFormPanel', custo.FiltroCustoFormPanel);
