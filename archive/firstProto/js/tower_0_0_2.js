// TOWER 3D - Author: Andrew V Butt Sr. Pryme8@gmail.com 2016
Array.prototype.last = function() {
    return this[this.length-1];
}
Array.prototype.removeItem = function(index){
return this.splice( index, 1 );	
}

TOWER = function(){
	this._buildEditor();
	this._init();	
	this._bindings();
}

TOWER.prototype._buildEditor = function(){
	var parent = this;
	this.DOM = {};
	this.DOM.Master = $('tower');
	this.DOM.canvas = $(TOWER.ELEMENTS.Editor.canvas);
	this.DOM.Master.append(this.DOM.canvas);
	this._openWindow(TOWER.ELEMENTS.Editor.Windows.Menus.top);
	this._openWindow(TOWER.ELEMENTS.Editor.Windows.toolbar);
	this.DOM.startPage = $(TOWER.ELEMENTS.Pages.Home);
	this.DOM.Master.append(this.DOM.startPage);
	//this._gitData();
}

TOWER.prototype._init = function(){
	var parent = this;	
	this.widgets = {
		horizon : null,
		globalAxis : null,
		grid : null,
	};
	this._canvas = document.getElementById('renderCanvas');
	this._engine = new BABYLON.Engine(this._canvas, true); 
	this.editorLights = [];
	this._scene = this._createScene();
	this._activeCamera = this._scene.activeCamera;
	this.project = null;

	this._engine.runRenderLoop(function() {
    	parent._scene.render();
	});

	$(window).bind('resize', function() {
    	parent._engine.resize();
	});
};

TOWER.prototype._createScene = function(){
	var scene = new BABYLON.Scene(this._engine);
	var camera = new BABYLON.FreeCamera('3d_Camera', new BABYLON.Vector3(0, 20, 3), scene);
	camera.maxZ = 100000;
	camera.minZ = 0.001;
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(this._canvas, false);
	scene.activeCamera = camera;
    this.editorLights.push(new BABYLON.HemisphericLight('defaultLight', new BABYLON.Vector3(-0.5,1,0.2), scene));
    return scene;	
};



TOWER.prototype._bindings = function(){
var parent = this;
$('tower').bind('click', function(e){
	var target = $(e.target);
	//console.log(target);
    if(target.attr('act') && target.not('.disabled')){
		switch(target.attr('act')){
			case "toggle-open":
				target.parent().toggleClass('open');
			break;
			
			case "project-new":
			if(parent.DOM.startPage){
				parent._clearPages();
			}
			parent._openWindow(TOWER.ELEMENTS.Editor.Windows.Project.create, true);	
			break;
			case "project-create-new":
				console.log("create_new_project");
				new TOWER.PROJECT(parent);	
			break;	
			
			case "window-close":
				target.parent().remove();
			break;
			case "window-controls-close":
				target.parent().parent().remove();
			break;
		}
		
		
		
	}
});


/*		$('tower').bind('click', function(e){
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
							parent.data.selectedObject.data.bObject.showBoundingBox = toggleCheck;
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
		TOWER.TOOLS.setCurrentTool($(e.target), parent);
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
	});*/
	
	
}//End Bindings


TOWER.prototype._gitData = function(){
	$.ajax({url:"https://api.github.com/repos/Pryme8/TOWER/commits",
     dataType: 'jsonp', 
	 cache : true,
     success:function(data){
        //Just incase they create a poject before it loads...
		if($('tab#commit-log').length){
			$('tab#commit-log loading').remove();
			$.each(data.data, function(i,e){
				var newCommit = $(TOWER.ELEMENTS.commitBlock);
					$('tab#commit-log > div').append(newCommit);
					newCommit.find('#author-name').html("<a href='"+e.commit.author.email+"' >"+e.author.login+"</a>");
					newCommit.find('#author-picture').html("<img src='"+e.author.avatar_url+"' />");
					var message = e.commit.message;
					var match = match = /(?:\[title=")+(.){0,}\b(\"])/.exec(message);
					if(match){
						console.log(match);	
					}else{
						newCommit.find('#detail-title').html("<a href='"+e.html_url+"'>No Title</a>");	
						newCommit.find('#detail-body').text(e.commit.message);	
					}
					newCommit.find('#detail-date').text(e.commit.author.date);	
			});
		}
		
     },
     error:function(data){
         console.log(data);
     }      
	});
}

TOWER.prototype._openWindow = function(target, solo, pos){
	pos = pos || "append";
	var newWindow  = $(target);
	if(solo && this.DOM.Master.find('win#'+newWindow.attr('id')).length){
		return		
	}
	
	if(pos == "append"){
	this.DOM.Master.append(newWindow);
	}
	
};

TOWER.prototype._clearPages = function (){
	if($('tower .gridBg')){
		$('tower .gridBg').remove();	
	}
	this.DOM.startPage.remove();
	this.DOM.startPage = null;	
}

TOWER.prototype._updateDisabled = function(){
	var parent = this;
	this.DOM.Master.find('[req]').each(function(i,e){
	var reqs = $(e).attr('req').split(';');
	var toggle = false;
		$.each(reqs,function(j,r){
			if(eval(r)){
				toggle = true;
			}
		});
		if(toggle){
			if($(e).is('.disabled')){
			$(e).removeClass('disabled');
			}
		}else{
			if($(e).not('.disabled')){
			$(e).addClass('disabled');
			}
		}
	
	});	
}
