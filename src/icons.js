var util = require('./util.js');
var IconSprite = require('./iconSprite.js');
var Stats = require('../lib/stats.js');

window.onload = function(event){
  console.log('page loaded');
  var canvas = document.getElementById('view_container');
  var ctx = canvas.getContext('2d');
  var height = canvas.height;
  var width = canvas.width;

  // util.drawGrid(ctx, 10, 10, 'rgba(0,0,0,0.5)');

  var arrows = [];

  var newArrow = function(instance) {
    var size = Math.ceil(Math.random()*400);
    var shade = Math.round(Math.random()*255);
    var spriteOptions = {
      x: Math.ceil(Math.random()*(width-size)),
      y: Math.ceil(Math.random()*height),
      width: size,
      height: size,
      fontSize: size,
      color: "rgba(" +shade + "," + shade + "," + shade + "," + Math.random() + ")"
    };
    var iconSprite;
    if (instance !== undefined) {
      instance.update(spriteOptions);
      iconSprite = instance;
    } else {
      iconSprite = new IconSprite('Entypo', 0x2B06, spriteOptions); // up arrow
    }
      // iconSprite = new IconSprite('Entypo', 0x1F506, spriteOptions); // sun
      // iconSprite = new IconSprite('Entypo', 0x2601, spriteOptions); // cloud
      // iconSprite = new IconSprite('Entypo', 0x1F4A6, spriteOptions); // rain drop
      // iconSprite = new IconSprite('Entypo', 0x266A, spriteOptions); // music note
      // iconSprite = new IconSprite('Entypo', 0x2191, spriteOptions); // thin up arrow
    iconSprite.speed = 1/size * 120;
    return iconSprite;
  };

  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild( stats.domElement );

  // set fps
  var fps = 30;
  var fpsInterval = 1000/fps;
  var previousTime = Date.now();
  var currentTime = previousTime;
  var elapsedTime = 0;

  var render = function() {

    currentTime = Date.now();
    elapsedTime = currentTime - previousTime;

    if (elapsedTime > fpsInterval) {
      stats.begin();

      ctx.clearRect(0, 0, width, height);
      if (arrows.length < 25) {
        arrows.push(newArrow());
      }
      var len = arrows.length;
      for(var i = 0; i < len; i++) {
        var arrow = arrows[i];
        if ((arrow.y + arrow.height) < 0) {
          newArrow(arrow);
        } else {
          arrow.y = arrow.y - arrow.speed;
        }
        arrow.draw(ctx);
      }
      previousTime = currentTime - (elapsedTime % fpsInterval);

      stats.end();
    }

    
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};


