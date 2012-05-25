(function(flow){

flow.View = function View(element){
	this.setElement(element);
}

flow.mixin(flow.View, flow.Element);
flow.mixin(flow.View, {

	_components: {},

	setUp: function(){

		var elements = null;

		elements = this.findAll('[data-flow-name=*]');

		if (elements === null){
			return this;
		}

		this.loadComponentsByElements(elements);

	},

	loadComponentsByElements: function(elements){

		var i = 0,
			role = null,
			element = null,
			elements = null;

		for (; element = elements[i], i++){
			this.loadComponentByElement(element);
		}

	},

	loadComponentByElement: function(element){

		var name = null,
			role = null
			loaded = null,
			component = null;

		name = element.getAttribute('data-flow-name');
		role = element.getAttribute('data-flow-role');

		component = flow.getComponent(role);

		loaded = new component();
		loaded.setName( name );
		loaded.setElement( element );
		loaded.setUp();

		this[name] = this._components[name] = loaded;

	},

	destroy: function(){
		var key = null,
			component = null;

		for (key in this._components){
			component = this._components[key];
			component.destroy();
		}

		this._components = {};
	}

});

}(iui.flow));