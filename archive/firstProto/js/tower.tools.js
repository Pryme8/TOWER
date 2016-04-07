// TOOLS
TOWER.TOOLS = {};
TOWER.TOOLS.CREATE = {
	Platonic :{
		
	},
	Primitive :{
		Box : {
			_create : function(args, scene){
				this.name = args.name || 'Box';
				this.width = args.width || 10;
				this.height = args.height || 10;
				this.depth = args.height || 10;
				return BABYLON.MeshBuilder.CreateBox(this.name, {width: this.width, height: this.height, depth:this.depth}, scene);						
			}
		}
	}
};

TOWER.TOOLS.setCurrentTool = function(target, master){
	
	
	if(target.attr('type')=="transform" && master.data.selectedObject.type != 'scene'){
		master.data.lastTool = master.data.activeTool;	
		master.data.activeTool = target.attr('id');
			if(master.data.activeTool=="move"){
				$('tower').css('cursor','move');
			}
			if(master.data.activeTool=="select"){
				$('tower').css('cursor','initial');
			}
			if(master.data.activeTool=="rotate"){
				$('tower').css('cursor','alias');
			}
			if(master.data.activeTool=="scale"){
				$('tower').css('cursor','cell');
			}
	}
	if(target.attr('type')=="create"){
		$('#renderCanvas').css('cursor','initial');
		switch(target.attr('id')){
			case 'create-primitive':
				master._createPane(TOWER.PANES.CREATE.PRIMITIVE, {width : '300px', height: '120px'}, {moveto : 'absCenter'}, this);
				$('pane#Create-Primitive-Solid action[act="create-primitive-accept"]').bind('click', function(e){
					var pane = $('pane#Create-Primitive-Solid');
					master.data.project.objects.push(new TOWER.OBJECT(pane.find('#primitive-name').val(), TOWER.OBJECT.TYPES.STANDARD, master))	;
					var newObject = master.data.project.objects[master.data.project.objects.length-1];
						newObject.id = master.data.project.objects.length-1;
						newObject.data.bObject = TOWER.TOOLS.CREATE.Primitive[pane.find('#primitive-type').val()]._create({},master.CORE.scene);
						newObject.data.elements.settings = $(TOWER.ELEMENTS.SETTINGS.primitive);
						master.DOM.browser.find('#Settings').children('content').append(newObject.data.elements.settings);
						pane.remove();
						var parentItem = master.DOM.browser.find('#Object-List').find('item.selected');
						var newItem = master._createNewItem();
						newObject.domItem = newItem;
						newObject.domItem.domObj = $(newObject.domItem.domObj);
						newItem = newObject.domItem.domObj
						
						if(master.data.selectedObject.type =="scene"){
		 					master.data.project.activeScene.objects.push(newObject);
								
						}	
						
				if(master.data.selectedObject.type == "Object"){
					master.data.selectedObject.bObject.renderingGroupId = 1;
					master.data.selectedObject.push(newObject);
				}
				
				parentItem.append(newObject.domItem.domObj);
				
				master.data.selectedObject = newObject;
				master.data.selectedObject.data.bObject.renderingGroupId = 2;
				
				newItem.attr('name', newObject.name);
				newItem.attr('id',  newObject.id);
				newItem.attr('type',  newObject.typeName);
				newItem.find('#name').text( newObject.name);
				newItem.find('#type').addClass(newObject.typeName);
				newItem.find('#id').text(newObject.id);
				master.DOM.browser.find('#Object-List item').removeClass('selected');		
				newItem.addClass('selected');
				newItem.find('#type').addClass('object');
				
				if($('toggle#selected-bounding-box').is('.active')){
				master.data.selectedObject.data.bObject.showBoundingBox = true;
				}
				
				master._updateSelectedObject();
				});
			break;
		}
		
	}
}