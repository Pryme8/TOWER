// TOWER 3D - Author: Andrew V Butt Sr. Pryme8@gmail.com 2016
TOWER = function(){
	this.data = {
	activeTool : null,
	lastTool : null,
	project : null,
	tempObject : null,
	selectedObject : null,
	saveTrigger : false,
	activeWidgets : [],
	};
	this.CORE = {
		engine : null,
		scene : null,
		defaultLights : [],
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
	camera.minZ = 0.001;
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);
	scene.activeCamera = camera;
    parent.CORE.defaultLights.push(new BABYLON.HemisphericLight('defaultLight', new BABYLON.Vector3(-0.5,1,0.2), scene));
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
	this.DOM.browser = $(TOWER.ELEMENTS.browser);
	this.DOM.Master.append(this.DOM.browser);
	
	
	
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
			//console.log(e.target);
			var target = $(e.target);
				if(target.is('toggle')){
					if(!target.attr('set')){
						target.toggleClass('active');
							if(target.attr('id')=='default-light-toggle'){
								var toggleCheck = target.is('.active');
								$.each(parent.CORE.defaultLights, function(i, e){
									e.setEnabled(toggleCheck); 	
								});	
							}
							if(target.attr('id')=='selected-bounding-box'){
							var toggleCheck = target.is('.active');
							
							parent.data.selectedObject.obj.showBoundingBox = toggleCheck;
							}
					}else{
						$('[set="'+target.attr('set')+'"]').removeClass('active');
						target.addClass('active');
					}
				}
				if(target.is('action')){
					if(target.attr('act')=='close-pane'){
						target.parent().remove();	
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
	
	$('icon').bind('click',function(e){
		if(parent.data.project){
		parent._toolClick($(e.target));	
		}
	});
	
	//MENU
	$('.menu-item').bind('click',function(e){
		var target = $(e.target);
			switch(target.attr('act')){
				case "New-Project":
					if(!parent.data.project){
					new TOWER.PROJECT(null,parent);
					}else{
						
					}
				break;
				case "Scene-Properties":
					if(!parent.data.project){
					
					}else{
						if($('select#mode').val()== "Scene"){
						parent._createPane(TOWER.PANES.PROPERTIES.SCENE, {width : '450px', height: '280px'}, {moveto : 'absCenter'}, this);
						var domObj = $('#Edit-Scene-Properties');
						domObj.find('#scene-name').val(parent.data.tempObject.name);
						domObj.find('#scene-description').text(parent.data.tempObject.description);
						domObj.find('action[act="update-scene-properties"]').bind('click', function(e){
								parent.data.tempObject.name = domObj.find('#scene-name').val();
								parent.data.tempObject.description = domObj.find('#scene-description').text();
								parent.data.saveTrigger = true;
								parent.DOM.mainMenu.find('select#currentObject option[value="'+parent.data.tempObject.id+'"]').text(parent.data.tempObject.name);
								parent.DOM.browser.find('#Information').find('span#information-selected-object-name').text(parent.data.tempObject.name);
								parent.DOM.browser.find('#Object-List').find('item[name="'+parent.data.project.activeScene.name+'"][id="'+parent.data.project.activeScene.id+'"]').
								find('span#name').text(parent.data.tempObject.name);
								parent.DOM.browser.find('#Object-List').find('item[name="'+parent.data.project.activeScene.name+'"][id="'+parent.data.project.activeScene.id+'"]').
								find('span#id').text(parent.data.tempObject.id);
								parent.data.project.activeScene.id = parent.data.tempObject.id;
								parent.data.project.activeScene.name = parent.data.tempObject.name;
								parent.data.project.activeScene.description = parent.data.tempObject.description;	
								
								domObj.remove();
								
						});
						}
					}
				break;
			}
	});
	
	
}//End Bindings

/*TOOL CLICKS*/
TOWER.prototype._toolClick =  function(target){
	var parent = this;
	if(target.attr('type')=="transform"){
		this.data.lastTool = this.data.activeTool;	
		this.data.activeTool = target.attr('id');		
	}
	if(target.attr('type')=="create"){
		switch(target.attr('id')){
			case 'create-primitive':
				this._createPane(TOWER.PANES.CREATE.PRIMITIVE, {width : '300px', height: '120px'}, {moveto : 'absCenter'}, this);
				$('pane#Create-Primitive-Solid action[act="create-primitive-accept"]').bind('click', function(e){
					var pane = $('pane#Create-Primitive-Solid');
					parent.data.project.objects.push(new TOWER.OBJECT(pane.find('#primitive-name').val(), TOWER.OBJECT.TYPES.STANDARD, parent))	;
					var newObject = parent.data.project.objects[parent.data.project.objects.length-1];
						newObject.id = parent.data.project.objects.length-1;
						newObject.bObject = TOWER.TOOLS.CREATE.Primitive[pane.find('#primitive-type').val()]._create({},parent.CORE.scene);
						pane.remove();
						var parentItem = parent.DOM.browser.find('#Object-List').find('item.selected');
						var newItem = parent._createNewItem();
						if(parentItem.attr('type')=="scene"){
		 					parent.data.project.activeScene.objects.push(newObject);
							newItem.domObj = $(newItem.domObj);
							parentItem.append(newItem.domObj);	
						}
				if(parent.data.selectedObject.type == "Object"){
						parent.data.selectedObject.obj.renderingGroupId = 1;
				}
						
				parent.data.selectedObject.type = "Object";
				parent.data.selectedObject.name = newObject.name;
				parent.data.selectedObject.obj = newObject.bObject;
				parent.data.selectedObject.obj.renderingGroupId = 2;
				newItem.obj = newObject.bObject;
				newItem.domObj.attr('name', newObject.name);
				newItem.domObj.attr('id',  newObject.id);
				newItem.domObj.attr('type',  newObject.typeName);
				newItem.domObj.find('#name').text( newObject.name);
				newItem.domObj.find('#type').addClass(newObject.typeName);
				newItem.domObj.find('#id').text(newObject.id);
				parent.DOM.browser.find('#Object-List item').removeClass('selected');		
				newItem.domObj.addClass('selected');
				
				if($('toggle#selected-bounding-box').is('.active')){
				newItem.obj.showBoundingBox = true;
				}
				
				parent._updateSelectedObject();
				});
			break;
		}
		
	}
};

//Select Object in Object list, or In Browser, on while in select mode, or by dropdown
TOWER.prototype._selectObject = function(target){

}

//Target is the parent that you will be inserting the object to in the Object list, if it is not a scene then parent the object to the selected object
TOWER.prototype._createNewItem = function(){
	return $.extend(true, {}, TOWER.ITEM);	
}


/*EDITOR BUILDING*/
TOWER.prototype._buildEditor = function(){
	console.log("Building Editor!");
	this._buildAllWidgets();
	this.CORE.scene.activeCamera.position = new BABYLON.Vector3(15,35,-50);
	this.CORE.scene.activeCamera.setTarget(BABYLON.Vector3.Zero());
	this._updateCurrentObjectSelect();
	this._updateSelectedObject();
	var parent = this;
	
};

TOWER.prototype._buildAllWidgets = function(){
		this.data.activeWidgets.push(new TOWER.WIDGETS.horizon(this.CORE.scene)); //Leave scene register because there is a possibilty of it moving! but prehaps change the structure...
		this.data.activeWidgets.push(new TOWER.WIDGETS.grid(this.CORE.scene)); //Take the scene register off of this widget and replace with a binded trigger to toggle it...
		this.data.activeWidgets.push(new TOWER.WIDGETS.worldAxis(this.CORE.scene)); //Take the scene register off of this widget and replace with a binded trigger to toggle it...
};

TOWER.prototype._updateCurrentObjectSelect = function(){
	var parent = this;
	var domObj = this.DOM.mainMenu.find('select#currentObject');
	var newList = "";
	
	var mode = this.DOM.mainMenu.find('select#mode').val();
	var activeObj = null;
	
	if(mode == "Scene"){
	$.each(parent.data.project.scenes, function(i,e){
		if(e.name == parent.data.tempObject.name){activeObj = parent.data.tempObject.id};
		newList += "<option value='"+i+"'>"+e.name+"</option>";
	});
	}
	
	domObj.html(newList);
	domObj.val(activeObj);
	
};


TOWER.prototype._updateSelectedObject = function(target){
	if(!target){
		$('browser tab#Information #information-selected-object-name').text(this.data.selectedObject.name);	
	}
	
}



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
			$('action[act="create-project-go"]').bind('click', function(e){
				parent._master.project = parent;
				parent.name = $('pane#Create-New-Project input#project-name').val();
				parent.description = $('pane#Create-New-Project input#project-description').text();
				parent.timestamps = {
					createdOn : new Date(),
					lastModified : new Date(),
				};
				$(this).parent().remove();
				parent._master.data.project = parent;
				parent.scenes.push($.extend(true, {}, TOWER.SCENE));
				parent.scenes[0].name = "New Scene";
				parent.scenes[0].id = 0;
				parent.scenes[0].description = "First Scene of a New Project!";
				parent.activeScene = parent.scenes[0];
				parent.startScene = parent.scenes[0];
				parent._master.data.tempObject = $.extend(true, {}, parent.scenes[0]);
				var tempItem = $(TOWER.ITEM.domObj);
				$('browser tab#Object-List content').append(tempItem);
				parent._master.data.selectedObject = parent._master._createNewItem();
				parent._master.data.selectedObject.type = "scene";
				parent._master.data.selectedObject.name = "New Scene";
				parent._master.data.selectedObject.domObj = tempItem;
				parent._master.data.selectedObject.obj = parent.scenes[0];
				tempItem.attr('name','New Scene');
				tempItem.attr('id', 0);
				tempItem.attr('type', 'scene')
				tempItem.find('#name').text('New Scene');
				tempItem.find('#type').addClass('scene');
				tempItem.find('#id').text(0);		
				tempItem.addClass('selected');		
				
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




/*OBJECT PRESETS*/
TOWER.SCENE = {
	name : null,
	id : null,
	description: null,
	objects : [],
	materials : []	
}



TOWER.ITEM = {
	name : null,
	type : null,
	id : null,
	domObj : "<item name='' type='' id=''><span id='type'></span> - <span id='name'></span>:<span id='id'></span></item>",
	obj : null
};




