import ui.View;
import src.libs.Box2D.Box2D as Box2D;
import src.libs.Box2D.LiquidParticleB2d as LiquidParticle;

import device;

var boundsWidth = 1024;
var boundsHeight = 576;
var baseWidth = device.screen.width * (boundsHeight / device.screen.height) // 864
var baseHeight = boundsHeight; 
var UIscale = device.screen.height / baseHeight;
var rightBoundary = baseWidth; //right boundary for screen wrapping
var leftBoundary = 0;


var b2Vec2 = Box2D.Common.Math.b2Vec2,
            b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2Fixture = Box2D.Dynamics.b2Fixture,
            b2World = Box2D.Dynamics.b2World,
            b2MassData = Box2D.Collision.Shapes.b2MassData,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
            b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


/* The title screen is added to the scene graph when it becomes
 * a child of the main application. When this class is instantiated,
 * it adds the start button as a child.
 */

exports = Class(ui.View, function (supr) {
    this.init = function (opts) {
        opts = merge(opts, {
            //x: 0,
            //y: 0
        });
        supr(this, 'init', [opts]);
        
        var Canvas = device.get('Canvas');
        this._canvas = new Canvas({width: baseWidth, height: baseHeight});
        this._ctx = this._canvas.getContext('2d');
        
        this.threshold = 220;//210;
        
        this.liquid_color = {r:255,g:0,b:0}; 
        this.cycle = 0;
        
        this.on("liquid:add", bind(this,this.addParticle));
    };

    this.build = function() {
        
    };
    
    
    this.addParticle = function(){
        
        var particle = new LiquidParticle({
           x: 30,
           y: 105,
           /*width: 40,
           height: 40,*/
           circle_size: 35,
           bodyType: "dynamic",            
           superview: this
        });
        
        var velocityFactor = 10;
        // var randVelocity = Math.round(Math.random()*velocityFactor*2)-velocityFactor;
        var randVelocity = Math.round(0.7*velocityFactor*2)-velocityFactor;
  
        particle.bodyB2d.SetLinearVelocity(new b2Vec2(randVelocity,0))
        
    }
    
    this.metaballize = function (ctx){
        
        var imageData = this._ctx.getImageData(0,0,baseWidth,baseHeight),
        pix = imageData.data;
        
        for (var i = 0, n = pix.length; i <n; i += 4) {
            if(pix[i+3]<this.threshold){
               pix[i+3]/=6;
                if(pix[i+3]>this.threshold/4){
                    pix[i+3]=0;
                }
            }
        }
        //this._ctx.clearRect(0,0, baseWidth, baseHeight);
        this._ctx.putImageData(imageData, 0, 0);
        //this._canvas.putImageData(imageData, 0, 0);
    }
    
    this.render = function(ctx){
        //this._ctx.clearRect(0,0, baseWidth, baseHeight);
        //this._ctx.clearRect(0,0,baseWidth,baseHeight);
       var len = this.getSubviews().length;
       if (len > 0){
           //this.boxBlurCanvasRGBA(this._ctx, 0,0,baseWidth,baseHeight, 6, 1);
           this.metaballize();
           ctx.drawImage(this._canvas,0,0,baseWidth,baseHeight);
           this._ctx.clearRect(0,0, baseWidth, baseHeight);
       };
    };
    
    this.setWorld = function(world){
        this.world = world;
    };
    
    this.getWorld = function(){
        return this.world;
    };
    
});
