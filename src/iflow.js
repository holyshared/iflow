(function(){

var iFlow = null,
	Application = null,
	viewsNotifyActions = null;

viewsNotifyActions = {
	'onload': 'onLoad',
	'onunload': 'onUnLoad',
	'onfocus': 'onFocus',
	'onblur': 'onBlur',
	'beforeinsert': 'onBeforeInsert',
	'afterinsert': 'onAfterInsert',
	'onbeforetransition': 'onBeforeTransition',
	'onaftertransition': 'onAfterTransition'
};

function mixin(original, extend){
	var key = null;
	for (key in extend){
		original[key] = extend[key];
	}
}

Application = {

	_controllers: {},

	register: function(identifier, controller){
		controller.setIdentifier(identifier);

		this._controllers[identifier] = controller;
	},

	loadController: function(identifier){
		return this._controllers[identifier];
	}

};

var Element = {

	setElement: function(element){
		this._element = element;
		return this;
	},

	getElement: function(){
		return this._element;
	}

};



iFlow = {

	application: function(){
		return Application;
	}

};



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

	for (key in viewsNotifyActions){
		include(view, key, viewsNotifyActions[key]);
	}

	view.onLoad = function(element, controller){
		var view = new View(element);
		var components = iFlow.getComponents();
		for (var key in components){
			view.loadComponent(key, components[key]);
		}
		controller.setView(view);
	}

	views.global = view;

}(window.iui.views));







var View = (function(){

	function View(element){
		this.setElement(element);
	}

	mixin(View.prototype, Element);
	mixin(View.prototype, {

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

	return View;

}());


var Component = (function(){

	function Component(){
	}

	mixin(Component.prototype, Element);

	Component.prototype.setName = function(value){
		this._name = value;
		return this;
	}

	Component.prototype.getName = function(){
		return this._name;
	}

	Component.prototype.setup = function(){
		this.onSetup();
	}

	Component.prototype.destroy = function(){
		this.onDestroy();
	}

	return Component;

}());


mixin(iFlow, {

	_components: {},

	registerComponent: function(identifier, prototype){
		var key = null,
			component = null;

		component = function(){
			Component.apply(this, arguments);
		};
		component.prototype = new Component();

		for (key in prototype){
			component.prototype[key] = prototype[key];
		}

		this._components[identifier] = component;
	},

	getComponent: function(identifier){
		return this._components[identifier];
	},

	getComponents: function(){
		return this._components;
	}

});



var Controller = (function(){

	function Controller(){
		this._identifier = null;
		this._view = null;
	}

	Controller.prototype.setIdentifier = function(identifier){
		this._identifier = identifier;
		return this;
	}

	Controller.prototype.getIdentifier = function(){
		return this._identifier;
	}

	Controller.prototype.setView = function(view){
		this._view = view;
		return this;
	}

	Controller.prototype.getView = function(){
		return this._view;
	}

	Controller.prototype.moveTo = function(key){
		iui.showPage(key);
	}

	return Controller;

}());


mixin(iFlow, {

	_controllers: {},

	registerController: function(identifier, prototype){

		var key = null,
			controller = null;

		controller = function(){
			Controller.apply(this, arguments);
		};
		controller.prototype = new Controller();

		for (key in prototype){
			controller.prototype[key] = prototype[key];
		}
		this._controllers[identifier] = controller;
	},

	getController: function(identifier){
		return this._controllers[identifier];
	},

	loadController: function(identifier){
		var controller = this.getController(identifier);
		return new controller();
	}

});

window.iFlow = iFlow;

}());
