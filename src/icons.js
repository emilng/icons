var util = require('./util.js');

window.onload = function(event){
  console.log('page loaded');
  var canvas = document.getElementById('view_container');
  var ctx = canvas.getContext('2d');
  var height = 640;
  var width = 640;
  var shade;

  // var arrow = '\u2B06';
  var arrow = '\uE767';
  var down_arrow = '\uE764';
  var drops = '\u1F4A6';

  var drops = util.getUnicodeCharacter(0x1F4A6);
  console.log(drops);

  var render = function() {
    shade = Math.round(Math.random()*255);
    ctx.fillStyle = "rgba(" +shade + "," + shade + "," + shade + "," + Math.random() + ")";
    ctx.font = Math.ceil(Math.random()*300) + 'px "Entypo"';

    var tx = Math.random()*width;
    var ty = Math.random()*height;
    ctx.fillText(drops, tx, ty);
    
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
};


