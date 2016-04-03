// PANES
TOWER.PANES = {
	PROJECT :{
		NEW :
		'<pane id="Create-New-Project">'+
		'Name :<input id="project-name" type="text" value="New Project"/> <BR />'+
		'Description :<textarea id="project-description" value="A New TOWER3D Project!" cols="40" rows="4" /> <BR />'+
		'<action act="create-project-go">Create Project</action>'+
		'<action act="close-pane">Cancel</action>'+
		'</pane>',
	},
	PROPERTIES : {
		PROJECT : "",
		SCENE : 
		'<pane id="Edit-Scene-Properties">'+
		'Name :<input id="scene-name" type="text"/> <BR />'+
		'Description :<textarea id="scene-description" cols="40" rows="4" /> <BR />'+
		'<action act="update-scene-properties">Update</action>'+
		'<action act="close-pane">Cancel</action>'+
		'</pane>',	
	},
	CREATE :{
		PRIMITIVE :
		'<pane id="Create-Primitive-Solid">'+
		'Name :<input id="primitive-name" type="text"/> <BR />'+
		'type :<select id="primitive-type" value="Box">'+
		'<option value="Box">Box</option>'+
		'<option value="Sphere">Sphere</option>'+
		'</select>'+	
		'<action act="create-primitive-accept">Create</action>'+
		'<action act="close-pane">Cancel</action>'+	
		'</pane>',		
	},
	SETTINGS : {
		PRIMITIVES : {
			BOX : {
				html : 
				'<tab id="transforms">'+
					'<div id="pos">'+
						'<input id="X" value="0" class="number float" />'+
						'<input id="Y" value="0" class="number float" />'+
						'<input id="Z" value="0" class="number float" />'+
					'</div>'+
					'<div id="rot">'+
						'<input id="X" value="0" class="number float" />'+
						'<input id="Y" value="0" class="number float" />'+
						'<input id="Z" value="0" class="number float" />'+
					'</div>'+					
					'<div id="siz">'+
						'<input id="X" value="0" class="number float" />'+
						'<input id="Y" value="0" class="number float" />'+
						'<input id="Z" value="0" class="number float" />'+
					'</div>'+
					
				'</tab>'+
				'<tab id="object">'+
				'</tab>',
				
			},
			SPHERE :{
				html : '',
			}
		},
	}
};
