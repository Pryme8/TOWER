//ELEMENTS
TOWER.ELEMENTS = {
	Editor: {
		canvas : '<canvas id="renderCanvas"></canvas>',
		logoBig : '<logo class="big" />',
		Windows : {
			
			toolbar : 
				"<win name='Toolbar' id='toolbar' class='blue'>"+
				"<div id='tools' class='disabled' req='parent.project.activeObject'>"+
				"<icon name='Select Tool' class='normal' act='change-tool' id='select' type='transform'><img src='./imgs/icons/tool-select.svg' /></icon>"+
				"</div>"+
				"</win>",
			
			Menus : {
				top : 
				"<win name='Top Menu' id='top-menu' class='dark'>"+
				"<span id='icon'></span>"+
				'<menu id="top-menu">'+
		
		'<span class="menu-top-item">Project'+
		'<span class="menu-sub">'+
			'<span class="menu-item" act="project-new" >New</span>'+
			'<span class="menu-item">Load</span>'+
			'<span class="menu-item disabled" req="parent.project">Export</span>'+
			"<hr />"+
					'<span class="menu-item hasSub disabled" req="parent.project">Scene'+
					'<span class="menu-sub">'+
						'<span class="menu-item">New</span>'+
						'<span class="menu-item">Import</span>'+
						'<span class="menu-item">Export</span>'+
					'</span>'+
					'</span>'+
					
					'<span class="menu-item hasSub disabled" req="parent.project">Object'+
					'<span class="menu-sub">'+
						'<span class="menu-item">New</span>'+
						'<span class="menu-item">Import</span>'+
						'<span class="menu-item">Export</span>'+
					'</span>'+
					'</span>'+
					
			'</span>'+
			'</span>'+
			
		'<span class="menu-top-item disabled" req="parent.project;parent.project.activeObject">Edit'+
		'<span class="menu-sub">'+
		
			'<span class="menu-item">Copy</span>'+
			'<span class="menu-item">Paste</span>'+
			'<span class="menu-item">Dispose</span>'+
		
					'<span class="menu-item hasSub disabled" req="parent.project;parent.project.activeObject">Settings'+
					'<span class="menu-sub">'+
						'<span class="menu-item">Project</span>'+
						'<span class="menu-item">Scene</span>'+
						'<span class="menu-item">Object</span>'+
					'</span>'+
					'</span>'+
					
			'</span>'+
			'</span>'+
			
		'<span class="menu-top-item disabled" req="parent.project">Windows'+
		'<span class="menu-sub">'+
		
		'<span class="menu-item hasSub">Views'+
			'<span class="menu-sub">'+
					'<span class="menu-item hasSub">Single'+
					'<span class="menu-sub">'+
						'<span class="menu-item"><toggle class="active" set="camera">3D Free</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">3D Point Orbit</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">3D Fixed Orbit</toggle></span>'+
					'</span>'+
					'</span>'+
				
					'<span class="menu-item hasSub">Split'+
					'<span class="menu-sub">'+
						'<span class="menu-item"><toggle set="camera">Top/Right</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Top/Left</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Bottom/Right</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Bottom/Left</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Front/Right</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Front/Left</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Back/Right</toggle></span>'+
						'<span class="menu-item"><toggle set="camera">Back/Left</toggle></span>'+
					'</span>'+
					'</span>'+
					'<span class="menu-item"><toggle set="camera">4 Split</toggle></span>'+
			'</span>'+
			'</span>'+
			
			'<span class="menu-item hasSub" id="widgets" >Widgets'+
			'<span class="menu-sub">'+
					'<span class="menu-item hasSub" >Global'+
					'<span class="menu-sub">'+
						'<span class="menu-item"><toggle class="active" id="horizon-toggle">horizon</toggle></span>'+
						'<span class="menu-item"><toggle class="active" id="grid-toggle">grid</toggle></span>'+
						'<span class="menu-item"><toggle class="active" id="world-axis-toggle">world-axis</toggle></span>'+
						'<span class="menu-item"><toggle class="active" id="local-axis-toggle">local-axis</toggle></span>'+
					'</span>'+
					'</span>'+
					
					'<span class="menu-item"><toggle class="active" id="default-light-toggle">default light</toggle></span>'+
					'<span class="menu-item"><toggle class="active" id="selected-bounding-box">selected box</toggle></span>'+
					
			'</span>'+
			'</span>'+
			
			'<hr />'+		
		
			'<span class="menu-item">Tool Bar</span>'+
			'<span class="menu-item hasSub" >Browser'+
					'<span class="menu-sub">'+
						'<span class="menu-item">Asset List</span>'+
						'<span class="menu-item">Object List</span>'+
						'<span class="menu-item">Object Information</span>'+
						'<span class="menu-item">Object Transforms</span>'+
						
					'</span>'+
					'</span>'+
				'<span class="menu-item">Material List</span>'+
					
			'</span>'+
			'</span>'+
			
			
			'<span class="menu-top-item" >About'+
			'<span class="menu-sub">'+
		
			'<span class="menu-item">Documentation</span>'+
			'<span class="menu-item">About</span>'+
			'<span class="menu-item">Github</span>'+
					
			'</span>'+
			'</span>'+
			
			
			
		"</menu>"+
				
				"</win>",					
				
			},
			
			Project : {
				create : 
				"<win name='New Project' id='project-create' class='light titleOn'>"+
				"<controls><icon name='close' class='tiny' act='window-controls-close'><img src='./imgs/icons/close.svg' /></icon></controls>"+
				'<label for="project-name">Name</label>'+
				'<input id="project-name" value="New Project"><BR />'+
				'<label for="project-description">Desc</label>'+
				'<textarea id="project-description" ></textarea><BR />'+
				'<label for="project-author-name">Author</label>'+
				'<input id="project-author-name" value="The Face"><BR />'+
				'<label for="project-author-email">email</label>'+
				'<input id="project-author-email" value="TheFace@Email.com"><BR />'+
				"<action name='New Project' act='project-create-new' />"+
				"<action name='Cancel' act='window-close' />"+
				"</win>",
			},
		},
	},
	Pages: {
		Home : 
		"<page id='home'>"+
			"<pane class='halfwidth fullheight left'>"+
			"<logo class='big' />"+
			"</pane>"+
			"<pane class='half-width-fix fullheight right abs scroll-y'>"+
			"<tab id='commit-log'>"+
				"<span act='toggle-open'>Update Log</span>"+
				"<div>"+
				"<loading />"+
				"</div>"+
			"</tab>"+
			"<tab class='open'>"+
				"<span act='toggle-open'>Main Commands</span>"+
				"<div>"+
				"<icon name='New Project' id='new-project' class='big textOn' act='project-new' ><img src='./imgs/icons/project.svg' /></icon>"+
				"<icon name='Load Project' id='load-project' class='big textOn disabled' ><img src='./imgs/icons/project-load.svg' /></icon>"+
				"</div>"+
			"</tab>"+
			"</pane>"+
		"</page>",
	},
	commitBlock : "<commit><span id='author-block'><div id='author-name'></div><div id='author-picture'></div></span><span id='detail-block'><div id='detail-title'></div><div id='detail-date'></div><div id='detail-body'></div><div id='detail-commit-url'></div></span></commit>",
	
};