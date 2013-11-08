(function( jQuery, undefined ) {
		
	/*
	 * Slider object.
	 */
	jQuery.Slider 				= function( options, element ) {
	
		this.jQueryel	= jQuery( element );
		
		this._init( options );
		
	};
	
	jQuery.Slider.defaults 		= {
		current		: 0, 	// index of current slide
		bgincrement	: 100,	// increment the bg position (parallax effect) when sliding
		autoplay	: true,// slideshow on / off
		interval	: 4000  // time between transitions
    };
	
	jQuery.Slider.prototype 	= {
		_init 				: function( options ) {
			
			this.options 		= jQuery.extend( true, {}, jQuery.Slider.defaults, options );
			
			this.jQueryslides		= this.jQueryel.children('div.da-slide');
			this.slidesCount	= this.jQueryslides.length;
			
			this.current		= this.options.current;
			
			if( this.current < 0 || this.current >= this.slidesCount ) {
			
				this.current	= 0;
			
			}
			
			this.jQueryslides.eq( this.current ).addClass( 'da-slide-current' );
			
			var jQuerynavigation		= jQuery( '<nav class="da-dots"/>' );
			for( var i = 0; i < this.slidesCount; ++i ) {
			
				jQuerynavigation.append( '<span/>' );
			
			}
			jQuerynavigation.appendTo( this.jQueryel );
			
			this.jQuerypages			= this.jQueryel.find('nav.da-dots > span');
			this.jQuerynavNext		= this.jQueryel.find('span.da-arrows-next');
			this.jQuerynavPrev		= this.jQueryel.find('span.da-arrows-prev');
			
			this.isAnimating	= false;
			
			this.bgpositer		= 0;
			
			this.cssAnimations	= Modernizr.cssanimations;
			this.cssTransitions	= Modernizr.csstransitions;
			
			if( !this.cssAnimations || !this.cssAnimations ) {
				
				this.jQueryel.addClass( 'da-slider-fb' );
			
			}
			
			this._updatePage();
			
			// load the events
			this._loadEvents();
			
			// slideshow
			if( this.options.autoplay ) {
			
				this._startSlideshow();
			
			}
			
		},
		_navigate			: function( page, dir ) {
			
			var jQuerycurrent	= this.jQueryslides.eq( this.current ), jQuerynext, _self = this;
			
			if( this.current === page || this.isAnimating ) return false;
			
			this.isAnimating	= true;
			
			// check dir
			var classTo, classFrom, d;
			
			if( !dir ) {
			
				( page > this.current ) ? d = 'next' : d = 'prev';
			
			}
			else {
			
				d = dir;
			
			}
				
			if( this.cssAnimations && this.cssAnimations ) {
				
				if( d === 'next' ) {
				
					classTo		= 'da-slide-toleft';
					classFrom	= 'da-slide-fromright';
					++this.bgpositer;
				
				}
				else {
				
					classTo		= 'da-slide-toright';
					classFrom	= 'da-slide-fromleft';
					--this.bgpositer;
				
				}
				
				this.jQueryel.css( 'background-position' , this.bgpositer * this.options.bgincrement + '% 0%' );
			
			}
			
			this.current	= page;
			
			jQuerynext			= this.jQueryslides.eq( this.current );
			
			if( this.cssAnimations && this.cssAnimations ) {
			
				var rmClasses	= 'da-slide-toleft da-slide-toright da-slide-fromleft da-slide-fromright';
				jQuerycurrent.removeClass( rmClasses );
				jQuerynext.removeClass( rmClasses );
				
				jQuerycurrent.addClass( classTo );
				jQuerynext.addClass( classFrom );
				
				jQuerycurrent.removeClass( 'da-slide-current' );
				jQuerynext.addClass( 'da-slide-current' );
				
			}
			
			// fallback
			if( !this.cssAnimations || !this.cssAnimations ) {
				
				jQuerynext.css( 'left', ( d === 'next' ) ? '100%' : '-100%' ).stop().animate( {
					left : '0%'
				}, 1000, function() { 
					_self.isAnimating = false; 
				});
				
				jQuerycurrent.stop().animate( {
					left : ( d === 'next' ) ? '-100%' : '100%'
				}, 1000, function() { 
					jQuerycurrent.removeClass( 'da-slide-current' ); 
				});
				
			}
			
			this._updatePage();
			
		},
		_updatePage			: function() {
		
			this.jQuerypages.removeClass( 'da-dots-current' );
			this.jQuerypages.eq( this.current ).addClass( 'da-dots-current' );
		
		},
		_startSlideshow		: function() {
		
			var _self	= this;
			
			this.slideshow	= setTimeout( function() {
				
				var page = ( _self.current < _self.slidesCount - 1 ) ? page = _self.current + 1 : page = 0;
				_self._navigate( page, 'next' );
				
				if( _self.options.autoplay ) {
				
					_self._startSlideshow();
				
				}
			
			}, this.options.interval );
		
		},
		page				: function( idx ) {
			
			if( idx >= this.slidesCount || idx < 0 ) {
			
				return false;
			
			}
			
			if( this.options.autoplay ) {
			
				clearTimeout( this.slideshow );
				this.options.autoplay	= false;
			
			}
			
			this._navigate( idx );
			
		},
		_loadEvents			: function() {
			
			var _self = this;
			
			this.jQuerypages.on( 'click.cslider', function( event ) {
				
				_self.page( jQuery(this).index() );
				return false;
				
			});
			
			this.jQuerynavNext.on( 'click.cslider', function( event ) {
				
				if( _self.options.autoplay ) {
				
					clearTimeout( _self.slideshow );
					_self.options.autoplay	= false;
				
				}
				
				var page = ( _self.current < _self.slidesCount - 1 ) ? page = _self.current + 1 : page = 0;
				_self._navigate( page, 'next' );
				return false;
				
			});
			
			this.jQuerynavPrev.on( 'click.cslider', function( event ) {
				
				if( _self.options.autoplay ) {
				
					clearTimeout( _self.slideshow );
					_self.options.autoplay	= false;
				
				}
				
				var page = ( _self.current > 0 ) ? page = _self.current - 1 : page = _self.slidesCount - 1;
				_self._navigate( page, 'prev' );
				return false;
				
			});
			
			if( this.cssTransitions ) {
			
				if( !this.options.bgincrement ) {
					
					this.jQueryel.on( 'webkitAnimationEnd.cslider animationend.cslider OAnimationEnd.cslider', function( event ) {
						
						if( event.originalEvent.animationName === 'toRightAnim4' || event.originalEvent.animationName === 'toLeftAnim4' ) {
							
							_self.isAnimating	= false;
						
						}	
						
					});
					
				}
				else {
				
					this.jQueryel.on( 'webkitTransitionEnd.cslider transitionend.cslider OTransitionEnd.cslider', function( event ) {
					
						if( event.target.id === _self.jQueryel.attr( 'id' ) )
							_self.isAnimating	= false;
						
					});
				
				}
			
			}
			
		}
	};
	
	var logError 			= function( message ) {
		if ( this.console ) {
			console.error( message );
		}
	};
	
	jQuery.fn.cslider			= function( options ) {
	
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = jQuery.data( this, 'cslider' );
				
				if ( !instance ) {
					logError( "cannot call methods on cslider prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				if ( !jQuery.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for cslider instance" );
					return;
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
			
				var instance = jQuery.data( this, 'cslider' );
				if ( !instance ) {
					jQuery.data( this, 'cslider', new jQuery.Slider( options, this ) );
				}
			});
		
		}
		
		return this;
		
	};
	
})( jQuery );