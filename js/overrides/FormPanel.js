Ext.override(Ext.form.FormPanel, {
	vIconSpace: 20,
	colSpace: 5,
	labelWidth: 100,
	ajustFields:function(ff){
		Ext.each(ff.items, function(f, i){
			if((f)&&(f.items)){
				this.ajustFields(f);//MODIFICADO
			}
			
			var c1 = ff.items[i]; //Campo atual
			var c2 = ff.items[i-1]; //Campo anterior
			
			if(c1 && c1.col && c2){
				function confField(c){
					c.labelWidth = Ext.num(c.labelWidth, this.labelWidth); //Largura do Label
					c.vIconSpace = Ext.num(c.vIconSpace, this.vIconSpace); //Espaço após o campo
					c.colSpace   = Ext.num(c.colSpace,   this.colSpace); //Espaço antes do campo
					c.width      = Ext.num(c.width,      100); //Largura padrão MODIFICADO
					c.msgTarget  = c.msgTarget || this.msgTarget || Ext.form.Field.prototype.msgTarget;
					c.labelAlign = c.labelAlign || this.labelAlign;
				}
				
				function calcWidth(w){
					var x = w.width;
					x += (w.msgTarget == 'side' ? w.vIconSpace : 0);
					x += 5;
					x += (w.labelAlign == 'top' ? 0 : w.labelWidth);
					return x;
				}
				
				function createItem(field){
					return {
						width: calcWidth.createDelegate(this)(field),
						border: false,
						layout: 'form',
						labelWidth: field.labelWidth,
						items: field
					}
				}
				
				function addColum(c, field){
					c.items.push(createItem(field))
				}
				
				if(c2.layout!=='hbox'){
					confField.createDelegate(this)(c2);
					c2 = {
						xtype:'container',//MODIFICADO
						layout:'hbox',
						border:false,
						items:[createItem(c2)]
					}
				}
				confField.createDelegate(this)(c1);
				c2.items[c2.items.length-1].width += c1.colSpace;
				addColum(c2,c1);
				c1 = c2;
				c2 = null;
				
				ff.items[i-1] = c1;
				ff.items[i] = c2;
			}
			delete c1;
			delete c2;
		},this)
		if(Ext.isArray(ff.items)){
			ff.items = Ext.clean(ff.items)
		}
	},
	createForm:Ext.form.FormPanel.prototype.createForm.createInterceptor(function() {
		this.ajustFields(this);
	})
})