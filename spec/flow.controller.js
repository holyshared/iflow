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

		var nextController = {},
			thirdController = {};

		function context(actions){
			var i = 0,
				action = null,
				context = { pass: {} };

			for (; action = actions[i]; i++){
				context.pass[action] = false;
				context[action] = callback(action);
			}

			return context;
		}

		function callback(action){
			return function(){
				this.pass[action] = true;
			}
		}

		var nextControllerContext = context(['onLoad', 'onFocus', 'onBlur', 'onBeforeTransition', 'onAfterTransition']);
		var thirdControllerContext = context(['onLoad', 'onFocus', 'onUnLoad', 'onBlur', 'onBeforeTransition', 'onAfterTransition']);

		iui.flow.registerController('next', nextControllerContext);
		iui.flow.registerController('third', thirdControllerContext);

		nextController = iui.flow.loadController('next');
		thirdController = iui.flow.loadController('third');

		var dispatcher = {
			dispatch: function(context){
				var controller = context.getControllerName();
				var action = context.getActionName();

				if (controller === 'third'){
					thirdController[action].apply(thirdController, [ context ]); 
				}

				if (controller === 'next'){
					nextController[action].apply(nextController, [ context ]); 
				}

			}
		
		};

		runs(function(){

			iui.flow.Router.setDispatcher(dispatcher);

			var controller = new iui.flow.Controller();
			controller.moveTo('next');

		});

		waits(300);

		runs(function(){

			var controller = new iui.flow.Controller();
			controller.moveTo('third');

		});

		waits(300);


		runs(function(){

			var controller = new iui.flow.Controller();
			controller.moveTo('next');

		});

		waits(300);


		runs(function(){

			var thirdPass = thirdController.pass; 
			for (var key in thirdPass){
				expect(thirdPass[key]).toEqual(true);
			}

			var nextPass = nextController.pass; 
			for (var key in nextPass){
				expect(nextPass[key]).toEqual(true);
			}

		});

	});

});