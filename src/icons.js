var util = require('./util.js');
var IconSprite = require('./iconSprite.js');

window.onload = function(event){
  console.log('page loaded');
  var canvas = document.getElementById('view_container');
  var ctx = canvas.getContext('2d');
  var height = canvas.height;
  var width = canvas.width;

  // util.drawGrid(ctx, 10, 10, 'rgba(0,0,0,0.5)');

  var arrows = [];

  var newArrow = function() {
    var size = Math.ceil(Math.random()*400);
    var shade = Math.round(Math.random()*255);
    var color = "rgba(" +shade + "," + shade + "," + shade + "," + Math.random() + ")";
    var x = Math.ceil(Math.random()*(width-size));
    var y = Math.ceil(Math.random()*height);
    var iconSprite = new IconSprite('Entypo', 0x1F506, x, y, size, size, size, color); // sun
    // var iconSprite = new IconSprite('Entypo', 0x2601, x, y, size, size, size, color); // cloud
    // var iconSprite = new IconSprite('Entypo', 0x1F4A6, x, y, size, size, size, color); // rain drop
    // var iconSprite = new IconSprite('Entypo', 0x266A, x, y, size, size, size, color); // music note
    // var iconSprite = new IconSprite('Entypo', 0x2191, x, y, size, size, size, color); // thin up arrow
    // var iconSprite = new IconSprite('Entypo', 0x2B06, x, y, size, size, size, color); // up arrow
    iconSprite.speed = 1/size * 120;
    return iconSprite;
  };

  var render = function() {
    ctx.clearRect(0, 0, width, height);
    if (arrows.length < 300) {
      arrows.push(newArrow());
    }
    var len = arrows.length;
    for(var i = 0; i < len; i++) {
      var arrow = arrows[i];
      if ((arrow.y + arrow.height) < 0) {
        arrow = arrows[i] = newArrow();
      } else {
        arrow.y = arrow.y - arrow.speed;
      }
      arrow.draw(ctx);
    }
    
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};


