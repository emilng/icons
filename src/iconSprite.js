var util = require('./util.js');

var IconSprite = function(fontName, cp, options) {
  this.fontName = fontName;
  this.char = util.getUnicodeCharacter(cp);
  this.update(options);
}

IconSprite.prototype.update = function(options) {
  this.x = (options.x !== undefined) ? options.x : 0;
  this.y = (options.y !== undefined) ? options.y : 0;
  this.rotation = (options.rotation !== undefined) ? options.rotation : 0;
  this.width = (options.width !== undefined) ? options.width : 20;
  this.height = (options.height !== undefined) ? options.height : 20;
  this.fontSize = (options.fontSize !== undefined) ? options.fontSize : 20;
  this.color = (options.color !== undefined) ? options.color : 'rgb(0,0,0)';

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  var ctx = this.canvas.getContext('2d');
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = this.color;
  ctx.font = this.fontSize + 'px ' + this.fontName;

  if (IconSprite.debug) {
    ctx.strokeStyle = 'rgb(255, 0, 0)';
    ctx.strokeRect(0, 0, this.width, this.height);
  }

  ctx.translate(this.width/2, this.height/2);
  ctx.rotate(this.rotation);
  ctx.fillText(this.char, 0, 0);
}

IconSprite.prototype.draw = function(ctx) {
  ctx.drawImage(this.canvas, this.x, this.y);
};

module.exports = IconSprite;