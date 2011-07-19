/**
 * Tutorial ensinando a carregar código javascript dinamicamente.
 * Desenvolvido por Bruno Tavares 
 * Publicado em http://www.extdesenv.com.br
 */

/**
 * Carrega módulos dinamicamente
 * 
 * @param {String/Array}
 *            modules (required)
 * @param {Function}
 *            callback
 * @param {Object}
 *            scope
 */
Ext.require = function() {
	var modulesLoaded = {};

	/**
	 * @private Cria tags script e monitora callback
	 * @param {String}
	 *            src (required)
	 * @param {Function}
	 *            callback
	 * @param {Object}
	 *            scope
	 */
	var createScriptTag = function(module, callback, scope) {
		// tira extensão
		module = module.replace(/\.js/gi, "");

		// não carrega 2 vezes
		if (modulesLoaded[module]) {
			callback.call(scope, module);
			return;
		}
		modulesLoaded[module] = true;

		// cria tag e atributos
		var script = document.createElement("script")
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', Ext.require.moduleUrl + module + '.js');

		// configura callback
		if (callback) {
			if (script.readyState) // IE
			{
				script.onreadystatechange = function() {
					if (/loaded|complete|4/i.test(script.readyState + "")) {
						callback.call(scope, module);
						script.onreadystatechange = callback = scope = null;
					}
				};
			} else {
				script.onload = function() {
					callback.call(scope, module);
					script.onload = callback = scope = null;
				};
			}
		}

		// append
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	/**
	 * @private Class that manages async load of multiple modules
	 * @param {Array}
	 *            modules
	 * @param {Function}
	 *            callback
	 * @param {Object}
	 *            scope
	 */
	var asyncProcess = function(modules, callback, scope) {
		this.totalToLoad = modules.length;
		this.totalLoaded = 0;
		this.finalCallback = callback || Ext.emptyFn;
		this.callbackScope = scope;

		for ( var i = 0; i < modules.length; i++) {
			createScriptTag(modules[i], this.moduleCallback, this);
		}
	}

	Ext.apply(asyncProcess.prototype, {

		totalToLoad : 0,
		totalLoaded : 0,
		finalCallback : Ext.emptyFn,
		callbackScope : undefined

		,
		moduleCallback : function(module) {
			this.totalLoaded++;

			if (window[module] && window[module].prototype && window[module].prototype.$depends) {
				var dependents = [].concat(window[module].prototype.$depends);

				// remove dos dependentes os já carregados
				for ( var i = dependents.length - 1; i != -1; i--) {
					if (modulesLoaded[dependents[i]] == true)
						dependents.pop();
				}

				// se existe ainda dependentes para carregar
				if (dependents.length) {
					this.totalToLoad++;
					Ext.require(window[module].prototype.$depends, this.moduleCallback, this);
				}
			}

			if (this.totalLoaded == this.totalToLoad) {
				this.finalCallback.call(this.callbackScope);

				// destroy
				for (k in this)
					this[k] = null;
			}
		}
	});

	/*
	 * public function
	 */
	return function(modules, callback, scope) {
		if (!Ext.isArray(modules))
			modules = [ modules ];

		new asyncProcess(modules, callback, scope)
	}
}();

/**
 * @property {String} Indicates where to get the scripts from
 * @static
 */
Ext.require.moduleUrl = 'scripts/';