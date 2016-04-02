// TOWER 3D - Author: Andrew V Butt Sr. Pryme8@gmail.com 2016
TOWER = function(){
	this.data = {
	activeTool : null,
	lastTool : null,
	};
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

parent.CORE.scene = createScene();

parent.CORE.engine.runRenderLoop(function() {
    parent.CORE.scene.render();
});

$(window).bind('resize', function() {
    parent.CORE.engine.resize();
});
	
this._start();
	
}

TOWER.prototype._start = function(){
	var parent = this;
	this.DOM.logoBig = $(TOWER.ELEMENTS.logoBig);
	this.DOM.Master.append(this.DOM.logoBig);
	this.DOM.logoBig.fadeIn(1400, function(){
	});
	this.DOM.mainMenu = $(TOWER.ELEMENTS.mainMenu);
	this.DOM.Master.append(this.DOM.mainMenu);
	this.DOM.secondBar = $(TOWER.ELEMENTS.secondBar);
	this.DOM.Master.append(this.DOM.secondBar);
	this.DOM.toolBar = $(TOWER.ELEMENTS.toolBar);
	this.DOM.Master.append(this.DOM.toolBar);
	
	
	
	this.DOM.logoBig.animate({
    left: "40px",
	top: "40px",
	width: "64px",
	height: "64px",
  	}, 3200, function() {
    // Animation complete.
  	});
	parent._bindings();
}

TOWER.prototype._bindings = function(){
var parent = this;
$('icon').bind('mouseover',function(e){
	$('tower second tooltip').text($(e.target).attr('id'));
});
$('icon').bind('mouseout',function(e){
	if(parent.data.activeTool){
	$('tower second tooltip').text(parent.data.activeTool);
	}else{
	$('tower second tooltip').text("");	
	}
});
	
}

TOWER.ELEMENTS = {
	canvas : '<canvas id="renderCanvas"></canvas>',
	logoBig : '<logo class="big" />',
	mainMenu : 
	'<main>'+
		'<span class="menu-top-item">Project'+
			'<span class="menu-sub">'+
				'<span class="menu-item">New Project</span>'+
				'<span class="menu-item">Open Project</span>'+
				'<hr/>'+
				'<span class="menu-item">New Scene</span>'+
				'<span class="menu-item">Open Scene</span>'+
				'<span class="menu-item">New Object</span>'+
				'<span class="menu-item">Open Object</span>'+
			'</span>'+
		'</span>'+
		'<span class="menu-top-item">Edit'+
			'<span class="menu-sub">'+
				'<span class="menu-item">Project Properties</span>'+
				'<span class="menu-item">Scene Properties</span>'+
				'<span class="menu-item">Object Properties</span>'+
			'</span>'+
		'</span>'+
		'<span class="menu-top-item">Assets'+
			'<span class="menu-sub">'+
				'<span class="menu-item">Browse</span>'+
				'<span class="menu-item">Import</span>'+
			'</span>'+
		'</span>'+
		'<span class="menu-top-item">Windows'+
			'<span class="menu-sub">'+
				'<span class="menu-item">Tools</span>'+
				'<span class="menu-item">Browser</span>'+
			'</span>'+
		'</span>'+
		'<span class="menu-top-item">Help'+
			'<span class="menu-sub">'+
				'<span class="menu-item">Documentation</span>'+
				'<span class="menu-item">About</span>'+
			'</span>'+			
		'</span>'+
		'<select id="mode" value="Scene">'+
		'<option>Scene</option>'+
		'<option>Modeler</option>'+
		'<option>Scripter</option>'+
		'<option>Painter</option>'+
		'</select>'+
	'</main>',
	secondBar : 
		'<second>'+
		'<tooltip></tooltip>'+
		'</second>',
	toolBar :
	'<tools>'+
		'<tool class="type">'+
			'<icon class="material-icons md-48 active" id="select">near_me</icon>'+
			'<icon class="material-icons md-48" id="move">open_with</icon>'+
			'<icon class="material-icons md-48" id="scale">search</icon>'+
			'<icon class="material-icons md-48" id="rotate">replay</icon>'+
		'</tool>'+
		'<tool class="type">'+
			'<icon class="material-icons md-48 active" id="create-primitive">control_point</icon>'+
			'<icon class="material-icons md-48" id="create-platonic">control_point_duplicate</icon>'+
		'</tool>'+
		'<tool class="type">'+
			'<icon class="material-icons md-48 active" id="create-light">lightbulb_outline</icon>'+
			'<icon class="material-icons md-48" id="create-camera">photo_camera</icon>'+
		'</tool>'+
	'</tools>',
	
	popups : {
		about : "<pane id='about'></pane>"
	},
};

TOWER.TOOLS = {};
TOWER.TOOLS.CREATE = {
	Platonic :{
		
	},
	Primitive :{
		Cube : {
			_create : function(args, scene){
				this.name = args.name || 'Cube';
				this.width = args.width || 10;
				this.height = args.height || 10;
				this.depth = args.height || 10;
				return BABYLON.MeshBuilder.CreateBox(this.name, {width: this.width, height: this.height, depth:this.depth}, scene);						
			}
		}
	}
};

