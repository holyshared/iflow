(function(flow){

flow.Dispatcher = function Dispatcher(){
}

flow.mixin(flow.Dispatcher, {

	_controllers: {},

	setRouter: function(router){

		router.setDispatcher(this);

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
			return;
		}

		return this._controllers[identifier];
	},

	dispatch: function(context){

		var view = null,
			controller = null,
			controllerName = null,
			actionName = null;

		controllerName = context.getControllerName();
		actionName = context.getActionName();

		controller = this.loadController(controllerName);

		if (controller === void 0 || controller === null){
			return;
		}

		view = controller.getView();

		if (view === void 0 || view === null){

			view = new flow.View( context.getElement() );
			view.setUp();

			controller.setView(view);
		}

		if (controller[actionName] === void 0 || controller[actionName] === null){
			return;
		}

		controller[actionName].apply(controller, [ context ])
	}

});

}(window.iui.flow));