/*
## nZoomCarousel
*/

window.nZoomCarousel = function ( opts ){
  _.bindAll(this, "setCurrentSlide", "enable");
  this.opts = $.extend({
    
  }, opts);
  
  this.$el = $(this.opts.el);
  this.$enable = this.$el.find(".nZoom__enable");
  
  this.currentSlide = 0;
  
  this.$zoom = this.$el.find(".nZoom");
  this.$zoom.nZoom();
  
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
  return false;
}
