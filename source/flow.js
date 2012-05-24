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

flow.Element = {

	setElement: function(element){
		this._element = element;
		return this;
	},

	getElement: function(){
		return this._element;
	}

};

}(window.iui));
