import src.libs.Box2D.ImageViewB2d as ImageViewB2d;
import src.actors.WoodParticles as WoodParticles;
import ui.resource.Image as Image;



var box_img = new Image({url: "resources/images/Box.jpg"});

exports = Class(ImageViewB2d, function (supr) {

    this.init = function (opts) {
        
         opts = merge(opts, {
            //backgroundColor: "#FFFFFF",
            width:  box_img.getWidth(), //hole_back_img.getWidth(), // deberian ser 75
            height: box_img.getHeight(),//hole_back_img.getHeight() + mole_normal_img.getHeight()
            image: box_img
            
        });
        
        supr(this, 'init', [opts]);
        
       
        // some logic
        /*this.on('view:destroy', bind(this, function(){
             this.destroyObject();
        }));*/
        
        // more logic
        this.on('InputSelect', bind(this, function(){
             var Particles = new WoodParticles({
                 superview: this.getSuperview(),
                 x: this.style.x,
                 y: this.style.y
             });
            this.destroyObject();
        }));
    };
    this.tick
 });