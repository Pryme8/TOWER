//ELEMENTS
TOWER.ELEMENTS = {
	canvas : '<canvas id="renderCanvas"></canvas>',
	logoBig : '<logo class="big" />',
	mainMenu : 
	'<main>'+
		'<span class="menu-top-item">Project'+
			'<span class="menu-sub">'+
				'<span class="menu-item" act="New-Project">New Project</span>'+
				'<span class="menu-item">Open Project</span>'+
				'<hr/>'+
				'<span class="menu-item">New Scene</span>'+
				'<span class="menu-item">Open Scene</span>'+
				'<span class="menu-item">New Object</span>'+
				'<span class="menu-item">Open Object</span>'+
			'</span>'+
		'</span>'+
		'<span class="menu-top-item">Edit'+
			'<span class="menu-sub">'+
				'<span class="menu-item">Project Properties</span>'+
				'<span class="menu-item" act="Scene-Properties">Scene Properties</span>'+
				'<span class="menu-item">Object Properties</span>'+
			'</span>'+
		'</span>'+
		'<span class="menu-top-item">Assets'+
			'<span class="menu-sub">'+
				'<span class="menu-item">Browse</span>'+
				'<span class="menu-item">Import</span>'+
			'</span>'+
		'</span>'+
		'<span class="menu-top-item">Windows'+
			'<span class="menu-sub">'+
				'<span class="menu-item">Tools</span>'+
				'<span class="menu-item">Browser</span>'+
			'</span>'+
		'</span>'+
		'<span class="menu-top-item">Help'+
			'<span class="menu-sub">'+
				'<span class="menu-item">Documentation</span>'+
				'<span class="menu-item">About</span>'+
			'</span>'+			
		'</span>'+
		
		'<select id="currentObject" value="None">'+
		'<option>None</option>'+
		'</select>'+
		
		'<select id="mode" value="Scene">'+
		'<option>Scene</option>'+
		'<option>Modeler</option>'+
		'<option>Scripter</option>'+
		'<option>Painter</option>'+
		'</select>'+
		
		
	'</main>',
	secondBar : 
		'<second>'+
		'<tooltip></tooltip>'+
		'<views>'+
			'<span class="menu-top-item">Views'+
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
			
			'<span class="menu-top-item">Display'+
			'<span class="menu-sub">'+
					'<span class="menu-item hasSub" id="widgets" >Widgets'+
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
			
		'</views>'+
		'</second>',
	toolBar :
	'<tools>'+
		'<tool class="type">'+
			'<icon class="active" id="select" type="transform" ></icon>'+
			'<icon id="move" type="transform" ></icon>'+
			'<icon id="scale" type="transform"></icon>'+
			'<icon id="rotate" type="transform" ></icon>'+
		'</tool>'+
		'<tool class="type">'+
			'<icon class="active" id="create-primitive" type="create"></icon>'+
			'<icon id="create-platonic" type="create"></icon>'+
		'</tool>'+
		'<tool class="type">'+
			'<icon class="active" id="create-light" type="create"></icon>'+
			'<icon id="create-camera" type="create"></icon>'+
		'</tool>'+
	'</tools>',
	browser : 
	'<browser>'+
	
	'<tab id="Information" class="open">'+
		'<content>'+
		'Selected Object:<span id="information-selected-object-name"></span>'+
		'<content id="information-sub-content">'+
		'</content>'+
		'</content>'+
	'</tab>'+
	
	'<tab id="Object-List" class="open">'+
		'<content>'+
		
		'</content>'+
	'</tab>'+
	
	'<tab id="Settings" class="open">'+
		'<content>'+
		
		'</content>'+
	'</tab>'+
	
	
	
	'</browser>',
	
	
};