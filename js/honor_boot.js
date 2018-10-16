H.state.Boot = function(game) {
    this.preload = function() {
	
        //Set-up our preloader sprite
        game.load.image('loading_background_bar', 'img/basis/loading_background_bar.png');  
        game.load.image('loading_indicator_bar', 'img/basis/loading_indicator_bar.png');
		
		game.load.image('splash', 'img/splash/splash.jpg');

    };
    
    this.create = function() {
        H.game.state.start('splash');
    };
};
