(function(win, doc, flow) {

var Observer = null,
	Router = null,
	notifyActions = {};

notifyActions = {
	'load': 'onLoad',
	'unload': 'onUnLoad',
	'focus': 'onFocus',
	'blur': 'onBlur',
	'beforeinsert': 'onBeforeInsert',
	'afterinsert': 'onAfterInsert',
	'beforetransition': 'onBeforeTransition',
	'aftertransition': 'onAfterTransition'
};

addEventListener("DOMContentLoaded", function(evt){

	var i = null,
		elements = null;

	doc.body.addEventListener('afterinsert', Observer.register, false);

	elements = doc.querySelectorAll("body > *:not(.toolbar)");

	for (i = 0; i < elements.length; i++){
		Router.register( elements[i] );
	}

}, false);


flow.router = function(){
	return flow.Router;
}

Observer = flow.Observer = {

	handleEvent: function(evt){

		var context = null,
			controller = null,
			element = null,
			action = null;

		element = this;
		controller = element.getAttribute('id');
		action = notifyActions[evt.type];

		context = {
			getElement: function(){
				return element;
			},
			getActionName: function(){
				return action;
			},
			getControllerName: function(){
				return controller;
			}
		};

		Router.delegate(context);
	},

	//afterInsert
	register: function(evt){
		if (evt.insertedNode === void 0 || evt.insertedNode === null){
			return;
		}

		evt.insertedNode.unloadMe = true;

		Router.register(evt.insertedNode);

		evt.insertedNode.addEventListener('unload', this.unregister, false);
	},

	unregister: function(evt){
		var element = evt.target;
		if (element.unloadMe){
			element.parentNode.removeChild(element);
		}
	}

};


Router = flow.Router = {

	register: function(element){
		var key = null,
			action = null,
			notifyAction = null;

		for (key in notifyActions){
			element.addEventListener(key, Observer.handleEvent, false);
		}

	},

	setDispatcher: function(dispatcher){
		this._dispatcher = dispatcher;
		return this;
	},

	getDispatcher: function(){
		return this._dispatcher;
	},

	delegate: function(context){
		var dispatcher = null;

		dispatcher = this.getDispatcher();
		dispatcher.dispatch(context);
	}

};

}(window, document, window.iui.flow));