/*
 * jQuery RefineSlide plugin v0.3
 * http://github.com/alexdunphy/refineslide
 * Requires: jQuery v1.7+
 * Copyright 2012, Alex Dunphy
 * MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Includes: jQuery imagesLoaded plugin v2.0.1
 * http://github.com/desandro/imagesloaded
 * MIT License. by Paul Irish et al.
 */

;(function (jQuery, window, document, undefined) {

	// Baked-in settings for extension
	var defaults = {
		transition            : 'kaleidoscope',  // String (default 'cubeV'): Transition type ('random', 'cubeH', 'cubeV', 'fade', 'sliceH', 'sliceV', 'slideH', 'slideV', 'scale', 'blockScale', 'kaleidoscope', 'fan', 'blindH', 'blindV')
		fallback3d            : 'sliceV', // String (default 'sliceV'): Fallback for browsers that support transitions, but not 3d transforms (only used if primary transition makes use of 3d-transforms)
		controls              : 'arrows', // String (default 'thumbs'): Navigation type ('thumbs', 'arrows', null)
		thumbMargin           : 3,        // Int (default 3): Percentage width of thumb margin
		autoPlay              : false,    // Int (default false): Auto-cycle slider
		delay                 : 5000,     // Int (default 5000) Time between slides in ms
		transitionDuration    : 800,      // Int (default 800): Transition length in ms
		startSlide            : 0,        // Int (default 0): First slide
		keyNav                : true,     // Bool (default true): Use left/right arrow keys to switch slide
		captionWidth          : 50,       // Int (default 50): Percentage of slide taken by caption
		arrowTemplate         : '<div class="rs-arrows"><a href="#" class="rs-prev"></a><a href="#" class="rs-next"></a></div>', // String: The markup used for arrow controls (if arrows are used). Must use classes '.rs-next' & '.rs-prev'
		onInit                : function () {}, // Func: User-defined, fires with slider initialisation
		onChange              : function () {}, // Func: User-defined, fires with transition start
		afterChange           : function () {}  // Func: User-defined, fires after transition end
	};

	// RS (RefineSlide) object constructor
	function RS(elem, settings) {
		this.jQueryslider            = jQuery(elem).addClass('rs-slider');      // Elem: Slider element
		this.settings           = jQuery.extend({}, defaults, settings);    // Obj: Merged user settings/defaults
		this.jQueryslides            = this.jQueryslider.find('> li');           // Elem Arr: Slide elements
		this.totalSlides        = this.jQueryslides.length;                 // Int: Number of slides
		this.cssTransitions     = testBrowser.cssTransitions();        // Bool: Test for CSS transition support
		this.cssTransforms3d    = testBrowser.cssTransforms3d();       // Bool: Test for 3D transform support
		this.currentPlace       = this.settings['startSlide'];         // Int: Index of current slide (starts at 0)
		this.jQuerycurrentSlide      = jQuery(this.jQueryslides[this.currentPlace]);  // Elem: Starting slide
		this.inProgress         = false;                               // Bool: Prevents overlapping transitions
		this.jQuerysliderWrap        = this.jQueryslider.wrap('<div class="rs-wrap" />').parent();      // Elem: Slider wrapper div
		this.jQuerysliderBG          = this.jQueryslider.wrap('<div class="rs-slide-bg" />').parent();  // Elem: Slider background (useful for styling & essential for cube transitions)
		this.settings['slider'] = this;  // Make slider object accessible to client call code with 'this.slider' (there's probably a better way to do this)

		this.init();  // Call RS initialisation method
	}

	// RS object Prototype
	RS.prototype = {
        init: function () {
            var _this = this;

            // User-defined function to fire on slider initialisation
            this.settings['onInit']();

            // Setup captions
            this.captions();

            // Setup arrow navigation
            if (this.settings['controls'] === 'arrows') this.setArrows();

            // Setup keyboard navigation
            if (this.settings['keyNav']) this.setKeys();

            // Add slide identifying classes
            for (var i = 0; i < this.totalSlides; i++) {
                jQuery(this.jQueryslides[i]).attr('class', 'rs-slide-' + i);
            }

            // Setup slideshow
            if (this.settings['autoPlay']) {
                this.setAutoPlay();

                // Listen for slider mouseover
                this.jQueryslider.on('mouseenter', function () {
                    clearTimeout(_this.cycling); // Pause if hovered
                });

                // Listen for slider mouseout
                this.jQueryslider.on('mouseleave', function () {
                    _this.setAutoPlay(); // Resume slideshow
                });
            }

            // Get the first image in each slide <li>
            var images = jQuery(this.jQueryslides).find('img:eq(0)').addClass('rs-slide-image'),
                clones = [];

            // Fires once all images have been loaded
            jQuery(images).imagesLoaded(function () {

                // Loop through images & append clones to slider (for dimension testing and thumbnails)
                for (var i = 0; i < _this.totalSlides; i++) {
                    clones.push(jQuery(images[i]).clone().css({'position':'absolute', 'visibility':'hidden', 'display':'block'}).appendTo(_this.jQueryslider));
                }
                setTimeout(function () {
                    _this.setup(clones);
                }, 0); // Webkit requires this instant timeout to avoid premature rendering
            });
        }

        ,setup: function (clones) {
            var _this = this,
                // Get padding of '.rs-slide-bg' elem
                padding =   parseInt(this.jQuerysliderBG.css('padding-left').replace('px', ''))
                            + parseInt(this.jQuerysliderBG.css('padding-right').replace('px', '')),
                widths = [];

            // Loop through image clones & create array of widths
            var i = clones.length;
            while (i--) {
                widths.push(jQuery(clones[i]).width());

                // If not needed for thumbnails, remove image clones from the DOM
                if (_this.settings['controls'] !== 'thumbs') {
                    jQuery(clones[i]).remove();
                }
            }

            // Apply width to '.rs-wrap' elem (width of slimmest slide image + container padding)
            this.jQuerysliderWrap.css('width', Math.floor.apply(Math, widths) + padding);

            // Use the clones generated in this.init() to make thumbnails
            if (this.settings['controls'] === 'thumbs') {
                this.setThumbs(clones);
            }

            // Display first slide
            this.jQuerycurrentSlide.css({'opacity' : 1, 'z-index' : 2});

            // Trigger hardware acceleration (if supported)
            this.jQuerysliderBG.prefixes({'transform' : 'translateZ(0)'});
        }

        ,setArrows:function () {
            var _this = this;

            // Append user-defined arrow template (elems) to '.rs-wrap' elem
            this.jQuerysliderWrap.append(this.settings['arrowTemplate']);

            // Fire next() method when clicked
            jQuery('.rs-next', this.jQuerysliderWrap).on('click', function (e) {
                e.preventDefault();
                _this.next();
            });

            // Fire prev() method when clicked
            jQuery('.rs-prev', this.jQuerysliderWrap).on('click', function (e) {
                e.preventDefault();
                _this.prev();
            });
        }

        ,next: function () {
            // If on final slide, loop back to first slide
            if (this.currentPlace === this.totalSlides - 1) {
                this.transition(0, true); // Call transition
            } else {
                this.transition(this.currentPlace + 1, true); // Call transition
            }
        }

        ,prev: function () {
            // If on first slide, loop round to final slide
            if (this.currentPlace == 0) {
                this.transition(this.totalSlides - 1, false); // Call transition
            } else {
                this.transition(this.currentPlace - 1, false); // Call transition
            }
        }

        ,setKeys: function () {
            var _this = this;

            // Bind keyboard left/right arrows to next/prev methods
            jQuery(document).on('keydown', function (e) {
                if (e.keyCode === 39) { // Right arrow key
                    _this.next();
                } else if (e.keyCode === 37) { // Left arrow key
                    _this.prev();
                }
            });
        }

        ,setAutoPlay: function () {
            var _this = this;

            // Set timeout to object property so it can be accessed/cleared externally
            this.cycling = setTimeout(function () {
                _this.next();
            }, this.settings['delay']);
        }

        ,setThumbs: function (clones) {
            var _this = this,
                // Set percentage width (minus user-defined margin) to span width of slider
                width = (100 - ((this.totalSlides - 1) * this.settings['thumbMargin'])) / this.totalSlides + '%';

            // <div> wrapper to contain thumbnails
            this.jQuerythumbWrap = jQuery('<div class="rs-thumb-wrap" />').appendTo(this.jQuerysliderWrap);

            // Loop to apply thumbnail widths/margins to <a> wraps, appending an image clone to each
            for (var i = 0; i < this.totalSlides; i++) {
                var jQuerythumb = jQuery('<a class="rs-slide-link-'+ i +'" />').css({'width' : width, 'marginLeft' : this.settings['thumbMargin'] + '%'}).attr({'href' : '#'});
                jQuery(clones[i]).removeAttr('style').appendTo(this.jQuerythumbWrap).wrap(jQuerythumb);
            }

            // Safety margin to stop IE7 wrapping the thumbnails (no visual effect in other browsers)
            this.jQuerythumbWrap.children().last().css('margin-right', -10);

            // Add active class to starting slide's respective thumb
            jQuery(this.jQuerythumbWrap.find('a')[this.settings['startSlide']]).addClass('active');

            // Listen for click events on thumnails
            this.jQuerythumbWrap.on('click', 'a', function (e) {
                e.preventDefault();

                // Get identifier from thumb class
                var cl = parseInt(jQuery(this).attr('class').split('-')[3]);

                // Call transition
                _this.transition(cl);
            });
        }

        ,captions: function() {
            var _this = this,
                jQuerycaptions = this.jQueryslides.find('.rs-caption');

            // User-defined caption width
            jQuerycaptions.css({'width' : _this.settings['captionWidth'] + '%', 'opacity' : 0});

            // Display starting slide's caption
            this.jQuerycurrentSlide.find('.rs-caption').css({'opacity' : 1});

            // Add CSS3 transition vendor prefixes
            jQuerycaptions.each(function() {
                jQuery(this).prefixes({
                    'transition':'opacity ' + _this.settings['transitionDuration'] + 'ms ease-in-out',
                    'transform' : 'translateZ(0)' // Necessary for some reason to stop caption opacity jumping when translateZ is also applied to '.rs-slide-bg' (RS.jQuerysliderBG)
                });
            });
        }

        ,transition: function (slideNum, forward) {
            // If inProgress flag is not set (i.e. if not mid-transition)
            if (!this.inProgress) {
                // If not already on requested slide
                if (slideNum !== this.currentPlace) {
                    // Check whether the requested slide index is ahead or behind in the array (if not passed in as param)
                    if(forward === undefined) {
                    	forward = slideNum > this.currentPlace ? true : false;
                    }

                    // Assign next slide prop (elem)
                    this.jQuerynextSlide = jQuery(this.jQueryslides[slideNum]);

                    // Assign next slide index prop (int)
                    this.currentPlace = slideNum;

                    // User-defined function, fires with transition
                    this.settings['onChange']();

                    // Instantiate new Transition object, passing in self (RS obj), transition type (string), direction (bool)
                    new Transition(this, this.settings['transition'], forward);

                    // If thumbnails exist, revise active class states
                    if (this.settings['controls'] === 'thumbs') {
                        this.jQuerythumbWrap.find('a').removeClass('active');
                        jQuery(this.jQuerythumbWrap.find('a')[slideNum]).addClass('active');
                    }
                }
            }
        }
    };

	// Transition object constructor
	function Transition(RS, transition, forward) {
		this.RS = RS; // RS (RefineSlide) object
		this.RS.inProgress = true; // Set RS inProgress flag to prevent additional Transition objects being instantiated until transition end
		this.forward = forward; // Bool: true for forward, false for backward
		this.transition = transition; // String: name of transition requested
		this.fallback3d = this.RS.settings['fallback3d']; // String: fallback to use when 3D transforms aren't supported

		this.init(); // Call Transition initialisation method
	}

	// Transition object Prototype
	Transition.prototype = {
        // Fallback to use if CSS transitions are unsupported
        fallback: 'fade'

        // Array of possible animations
        ,anims: ['cubeH', 'cubeV', 'fade', 'sliceH', 'sliceV', 'slideH', 'slideV', 'scale', 'blockScale', 'kaleidoscope', 'fan', 'blindH', 'blindV']

        ,init: function () {
            // Call requested transition method
            this[this.transition]();
        }

        ,before: function (callback) {
            var _this = this;

            // Prepare slide opacity & z-index
            this.RS.jQuerycurrentSlide.css('z-index', 2);
            this.RS.jQuerynextSlide.css({'opacity' : 1, 'z-index' : 1});

            // Fade out/in captions with CSS/JS depending on browser capability
            if (this.RS.cssTransitions) {
                this.RS.jQuerycurrentSlide.find('.rs-caption').css('opacity', 0);
                this.RS.jQuerynextSlide.find('.rs-caption').css('opacity', 1);
            } else {
                this.RS.jQuerycurrentSlide.find('.rs-caption').animate({'opacity' : 0}, _this.RS.settings['transitionDuration']);
                this.RS.jQuerynextSlide.find('.rs-caption').animate({'opacity' : 1}, _this.RS.settings['transitionDuration']);
            }

            // Check if transition describes a setup method
            if (typeof this.setup === 'function') {
                // Setup required by transition
                var transition = this.setup();
                setTimeout(function () {
                    callback(transition);
                }, 40);
            } else {
                // Transition execution
                this.execute();
            }

            // Listen for CSS transition end on elem (set by transition)
            if (this.RS.cssTransitions) {
                jQuery(this.listenTo).one('webkitTransitionEnd transitionend oTransitionEnd msTransitionend MSTransitionEnd', function () {
                    // Post-transition reset
                    _this.after();
                });
            }
        }

        ,after: function () {
            // Reset transition CSS
            this.RS.jQueryslider.removeAttr('style');
            this.RS.jQuerycurrentSlide.removeAttr('style').css('opacity', 0);
            this.RS.jQuerynextSlide.removeAttr('style').css({'z-index': 2,'opacity' : 1});

            // Additional reset steps required by transition (if any exist)
            if (typeof this.reset === 'function') this.reset();

            // If slideshow is active, reset the timeout
            if (this.RS.settings['autoPlay']) {
                clearTimeout(this.RS.cycling);
                this.RS.setAutoPlay();
            }

            // Assign new slide position
            this.RS.jQuerycurrentSlide = this.RS.jQuerynextSlide;

            // Remove RS obj inProgress flag (i.e. allow new Transition to be instantiated)
            this.RS.inProgress = false;

            // User-defined function, fires after transition has ended
            this.RS.settings['afterChange']();
        }

        ,fade: function () {
            var _this = this;

            // If CSS transitions are supported by browser
            if (this.RS.cssTransitions) {
                // Setup steps
                this.setup = function () {
                    // Set event listener to next slide elem
                    _this.listenTo = _this.RS.jQuerycurrentSlide;
                    // Add CSS3 transition vendor prefixes
                    _this.RS.jQuerycurrentSlide.prefixes({'transition' : 'opacity ' + _this.RS.settings['transitionDuration'] + 'ms ease-in-out'});
                };

                // Execution steps
                this.execute = function () {
                    // Display next slide over current slide
                    _this.RS.jQuerycurrentSlide.css({'opacity' : 0});
                }
            } else { // JS animation fallback
                this.execute = function () {
                    _this.RS.jQuerycurrentSlide.animate({'opacity' : 0}, _this.RS.settings['transitionDuration'], function () {
                        // Reset steps
                        _this.after();
                    });
                }
            }

            this.before(function () {
                // Fire on setup callback
                _this.execute();
            });
        }

        // cube() method is used by cubeH() & cubeV() - not for calling directly
        ,cube: function (tz, ntx, nty, nrx, nry, wrx, wry) { // Args: translateZ, (next slide) translateX, (next slide) translateY, (next slide) rotateX, (next slide) rotateY, (wrap) rotateX, (wrap) rotateY

            // Fallback if browser does not support 3d transforms/CSS transitions
            if (!this.RS.cssTransitions || !this.RS.cssTransforms3d) {
                return this[this['fallback3d']](); // User-defined transition
            }

            var _this = this;

            // Setup steps
            this.setup = function () {
                // Set event listener to '.rs-slider' <ul>
                _this.listenTo = _this.RS.jQueryslider;

                // Set CSS3 perspective vendor prefixes on '.rs-slide-bg' elem
                // see http://desandro.github.com/3dtransforms/docs/perspective.html
                this.RS.jQuerysliderBG.prefixes({'perspective' : 1000});

                var slideProps = {
                    'transform' : 'translateZ(' + tz + 'px)',
                    'backface-visibility' : 'hidden'
                };

                // CSS3 props for slide <li>s
                _this.RS.jQuerycurrentSlide.prefixes(slideProps);
                _this.RS.jQuerynextSlide.prefixes(slideProps);

                // CSS3 props for slider <ul>
                _this.RS.jQueryslider.prefixes({
                    'transition' : 'none',
                    'transform-style' : 'preserve-3d',
                    'transform' : 'translateZ(-' + tz + 'px)'
                });

                // CSS3 prop for next slide <li>
                _this.RS.jQuerynextSlide.css({'opacity':1}).prefixes({
                    'transform' : 'translateZ(0px) translateY(' + nty + 'px) translateX(' + ntx + 'px) rotateY('+ nry +'deg) rotateX('+ nrx +'deg)'
                });
            };

            // Execution steps
            this.execute = function () {
                var output = [];

                // Loop through vendor prefixes to make CSS3 transform rules (more involved than just calling prefixes() func in this case as need prefix twice: e.g. '-moz-transition: -moz-transition...')
                for (var i = 0; i < testBrowser.browserVendors.length; i++) {
                    output[testBrowser.browserVendors[i] + 'transition'] = testBrowser.browserVendors[i] + 'transform ' + _this.RS.settings['transitionDuration'] + 'ms ease-in-out';
                }

                // Add CSS3 props to elem
                _this.RS.jQueryslider.prefixes(output);

                // Additional CSS3 prop
                _this.RS.jQueryslider.prefixes({'transform' : 'translateZ(-' + tz + 'px) rotateX('+ wrx +'deg) rotateY('+ wry +'deg)'});
            };

            this.before(function () {
                // Fire on setup callback
                _this.execute();
            });
        }

        ,cubeH: function () {
            // Set to half of slide width
            var dimension = jQuery(this.RS.jQueryslides).width() / 2;

            // If next slide is ahead in array
            if (this.forward) {
                this.cube(dimension, dimension, 0, 0, 90, 0, -90);
            } else {
                this.cube(dimension, -dimension, 0, 0, -90, 0, 90);
            }
        }

        ,cubeV: function () {
            // Set to half of slide height
            var dimension = jQuery(this.RS.jQueryslides).height() / 2;

            // If next slide is ahead in array
            if (this.forward) {
                this.cube(dimension, 0, -dimension, 90, 0, -90, 0);
            } else {
                this.cube(dimension, 0, dimension, -90, 0, 90, 0);
            }
        }

        // grid() method is used by many transitions - not for calling directly
        // Grid calculations are based on those in the awesome flux slider (joelambert.co.uk/flux)
        ,grid: function (cols, rows, ro, tx, ty, sc, op) { // Args: columns, rows, rotate, translateX, translateY, scale, opacity

            // Fallback if browser does not support CSS transitions
            if (!this.RS.cssTransitions) {
                return this[this['fallback']]();
            }

            var _this = this;

            // Setup steps
            this.setup = function () {
                // The time (in ms) added to/subtracted from the delay total for each new gridlet
                var count = (_this.RS.settings['transitionDuration']) / (cols + rows);

                // Gridlet creator (divisions of the image grid, positioned with background-images to replicate the look of an entire slide image when assembled)
                function gridlet(width, height, top, left, src, imgWidth, imgHeight, c, r) {
                    var delay = (c + r) * count;

                    // Return a gridlet elem with styles for specific transition
                    return jQuery('<div class="rs-gridlet" />').css({
                        'width' : width,
                        'height' : height,
                        'top' : top,
                        'left' : left,
                        'background-image' : 'url(' + src + ')',
                        'background-position' : '-' + left + 'px -' + top + 'px',
                        'background-size' : imgWidth + 'px ' + imgHeight + 'px'
                    }).prefixes({
                        'transition' : 'all ' + _this.RS.settings['transitionDuration'] + 'ms ease-in-out ' + delay + 'ms',
                        'transform' : 'none'
                    });
                }

                // Get the next slide's image
                _this.jQueryimg = _this.RS.jQuerycurrentSlide.find('img.rs-slide-image');

                // Create a grid to hold the gridlets
                _this.jQuerygrid = jQuery('<div />').addClass('rs-grid');

                // Prepend the grid to the next slide (i.e. so it's above the slide image)
                _this.RS.jQuerycurrentSlide.prepend(_this.jQuerygrid);

                // vars to calculate positioning/size of gridlets
                var imgWidth = _this.jQueryimg.width(),
                    imgHeight = _this.jQueryimg.height(),
                    imgSrc = _this.jQueryimg.attr('src'),
                    colWidth = Math.floor(imgWidth / cols),
                    rowHeight = Math.floor(imgHeight / rows),
                    colRemainder = imgWidth - (cols * colWidth),
                    colAdd = Math.ceil(colRemainder / cols),
                    rowRemainder = imgHeight - (rows * rowHeight),
                    rowAdd = Math.ceil(rowRemainder / rows),
                    leftDist = 0;

                // tx/ty args can be passed as 'auto'/'min-auto' (meaning use slide width/height or negative slide width/height)
                tx = tx === 'auto' ? imgWidth : tx;
                tx = tx === 'min-auto' ? - imgWidth : tx;
                ty = ty === 'auto' ? imgHeight : ty;
                ty = ty === 'min-auto' ? - imgHeight : ty;

                // Loop through cols
                for (var i = 0; i < cols; i++) {
                    var topDist = 0,
                        newColWidth = colWidth;

                    // If imgWidth (px) does not divide cleanly into the specified number of cols, adjust individual col widths to create correct total
                    if (colRemainder > 0) {
                        var add = colRemainder >= colAdd ? colAdd : colRemainder;
                        newColWidth += add;
                        colRemainder -= add;
                    }

                    // Nested loop to create row gridlets for each col
                    for (var j = 0; j < rows; j++)  {
                        var newRowHeight = rowHeight,
                            newRowRemainder = rowRemainder;

                        // If imgHeight (px) does not divide cleanly into the specified number of rows, adjust individual row heights to create correct total
                        if (newRowRemainder > 0) {
                            add = newRowRemainder >= rowAdd ? rowAdd : rowRemainder;
                            newRowHeight += add;
                            newRowRemainder -= add;
                        }

                        // Create & append gridlet to grid
                        _this.jQuerygrid.append(gridlet(newColWidth, newRowHeight, topDist, leftDist, imgSrc, imgWidth, imgHeight, i, j));

                        topDist += newRowHeight;
                    }

                    leftDist += newColWidth;
                }

                // Set event listener on last gridlet to finish transitioning
                _this.listenTo = _this.jQuerygrid.children().last();

                // Show grid & hide the image it replaces
                _this.jQuerygrid.show();
                _this.jQueryimg.css('opacity', 0);

                // Add identifying classes to corner gridlets (useful if applying border radius)
                _this.jQuerygrid.children().first().addClass('rs-top-left');
                _this.jQuerygrid.children().last().addClass('rs-bottom-right');
                _this.jQuerygrid.children().eq(rows - 1).addClass('rs-bottom-left');
                _this.jQuerygrid.children().eq(- rows).addClass('rs-top-right');
            };

            // Execution steps
            this.execute = function () {
                _this.jQuerygrid.children().css('opacity', op).prefixes({'transform' : 'rotate('+ ro +'deg) translateX('+ tx +'px) translateY('+ ty +'px) scale('+ sc +')'});
            };

            this.before(function () {
                // Fire on setup callback
                _this.execute();
            });

            // Reset steps
            this.reset = function () {
                _this.jQueryimg.css('opacity', 1);
                _this.jQuerygrid.remove();
            }
        }

        ,sliceH: function () {
            this.grid(1, 8, 0, 'min-auto', 0, 1, 0);
        }

        ,sliceV: function () {
            this.grid(10, 1, 0, 0, 'auto', 1, 0);
        }

        ,slideV: function () {
            this.grid(1, 1, 0, 0, 'auto', 1, 1);
        }

        ,slideH: function () {
            this.grid(1, 1, 0, 'min-auto', 0, 1, 1);
        }

        ,scale: function () {
            this.grid(1, 1, 0, 0, 0, 1.5, 0);
        }

        ,blockScale: function () {
            this.grid(8, 6, 0, 0, 0, .6, 0);
        }

        ,kaleidoscope: function () {
            this.grid(10, 8, 0, 0, 0, 1, 0);
        }

        ,fan: function () {
            this.grid(1, 10, 45, 100, 0, 1, 0);
        }

        ,blindV: function () {
            this.grid(1, 8, 0, 0, 0, .7, 0);
        }

        ,blindH: function () {
            this.grid(10, 1, 0, 0, 0, .7, 0);
        }

        ,random: function () {
            // Pick a random transition from the anims array (obj prop)
            this[this.anims[Math.floor(Math.random() * this.anims.length)]]();
        }
    };

	// Obj to check browser capabilities
	var testBrowser = {
        // Browser vendor CSS prefixes
        browserVendors: ['', '-webkit-', '-moz-', '-ms-', '-o-', '-khtml-']

        // Browser vendor DOM prefixes
        ,domPrefixes: ['', 'Webkit', 'Moz', 'ms', 'O', 'Khtml']

        // Method to iterate over a property (using all DOM prefixes)
        // Returns true if prop is recognised by browser (else returns false)
        ,testDom: function (prop) {
            var i = this.domPrefixes.length;
            while (i--) {
                if (document.body.style[this.domPrefixes[i] + prop] !== undefined) {
                    return true;
                }
            }

            return false;
        }

        ,cssTransitions: function () {
            // Use Modernizr if available & implements csstransitions test
            if (window.Modernizr && Modernizr.csstransitions !== undefined) {
                return Modernizr.csstransitions;
            }

            // Use testDom method to check prop (returns bool)
            return this.testDom('Transition');
        }

        ,cssTransforms3d: function () {
            // Use Modernizr if available & implements csstransforms3d test
            if (window.Modernizr && Modernizr.csstransforms3d !== undefined) {
                return Modernizr.csstransforms3d;
            }

            // Check for vendor-less prop
            if (document.body.style['perspectiveProperty'] !== undefined) {
                return true;
            }

            // Use testDom method to check prop (returns bool)
            return this.testDom('Perspective');
        }
    };

	// CSS vendor prefix generator
	jQuery.fn['prefixes'] = function (props) {
        var output = [];

        // Loop through props, add with each vendor prefix to output array
        for (var prop in props) {
            if(props.hasOwnProperty(prop)) {
                var i = testBrowser.browserVendors.length;
                while (i--) {
                    output[testBrowser.browserVendors[i] + prop] = props[prop];
                }
            }
        }

        // Add output array of vendor-ised props to elem
        this.css(output);
        return this;
    };

    /*!
     * David Desandro's imagesloaded plugin is included here as a cross-browser way to ensure all images have loaded before slider setup (e.g. testing for image dimensions)
     * Another reliable method would be to wait until the window.load event before setup - though that could cause considerable delays on certain pages
     *
     * jQuery imagesLoaded plugin v2.0.1
     * http://github.com/desandro/imagesloaded
     *
     * MIT License. by Paul Irish et al.
     */
    // blank image data-uri bypasses webkit log warning (thx doug jones)
    var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    jQuery.fn.imagesLoaded = function( callback ) {
        var jQuerythis = this,
            deferred = jQuery.isFunction(jQuery.Deferred) ? jQuery.Deferred() : 0,
            hasNotify = jQuery.isFunction(deferred.notify),
            jQueryimages = jQuerythis.find('img').add( jQuerythis.filter('img') ),
            loaded = [],
            proper = [],
            broken = [];

        function doneLoading() {
            var jQueryproper = jQuery(proper),
                jQuerybroken = jQuery(broken);

            if ( deferred ) {
                if ( broken.length ) {
                    deferred.reject( jQueryimages, jQueryproper, jQuerybroken );
                } else {
                    deferred.resolve( jQueryimages );
                }
            }

            if ( jQuery.isFunction( callback ) ) {
                callback.call( jQuerythis, jQueryimages, jQueryproper, jQuerybroken );
            }
        }

        function imgLoaded( img, isBroken ) {
            // don't proceed if BLANK image, or image is already loaded
            if ( img.src === BLANK || jQuery.inArray( img, loaded ) !== -1 ) {
                return;
            }

            // store element in loaded images array
            loaded.push( img );

            // keep track of broken and properly loaded images
            if ( isBroken ) {
                broken.push( img );
            } else {
                proper.push( img );
            }

            // cache image and its state for future calls
            jQuery.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

            // trigger deferred progress method if present
            if ( hasNotify ) {
                deferred.notifyWith( jQuery(img), [ isBroken, jQueryimages, jQuery(proper), jQuery(broken) ] );
            }

            // call doneLoading and clean listeners if all images are loaded
            if ( jQueryimages.length === loaded.length ){
                setTimeout( doneLoading );
                jQueryimages.unbind( '.imagesLoaded' );
            }
        }

        // if no images, trigger immediately
        if ( !jQueryimages.length ) {
            doneLoading();
        } else {
            jQueryimages.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
                // trigger imgLoaded
                imgLoaded( event.target, event.type === 'error' );
            }).each( function( i, el ) {
                    var src = el.src;

                    // find out if this image has been already checked for status
                    // if it was, and src has not changed, call imgLoaded on it
                    var cached = jQuery.data( el, 'imagesLoaded' );
                    if ( cached && cached.src === src ) {
                        imgLoaded( el, cached.isBroken );
                        return;
                    }

                    // if complete is true and browser supports natural sizes, try
                    // to check for image status manually
                    if ( el.complete && el.naturalWidth !== undefined ) {
                        imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
                        return;
                    }

                    // cached images don't fire load sometimes, so we reset src, but only when
                    // dealing with IE, or image is complete (loaded) and failed manual check
                    // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                    if ( el.readyState || el.complete ) {
                        el.src = BLANK;
                        el.src = src;
                    }
                });
        }

        return deferred ? deferred.promise( jQuerythis ) : jQuerythis;
    };

	// jQuery plugin wrapper
	jQuery.fn['refineSlide'] = function (settings) {
		return this.each(function () {
            // Check if already instantiated on this elem
			if (!jQuery.data(this, 'refineSlide')) {
                // Instantiate & store elem + string
				jQuery.data(this, 'refineSlide', new RS(this, settings));
			}
		});
	}
})(jQuery, window, document);