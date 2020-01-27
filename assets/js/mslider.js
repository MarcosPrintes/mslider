// encapsula as funções
var mSliderPlugin = (function() {
	var mslider = function(settings) {
		this.settings = {
			slider: $('.slider'),
			sliderTrack:$('.slider-inner'),
			dotsWrapper: $('.dots-wrapper'),
			arrowLeft: $('.arrow-left'),
			arrowRight: $('.arrow-right'),
			transition: {
				speed: 300,
				easing: ''
			},
			autoPlay: true,
			autoPlaySpeed: 3000,
			swipe: true,
			dots: true,	
			arrows: true,
			slidesToShow: 1,
			// autoHeight: true,
			afterChangeSlide: function afterChangeSlide(){}
		}

		$extendObj(this.settings, settings);
		
		this.init();
	}

	/**
	** initialize slider
	**/
	mslider.prototype.init = function() {
		var _this   = this;
		TRANSITION = 'left ' + this.settings.transition.speed / 1000 + 's ' + this.settings.transition.easing;
		this.settings.slider = this.settings.slider.querySelector('.slider');
		this.settings.slider.innerHTML = '<div class="slider-track">' + this.settings.slider.innerHTML + '</div>';
		this.settings.sliderTrack      = this.settings.slider.querySelector('.slider-track');
		this.left = 0;
		this.currentItem = 1;
		this.originSize = this.settings.sliderTrack.querySelectorAll('.inner-item').length; 
		var startClones  = [].slice.call(this.settings.sliderTrack.querySelectorAll('.inner-item')).slice(0, this.settings.slidesToShow)
		var endClones = [].slice.call(this.settings.sliderTrack.querySelectorAll('.inner-item')).reverse().slice(0, this.settings.slidesToShow);
	
		cloneElements(startClones, "end")
		cloneElements(endClones, "start")
			
		this.setArrowNavigation("prev", 'nav-prev', navToPrev);
		this.setArrowNavigation("next", 'nav-next', navToNext);
		this.setDots(dotClick)

		this.dimensions();
		
		// set track initial position
		this.left = (this.settings.slidesToShow * this.slideWidth);
		this.originleft = (this.settings.slidesToShow * this.slideWidth);
		this.settings.sliderTrack.style.transition = TRANSITION;
		this.settings.sliderTrack.style.left = -this.left+"px";

		// update dimensions on window resize
		window.addEventListener('resize', function () {
			_this.dimensions();
		})

		function cloneElements (array, insertOn) {
			array.forEach( function(element) {
				var clone = element.cloneNode()
				clone.classList += " cloned"
				clone.innerHTML =  element.innerHTML
				if(insertOn == "start") {
	 			 _this.settings.sliderTrack.insertBefore(clone, _this.settings.sliderTrack.firstChild)
				} else {
					_this.settings.sliderTrack.appendChild(clone)
				}
			});
		}

		this.settings.sliderTrack.addEventListener('transitionend', function() {
			if(_this.currentItem >= _this.originSize + 1) {
				_this.settings.sliderTrack.style.transition = 'none';
    		_this.left = _this.settings.slidesToShow * _this.slideWidth;
    		_this.settings.sliderTrack.style.left = -_this.left+'px';
		    _this.currentItem = 1;
			}
			if (_this.left <= 0) {
				_this.settings.sliderTrack.style.transition = 'none';
    	  _this.left = _this.originSize * (_this.slideWidth - _this.settings.slidesToShow );
    		_this.settings.sliderTrack.style.left = -_this.left+'px';
		    _this.currentItem = 10;
			}
		})

		function navToNext() {
			if (_this.currentItem >= _this.originSize + 1) return;
			_this.settings.sliderTrack.style.transition = TRANSITION;
			_this.currentItem ++;
			_this.left += _this.slideWidth;
			_this.settings.sliderTrack.style.left = -_this.left+"px";
		}

		function navToPrev() {
			if (_this.left <= 0) return;
			_this.settings.sliderTrack.style.transition = TRANSITION;
			_this.currentItem --;
			_this.left -= _this.slideWidth;
			_this.settings.sliderTrack.style.left = -_this.left+"px";
		} 
		
		if(this.settings.autoPlay) {
			setInterval(function(){
				_this.settings.slider.querySelector('.nav-next').click()
			}, _this.settings.autoPlaySpeed)					
		}

		function dotClick () {
			var current = this.id.split('-')[1] 
			_this.settings.sliderTrack.style.transition = TRANSITION;
		  _this.left = _this.originleft * current;
		  _this.settings.sliderTrack.style.left = -_this.left+"px";
	};


} /** init() **/

	mslider.prototype.dimensions = function() {
			[].slice.call(this.settings.sliderTrack.getElementsByTagName('div')).forEach(element => {
			element.style.width = (window.innerWidth / this.settings.slidesToShow)+"px";
			if(this.settings.slidesToShow > 1) {
				// element.style.padding  = '0px 5px';
			}
		})
		this.sizeItems = this.settings.sliderTrack.querySelectorAll('.inner-item').length;
		this.slideWidth = this.settings.sliderTrack.querySelectorAll('.inner-item')[0].offsetWidth;
		this.trackWidth = (this.settings.sliderTrack.querySelectorAll('.inner-item')[0].offsetWidth * this.sizeItems);
		this.settings.sliderTrack.style.width = (this.trackWidth) + 5 + "px" ;
	};

	mslider.prototype.setArrowNavigation = function(text, navClass, fn) {
		if(this.settings.arrows) {
			var nav = document.createElement('button');
			nav.innerHTML = text;
			nav.classList += navClass;
			nav.addEventListener('click', fn , false);
			this.settings.slider.appendChild(nav);
		}
	};

	mslider.prototype.setDots = function(fn) {
		var _this = this;
		if(this.settings.dots) {
			var qtyDots = 0;
			if(this.settings.slidesToShow == 1) {
				qtyDots = _this.originSize;
			}else{
				qtyDots = this.settings.slidesToShow;
			}

			var wrapperDots =  document.createElement('div');
			wrapperDots.className="dots-wrapper";
			for(var i = 0; i < qtyDots; i ++) {
				var dot = document.createElement('button');
				dot.innerHTML = "dot";
				dot.id = "dot-"+(i + 1);
				dot.addEventListener('click', fn);
				wrapperDots.appendChild(dot);
			}
			this.settings.slider.appendChild(wrapperDots);
		}
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
	slider: $('.wrapper-slider-1'),
	sliderTrack:$('.slider-inner'),
	dotsWrapper: $('.dots-wrapper'),
	arrows: true,
	arrowLeft: $('.arrow-left'),
	arrowRight: $('.arrow-right'),
	dots: true,
	slidesToShow: 1,
	autoPlay: false
});
