describe('iui.flow', function(){

	it('extend', function(){

		var original = {};

		var mixin = {
			_name: 'foo',
			getName: function(){
				return this._name;
			}
		};

		iui.flow.extend(original, mixin);

		expect(original._name).toEqual(mixin._name);
		expect(original.getName()).toEqual(mixin.getName());

	});

	it('mixin', function(){

		function Original(){
		}

		var mixin = {
			_name: 'foo',
			getName: function(){
				return this._name;
			}
		};

		iui.flow.mixin(Original, mixin);

		expect(Original.prototype._name).toEqual(mixin._name);
		expect(Original.prototype.getName()).toEqual(mixin.getName());

	});

});