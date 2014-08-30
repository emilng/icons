var util = require('./util.js');
var IconTexture = require('./iconTexture.js');
var Stats = require('../lib/stats.js');
var pixi = require('../lib/pixi.dev.js');

window.onload = function(event){
  console.log('page loaded');

  var maxArrows = 200;

  var stageWidth = 640;
  var stageHeight = 640;

  var stage = new pixi.Stage(0xEEEEEE);
  var renderer = new pixi.autoDetectRenderer(stageWidth, stageHeight);
  document.body.appendChild(renderer.view);

  var maxSize = 400;
  var iconOptions = {
    width: maxSize,
    height: maxSize,
    fontSize: maxSize,
  };
  var arrowIconTexture = new IconTexture('Entypo', 0x2B05, iconOptions);
  var arrowTexture = pixi.Texture.fromCanvas(arrowIconTexture.canvas);

  var arrows = [];

  var initArrow = function(arrow) {
    if ((arrow === undefined) && (arrows.length < maxArrows)) {
      arrow = new pixi.Sprite(arrowTexture);
      arrows.push(arrow);
      stage.addChild(arrow);
    }
    if (arrow !== undefined) {
      var size = Math.ceil( Math.random() * 400 );
      arrow.width = size;
      arrow.height = size;
      arrow.position.x = Math.random() * stageWidth;
      arrow.position.y = Math.random() * stageHeight;

      arrow.tint = Math.random() * 0xFFFFFF;
      arrow.alpha = Math.random();
      var speed = 1/size * 120;
      var rotation = Math.random() * Math.PI * 2;
      arrow.rotation = rotation;
      arrow.speedx = Math.cos(rotation) * speed;
      arrow.speedy = Math.sin(rotation) * speed;
    }
  };

  var updateArrow = function(arrow) {
    var bounds = arrow.getBounds();
    if (((bounds.y + bounds.height) < 0) ||
        (bounds.y > stageHeight) ||
        (bounds.x + bounds.width < 0) ||
        (bounds.x > stageWidth)) {
      initArrow(arrow);
    } else {
      arrow.position.x = arrow.position.x - arrow.speedx;
      arrow.position.y = arrow.position.y - arrow.speedy;
    }
  }

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

  var animate = function() {
    currentTime = Date.now();
    elapsedTime = currentTime - previousTime;

    if (elapsedTime > fpsInterval) {
      stats.begin();

      initArrow();

      for (var i = 0; i < arrows.length; i++) {
        updateArrow(arrows[i]);
      }

      renderer.render(stage);

      stats.end();
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

};


