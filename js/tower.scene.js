// TOWER Scene Class
TOWER.SCENE = function(project){
	this.name = "New Scene";
	this._project = project;
	this._init();
};

TOWER.SCENE.prototype._init = function(){
	this.objectList = [];
	this.type = "TOWER.SCENE";
}





