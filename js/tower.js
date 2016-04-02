// TOWER 3D - Author: Andrew V Butt Sr. Pryme8@gmail.com 2016
TOWER = function(){
	this.data = {
	activeTool : null,
	lastTool : null,
	project : null,
	activeWidgets : [],
	};
	this.CORE = {
		engine : null,
		scene : null
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
    var camera = new BABYLON.FreeCamera('3d_Camera', new BABYLON.Vector3(0, 20, 3), scene);
	camera.maxZ = 100000;
	camera.minZ = 0.000001;
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
		$('tower').bind('click', function(e){
			console.log(e.target);
			var target = $(e.target);
				if(target.is('toggle')){
					if(!target.attr('set')){
						target.toggleClass('active');	
					}else{
						$('[set="'+target.attr('set')+'"]').removeClass('active');
						target.addClass('active');
					}
				}
		});

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
	
	//MENU
	$('.menu-item').bind('click',function(e){
		var target = $(e.target);
			switch(target.attr('act')){
				case "New-Project":
					parent.data.project = new TOWER.PROJECT(null,parent);
				break;
			}
	});
	
	
}//End Bindings


TOWER.prototype._buildEditor = function(){
	console.log("Building Editor!");
	this._buildAllWidgets();
	//this.CORE.scene.activeCamera.position = new BABYLON.Vector3(15,-35,-60);
};

TOWER.prototype._buildAllWidgets = function(){
		this.data.activeWidgets.push(new TOWER.WIDGETS.horizon(this.CORE.scene));
		this.data.activeWidgets.push(new TOWER.WIDGETS.grid(this.CORE.scene));
		this.data.activeWidgets.push(new TOWER.WIDGETS.worldAxis(this.CORE.scene));
};




TOWER.ELEMENTS = {
	canvas : '<canvas id="renderCanvas"></canvas>',
	logoBig : '<logo class="big" />',
	mainMenu : 
	'<main>'+
		'<span class="menu-top-item">Project'+
			'<span class="menu-sub">'+
				'<span class="menu-item" act="New-Project">New Project</span>'+
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
		'<views>'+
			'<span class="menu-top-item">Views'+
			'<span class="menu-sub">'+
					'<span class="menu-item hasSub">Single'+
					'<span class="menu-sub">'+
						'<span class="menu-item"><toggle class="active" set="camera">3D Free</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">3D Point Orbit</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">3D Fixed Orbit</toggle></span>'+
					'</span>'+
					'</span>'+
				
					'<span class="menu-item hasSub">Split'+
					'<span class="menu-sub">'+
						'<span class="menu-item"><toggle set="camera">Top/Right</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Top/Left</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Bottom/Right</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Bottom/Left</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Front/Right</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Front/Left</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Back/Right</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Back/Left</toggle></span>'+
					'</span>'+
					'</span>'+
					'<span class="menu-item"><toggle set="views">4 Split</toggle></span>'+
			'</span>'+
			'</span>'+
			
			'<span class="menu-top-item">Display'+
			'<span class="menu-sub">'+
					'<span class="menu-item hasSub" id="widgets" >Widgets'+
					'<span class="menu-sub">'+
						'<span class="menu-item"><toggle class="active" id="horizon-toggle">horizon</toggle></span>'+
						'<span class="menu-item"><toggle class="active" id="grid-toggle">grid</toggle></span>'+
						'<span class="menu-item"><toggle class="active" id="world-axis-toggle">world-axis</toggle></span>'+

					'</span>'+
					'</span>'+
			'</span>'+
			'</span>'+
			
		'</views>'+
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


//PROJECT OBJECT
TOWER.PROJECT = function(location, master){
	this._master = master;
	this._location = location || null;
	this.scenes = []; //Project Scenes
	this.objects = []; //Project Objects
	this.materials = []; //Project Materials
	this.activeScene = null; //Scene currently being edited.
	this.startScene = null; //Initial Scene when a Project Loads
	
	if(this._location){
		//LOAD
	}else{
		//NEW
	this._createNew();
	}
}

TOWER.PROJECT.prototype._createNew = function(){
			var parent = this;
			this._master._createPane(TOWER.PANES.PROJECT.NEW, {width : '450px', height: '280px'}, {moveto : 'absCenter'}, this);			
			$('pane#Create-New-Project').bind('click', function(e){
				parent.name = $('pane#Create-New-Project input#project-name').val();
				parent.description = $('pane#Create-New-Project input#project-description').val();
				parent.timestamps = {
					createdOn : new Date(),
					lastModified : new Date(),
				};
				this.remove();
				parent._master.data.project = parent;
				parent.scenes.push($.extend(true, {}, TOWER.SCENE));
				parent.activeScene = parent.scenes[0];
				parent.startScene = parent.scenes[0];
				parent._master._buildEditor();
			});
}


//POP UP AND PANES

TOWER.prototype._createPane = function(target, css, args, master){
	var newPane = $(target);
	$('tower').append(newPane);
	newPane.css(css);
	if(args.moveto){
		switch(args.moveto){
			case 'absCenter':
			newPane.css({'left':(($(window).width()*0.5)- (newPane.width()*0.5)),'top':(($('tower').height()*0.5)- (newPane.height()*0.5))})
			break;	
		}
	}
}

TOWER.PANES = {
	PROJECT :{
		NEW :
		'<pane id="Create-New-Project">'+
		'Name :<input id="project-name" type="text" value="New Project"/> <BR />'+
		'Description :<textarea id="project-description" value="A New TOWER3D Project!" cols="40" rows="4" /> <BR />'+
		'<action act="create-project-go">Create Project</action>'+
		'</pane>',
	},
};


/*OBJECT PRESETS*/
TOWER.SCENE = {
	name : null,
	objects : [],
	materials : []	
}


//Widgets
TOWER.WIDGETS = {
		horizon : function(scene){
			console.log("Horizon Widget Built");
			this.origin = scene.activeCamera.position;
			this.id = "horizon";
			this.origin.y = 0;
			this.points = [
			new BABYLON.Vector3(this.origin.x-1000, 0 , this.origin.z+1000),
			new BABYLON.Vector3(this.origin.x+1000, 0 , this.origin.z+1000),
			new BABYLON.Vector3(this.origin.x+1000, 0 , this.origin.z-1000),
			new BABYLON.Vector3(this.origin.x-1000, 0 , this.origin.z-1000),
			new BABYLON.Vector3(this.origin.x-1000, 0 , this.origin.z+1000),
			];
			this.lines = BABYLON.Mesh.CreateLines("horizon", this.points, scene);
			this.lines.color = new BABYLON.Color3(0.35,0.35,0.35);
			this.lines.alpha = 0.6;
			
			this.visible = true;
			
			var parent = this;
			scene.registerBeforeRender(function(){
				if($('tower second #horizon-toggle').is('.active')){
					if(!parent.visible){
					parent.lines.visibility = true;
					parent.lines.position.x = scene.activeCamera.position.x;
					parent.lines.position.z = scene.activeCamera.position.z;	
					}
					parent.visible = true;
				}else{
					if(parent.visible){
					parent.lines.visibility = false;
					}
					parent.visible = false;
				}
				
			});
			
		},
		grid : function(scene){
			console.log("Grid Widget Built");
			this.id = "grid";
			this.grid = BABYLON.MeshBuilder.CreateGround("grid", {width: 100, height:100, subdivsions: 4}, scene);
			this.grid.material = new BABYLON.GridMaterial("gridMat", scene);
			this.grid.material.majorUnitFrequency = 5;
			this.grid.material.minorUnitVisibility = 0.45;
			this.grid.material.gridRatio = 2;
			this.grid.material.backFaceCulling = false;
			this.grid.material.mainColor = new BABYLON.Color3(0.6, 0.6, 0.6);
			this.grid.material.lineColor = new BABYLON.Color3(0.4, 0.4, 0.4);
			this.grid.material.opacity = 0.6;
			
			this.visible = true;
			
			var parent = this;
			scene.registerBeforeRender(function(){
				if($('tower second toggle#grid-toggle').is('.active')){
					if(!parent.visible){
					parent.grid.visibility = true;	
					}
					parent.visible = true;
				}else{
					if(parent.visible){
					parent.grid.visibility = false;
					}
					parent.visible = false;
				}
				
			});
			
		},
		worldAxis : function(scene){
			console.log("world-axis Widget Built");
			this.id = "world-axis";
			this.poles = {
				X : BABYLON.Mesh.CreateLines("X-Pole", [new BABYLON.Vector3(0,0,0),new BABYLON.Vector3(10,0,0)], scene),
				Y : BABYLON.Mesh.CreateLines("Y-Pole", [new BABYLON.Vector3(0,0,0),new BABYLON.Vector3(0,10,0)], scene),
				Z : BABYLON.Mesh.CreateLines("Z-Pole", [new BABYLON.Vector3(0,0,0),new BABYLON.Vector3(0,0,10)], scene)
			}
			
			this.poles.X.color = new BABYLON.Color3(1,0,0);
			this.poles.Y.color = new BABYLON.Color3(0,1,0);
			this.poles.Z.color = new BABYLON.Color3(0,0,1);
			
			this.visible = true;
			
			
			var parent = this;
			scene.registerBeforeRender(function(){
				if($('tower second toggle#world-axis-toggle').is('.active')){
						if(!parent.visible){	
							parent.poles.X.visibility = true;
							parent.poles.Y.visibility = true;
							parent.poles.Z.visibility = true;
						}
						parent.visible = true;
										
				}else{
					if(parent.visible){	
							parent.poles.X.visibility = false;
							parent.poles.Y.visibility = false;
							parent.poles.Z.visibility = false;
						}
					parent.visible = false;
				}
				
			});
		}
}




