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
	this.DOM.logoBig.fadeIn(1800, function(){});
	this.DOM.mainMenu = $(TOWER.ELEMENTS.mainMenu);
	this.DOM.Master.append(this.DOM.mainMenu);
	this.DOM.toolBar = $(TOWER.ELEMENTS.toolBar);
	this.DOM.Master.append(this.DOM.toolBar);
	
	
	this.DOM.logoBig.animate({
    opacity: 0.5,
    left: "0.5em",
	top: "0.5em",
	width: "64px",
	height: "64px",
  }, 3200, function() {
    // Animation complete.
  });
}

TOWER.ELEMENTS = {
	canvas : '<canvas id="renderCanvas"></canvas>',
	logoBig : '<logo class="big" />',
	mainMenu : '<main><span class="menu-top-item">Project<span class="menu-sub"><span class="menu-item">New Project</span></span></span></main>',
	toolBar : '<tools></tools>',
};

