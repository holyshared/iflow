describe('iui.flow.View', function(){



it('', function(){

	iui.flow.registerComponent('foo', {
		onSetUp: function(){
		},
		onDestroy: function(){
		}
	});

	iui.flow.registerComponent('bar', {
		onSetUp: function(){
		},
		onDestroy: function(){
		}
	});

	waits(1000);


	runs(function(){

		var ele = document.getElementById('view');
		var view = new iui.flow.View();

		view.setElement(ele);

		var nodes = view.findAll('[data-flow-name]');
console.log(nodes);
		view.loadComponentByElements(nodes);
	
		var loadOfComponent1 = (view.foo instanceof iui.flow.Component);
		var loadOfComponent2 = (view.bar instanceof iui.flow.Component);

	});


//	view.setUp();














});




});