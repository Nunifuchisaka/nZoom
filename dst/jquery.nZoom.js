/*!
  
  jquery.nZoom.js
  
  Version: 0.1.0
  Author: Nunifuchisaka(nunifuchisaka@gmail.com)
  Website: http://nunifuchisaka.com/w/n-zoom/demo
  Repository: https://github.com/Nunifuchisaka/nZoom
  
*/
;(function($, window, document, undefined){
'use strict';

$.fn.nZoom = function( opts ){
  var self = this;
  return this.each(function( i, el ){
    var _opts = $.extend({
      i: i,
      el: el
    }, opts);
    new nZoom(_opts);
  });
}



/*
## nZoom
*/

function nZoom( opts ){
  var self = this;
  _.bindAll(this, "setLargeImg", "enable", "disable", "grabStart", "grabMove", "grabEnd");
  this.opts = $.extend({
    duration: 500
  }, opts);
  
  this.$el = $(this.opts.el);
  this.$img = this.$el.find(".nZoom__img");
  this.$img_ = this.$img.children("img");
  this.$enable = this.$el.find(".nZoom__enable");
  
  this.el_width = this.$el.width();
  this.el_width_half = Math.round(this.el_width/2);
  this.el_height = this.$el.height();
  this.el_height_half = Math.round(this.el_height/2);
  
  this.status = {
    enabled: false,
    grabbing: false
  };
  
  this.coordinate = {
    x: 0,
    y: 0,
    top: 0,
    left: 0
  };
  
  this.setLargeImg();
  
  this.$enable.click(this.enable);
  this.$el
    .on({
      //"click.nzoom": this.disable,
      "mousedown.nzoom": this.grabStart,
      "mousemove.nzoom": this.grabMove,
      "mouseup.nzoom": this.grabEnd,
      "mouseleave.nzoom": this.disable
    });
}



/*
## setLargeImg
*/

nZoom.prototype.setLargeImg = function(){
  this.$lImg = this.$img_.clone();
  this.$lImg
    .removeAttr("width height")
    .addClass("nZoom__lImg")
    .fadeOut(0);
  
  this.$img.append(this.$lImg);
  
  this.lImg_width = this.$lImg.width();
  this.lImg_height = this.$lImg.height();
  
  this.$lImg.css({
    top: this.el_height_half - Math.round(this.lImg_height/2),
    left: this.el_width_half - Math.round(this.lImg_width/2)
  });
}



/*
## drag
*/

nZoom.prototype.grabStart = function(e){
  if(this.status.enabled){
    this.status.grabbing = true;
    this.coordinate = {
      x: e.clientX,
      y: e.clientY,
      top: parseInt(this.$lImg.css("top")),
      left: parseInt(this.$lImg.css("left"))
    }
  }
}


nZoom.prototype.grabMove = function(e){
  if(this.status.grabbing){
    var x = this.coordinate.left + (-1 * (this.coordinate.x - e.clientX));
    var y = this.coordinate.top + (-1 * (this.coordinate.y - e.clientY));
    
    var min_x = -1 * (this.lImg_width - this.el_width),
        min_y = -1 * (this.lImg_height - this.el_height);
    
    if( x < min_x ) x = min_x;
    if( y < min_y ) y = min_y;
    
    if( x > 0 ) x = 0;
    if( y > 0 ) y = 0;
    
    this.$lImg.css({
      top: y,
      left: x
    });
  }
}


nZoom.prototype.grabEnd = function(e){
  if(this.status.grabbing){
    this.status.grabbing = false;
  }
}



/*
## enable
*/

nZoom.prototype.enable = function(){
  this.status.enabled = true;
  this.$el.addClass("is_enabled");
  this.$lImg.fadeIn(this.opts.duration);
  this.$enable.fadeOut(this.opts.duration);
  return false;
}



/*
## disable
*/

nZoom.prototype.disable = function(){
  this.status.enabled = false;
  this.grabEnd();
  this.$el.removeClass("is_enabled");
  this.$lImg.fadeOut(this.opts.duration);
  this.$enable.fadeIn(this.opts.duration);
  return false;
}

})(jQuery, this, this.document);