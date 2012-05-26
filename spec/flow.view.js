describe('iui.flow.View', function(){

	var componentContext = {
		setuped: false,
		destroyed: false,
		onSetUp: function(){
			this.setuped = true;
		},
		onDestroy: function(){
			this.destroyed = true;
		}
	};

	iui.flow.registerComponent('cp1', componentContext);
	iui.flow.registerComponent('cp2', componentContext);

	it('register component', function(){

		waits(1000);

		runs(function(){

			var ele = document.getElementById('view');
			var view = new iui.flow.View();
	
			view.setElement(ele);
	
			var nodes = view.findAll('[data-flow-name]');
	
			view.loadComponentByElements(nodes);
	
			var loadComponent1 = iui.flow.getComponent('cp1');
			var loadComponent2 = iui.flow.getComponent('cp2');
		
			var loadOfComponent1 = (view.foo instanceof loadComponent1);
			var loadOfComponent2 = (view.bar instanceof loadComponent2);
	
			expect(loadOfComponent1).toEqual(true);
			expect(loadOfComponent2).toEqual(true);

		});

	});

	it('', function(){

		waits(1000);

		var ele = document.getElementById('view');
		var view = new iui.flow.View();

		view.setElement(ele);
		view.setUp();
		view.destroy();

		var loadComponent1 = iui.flow.getComponent('cp1');
		var loadComponent2 = iui.flow.getComponent('cp2');
	
		var loadOfComponent1 = (view.foo instanceof loadComponent1);
		var loadOfComponent2 = (view.bar instanceof loadComponent2);

		expect(loadOfComponent1).toEqual(true);
		expect(loadOfComponent2).toEqual(true);

		expect(view.foo.setuped).toEqual(true);
		expect(view.foo.destroyed).toEqual(true);
				
		expect(view.bar.setuped).toEqual(true);
		expect(view.bar.destroyed).toEqual(true);

	});

});