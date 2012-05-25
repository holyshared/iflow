(function(flow){

flow.Dispatcher = function Dispatcher(){



}


flow.mixin(flow.Dispatcher, {

	_controllers: {},

	setRouter: function(router){
		this._router = router;
		return this;
	},

	getRouter: function(){
		return this._router;
	},

	register: function(identifier, controller){

		if (controller.setIdentifier === void 0 || controller.setIdentifier === null){
			throw new TypeError('invalid controller');
		};

		controller.setIdentifier(identifier);

		this._controllers[identifier] = controller;
	},

	loadController: function(identifier){
		if (this._controllers[identifier] === undefined || this._controllers[identifier] === null){
			throw new TypeError('invalid controller');
		}

		return this._controllers[identifier];
	},

	dispatch: function(context){

		var controller = null;
		var controllerName = context.getControllerName();
		var actionName = context.getActionName();

		controller = this.loadController(controllerName);

		var view = controller.getView();

		if (view === void 0 || view === null){

			view = new flow.View( context.getElement() );
			view.setUp();

			controller.setView(view);
		}

		controller[actionName].apply(controller, [ context ])
	}

});


}(window.iui.flow));