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