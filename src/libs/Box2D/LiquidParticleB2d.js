import src.libs.Box2D.Box2D as Box2D;
import ui.ImageView;
import ui.resource.Image as Image;
var waterdrop_img = new Image({url: "resources/images/water_drop.png"});

import device;

var boundsWidth = 1024;
var boundsHeight = 576;
var baseWidth = device.screen.width * (boundsHeight / device.screen.height) // 864
var baseHeight = boundsHeight; 
var UIscale = device.screen.height / baseHeight;
var rightBoundary = baseWidth; //right boundary for screen wrapping
var leftBoundary = 0;

exports = Class(ui.ImageView, function (supr) {

    this.init = function (opts) {
        
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
                    
        opts = merge(opts, {
            x: 0,
            y: 0,
            density : 1, // 1
            friction: 0.3, //0.5
            restitution: 0.15, //0.2
            bodyType: "static",
            circle_size: 20,
            image: waterdrop_img
        });
        
        // Scale for Box2D objects
        this.scale = 30;
        
        // Body type (static || dynamic)
        this._bodyType = opts.bodyType;    
            
        // new fixture
        this.fixDef = new b2FixtureDef;
        this.fixDef.density = opts.density;
        this.fixDef.friction = opts.friction;
        this.fixDef.restitution = opts.restitution;
        
        this._size = opts.circle_size;
        
        
        
        // set the shape as a circle...
        
        this.fixDef.shape =  new b2CircleShape((this._size/16)/this.scale);
        
        //this.fixDef.shape = new b2PolygonShape;
        // ... as a box
        //this.fixDef.shape.SetAsBox((opts.width / 2) / this.scale, (opts.height / 2) / this.scale);

        // new virtual body
        this.bodyDef = new b2BodyDef;
        
        if(this._bodyType == "static"){
            this.bodyDef.type = b2Body.b2_staticBody;
        } else {
            this.bodyDef.type = b2Body.b2_dynamicBody;
        }
        
        supr(this, 'init', [opts]);
        
        
        this._ctx = this.getSuperview()._ctx;
        
        // set the initial position of the virtual body
        this.bodyDef.position.x = (opts.x + (opts.circle_size / 2)) / this.scale; 
        this.bodyDef.position.y = (opts.y + (opts.circle_size / 2)) / this.scale;
        
        this.style.width = this._size;
        this.style.height = this._size;

        // we have to change the anchor to make the rotations correctly
        this.style.anchorX = this._size / 2;
        this.style.anchorY = this._size / 2;
        
        //  create the "physic body" 
        this.createPhysics(opts.superview);
        
        // some logic
        this.on('view:destroy', bind(this, function(){
             this.destroyObject();
        }));
        
        // more logic
        /*this.on('InputSelect', bind(this, function(){
             this.destroyObject();
        }));*/
    };
    
    this.destroyObject = function(){
        // when we remove the object from the SuperView, we have to destroy 
        // the virtual body of the world.
        this.bodyB2d.GetWorld().DestroyBody(this.bodyB2d);
        this.removeFromSuperview();    
    };
    
    // update the positions on each tick
    this.tick = function(dt){
        var b2Body = Box2D.Dynamics.b2Body;
        if (this.bodyB2d.GetType() == b2Body.b2_dynamicBody){
            // get the virtual position
            position = this.bodyB2d.GetPosition();
            
            // set the angle in radians
            this.style.r = this.bodyB2d.GetAngle();
            
            // set the position
            this.style.x = (position.x * this.scale) - (this.style.width/2);
            this.style.y = (position.y * this.scale) - (this.style.height/2);
        }
        
        //this._ctx.beginPath();
        /*
        var colors = this.getSuperview().liquid_color;
                 
        var grad = this._ctx.createRadialGradient(this.style.x, this.style.y, 1, this.style.x, this.style.y, this._size);
        grad.addColorStop(0, 'rgba(' + colors.r +',' + colors.g + ',' + colors.b + ',1)');
        grad.addColorStop(1, 'rgba(' + colors.r +',' + colors.g + ',' + colors.b + ',1)');
        this._ctx.fillStyle = grad;
        this._ctx.arc(this.style.x, this.style.y, this._size, 0, Math.PI*2);
        this._ctx.fill();*/
        
    };
    this.render = function(){
        this.getImage().render(this._ctx, this.style.x, this.style.y, this.style.width, this.style.height);
        //this._ctx.drawImage(img, this.style.x, this.style.y, this.style.width, this.style.height);
    }
    /*this.render = function(ctx){
        
        this._ctx.beginPath();
        var colors = this.getSuperview().liquid_color;
                 
        var grad = this._ctx.createRadialGradient(this.style.x, this.style.y, 1, this.style.x, this.style.y, this._size);
        grad.addColorStop(0, 'rgba(' + colors.r +',' + colors.g + ',' + colors.b + ',1)');
        grad.addColorStop(1, 'rgba(' + colors.r +',' + colors.g + ',' + colors.b + ',0)');
        this._ctx.fillStyle = grad;
        this._ctx.arc(this.style.x, this.style.y, this._size, 0, Math.PI*2);
        this._ctx.fill();
    }*/
    
    /*
     TODO: Make these functions work with the b2dBody,
           instead with the bodyDef.
     
    this.setX = function(x){
        this.style.x = x;
        this.bodyDef.position.x = x;
    };
    
    this.setY = function(y){
        this.style.y = y;
        this.bodyDef.position.y = y;
    };
    */
   
    this.getFixtureDef = function(){
        return this.fixDef;
    }
    
    this.getB2dBodyDef = function(){
        return this.bodyDef;
    }
    
    this.getFixture = function(){
        return this.fixture;
    }
    
    this.getB2dBody = function(){
        return this.bodyB2d;
    }
    
    this.createPhysics = function(superview){
        this.bodyB2d = superview.world.CreateBody(this.bodyDef);
        this.fixture = this.bodyB2d.CreateFixture(this.fixDef);
    }
    
 });