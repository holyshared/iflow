describe('iui.flow.Component', function(){

	it('The interface which can add a component and can be acquired is offered.', function(){

		var setup = null,
			destroy = null;

		var component = {
			onSetUp: function(){
				setup = true;
			},
			onDestroy: function(){
				destroy = true;
			}
		};

		var registerComponent = null;

		iui.flow.registerComponent('foo', component);

		registerComponent = iui.flow.getComponent('foo');

		expect(registerComponent.prototype.onSetUp).toEqual(component.onSetUp);
		expect(registerComponent.prototype.onDestroy).toEqual(component.onDestroy);

		var loadComponent = new registerComponent();
		loadComponent.setUp();
		loadComponent.destroy();

		expect(setup).toEqual(true);
		expect(destroy).toEqual(true);

		var components = iui.flow.getComponents();

		expect(components.foo).toEqual(registerComponent);

	});


	it('A property can be operated through an interface.', function(){

		var registerComponent = iui.flow.getComponent('foo');
		var component = new registerComponent();

		component.setName('foo');

		expect(component.getName()).toEqual('foo');

	});

});