// utility methods

var util = {
  // function shamelessly stolen from 
  // http://stackoverflow.com/questions/7126384/expressing-utf-16-unicode-characters-in-javascript
  getUnicodeCharacter: function(cp) {
      if (cp >= 0 && cp <= 0xD7FF || cp >= 0xE000 && cp <= 0xFFFF) {
          return String.fromCharCode(cp);
      } else if (cp >= 0x10000 && cp <= 0x10FFFF) {

          // we substract 0x10000 from cp to get a 20-bits number
          // in the range 0..0xFFFF
          cp -= 0x10000;

          // we add 0xD800 to the number formed by the first 10 bits
          // to give the first byte
          var first = ((0xffc00 & cp) >> 10) + 0xD800

          // we add 0xDC00 to the number formed by the low 10 bits
          // to give the second byte
          var second = (0x3ff & cp) + 0xDC00;

          return String.fromCharCode(first) + String.fromCharCode(second);
      }
  },
  drawGrid: function(ctx, hspacing, vspacing, style) {
    ctx.strokeStyle = style;
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var i = 1;
    // draw vertical lines
    while (i < width) {
      ctx.beginPath();
      ctx.moveTo(i*hspacing, 0);
      ctx.lineTo(i*hspacing, height);
      ctx.stroke();
      i++;
    }

    //draw horizontal lines
    i = 1;
    while(i < height) {
      ctx.beginPath();
      ctx.moveTo(0, i*vspacing);
      ctx.lineTo(width, i*vspacing);
      ctx.stroke();
      i++;
    }
  }
}

module.exports = util;