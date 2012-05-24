(function(win, doc, flow) {

var Observer = null,
	Router = null,
	notifyActions = {};

notifyActions = {
	'onload': 'onLoad',
	'onunload': 'onUnLoad',
	'onfocus': 'onFocus',
	'onblur': 'onBlur',
	'beforeinsert': 'onBeforeInsert',
	'afterinsert': 'onAfterInsert',
	'onbeforetransition': 'onBeforeTransition',
	'onaftertransition': 'onAfterTransition'
};

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
			}
			getControllerName: function(){
				return controller;
			}
		};

		Router.delegate(context);
	},

	register: function(evt){
		if (evt.insertedNode === void 0 || evt.insertedNode === null){
			return;
		}
		Router.register(evt.insertedNode);
	}

};


Router = flow.Router = {

	register: function(element){
		var key = 0,
			action = null,
			notifyAction = null;

		doc.body.addEventListener('afterinsert', Observer.register, false);

		for (key in notifyActions){
			element.addEventListener(key, Delegator.handleEvent, false);
		}
	},

	setDispatcher: function(dispatcher){
		this._dispatcher = dispatcher;
		return this;
	},

	getDispatcher: function(){
		return this.dispatcher;
	},

	delegate: function(context){
		var dispatcher = null;

		dispatcher = this.getDispatcher();
		dispatcher.dispatch(context);
	}

};

}(window, document, window.iui.flow));