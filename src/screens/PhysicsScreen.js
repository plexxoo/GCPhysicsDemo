import src.libs.Box2D.Box2D as Box2D;
import src.libs.Box2D.ViewB2d as ViewB2d;
import src.libs.Box2D.ImageViewB2d as ImageViewB2d;
import src.actors.WoodBox as WoodBox;
import ui.View;
import ui.ImageView;
import ui.TextView as TextView;
import src.libs.Box2D.LiquidView as LiquidView;

import ui.resource.Image as Image;
//import src.soundcontroller as soundcontroller;

var bg_img = new Image({url: "resources/images/background.png"});
var platform_img = new Image({url: "resources/images/platform256.png"});
var pipe_img = new Image({url: "resources/images/pipe.png"});

import device;

var boundsWidth = 1024;
var boundsHeight = 576;
var baseWidth = device.screen.width * (boundsHeight / device.screen.height) // 864
var baseHeight = boundsHeight; 
var UIscale = device.screen.height / baseHeight;
var rightBoundary = baseWidth; //right boundary for screen wrapping
var leftBoundary = 0;

var   b2Vec2 = Box2D.Common.Math.b2Vec2
            ,   b2BodyDef = Box2D.Dynamics.b2BodyDef
            ,   b2Body = Box2D.Dynamics.b2Body
            ,   b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            ,   b2Fixture = Box2D.Dynamics.b2Fixture
            ,   b2World = Box2D.Dynamics.b2World
            ,   b2MassData = Box2D.Collision.Shapes.b2MassData
            ,   b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
            ,   b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
            ,   b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            ;
/* The title screen is added to the scene graph when it becomes
 * a child of the main application. When this class is instantiated,
 * it adds the start button as a child.
 */
exports = Class(ui.ImageView, function (supr) {
    this.init = function (opts) {
        opts = merge(opts, {
            //x: 0,
            //y: 0
            image:  bg_img 
        });
        supr(this, 'init', [opts]);

        this.build();
        
        reloadbtn = new TextView({
            color: "#ffffff",
            text: "Reload",
            backgroundColor: "#000000",
            superview: this,
            x: baseWidth - 100,
            y: 0,
            width: 100,
            height: 40,
            size: 20,
            fontFamily: "Arial Black"
        });
        
        addLiquid = new TextView({
            color: "#ffffff",
            text: "Add Liquid",
            backgroundColor: "#000000",
            superview: this,
            x: 0,
            y: 0,
            width: 100,
            height: 40,
            size: 20,
            fontFamily: "Arial Black"
        });
        
        
        pipe = new ui.ImageView({
            superview: this,
            x:0,
            y:100,
            width: 50,
            height:50,
            image: pipe_img
        })
        
        addLiquid.on('InputOver', bind(this, function(){
            //this.liquidworld.emit('liquid:add');
            this.liquidworld.addParticle();
        }));
        
        
        
        reloadbtn.on('InputSelect', bind(this, function(){
            var children = this.getSubviews(), len = children.length;
            for (var i = len - 1; i >= 0; i--) {
              children[i].emit("view:destroy", children[i])
            }
            createBoxes.call(this)
        }))
    };

    this.build = function() {
        this.world = null;
        launch.call(this);
        this.liquidworld = new LiquidView({
            superview: this, 
            opacity: 1,
            backgroundColor: "#ffffff"
        });
        this.liquidworld.setWorld(this.world);
    };
    
    this.tick = function(dt){
        this.world.Step(
                  1 / 60   //frame-rate
                  ,  8     //velocity iterations
                  ,  3     //position iterations
        );
        this.world.ClearForces(); 
    }
});


 function launch() {
         
         
         this.world = new b2World(
               new b2Vec2(0, 10)    //gravity
            ,  true                 //allow sleep
         );
         
         this.scale = 30;
         createBoxes.call(this)
         
      };
      
function getRandomColor(){
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}



function createBoxes(){
        
        var boxcolor = "#969C32";
        // create the ground
        var ground = new ViewB2d({
            superview: this,
            bodyType: "static", 
            x: 0,
            y: baseHeight,
            height: 1,
            width: baseWidth,
            backgroundColor: boxcolor
        });
        
        // create the left wall 
        var left_wall =  new ViewB2d({
            superview: this,
            bodyType: "static", 
            x: 0,
            y: 0,
            height: baseHeight,
            width: 1,
            backgroundColor: boxcolor
        });
                               
        // create the right wall
        var right_wall = new ViewB2d({
            superview: this,
            bodyType: "static", 
            x: baseWidth,
            y: 0,
            height: baseHeight,
            width: 1,
            backgroundColor: boxcolor
        });
         
        // create a platform
         var plat_x = ~~(50 + Math.random() *100);
         var plat_y = ~~(300 + Math.random() *200);
         var platform1 = new ImageViewB2d({
            superview: this,
            bodyType: "static", 
            x: plat_x, //50,
            y: plat_y, // 300 
            height: 75,
            width: 256,
            image: platform_img
         });
         
         // create a second platform
         var plat_x = ~~(500 + Math.random() *100);
         var plat_y = ~~(300 + Math.random() *200);
         var platform2 = new ImageViewB2d({
            superview: this,
            bodyType: "static", 
            x: plat_x,
            y: plat_y,
            height: 75,
            width: 256,
            image: platform_img
            //backgroundColor: boxcolor
          });
         
         // create some objects
         for(var i = 0; i < 10; ++i) {
            var m_x = Math.random()*800;
            var m_y = Math.random()*100;
            var color = getRandomColor();
            var m_height = 75;
            var m_width = 75;
             
            var dynamic_body = new WoodBox({
                x: m_x,
                y: m_y,
                superview: this,
                bodyType: "dynamic",
                height: m_height,
                width: m_width
                /*backgroundColor: color*/
            })
         }
}
