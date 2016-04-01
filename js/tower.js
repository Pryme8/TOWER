// TOWER 3D - Author: Andrew V Butt Sr. Pryme8@gmail.com 2016
TOWER = function(){
	this.CORE = {
		engine : null,
		scenes : [],
		objects : [],	
		};
	this.DOM = {};
	this._init();	
}

TOWER.prototype._init = function(){
	this.DOM.Master = $('tower');
	this.DOM.canvas = $(TOWER.ELEMENTS.canvas);
	this.DOM.Master.append(this.DOM.canvas);
	

}

TOWER.ELEMENTS = {
	canvas : '<canvas id="renderCanvas"></canvas>',
};