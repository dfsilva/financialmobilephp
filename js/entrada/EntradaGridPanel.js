Ext.ns('entrada');

entrada.EntradaGridPanel = Ext.extend(Ext.grid.GridPanel, {
			url : 'in/centrada/getEntradas',
			viewConfig : {
				forceFit : true
			},
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : true
					}),
			columns : [{
						header : 'C&oacute;digo',
						dataIndex : 'idEntrada',
						sortable : true
					}, {
						header : 'Descri&ccedil;&atilde;o',
						dataIndex : 'descricao',
						sortable : true
					}, {
						header : 'Data da Entrada',
						dataIndex : 'dataEntrada',
						renderer : Ext.util.Format.dateRenderer('d/m/Y'),
						sortable : true
					}, {
						header : 'Valor',
						dataIndex : 'valorEntrada',
						renderer : 'brMoney',
						sortable : true
					}],

			initComponent : function() {
				this.store = this.buildStore();
				entrada.EntradaGridPanel.superclass.initComponent.call(this);
			},

			buildStore : function() {
				return {
					xtype : 'jsonstore',
					autoLoad : true,
					root : 'entradas',
					proxy : new Ext.data.HttpProxy({
								method : 'POST',
								scope : this,
								prettyUrls : false,
								url : this.url
							}),
					fields : ['idEntrada', 'descricao', {
								name : 'dataEntrada',
								type : 'date',
								dateFormat : 'd/m/Y'
							}, {
								name : 'valorEntrada',
								type : 'float'
							}],
					sortInfo : {
						field : 'idEntrada',
						dir : 'ASC'
					}
				};
			},

			add : function(rec) {
				var store = this.store;
				var sortInfo = store.sortInfo;

				if (Ext.isArray(rec)) {
					Ext.each(rec, function(rObj, ind) {
								if (!(rObj instanceof Ext.data.Record)) {
									rec[ind] = new this.store.recordType(rObj);
								}
							});
				} else if (Ext.isObject(rec)
						&& !(rec instanceof Ext.data.Record)) {
					rec = new this.store.recordType(rec);
				}

				store.add(rec);
				store.sort(sortInfo.field, sortInfo.direction);
			},

			loadData : function(d) {
				return this.store.loadData(d);
			},

			load : function(o) {
				return this.store.load(o);
			},

			removeAll : function() {
				return this.store.removeAll();
			},

			remove : function(r) {
				return this.store.remove(r);
			},

			getSelected : function() {
				return this.selModel.getSelections()[0];
			},

			createAndSelectRecord : function(o) {
				var record = new this.store.recordType(o);
				this.store.addSorted(record);
				var index = this.store.indexOf(record);
				this.getSelectionModel().selectRow(index);
				return record;
			}
		});

Ext.reg('entradaGridPanel', entrada.EntradaGridPanel)