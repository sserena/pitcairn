/* global H */

H.state.Splash = function(game) {
    this.preload = function() {
    
		game.load.image('splash', 'img/splash/splash.jpg');

    };
    
    this.create = function() {
	
		var b = H.func.add.sprite({
			img: 'splash',
			top: '0%',
			left: '0%',
			w: '100%',
			max_w: H.config.game.width,
			max_h: H.config.game.height
		});
		
		H.func.add.text({
			text: H.data.l10n.terms.splash.instruction,
			top: '15%',
			left: '41%',
			w: '40%',
			fill: '#FFFFFF',
			stroke: true,
			size: '180%',
			weight: 'bold',
			auto_offset: false,
			bounds_top: b.coords.top,
			bounds_left: b.coords.left,
			bounds_h: b.coords.h,
			bounds_w: b.coords.w
		});
		
        // Display last element
        game.add.sprite(0,0,'');

		setTimeout(function() {
			H.game.state.start('start');
		}, 4000);
		
    };
};
