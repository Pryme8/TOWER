// OBJECTS
TOWER.OBJECT = function(name, type, master){
	console.log("Object Called");
	this.name = name;
	this.id = null;
	this.type = type;
	this._typeName = "Object";
	this.data = {};
	this.storage = {
		textureData : [],
		soundData : [],
	};
	this._master = master;
	this._init();
}

TOWER.OBJECT.prototype._init = function(){
	console.log("Object Created");
	this.data = $.extend(true,{},this.type);
	this.data.widgets.axis.lines = new TOWER.WIDGETS.localAxis(this._master.CORE.scene, this);
	this.data.widgets.position.lines = new TOWER.WIDGETS.position(this._master.CORE.scene, this);
	this.data.widgets.rotation.lines = new TOWER.WIDGETS.rotation(this._master.CORE.scene, this);
	this.data.widgets.scale.lines = new TOWER.WIDGETS.scale(this._master.CORE.scene, this);
}


/*TYPES*/
TOWER.OBJECT.TYPES = {
	STANDARD : {
		origins : {
			position : new BABYLON.Vector3.Zero(),
			rotation : new BABYLON.Vector3.Zero(),
			scale : new BABYLON.Vector3(1,1,1),
		},
		bObject : null,
		children : [],
		settings : {
			physics : {
				on : false,
				body : null,
				mass : null,
				friction : null,
				restitution : null,
				move : false
			},
		},
		widgets :{
			axis : {
				lines : null,
				display : true,
			},
			position : {
				lines : null,
				display : true,
			},
			rotation : {
				lines : null,
				display : true,
			},
			scale : {
				lines : null,
				display : true,
			}
		},
		elements:{},
	},
	
};
