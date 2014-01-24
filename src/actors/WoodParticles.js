import ui.View as View;
import ui.ParticleEngine as ParticleEngine;


var box_img = new Image({url: "resources/images/Box.jpg"});

exports = Class(View, function (supr) {

    this.init = function (opts) {
        
         /*opts = merge(opts, {
            //backgroundColor: "#FFFFFF",
            width:  box_img.getWidth(), //hole_back_img.getWidth(), // deberian ser 75
            height: box_img.getHeight(),//hole_back_img.getHeight() + mole_normal_img.getHeight()
            image: box_img
        });*/
        
        supr(this, 'init', [opts]);
        var that = this;
        
        sendDeath = function (){
            that.pEngine = null;
            that.removeFromSuperView();
            
            that = null;
        }
        
        this.pEngine = new ParticleEngine({
          superview: this.getSuperview(),
          width: 1,
          height: 1,
          initCount: 5,
          transition: "easeOut",
          onDeath: sendDeath
        });
        
        
        
        // some logic
        /*this.on('view:destroy', bind(this, function(){
             this.destroyObject();
        }));*/
        
        // more logic
       this.on("view:destroy", function (){
           that.pEngine.removeFromSuperview();
           that.removeFromSuperview();
       })
       var particleObjects = this.pEngine.obtainParticleArray(10);
       var size = 75;
       for (var i = 0; i < 4; i++) {
            var pObj = particleObjects[i];
            pObj.x = this.style.x;
            pObj.y = this.style.y;
            pObj.r = 0.5;
            pObj.opacity = 1;
            pObj.dopacity = -1;
            pObj.ddopacity = 0;
            if (Math.random() < 0.5) {
                pObj.r = pObj.r * -1;
            }
            pObj.anchorX = size / 2;
            pObj.anchorY = size / 2;
            pObj.dx = 100 + Math.random() * 80;
            if (i <=1) {
                pObj.dx = pObj.dx * -1;
            }
            pObj.dr = 5;
            if (Math.random() < 0.5) {
                pObj.ddr = pObj.dr * -1;
            }
            pObj.dy = -200 + Math.random() * 280;
            pObj.ddy = 100; // gravity is same for all particles
            pObj.ddr = 5;
            if (Math.random() < 0.5) {
                pObj.ddr = pObj.ddr * -1;
            }
            
            pObj.width = size;
            pObj.height = size;
            pObj.image = 'resources/images/splintered_wood_particles.png';
        }
        this.pEngine.emitParticles(particleObjects);
    };
    this.tick = function(dt) {
      // .. tick logic ..
      this.pEngine.runTick(dt);
      // .. more tick logic ..
    };
 });