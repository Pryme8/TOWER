// TOWER 3D - Author: Andrew V Butt Sr. Pryme8@gmail.com 2016
TOWER = function(){
	this.CORE = {
		engine : null,
		scene : null,
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
	
	var canvas = document.getElementById('renderCanvas');
	this.CORE.engine = new BABYLON.Engine(canvas, true);
	var parent = this;
	
var createScene = function() {
    var scene = new BABYLON.Scene(parent.CORE.engine);
    var camera = new BABYLON.FreeCamera('3d_Camera', new BABYLON.Vector3(0, 5,-10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
	scene.activeCamera = camera;
    var defaultLight = new BABYLON.HemisphericLight('defaultLight', new BABYLON.Vector3(-0.5,1,0.2), scene);
    return scene;
}

var scene = createScene();

parent.CORE.engine.runRenderLoop(function() {
    scene.render();
});

$(window).bind('resize', function() {
    parent.CORE.engine.resize();
});
	
this._start();
	
}

TOWER.prototype._start = function(){
	this.DOM.logoBig = $(TOWER.ELEMENTS.logoBig);
	this.DOM.Master.append(this.DOM.logoBig);
	this.DOM.logoBig.fadeIn(600, function(){});
}

TOWER.ELEMENTS = {
	canvas : '<canvas id="renderCanvas"></canvas>',
	logoBig : '<logo class="big" />'
};

