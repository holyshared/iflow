(function(flow){


(function(views){

	var key = null,
		view = null;

	view = {};

	function include(view, key, action){
		view[ key ] = function(evt){
			var identifier = null
				controller = null;

			identifier = this.getAttribute('id');

			controller = Application.loadController(identifier);
			if (controller === void 0 || controller === null){
				return;
			}

			if (view[ action ] !== void 0 && view[ action ] !== null){
				view[ action ](this, controller);
			}

			if (controller[action] === void 0 || controller[action] === null){
				return;
			}

			controller[action].apply(controller, [ evt ]);
		}
	}

	for (key in flow.viewsNotifyActions){
		include(view, key, flow.viewsNotifyActions[key]);
	}

	view.onLoad = function(element, controller){
		var view = new View(element);
		var components = flow.getComponents();
		for (var key in components){
			view.loadComponent(key, components[key]);
		}
		controller.setView(view);
	}

	views.global = view;

}(window.iui.views));









flow.View = function View(element){
	this.setElement(element);
}

flow.mixin(flow.View, flow.Element);
flow.mixin(flow.View, {

	loadComponent: function(identifier){

		var elements = null,
			viewElement = null
			component = null,
			loadComponent = null;

		viewElement = this.getElement();

		component = iFlow.getComponent(identifier);

		elements = viewElement.querySelectorAll('[data-iflow-role="' + identifier + '"]');

		for (var i = 0; i < elements.length; i++){
			var name = elements[i].getAttribute('data-iflow-name');

			loadComponent = new component();
			loadComponent.setElement( elements[i] );
			loadComponent.setup();

			this[name] = loadComponent;
		}
	}

});


}(iui.flow));