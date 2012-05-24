(function(){

var flow = {};

if ('iui' in window){
	throw new Error('iui not loaded');
}

flow = iui.flow = {

	application: function(){
		return new　Application();
	},

	mixin: function(klass, extend){
		this.extend(klass.prototype, extend);
	},

	extend: function(original, extend){
		var key = null;
		for (key in extend){
			original[key] = extend[key];
		}
	},

	viewsNotifyActions = {
		'onload': 'onLoad',
		'onunload': 'onUnLoad',
		'onfocus': 'onFocus',
		'onblur': 'onBlur',
		'beforeinsert': 'onBeforeInsert',
		'afterinsert': 'onAfterInsert',
		'onbeforetransition': 'onBeforeTransition',
		'onaftertransition': 'onAfterTransition'
	}

};

flow.Application = function Application(){
}

flow.Element = {

	setElement: function(element){
		this._element = element;
		return this;
	},

	getElement: function(){
		return this._element;
	}

};

}());
