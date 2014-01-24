import ui.StackView as StackView;
import device;
import src.screens.PhysicsScreen as PhysicsScreen;
//import src.soundcontroller as soundcontroller;

var boundsWidth = 1024;
var boundsHeight = 576;
var baseWidth = device.screen.width * (boundsHeight / device.screen.height) // 864
var baseHeight = boundsHeight; 
var scale = device.screen.width / baseWidth;
var rightBoundary = baseWidth; //right boundary for screen wrapping
var leftBoundary = 0;
var vx = 0;

// PORTRAIT
//var boundsWidth = 576;
//var boundsHeight = 1024;
//var baseWidth = boundsWidth ;
//var baseHeight = device.screen.height * (boundsWidth / device.screen.width); //864
//var scale = device.screen.width / baseWidth;
//var rightBoundary = baseWidth; //right boundary for screen wrapping
//var leftBoundary = 0;
//var vx = 0;

exports = Class(GC.Application, function () {

	this.initUI = function () {
	    /*this.engine.updateOpts({
            showFPS: true
        });*/
	    
	    /*
	    var titlescreen = new TitleScreen();
	    this.memoryscreen = new MemoryScreen;
	    
	    */
	   
	    var physicsscreen = new PhysicsScreen();
	    
	    //Add a new StackView to the root of the scene graph
        this.rootView = new StackView({
            superview: this,
            x: 0,
            y: 0,
            width: baseWidth ,
            height: baseHeight ,
            clip: true,
            backgroundColor: '#ffffff'
        });
        
        this.rootView.push(physicsscreen);
        
        /*
        this.rootView.push(titlescreen);
        
        this.sound = soundcontroller.getSound();         
        
        var that = this;
        titlescreen.on('memory:start', function () {
            that.sound.play('levelmusic');
            that.rootView.push(that.memoryscreen);
            that.memoryscreen.emit('app:start');
        });*/

        /* When the game screen has signalled that the game is over,
         * show the title screen so that the user may play the game again.
         */
        //this.memoryscreen.on('memory:end', bind(this, bindMemoryEnd));
        /*
        this.memoryscreen.on('memory:end', function () {
            that.sound.stop('levelmusic');
            that.rootView.pop();
            
        });*/
        
		/*var textview = new TextView({
			superview: this.view,
			layout: "box",
			text: "Hola mundo!",
			color: "white"
		});*/
		
		//this.view.style.backgroundColor = '#30B040';
		this.view.style.scale = scale;
	};
	
	this.launchUI = function () {};
});
