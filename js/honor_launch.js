// Reset
H.config.game.bounding_box.top = 0;
H.config.game.bounding_box.bottom = 0;

//console.log(H.config.game.width);

// Set up
H.game = new Phaser.Game(H.config.game.width, H.config.game.height, Phaser.CANVAS, ''); // , Phaser.CANVAS
H.game.state.add('boot', H.state.Boot);
H.game.state.add('splash', H.state.Splash);
H.game.state.add('start', H.state.Start);
H.game.state.add('main', H.state.Main);
H.game.state.add('end', H.state.End);
H.game.state.start('boot');