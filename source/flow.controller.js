(function(iui, flow){

flow.extend(flow, {

	_controllers: {},

	registerController: function(identifier, controller){
		var key = null,
			klass = null;

		klass = function(){
			flow.Controller.apply(this, arguments);
		};

		flow.mixin(klass, new flow.Controller());
		flow.mixin(klass, controller);

		this._controllers[identifier] = klass;
	},

	getController: function(identifier){
		if (this._controllers[identifier] === void 0 || this._controllers[identifier] === null){
			throw new Error(identifier + ' is not defined');
		}

		return this._controllers[identifier];
	},

	loadController: function(identifier){
		var controller = null,
			loadController = null;
	
		controller = this.getController(identifier);

		try {
			loadController = new controller();
		} catch(error){
			throw new Error(identifier + ' is not function');
		}

		return loadController;
	}

});


flow.Controller = function Controller(){
	this._identifier = null;
	this._view = null;
}

flow.mixin(flow.Controller, {

	setView: function(view){
		this._view = view;
		return this;
	},

	getView: function(){
		return this._view;
	},

	setIdentifier: function(identifier){
		this._identifier = identifier;
		return this;
	},

	getIdentifier: function(){
		return this._identifier;
	},

	moveTo: function(identifier){
		iui.showPageById(identifier);
	}

});


}(iui, iui.flow));
