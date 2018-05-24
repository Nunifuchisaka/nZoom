/*
## nZoomCarousel
*/

window.nZoomCarousel = function ( opts ){
  _.bindAll(this, "setCurrentSlide", "enable", "disable");
  this.opts = $.extend({
    duration: 500
  }, opts);
  
  this.$el = $(this.opts.el);
  this.$enable = this.$el.find(".nZoom__enable");
  
  this.currentSlide = 0;
  
  this.$zoom = this.$el.find(".nZoom");
  var zoom = this.$zoom.nZoom();
  zoom.on("disable", this.disable);
  
  this.$enable.click(this.enable);
}


/*
## setCurrentSlide
*/

nZoomCarousel.prototype.setCurrentSlide = function(currentSlide){
  this.currentSlide = currentSlide;
}


/*
## enable
*/

nZoomCarousel.prototype.enable = function(){
  this.$zoom.eq( this.currentSlide ).nZoom("enable");
  this.$enable.fadeOut(this.opts.duration);
  return false;
}


/*
## disable
*/

nZoomCarousel.prototype.disable = function(){
  this.$enable.fadeIn(this.opts.duration);
}
