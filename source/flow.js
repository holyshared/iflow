(function(iui){

var flow = {};

if (iui === void 0 || iui === null){
	throw new Error('iui not loaded');
}

flow = iui.flow = {

	application: function(){
		return new Application();
	},

	mixin: function(klass, extend){
		this.extend(klass.prototype, extend);
	},

	extend: function(original, extend){
		var key = null;
		for (key in extend){
			original[key] = extend[key];
		}
	}

};

flow.Application = function Application(){
}

flow.mixin(Application, {


});

flow.Element = {

	setElement: function(element){
		this._element = element;
		return this;
	},

	getElement: function(){
		return this._element;
	},

	findAll: function(selector){
		var element = null,
			returnValue = null;

		element = this.getElement();
		returnValue = element.querySelectorAll(selector);

		return (returnValue.length > 0) ? returnValue : null;
	},

	find: function(selector){
		var element = null,
			returnValue = null;

		element = this.getElement();
		returnValue = element.querySelector(selector);

		return (returnValue) ? returnValue : null;
	}

};

}(window.iui));
