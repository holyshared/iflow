(function(flow){

flow.extend(flow, {

	_components: {},

	registerComponent: function(identifier, component){
		var key = null,
			klass = null;

		klass = function(){
			flow.Component.apply(this, arguments);
		};

		flow.mixin(klass, new flow.Component());
		flow.mixin(klass, component);

		this._components[identifier] = klass;
	},

	getComponent: function(identifier){
		return this._components[identifier];
	},

	getComponents: function(){
		return this._components;
	}

});


flow.Component = function Component(element){
	this.setElement(element);
}

flow.mixin(flow.Component, flow.Element);
flow.mixin(flow.Component, {

	setName: function(value){
		this._name = value;
		return this;
	},

	getName: function(){
		return this._name;
	},

	setUp: function(){
		if (this.onSetUp === void 0 || this.onSetUp === null){
			return;
		}
		this.onSetUp();
	},

	destroy: function(){
		if (this.onDestroy === void 0 || this.onDestroy === null){
			return;
		}
		this.onDestroy();
	}

});

}(iui.flow));