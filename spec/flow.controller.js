describe('iui.flow.Controller', function(){

	it('register', function(){

		var cotroller = {
			onLoad: function(){
			},
			onUnLoad: function(){
			}
		};

		iui.flow.registerController('foo', cotroller);

		var registerController = iui.flow.getController('foo');

		expect(registerController.prototype.onLoad).toEqual(cotroller.onLoad);
		expect(registerController.prototype.onUnLoad).toEqual(cotroller.onUnLoad);


		var loadController = iui.flow.loadController('foo');
		var registerLoadController = new registerController();

		expect(loadController.prototype).toEqual(registerLoadController.prototype);

	});


	it('setter/getter', function(){

		var view = {};
		var returnValue = null;
		var controller = new iui.flow.Controller();

		expect(controller.getView()).toEqual(void 0);
		expect(controller.getIdentifier()).toEqual(void 0);

		returnValue = controller.setView(view);
		expect(returnValue).toEqual(controller);
		expect(controller.getView()).toEqual(view);

		returnValue = controller.setIdentifier('foo');
		expect(returnValue).toEqual(controller);
		expect(controller.getIdentifier()).toEqual('foo');

	});

	it('moveTo', function(){

		var dispatcher = {
		
			actions: [],
		
			dispatch: function(context){
				var controller = context.getControllerName();
		
				if (controller !== 'third'){
					return;
				}
				this.actions.push(context);
			}
		
		};

		runs(function(){

			iui.flow.Router.setDispatcher(dispatcher);

			var controller = new iui.flow.Controller();
			controller.moveTo('third');

		});

		waits(300);

		runs(function(){

			var actions = ['onLoad', 'onFocus', 'onBeforeTransition', 'onAfterTransition'];

			for (var i = 0; i < dispatcher.actions.length; i++){
				expect( actions[i] ).toEqual( dispatcher.actions[i].getActionName() );
			}

		});
	
	});

});