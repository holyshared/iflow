(function(iui, flow){

var router = null,
	delegator = {};
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

router = flow.Router = {

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


function delegate(evt){

	var context = null,
		__controller__ = null,
		__element__ = null,
		__action__ = null;

	__element__ = this;
	__controller__ = element.getAttribute('id');
	__action__ = notifyActions[evt.type];

	context = {
		getElement: function(){
			return __element__;
		},
		getActionName: function(){
			return __action__;
		}
		getControllerName: function(){
			return __controller__;
		}
	};

	router.delegate(context);

}

for (var key in notifyActions){
	delegator[key] = delegate;
}

//TODO iui.views.global -> iui.flow.Router
iui.views.global = delegator;

}(window.iui, window.iui.flow));