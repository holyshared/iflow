(function(flow){

flow.mixin(flow.Application, {

	_controllers: {},

	registerController: function(identifier, controller){
		var key = null,
			klass = null;

		klass = function(){
			Controller.apply(this, arguments);
		};
//		controller.prototype = new Controller();

		flow.mixin(klass, new Controller());
		flow.mixin(klass, prototype);

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

Controller.prototype.setView = function(view){
	this._view = view;
	return this;
}

Controller.prototype.getView = function(){
	return this._view;
}

Controller.prototype.setIdentifier = function(identifier){
	this._identifier = identifier;
	return this;
}

Controller.prototype.getIdentifier = function(){
	return this._identifier;
}

Controller.prototype.moveTo = function(identifier){
	iui.showPage(identifier);
}

}(iui.flow));
