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