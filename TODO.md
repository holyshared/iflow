flow.Dispatcher = {

	dispatch: function(identifier, action, args){
		var controller = this.loadController(identifier);
		controller[action].apply(contoller, args);
	}

};


flow.Dispatcher = function Dispatcher(){

	window.iui.views.global = {
		onLoad: function(evt){

		},
		onUnLoad: function(){

		}
	};

}


flow.Dispatcher.prototype.addController = function(identifier, controller){

	this._controllers[identifier] = controller;

	return this;
}


flow.Dispatcher.prototype.run = function(){

	var viewDelegator = {};

	viewDelegator.setDisptacher(this);


}


flow.Delegator = {

	setDispatcher: function(dispatcher){
		this._dispatcher = dispatcher;
		return this;
	},

	getDispatcher: function(){
		return this._dispatcher;
	},

	handleEvent: function(evt){
		var dispatcher = null,
			identifier = null;

		identifier = this.getAttribute('id');

		dispatcher = this.getDispatcher();
		dispatcher.disptach(identifier, evt.type, [ evt ]);
	}

};

window.iui.views.global = flow.Delegator;






flow.dispatch('next', 'load', [ evt ]);


var app = flow.application();
app.registerController();
app.registerController();


app.add('home', flow.loadController());
app.add('home', flow.loadController());

app.run();



Application.prototype.run = function(){


//	this.dispatcher = new iui.flow.Diapatcher();

	this.dispatcher.run();


}