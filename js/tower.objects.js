// OBJECTS
TOWER.OBJECT = function(name, type, master){
	if(!name || !type || !master){return};
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
	this.data = $.extend(true,{},this.type);
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
	},
};
