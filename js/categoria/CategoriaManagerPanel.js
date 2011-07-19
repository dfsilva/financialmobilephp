Ext.ns("categoria");

categoria.CategoriaManagerPanel = Ext.extend(Ext.Panel, {
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			border : false,
			closable : true,
			id : 'pnlManterCategoria',
			title : 'Manter Categorias',
			msgs : {
				saving : 'Salvando categoria {0}...',
				saveSuccess : 'Registro {0} salvo com sucesso!',
				catSaveSuccess : 'Categoria {0} salva com sucesso!',
				erroSavingCategory : 'Ocorreu um erro ao salvar a categoria, try again !',
				confirmDelCategory : 'Confirma a <span style="color: red;"> exclus&atilde;o permanente</span> da categoria {0}?',
				deletingCategory : 'Excluindo categoria {0}...',
				deleteCatSuccess : 'Categoria {0} excluida com sucesso!',
				deleteCatFailure : 'Ocorreu o seguinte erro ao excluir a categoria {0}. <p><span style="color: red;">{1}</span><\p>'
			},
			initComponent : function() {
				this.items = [this.buildCategoryForm(),
						this.buildListCategory()];

				categoria.CategoriaManagerPanel.superclass.initComponent.call(this);
			},

			buildListCategory : function() {
				return {
					xtype : 'categoriaGridPanel',
					itemId : 'categoriaGridPanel',
					flex : 1,
					border : false,
					style : 'border-right: 1px solid #99BBE8;',
					title : 'Categorias',
					listeners : {
						scope : this,
						click : this.onClickTableCategory
					}
				};
			},

			buildCategoryForm : function() {
				return {
					xtype : 'categoriaFormPanel',
					itemId : 'categoriaFormPanel',
					border : false,
					listeners : {
						scope : this,
						novaCategoria : this.onNewCategory,
						deletarCategoria : this.onDeleteCategory,
						salvarCategoria : this.onSaveCategory
					}
				};
			},
			onClickTableCategory : function() {
				var record = this.getComponent('categoriaGridPanel').getSelected();
				if(record){
					this.getComponent('categoriaFormPanel').setValues(record.data);
				}
			},

			onNewCategory : function(selectedDepartment) {
				this.getComponent('categoriaGridPanel').getSelectionModel().clearSelections();
			},

			onDeleteCategory : function(formPanel, vals) {
		        var msg = String.format(this.msgs.confirmDelCategory, vals.descCategoria);
		        Ext.MessageBox.confirm(
		            'Exclus&atilde;o de Categoria!',
		            msg,
		            this.onConfirmDeleteCategory,
		            this
		        );
			},
		   onConfirmDeleteCategory : function(btn) {
		        if (btn === 'yes') {
		            var vals = this.getComponent('categoriaFormPanel').getValues();
		
		            var msg = String.format(
		                this.msgs.deletingCategory,
		                vals.descCategoria
		            );
		
		            Ext.getBody().mask(msg, 'x-mask-loading');
		
		            Ext.Ajax.request({
		                url          : 'in/ccategoria/excluir',
		                scope        : this,
		                callback     : onAfterAjaxReq,
		                succCallback : this.onAfterDeleteCategory,
		                params       : {
		                    idCategoria : vals.idCategoria
		                }
		            });
		        }
		    },
		    onAfterDeleteCategory : function(jsonData) {
		        var msg,
		           selectedEmployee = this.getComponent('categoriaGridPanel').getSelected();
		        if (jsonData.success === true) {
		
		            msg = String.format(
		                this.msgs.deleteCatSuccess,
		                selectedEmployee.get('descCategoria')
		            );
		
		            exibeInforme(msg);
		
		            selectedEmployee.store.remove(selectedEmployee);
		            this.getComponent('categoriaFormPanel').clearForm();
		        }
		        else {
		            msg = String.format(
		                this.msgs.deleteCatFailure,
		                selectedEmployee.get('descCategoria'),
		                jsonData.msg
		            );
		            exibeErro(msg);
		        }
		        this.clearMask();
		    },
			onSaveCategory : function(categoriaFormPanel, vals) {
				if (categoriaFormPanel.getForm().isValid()) {
					var msg = String.format(this.msgs.saving,
							vals.descCategoria);
					Ext.getBody().mask(msg, 'x-mask-loading');
					categoriaFormPanel.getForm().submit({
								url : 'in/ccategoria/cadastrar',
								scope : this,
								success : this.onCatSaveSuccess,
								failure : this.onCatSaveFailure
							});
				} else {
					exibeErro(this.msgs.errorsInForm);
				}
			},
			onCatSaveSuccess : function(form, action) {

				var record = this.getComponent('categoriaGridPanel').getSelected();
				var vals = form.getValues();

				var msg = String.format(this.msgs.catSaveSuccess,
						vals.descCategoria);

				if (record) {
					record.set('idCategoria', action.result.idCategoria);
					record.set('descCategoria', vals.descCategoria);
					record.set('descCompletaCategoria', vals.descCompletaCategoria);
					record.commit();
				} else {
					var resultData ={idCategoria : action.result.idCategoria,
						             descCategoria : vals.descCategoria,
						             descCompletaCategoria : vals.descCompletaCategoria};
					this.getComponent('categoriaGridPanel').createAndSelectRecord(resultData);
					this.getComponent('categoriaFormPanel').setValues(resultData);
				}
				exibeInforme(msg);
				this.clearMask();
			},
			onCatSaveFailure : function() {
				this.clearMask();
				exibeErro(this.msgs.erroSavingCategory);

			},
			clearMask : function() {
				Ext.getBody().unmask();
			}
		});

Ext.reg('categoriaManagerPanel', categoria.CategoriaManagerPanel);