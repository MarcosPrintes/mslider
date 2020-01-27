// encapsula as funções
var mSliderPlugin = (function() {
	var mslider = function(settings) {
		this.def = {
			slider: $('.slider'),
			sliderInner:$('.slider-inner'),
			dotsWrapper: $('.dots-wrapper'),
			arrowLeft: $('.arrow-left'),
			arrowRight: $('.arrow-right'),
			transition: {
				speed: 300,
				easing: ''
			},
			swipe: true,
			dots: true,	
			arrows: true,
			slidesToShow: 1,
			autoHeight: true,
			afterChangeSlide: function afterChangeSlide(){}
		}

		$extendObj(this.def, settings);
		
		this.init();
	}

	/**
	** init - inicializa o slider
	**/
	mslider.prototype.init = function() {
		var mSliderScope = this;

		FIRST_CLONE = "firstClone";
		LAST_CLONE =  "lastClone";
		this.currentSlide = 1;
		this.sizeItems = this.def.slider.querySelectorAll('.slide').length;		
		var cloneFirst = this.def.slider.querySelectorAll('.slide')[0].cloneNode(true)
	  var cloneLast  = this.def.slider.querySelectorAll('.slide')[this.sizeItems - 1].cloneNode(true)
	  cloneFirst.id  = FIRST_CLONE;
	  cloneLast.id   = LAST_CLONE;
	  this.def.sliderInner.appendChild(cloneFirst); // insere clone do primeiro no fim
	  this.def.sliderInner.insertBefore(cloneLast, this.def.sliderInner.firstChild) // insere clone do últim no início
		this.sizeItems = this.def.slider.querySelectorAll('.slide').length;		
	 	

	 	this.setDimensions();
	 	
	 	if(this.def.arrows){
		 	this.setArrowNavigation('prev', navToPrev);
		 	this.setArrowNavigation('next', navToNext);	 		
	 	}

	 	this.def.sliderInner.style.left =  "-"+this.currentSlideWidth +"px";

		window.addEventListener('resize', function(){
			mSliderScope.setDimensions();
		})

		function navToNext () {
			 if (mSliderScope.currentSlide >= mSliderScope.sizeItems - 1) return;
			 mSliderScope.def.sliderInner.style.transition = 'all .3s ease';
			 mSliderScope.currentSlide += 1;
			 mSliderScope.def.sliderInner.style.left = (-mSliderScope.currentSlide * mSliderScope.currentSlideWidth)+"px";
		}

		function navToPrev () {
			if (mSliderScope.currentSlide <= 0) return;
			mSliderScope.def.sliderInner.style.transition = 'all .3s ease';
		  mSliderScope.currentSlide -= 1;
		  mSliderScope.def.sliderInner.style.left = (-mSliderScope.currentSlide * mSliderScope.currentSlideWidth)+"px";
		}

		this.def.sliderInner.addEventListener('transitionend', function(){
			if(mSliderScope.def.slider.querySelectorAll('.slide')[mSliderScope.currentSlide].id == LAST_CLONE){
				mSliderScope.def.sliderInner.style.transition = 'none';
				mSliderScope.currentSlide = mSliderScope.sizeItems  -2;
				mSliderScope.def.sliderInner.style.left = (-mSliderScope.currentSlide * mSliderScope.currentSlideWidth)+"px";
			}

			if(mSliderScope.def.slider.querySelectorAll('.slide')[mSliderScope.currentSlide].id == FIRST_CLONE){
  			 mSliderScope.def.sliderInner.style.transition = 'none';				 
				 mSliderScope.currentSlide = mSliderScope.sizeItems - mSliderScope.currentSlide ;
				 mSliderScope.def.sliderInner.style.left = (-mSliderScope.currentSlide * mSliderScope.currentSlideWidth)+"px";
			}


		})
}

		mslider.prototype.setDimensions = function(argument){
			this.def.slider.querySelectorAll('.slide').forEach(element => {
			element.style.width = window.innerWidth+"px";
		})
 			this.currentSlideWidth = this.def.slider.querySelectorAll('.slide')[0].clientWidth;
			this.def.sliderInner.style.width =  (this.sizeItems * this.currentSlideWidth) + 2 +'px';
		};

		mslider.prototype.setArrowNavigation = function(text, fn){
			var nav = document.createElement('button');
			nav.innerHTML = text;
			nav.addEventListener('click', fn , false)
			this.def.slider.appendChild(nav);
		};

	
	return mslider;
})();

// Merge de possíveis configurações do slider com as pré-definidas
function $extendObj(_def, addons	) {
	if(typeof addons !== "undefined") {
		for(prop in _def){
			if(addons[prop] != undefined) {
				_def[prop] = addons[prop]
			}
		}
	}
}

var slider = new mSliderPlugin({
	slider: $('.slider'),
	sliderInner:$('.slider-inner'),
	dotsWrapper: $('.dots-wrapper'),
	arrows: true,
	arrowLeft: $('.arrow-left'),
	arrowRight: $('.arrow-right'),
	dots: true,
	slidesToShow: 1
});


