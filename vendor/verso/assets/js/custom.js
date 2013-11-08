/***************************************************
SuperFish Menu
***************************************************/


// initialise plugins
jQuery(function () {
    jQuery('ul.nav').superfish({
			delay:       700,                            // 1000 - one second delay on mouseout
			animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation
			speed:       'normal',                          // 'fast' - faster animation speed , 'normal', 'slow'
			autoArrows:  false                            // disable generation of arrow mark-up
		});
	
});

// initialise plugins
jQuery(function () {
    jQuery('ul#filters').superfish({
			delay:       700,                            // 1000 - one second delay on mouseout
			animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation
			speed:       'normal',                          // 'fast' - faster animation speed , 'normal', 'slow'
			autoArrows:  false                            // disable generation of arrow mark-up
		});
	
});

jQuery(function (jQuery) {
    if (jQuery.browser.msie && jQuery.browser.version.substr(0, 1) < 7) {
        jQuery('li').has('ul').mouseover(function () {
            jQuery(this).children('ul').css('visibility', 'visible');
        }).mouseout(function () {
            jQuery(this).children('ul').css('visibility', 'hidden');
        })
    }
});


/***************************************************
prettyPhoto
***************************************************/

jQuery(document).ready(function () {
    jQuery("a[rel^='prettyPhoto']").prettyPhoto({ 
	animation_speed: 'normal', 
	theme: 'light_square', 
	slideshow: 3000, 
	autoplay_slideshow: false, 
	social_tools: false 
	});

});

/***************************************************
responsive menu
***************************************************/

jQuery(function (jQuery) {
    jQuery("#main-nav").append("<select/>");
    jQuery("<option />", {
        "selected": "selected",
        "value": "",
        "text": "Please choose page"
    }).appendTo("#main-nav select");
    //new dropdown menu
    jQuery("#main-nav a").each(function () {
        var el = jQuery(this);
        var perfix = '';
        switch (el.parents().length) {
            case (11):
                perfix = '-';
                break;
            case (13):
                perfix = '--';
                break;
            default:
                perfix = '';
                break;

        }
        jQuery("<option />", {
            "value": el.attr("href"),
            "text": perfix + el.text()
        }).appendTo("#main-nav select");
    });

    jQuery('#main-nav select').change(function () {

        window.location.href = this.value;

    });
});

jQuery(document).ready(function(jQuery) {
	
	jQuery('.project-item-image-container').hover(function () {
	
		jQuery(this).find('.project-item-overlay').fadeTo('slow', 1);
	},function () {
		jQuery(this).find('.project-item-overlay').stop().fadeTo('slow', 0);
	});
	
});


jQuery(document).ready(function() {
			
			var defaults = {
	  			containerID: 'toTop', // fading element id
				containerHoverID: 'toTopHover', // fading element hover id
				scrollSpeed: 1200,
				easingType: 'linear' 
	 		};
			
			
			jQuery().UItoTop({ easingType: 'easeOutQuart' });
			
		});