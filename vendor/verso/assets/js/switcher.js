/*-----------------------------------------------------------------------------------
/* Styles Switcher
-----------------------------------------------------------------------------------*/

window.console = window.console || (function(){
	var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
	return c;
})();


jQuery(document).ready(function(jQuery) {
	
        // Style Switcher	
		jQuery('#style-switcher').animate({
			right: '-300px'
		});
		
		jQuery('#style-switcher h2 a').click(function(e){
			e.preventDefault();
			var div = jQuery('#style-switcher');
			console.log(div.css('right'));
			if (div.css('right') === '-300px') {
				jQuery('#style-switcher').animate({
					right: '0px'
				}); 
			} else {
				jQuery('#style-switcher').animate({
					right: '-300px'
				});
			}
		})
                
		// Color Changer
		
		
		jQuery(".red" ).click(function(){
			jQuery("#colors" ).attr("href", "assets/css/style_red.css" );
			return false;
		});
		
		jQuery(".orange" ).click(function(){
			jQuery("#colors" ).attr("href", "assets/css/style_orange.css" );
			return false;
		});
		
		jQuery(".helio" ).click(function(){
			jQuery("#colors" ).attr("href", "assets/css/style_helio.css" );
			return false;
		});
		jQuery(".saffron" ).click(function(){
			jQuery("#colors" ).attr("href", "assets/css/style_saffron.css" );
			return false;
		});
		
		jQuery(".warhols_green" ).click(function(){
			jQuery("#colors" ).attr("href", "assets/css/style_warhols_green.css" );
			return false;
		});
		jQuery(".purple" ).click(function(){
			jQuery("#colors" ).attr("href", "assets/css/style_purple.css" );
			return false;
		});
		
		jQuery(".citynight" ).click(function(){
			jQuery("#colors" ).attr("href", "assets/css/style_citynight.css" );
			return false;
		});
		
		
		// Layout Switcher
		jQuery(".boxed" ).click(function(){
			jQuery("#layout" ).attr("href", "css/wide.css" );
			return false;
		});

		jQuery("#layout-switcher").on('change', function() {
			jQuery('#layout').attr('href', jQuery(this).val() + '.css');
		});;

		
		
		
		jQuery('.colors li a').click(function(e){
			e.preventDefault();
			jQuery(this).parent().parent().find('a').removeClass('active');
			jQuery(this).addClass('active');
		})
		
	
		jQuery('.bg li a').click(function(e){
			e.preventDefault();
			jQuery(this).parent().parent().find('a').removeClass('active');
			jQuery(this).addClass('active');
			var bg = jQuery(this).css('backgroundImage');
			jQuery('body').css('backgroundImage',bg)
		})
                
		
		jQuery('.bgsolid li a').click(function(e){
			e.preventDefault();
			jQuery(this).parent().parent().find('a').removeClass('active');
			jQuery(this).addClass('active');
			var bg = jQuery(this).css('backgroundColor');
			jQuery('body').css('backgroundColor',bg).css('backgroundImage','none')
		})
                
		jQuery('.navcolor li a').click(function(e){
			e.preventDefault();
			jQuery(this).parent().parent().find('a').removeClass('active');
			jQuery(this).addClass('active');
			var bg = jQuery(this).css('backgroundColor');
			jQuery('#navigation').css('backgroundColor',bg).css('backgroundImage','none');
			jQuery('#navigation ul ul').css('backgroundColor',bg).css('backgroundImage','none');
                        
		})
		
		
		jQuery('#reset a').click(function(e){
			var bg = jQuery(this).css('backgroundImage');
			jQuery('body').css('backgroundImage','url(./images/bg/noise.png)');
                        jQuery('#navigation').css('backgroundColor','#333');
			jQuery('#navigation ul ul').css('backgroundColor','#333');
                        jQuery("#colors" ).attr("href", "assets/css/style.css" );
		})
			

	});