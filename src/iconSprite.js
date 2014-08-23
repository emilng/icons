var util = require('./util.js');

var IconSprite = function(fontName, cp, x, y, width, height, fontSize, color) {
  this.fontName = fontName;
  this.char = util.getUnicodeCharacter(cp);
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.fontSize = fontSize;
  this.color = color;
}

IconSprite.prototype.draw = function(ctx) {
  ctx.save();
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillStyle = this.color;
  ctx.font = this.fontSize + 'px ' + this.fontName;
  if (IconSprite.debug) {
    ctx.strokeStyle = 'rgb(255, 0, 0)';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
  ctx.fillText(this.char, this.x + (this.width/2), this.y + (this.height/2));
  ctx.restore();
};

module.exports = IconSprite;