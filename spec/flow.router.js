var dispatcher = {

	maps: {},

	dispatch: function(context){
		var controller = context.getControllerName();

		if (!this.maps[controller]){
			this.maps[controller] = [];
		}
		this.maps[controller].push(context);
	}

};

iui.flow.Router.setDispatcher(dispatcher);


describe('iui.flow.router', function(){

it('onload,onfocus', function(){

	var eventOrders = {

		home: [
			'onLoad',
			'onFocus',
			'onBlur',
			'onBeforeTransition',
			'onAfterTransition',
			'onLoad',
			'onFocus',
			'onBeforeTransition',
			'onAfterTransition'
		],

		next: [
			'onLoad',
			'onFocus',
			'onBeforeTransition',
			'onAfterTransition',
			'onBlur',
			'onBeforeTransition',
			'onAfterTransition',
			'onUnLoad'
		]
	};

	waits(300);

	runs(function(){
		iui.showPageById('next');
	});

	waits(1000);

	runs(function(){
		iui.showPageById('home');
	});

	waits(1000);

	runs(function(){

		for (var key in dispatcher.maps){

			items = dispatcher.maps[key];

			for (var i = 0; i < items.length; i++){
				expect( eventOrders[key][i] ).toEqual( items[i].getActionName() );
			}

		};
		
	});

});

});