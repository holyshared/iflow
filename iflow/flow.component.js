(function(flow){

flow.mixin(flow.Application, {

	_components: {},

	registerComponent: function(identifier, component){
		var key = null,
			klass = null;

		klass = function(){
			Component.apply(this, arguments);
		};

		flow.mixin(klass, new Component());
		flow.mixin(klass, component);

//		component.prototype = new Component();

//		for (key in prototype){
//			component.prototype[key] = prototype[key];
//		}

		this._components[identifier] = klass;
	},

	getComponent: function(identifier){
		return this._components[identifier];
	},

	getComponents: function(){
		return this._components;
	}

});



flow.Component = function Component(){
}

flow.mixin(Component, flow.Element);

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

}(iui.flow));