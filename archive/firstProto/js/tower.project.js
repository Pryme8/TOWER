//TOWER Project Class
TOWER.PROJECT = function(master, file){
	this._master = master;
	this._init();
	if(!file){
		this._createNew();
	}
};

TOWER.PROJECT.prototype._init = function(){
	this.name = null;
	this.sceneList = [];
	this.initialScene = null;
	this.activeObject = null;
	this.Assets = {
		objects : [],
		materials : [],
		textures : [],
		sounds : []
	};
};

TOWER.PROJECT.prototype._createNew = function(){
	
	if(this._master.project){
		//POP UP ASKING THAT ITS OK!
		
	}else{
		this._master.project = this;
		var winObj = $('win#project-create');
		this.name = winObj.find('input#project-name').val();
		winObj.remove();
		this._createScene();
		
	}
};

TOWER.PROJECT.prototype._createScene = function(){
		this.sceneList.push(new TOWER.SCENE(this));
		this.initialScene = this.sceneList.last();
		this.initialScene.name = "Initial Scene";
		this._setActiveObject(this.initialScene);
		console.log(this._master);
};

TOWER.PROJECT.prototype._setActiveObject = function(target){
		this.activeObject = target;
		this._master._updateDisabled();
};




