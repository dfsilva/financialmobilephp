Ext.ns("custo");

custo.CustoFormPanel = Ext.extend(form.FormularioBase, {
	initComponent : function() {
		Ext.apply(this, {
			id : 'formCustos',
			itemId : 'formCustos',
			frame : true,
			labelAlign : 'right',
			labelWidth : 120,
			width : 340,
			layout : 'form',
			items : [ new Ext.form.FieldSet({
				title : 'Informacoes Principais',
				autoHeight : true,
				defaultType : 'textfield',
				ref : 'fieldSetInfo',
				items : [ {
					fieldLabel : 'Descri&ccedil;&atilde;o',
					name : 'descricaoGasto',
					id : 'descricaoGasto',
					ref: 'descricaoGasto',
					width : 200,
					allowBlank : false
				}, new Ext.form.ComboBox({
					store : todasCategoriasStore,
					displayField : 'descCategoria',
					valueField : 'idCategoria',
					mode : 'local',
					hiddenName : 'idCategoriaGasto',
					valueField : 'idCategoria',
					forceSelection : false,
					triggerAction : 'all',
					fieldLabel : 'Categoria',
					name : 'idCategoriaGasto',
					allowBlank : false,
					emptyText : 'Selecione'
				}), new Ext.form.DateField({
					fieldLabel : 'Vencimento',
					name : 'dataVencimento',
					id : 'dataVencimento',
					ref : 'dataVencimento',
					width : 100,
					allowBlank : false
				}), {
					xtype : 'moneyfield',
					fieldLabel : 'Valor',
					id : 'valorParcela',
					name : 'valorParcela',
					width : 80,
					readOnly : true,
					allowBlank : false
				} ]
			}), new Ext.form.FieldSet({
				title : 'Lan&ccedil;amento parcelado?',
				defaultType : 'textfield',
				checkboxName : 'lancamentoParcelado',
				checkboxToggle : true,
				collapsed : true,
				ref : 'fieldSetParcelas',
				listeners : {
					scope : this,
					collapse : this.onCollapse,
					expand : this.onExpand
				},
				items : [ new Ext.form.ComboBox({
					fieldLabel : 'Quantidade Parcelas',
					store : storeNumParcelas,
					displayField : 'parcela',
					valueField : 'parcela',
					mode : 'local',
					triggerAction : 'all',
					hiddenName : 'qtdParcelas',
					valueField : 'parcela',
					forceSelection : true,
					name : 'qtdParcelas',
					value : 12,
					width : 50
				}), new Ext.form.ComboBox({
					fieldLabel : 'Tipo Repeti&ccedil;&atilde;o',
					store : storeRepeticaoParcela,
					displayField : 'desc',
					valueField : 'id',
					mode : 'local',
					triggerAction : 'all',
					hiddenName : 'tipoRepeticao',
					valueField : 'id',
					forceSelection : true,
					name : 'tipoRepeticao',
					allowBlank : false,
					value : 3,
					width : 100
				}) ]
			}) ]
		});
		custo.CustoFormPanel.superclass.initComponent.call(this);
		this.configuraValoresDefaults();
		this.addEvents({
			onParcelasCheck : true,
			onParcelasUnCheck : true
		});
	},

	configuraValoresDefaults : function() {
		this.fieldSetInfo.dataVencimento.setValue(new Date());
		this.fieldSetInfo.descricaoGasto.focus(false,1000);
	},

	onCollapse : function() {
		this.fireEvent('onParcelasUnCheck', this);
	},

	onExpand : function() {
		this.fireEvent('onParcelasCheck', this);
	}	
});

Ext.reg('custoFormPanel', custo.CustoFormPanel);