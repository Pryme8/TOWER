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
			this.lines.renderingGroupId = 0; 
			
			var parent = this;
			scene.registerBeforeRender(function(){
				if($('tower second #horizon-toggle').is('.active')){
					if(!parent.visible){
					parent.lines.setEnabled(true);
					parent.lines.position.x = scene.activeCamera.position.x;
					parent.lines.position.z = scene.activeCamera.position.z;	
					}
					parent.visible = true;
				}else{
					if(parent.visible){
					parent.lines.setEnabled(false);
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
			this.grid.renderingGroupId = 0; 
			
			var parent = this;
			scene.registerBeforeRender(function(){
				if($('tower second toggle#grid-toggle').is('.active')){
					if(!parent.visible){
					parent.grid.setEnabled(true);
					}
					parent.visible = true;
				}else{
					if(parent.visible){
					parent.grid.setEnabled(false);
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
			this.poles.X.renderingGroupId = 3; 
			this.poles.Y.renderingGroupId = 3; 
			this.poles.Z.renderingGroupId = 3;
			
			this.visible = true;
			
			
			var parent = this;
			scene.registerBeforeRender(function(){
				if($('tower second toggle#world-axis-toggle').is('.active')){
						if(!parent.visible){	
							parent.poles.X.setEnabled(true);
							parent.poles.Y.setEnabled(true);
							parent.poles.Z.setEnabled(true);
						}
						parent.visible = true;
										
				}else{
					if(parent.visible){	
							parent.poles.X.setEnabled(false);
							parent.poles.Y.setEnabled(false);
							parent.poles.Z.setEnabled(false);
						}
					parent.visible = false;
				}
				
			});
		},
		localAxis : function(scene, master){
			console.log("local-axis Widget Built");
			this._master = master;
			this.id = "local-axis";
			var position = this._master.data.origins.position;
			this.poles = {
				X : BABYLON.Mesh.CreateLines("X-Pole", [new BABYLON.Vector3(position.x,position.y,position.z),new BABYLON.Vector3(position.x+5,position.y,position.z)], scene),
				Y : BABYLON.Mesh.CreateLines("Y-Pole", [new BABYLON.Vector3(position.x,position.y,position.z),new BABYLON.Vector3(position.x,position.y+5,position.z)], scene),
				Z : BABYLON.Mesh.CreateLines("Z-Pole", [new BABYLON.Vector3(position.x,position.y,position.z),new BABYLON.Vector3(position.x,position.y,position.z+5)], scene)
			}
			this.poles.parent = new BABYLON.Mesh('localAxis',scene);//Make a blank container.
			this.poles.parent.position = this._master.data.origins.position;
			this.poles.parent.rotation = this._master.data.origins.rotation;
			this.poles.X.parent = this.poles.parent;
			this.poles.Y.parent = this.poles.parent;
			this.poles.Z.parent = this.poles.parent;
			this.poles.X.color = new BABYLON.Color3(1,0,0);
			this.poles.Y.color = new BABYLON.Color3(0,1,0);
			this.poles.Z.color = new BABYLON.Color3(0,0,1);
			this.poles.X.renderingGroupId = 3; 
			this.poles.Y.renderingGroupId = 3; 
			this.poles.Z.renderingGroupId = 3; 
			this.visible = true;
			var parent = this;
			scene.registerBeforeRender(function(){
				if($('tower second toggle#local-axis-toggle').is('.active')){
						if(!parent.visible){	
							parent.poles.parent.setEnabled(true);
						}
						parent.visible = true;
						if(parent._master.data.bObject){
						parent.poles.parent.position = parent._master.data.bObject.position;
						parent.poles.parent.rotation = parent._master.data.bObject.rotation;	
						}
				}else{
					if(parent.visible){	
							parent.poles.parent.setEnabled(false);
						}
					parent.visible = false;
				}
				
			});
			
		
		},
		position : function(scene, master){
			console.log("position Widget Built");
			this._master = master;
			this.id = "position";
			var position = this._master.data.origins.position;
			this.poles = {
				X : BABYLON.Mesh.CreateLines("X-Pole", [new BABYLON.Vector3(position.x,position.y,position.z),new BABYLON.Vector3(position.x+5,position.y,position.z)], scene),
				Y : BABYLON.Mesh.CreateLines("Y-Pole", [new BABYLON.Vector3(position.x,position.y,position.z),new BABYLON.Vector3(position.x,position.y+5,position.z)], scene),
				Z : BABYLON.Mesh.CreateLines("Z-Pole", [new BABYLON.Vector3(position.x,position.y,position.z),new BABYLON.Vector3(position.x,position.y,position.z+5)], scene)
			}
			this.caps = {
				X: BABYLON.MeshBuilder.CreateCylinder("X-Cap", {diameterTop: 0, diameter: 1, height:1.5, tessellation: 4, faceColors:[new BABYLON.Color4(1,0,0,1),new BABYLON.Color4(1,0,0,1),new BABYLON.Color4(1,0,0,1)]}, scene),
				Y: BABYLON.MeshBuilder.CreateCylinder("Y-Cap", {diameterTop: 0, diameter: 1, height:1.5, tessellation: 4, faceColors:[new BABYLON.Color4(0,1,0,1),new BABYLON.Color4(0,1,0,1),new BABYLON.Color4(0,1,0,1)]}, scene),
				Z: BABYLON.MeshBuilder.CreateCylinder("Z-Cap", {diameterTop: 0, diameter: 1, height:1.5, tessellation: 4, faceColors:[new BABYLON.Color4(0,0,1,1),new BABYLON.Color4(0,0,1,1),new BABYLON.Color4(0,0,1,1)]}, scene),
			}
			this.dualAxis = {
				XY: BABYLON.MeshBuilder.CreatePlane("XY_Dual", {size: 1.5, updatable: false}, scene),
				YZ:BABYLON.MeshBuilder.CreatePlane("YZ_Dual", {size: 1.5, updatable: false}, scene),
				ZX:BABYLON.MeshBuilder.CreatePlane("ZX_Dual", {size: 1.5, updatable: false}, scene),
			}

			this.poles.parent = new BABYLON.Mesh('positionWidget',scene);//Make a blank container.
			
			
			this.poles.parent.position = this._master.data.origins.position;
			this.poles.parent.rotation = this._master.data.origins.rotation;
			this.poles.X.parent = this.poles.parent;
			this.poles.Y.parent = this.poles.parent;
			this.poles.Z.parent = this.poles.parent;
			this.poles.X.color = new BABYLON.Color3(1,0,0);
			this.poles.Y.color = new BABYLON.Color3(0,1,0);
			this.poles.Z.color = new BABYLON.Color3(0,0,1);
			this.poles.X.renderingGroupId = 3; 
			this.poles.Y.renderingGroupId = 3; 
			this.poles.Z.renderingGroupId = 3; 
			
			this.caps.X.parent = this.poles.X;
			this.caps.Y.parent = this.poles.Y;
			this.caps.Z.parent = this.poles.Z;
			this.caps.X.renderingGroupId = 3; 
			this.caps.Y.renderingGroupId = 3; 
			this.caps.Z.renderingGroupId = 3; 
			this.caps.X.position.x = 5;
			this.caps.Y.position.y = 5;
			this.caps.Z.position.z = 5;
			this.caps.Z.rotation.x = Math.PI/2;
			this.caps.X.rotation.z = -Math.PI/2;
			
			this.dualAxis.XY.parent = this.poles.parent;
			this.dualAxis.YZ.parent = this.poles.parent;
			this.dualAxis.ZX.parent = this.poles.parent;
			
			this.dualAxis.XY.renderingGroupId = 3;
			this.dualAxis.YZ.renderingGroupId = 3;
			this.dualAxis.ZX.renderingGroupId = 3;

			this.dualAxis.XY.material = new BABYLON.StandardMaterial("mat1", scene);
			this.dualAxis.XY.material.alpha = 0;
			this.dualAxis.YZ.material = this.dualAxis.XY.material;
			this.dualAxis.ZX.material = this.dualAxis.XY.material;

			this.dualAxis.XY.enableEdgesRendering(1-0.000000000000001);	
			this.dualAxis.XY.edgesWidth = 5;
			this.dualAxis.XY.edgesColor = new BABYLON.Color4(1, 0.25, 0, 1);
			this.dualAxis.YZ.enableEdgesRendering(1-0.000000000000001);	
			this.dualAxis.YZ.edgesWidth = 5;
			this.dualAxis.YZ.edgesColor = new BABYLON.Color4(0, 1, 0.25, 1);
			this.dualAxis.ZX.enableEdgesRendering(1-0.000000000000001);	
			this.dualAxis.ZX.edgesWidth = 5;
			this.dualAxis.ZX.edgesColor = new BABYLON.Color4(0.25, 0, 1, 1);
			
			this.dualAxis.XY.position.x = 0.75;
			this.dualAxis.XY.position.y = 0.75;
			this.dualAxis.YZ.rotation.y = Math.PI/2;
			this.dualAxis.YZ.position.z = 0.75;
			this.dualAxis.YZ.position.y = 0.75;
			this.dualAxis.ZX.rotation.x = Math.PI/2;
			this.dualAxis.ZX.position.z = 0.75;
			this.dualAxis.ZX.position.x = 0.75;
			
						
			
			
			if(this._master._master.data.activeTool != "move"){
							this.visible = false;
							this.poles.parent.setEnabled(false);
			}
			
			var parent = this;
		
			
			scene.registerBeforeRender(function(){
				if(parent._master._master.data.activeTool == "move"){
						if(!parent.visible){	
							parent.poles.parent.setEnabled(true);
						}
						parent.visible = true;
						if(parent._master.data.bObject){
						parent.poles.parent.position = parent._master.data.bObject.position;	
						parent.poles.parent.rotation = parent._master.data.bObject.rotation;		
						}
				}else{
					if(parent.visible){	
							parent.poles.parent.setEnabled(false);
						}
						parent.visible = false;
				}
				
			});
			
		
		},
		rotation : function(scene, master){
			
			console.log("rotation Widget Built");
			this._master = master;
			this.id = "rotation";
			
		var pieDiv = 2/32;
		var divArray = [];
		for(var i = 0; i < 32; i++){
			divArray.push(Math.PI*(pieDiv*i));
		}
		
		var newPath= [];
		for(var i = 0; i < divArray.length; i++){
			newPath.push(new BABYLON.Vector3(5 * Math.cos(divArray[i]), 0, 5 * Math.sin(divArray[i])));
		}
		newPath.push(newPath[0]);
	
		this.poles = {
				X : BABYLON.Mesh.CreateLines("X-Pole", newPath, scene),
				Y : BABYLON.Mesh.CreateLines("Y-Pole", newPath, scene),
				Z : BABYLON.Mesh.CreateLines("Z-Pole", newPath, scene),
				parent : new BABYLON.Mesh('rotationWidget',scene),
			}
			
			this.poles.parent.position = this._master.data.origins.position;
			this.poles.parent.rotation = this._master.data.origins.rotation;
			
			this.poles.X.color = new BABYLON.Color3(1,0,0);
			this.poles.Y.color = new BABYLON.Color3(0,1,0);
			this.poles.Z.color = new BABYLON.Color3(0,0,1);
			this.poles.X.renderingGroupId = 3; 
			this.poles.Y.renderingGroupId = 3; 
			this.poles.Z.renderingGroupId = 3;
			
			this.poles.X.parent = this.poles.parent 
			this.poles.Y.parent = this.poles.parent 
			this.poles.Z.parent = this.poles.parent
			
			this.poles.X.rotation.z = Math.PI/2;
			
			this.poles.Z.rotation.z = Math.PI/2;
			this.poles.Z.rotation.y = Math.PI/2;
			
			this.visible = true;
			
			
			var parent = this;
				scene.registerBeforeRender(function(){
				if(parent._master._master.data.activeTool == "rotate"){
						if(!parent.visible){	
							parent.poles.parent.setEnabled(true);
						}
						parent.visible = true;
						if(parent._master.data.bObject){
						parent.poles.parent.position = parent._master.data.bObject.position;	
						parent.poles.parent.rotation = parent._master.data.bObject.rotation;		
						}
				}else{
					if(parent.visible){	
							parent.poles.parent.setEnabled(false);
						}
						parent.visible = false;
				}
				
			});
	

		
		},
		scale : function(scene, master){
			
			console.log("scale Widget Built");
			this._master = master;
			this.id = "scale";
		var position = this._master.data.origins.position;
		this.poles = {
				X : BABYLON.Mesh.CreateLines("X-Pole", [new BABYLON.Vector3(position.x,position.y,position.z),new BABYLON.Vector3(position.x+5,position.y,position.z)], scene),
				Y : BABYLON.Mesh.CreateLines("Y-Pole", [new BABYLON.Vector3(position.x,position.y,position.z),new BABYLON.Vector3(position.x,position.y+5,position.z)], scene),
				Z : BABYLON.Mesh.CreateLines("Z-Pole", [new BABYLON.Vector3(position.x,position.y,position.z),new BABYLON.Vector3(position.x,position.y,position.z+5)], scene),
				parent : new BABYLON.Mesh('scaleWidget',scene),
			}
			
			var red=[];for(var i = 0; i < 6; i++){red.push(new BABYLON.Color4(1,0,0,1))};
			var green=[];for(var i = 0; i < 6; i++){green.push(new BABYLON.Color4(0,1,0,1))};
			var blue=[];for(var i = 0; i < 6; i++){blue.push(new BABYLON.Color4(0,0,1,1))};
			
		this.caps = {
				X: BABYLON.MeshBuilder.CreateBox("X-Cap", {size: 0.5, faceColors:red}, scene),
				Y: BABYLON.MeshBuilder.CreateBox("Y-Cap", {size: 0.5, faceColors:green}, scene),
				Z: BABYLON.MeshBuilder.CreateBox("Z-Cap", {size: 0.5, faceColors:blue}, scene),
			}	
			
			this.poles.parent.position = this._master.data.origins.position;
			this.poles.parent.rotation = this._master.data.origins.rotation;
			
			this.poles.X.color = new BABYLON.Color3(1,0,0);
			this.poles.Y.color = new BABYLON.Color3(0,1,0);
			this.poles.Z.color = new BABYLON.Color3(0,0,1);
			this.poles.X.renderingGroupId = 3; 
			this.poles.Y.renderingGroupId = 3; 
			this.poles.Z.renderingGroupId = 3;
			
			this.poles.X.parent = this.poles.parent 
			this.poles.Y.parent = this.poles.parent 
			this.poles.Z.parent = this.poles.parent
			
			this.caps.X.parent = this.poles.X;
			this.caps.Y.parent = this.poles.Y;
			this.caps.Z.parent = this.poles.Z;
			this.caps.X.renderingGroupId = 3; 
			this.caps.Y.renderingGroupId = 3; 
			this.caps.Z.renderingGroupId = 3; 
			this.caps.X.position.x = 5;
			this.caps.Y.position.y = 5;
			this.caps.Z.position.z = 5;
			
			this.visible = true;
			
			
			var parent = this;
				scene.registerBeforeRender(function(){
				if(parent._master._master.data.activeTool == "scale"){
						if(!parent.visible){	
							parent.poles.parent.setEnabled(true);
						}
						parent.visible = true;
						if(parent._master.data.bObject){
						parent.poles.parent.position = parent._master.data.bObject.position;	
						parent.poles.parent.rotation = parent._master.data.bObject.rotation;		
						}
				}else{
					if(parent.visible){	
							parent.poles.parent.setEnabled(false);
						}
						parent.visible = false;
				}
				
			});
	

		
		},
};