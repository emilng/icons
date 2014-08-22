(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.onload = function(event){
  console.log('page loaded');
  var canvas = document.getElementById('view_container');
  var ctx = canvas.getContext('2d');
  var height = 640;
  var width = 640;
  var shade;

  // function shamelessly stolen from 
  // http://stackoverflow.com/questions/7126384/expressing-utf-16-unicode-characters-in-javascript
  function getUnicodeCharacter(cp) {

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
  }

  // var arrow = '\u2B06';
  var arrow = '\uE767';
  var down_arrow = '\uE764';
  var drops = '\u1F4A6';

  var drops = getUnicodeCharacter(0x1F4A6);
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



},{}]},{},[1]);