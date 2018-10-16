H.state.End = function(game) {



    this.preload = function() {

	// H.work.points = 500;
	// H.work.end_reason = 'everything_answered';
	
        game.load.image('header', 'img/basis/header.jpg');
        game.load.image('footer', 'img/basis/footer.jpg');
		game.load.spritesheet('button_background', 'img/end/button_background.png', 273, 106, 3);
        game.load.image('wooden_board', 'img/end/wooden_board.png');
        
        // Audio
        game.load.audio('sound_background', ['audio/mp3/theme.mp3', 'audio/ogg/theme.ogg']);

        if (H.work.end_reason === 'out_of_time') {
            game.load.image('background', 'img/end/background_negative.jpg');
            this.text1 = H.data.l10n.terms.end.game_over;
            this.text2 = H.data.l10n.terms.end.out_of_time;
        }
        else if (H.work.end_reason === 'everything_answered') {
            if (H.work.points >= H.config.rules.points_for_honor) {
                game.load.image('background', 'img/end/background_positive.jpg');
                this.text1 = H.data.l10n.terms.end.congratulations;
                this.text2 = H.data.l10n.terms.end.pitcairn_ready;
                game.load.image('paper_light', 'img/basis/paper_light.png');
                game.load.image('cover', 'img/basis/dark_cover.png');
                game.load.image('balloon', 'img/end/balloon.png');
                game.load.image('star', 'img/end/star.png');
                game.load.image('line', 'img/end/line.png');
                game.load.image('logo', 'img/basis/logo.png');
                game.load.image('note_background', 'img/basis/note_background.jpg');
                game.load.spritesheet('textbox', 'img/end/text_field_background.png', 320, 36);

                game.load.spritesheet('keyboard_key_light', 'img/basis/keyboard_key_light.png', 40, 25);
                game.load.spritesheet('keyboard_key_dark', 'img/basis/keyboard_key_dark.png', 40, 25);
                game.load.image('text_box', 'img/basis/text_box.png');

            } else {
                game.load.image('background', 'img/end/background_negative.jpg');
                this.text1 = H.data.l10n.terms.end.sorry;
                this.text2 = H.data.l10n.terms.end.hint_redeem_tokens;
                this.text3 = ' (' + H.config.rules.points_for_honor + ' ' + H.data.l10n.terms.end.needed + ')';
            }
        }
        
        this.text1 += ': ' + H.work.points + ' ' + H.data.l10n.terms.end.points + '!';
    };
    
    this.create = function() {
    
        var obj = this;
        
        // Audio
        var music = game.add.audio('sound_background', 1, true);
        var volume = Math.round(Math.pow(Math.max(0.1,H.work.background_volume), 2)*100)/100;
        music.play('', 0, volume, true);
        
        /* Load Background */
        var background = game.add.sprite(0, 0, 'background');
		

		
        // Scale so it fits world as neatly as possible
        background.scale.x = background.scale.y = 1 / Math.min(game.cache.getImage('background').width / game.world.bounds.width, game.cache.getImage('background').height / game.world.bounds.height);
        
        /* Load Header */
        var header = game.add.sprite(0, 0, 'header');
        header.width = game.world.bounds.width;
        header.height = H.func.dim.get_height('header', header.width);
        
        /* Load Footer */
        var footer_height = H.func.dim.get_height('footer', game.world.bounds.width);
        var footer = game.add.sprite(0, game.world.bounds.height-footer_height, 'footer');
        footer.width = game.world.bounds.width;
        footer.height = footer_height;
        
        //Todo: Remove, once end is done
        // H.config.game.bounding_box.top += header.height;
        // H.config.game.bounding_box.bottom += footer.height;
        
        // Play again button
        var play_again = H.func.add.button({
            img: 'button_background',
            top: '41%',
            left: '97%',
            w: '20%',
            callback: function() {
                game.sound.remove(music);
                H.game.state.start('start');
            },
			outFrame: 0,
			overFrame: 1,
			downFrame: 2
        });
		
        H.func.add.text({
            text: H.data.l10n.terms.end.play_again,
            top: '56%',
            left: '8%',
            w: '85%',
            fill: '#20180F',
            stroke: false,
            size: '100%',
            contain: true,
            weight: 'bold',
			align: 'center',
			auto_offset: false,
			force_one_line: true,
            bounds_top: play_again.coords.top,
            bounds_left: play_again.coords.left,
            bounds_h: play_again.coords.h,
            bounds_w: play_again.coords.w
        });
		

		// Honor button
		var mobile = false;
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			mobile = true;
		}

        if (H.work.points >= H.config.rules.points_for_honor) {
            var honor_button = H.func.add.button({
                img: 'button_background',
                top: '41%',
                left: '70%',
                w: '20%',
                callback: function () {
                    var honor = game.add.group();

                    // Black Background
                    honor.add(
                            H.func.add.sprite({
                                img: 'cover',
                                top: 0,
                                left: 0 - H.config.game.bounding_box.left,
                                h: '100%',
                                w: '100%',
                                auto_offset: false,
                                scale: 'unproportional'
                            }).elm
                            );

                    // Only on desktop from here on
                    if (!navigator.isCocoonJS && !mobile) {
                        // Save Button
                        var save_button = H.func.add.button({
                            img: 'button_background',
                            top: '95%',
                            left: '30%',
                            w: '20%',
                            callback: function () {
                                H.func.high_scores.save_and_send();
                                honor.destroy();
                                // H.work.honor_subs_buttons.destroy();
                                // CocoonJS.App.hideTheWebView();
                            },
                            outFrame: 0,
                            overFrame: 1,
                            downFrame: 2
                        });
                        honor.add(save_button.elm);

                        var save_button_text = H.func.add.text({
                            text: H.data.l10n.terms.end.send,
                            top: '53%',
                            left: '5%',
                            w: '80%',
                            fill: '#20180F',
                            stroke: false,
                            size: '100%',
                            weight: 'bold',
                            align: 'center',
                            auto_offset: false,
                            bounds_top: save_button.coords.top,
                            bounds_left: save_button.coords.left,
                            bounds_h: save_button.coords.h,
                            bounds_w: save_button.coords.w
                        });
                        honor.add(save_button_text.elm);
                    }

                    // Back Button
                    var back_button = H.func.add.button({
                        img: 'button_background',
                        top: '95%',
                        left: '60%',
                        w: '20%',
                        callback: function () {
                            honor.destroy();
                            //CocoonJS.App.hideTheWebView();
                        },
                        outFrame: 0,
                        overFrame: 1,
                        downFrame: 2
                    });
                    honor.add(back_button.elm);

                    var back_button_text = H.func.add.text({
                        text: H.data.l10n.terms.end.back,
                        top: '53%',
                        left: '5%',
                        w: '80%',
                        fill: '#20180F',
                        stroke: false,
                        size: '100%',
                        weight: 'bold',
                        align: 'center',
                        auto_offset: false,
                        bounds_top: back_button.coords.top,
                        bounds_left: back_button.coords.left,
                        bounds_h: back_button.coords.h,
                        bounds_w: back_button.coords.w
                    });
                    honor.add(back_button_text.elm);

                    // Paper
                    var paper = H.func.add.sprite({
                        img: 'paper_light',
                        top: '15%',
                        left: '50%',
                        h: '82%',
                        scale: 'proportional'
                    });
                    honor.add(paper.elm);

                    // Text
                    // honor.add(
                    // H.func.add.sprite({
                    // img: 'honor_text',
                    // top: '9%',
                    // left: '50%',
                    // h: '88%',
                    // bounds_top: paper.coords.top,
                    // bounds_left: paper.coords.left,
                    // bounds_h: paper.coords.h,
                    // bounds_w: paper.coords.w
                    // }).elm
                    // );

                    // Logo
                    honor.add(
                            H.func.add.sprite({
                                img: 'logo',
                                top: '9%',
                                left: '47%',
                                w: '17%',
                                bounds_top: paper.coords.top,
                                bounds_left: paper.coords.left,
                                bounds_h: paper.coords.h,
                                bounds_w: paper.coords.w
                            }).elm
                            );

                    // Star
                    honor.add(
                            H.func.add.sprite({
                                img: 'star',
                                top: '2%',
                                left: '95%',
                                w: '30%',
                                bounds_top: paper.coords.top,
                                bounds_left: paper.coords.left,
                                bounds_h: paper.coords.h,
                                bounds_w: paper.coords.w
                            }).elm
                            );

                    // Congratulations
                    honor.add(
                            H.func.add.text({
                                text: H.data.l10n.terms.end.congratulations.toUpperCase(),
                                top: '31%',
                                left: '5%',
                                w: '84%',
                                h: '10%',
                                fill: '#5c3519',
                                stroke: false,
                                size: '120%',
                                weight: 'bold',
                                align: 'center',
                                auto_offset: false,
                                bounds_top: paper.coords.top,
                                bounds_left: paper.coords.left,
                                bounds_h: paper.coords.h,
                                bounds_w: paper.coords.w
                            }).elm
                            );

                    // You've earned your honor
                    honor.add(
                            H.func.add.text({
                                text: H.data.l10n.terms.end.honor_earned,
                                top: '38%',
                                left: '5%',
                                w: '84%',
                                h: '10%',
                                fill: '#5c3519',
                                stroke: false,
                                size: '110%',
                                weight: 'normal',
                                align: 'center',
                                auto_offset: false,
                                bounds_top: paper.coords.top,
                                bounds_left: paper.coords.left,
                                bounds_h: paper.coords.h,
                                bounds_w: paper.coords.w
                            }).elm
                            );

                    // Line
                    honor.add(
                            H.func.add.sprite({
                                img: 'line',
                                top: '48.5%',
                                left: '47%',
                                w: '70%',
                                bounds_top: paper.coords.top,
                                bounds_left: paper.coords.left,
                                bounds_h: paper.coords.h,
                                bounds_w: paper.coords.w
                            }).elm
                            );


                    // Only on desktop from here on
                    if ((typeof navigator.isCocoonJS === 'undefined' || !navigator.isCocoonJS) && !mobile) {
                        // Get your honor
                        honor.add(
                                H.func.add.text({
                                    text: H.data.l10n.terms.end.get_honor_heading,
                                    top: '53%',
                                    left: '5%',
                                    w: '84%',
                                    h: '10%',
                                    fill: '#5c3519',
                                    stroke: false,
                                    size: '100%',
                                    weight: 'bold',
                                    align: 'left',
                                    auto_offset: false,
                                    bounds_top: paper.coords.top,
                                    bounds_left: paper.coords.left,
                                    bounds_h: paper.coords.h,
                                    bounds_w: paper.coords.w
                                }).elm
                                );

                        var honor_intro = H.func.add.text({
                            text: H.data.l10n.terms.end.get_honor_instructions,
                            top: '60%',
                            left: '5%',
                            w: '84%',
                            fill: '#5c3519',
                            stroke: false,
                            size: '100%',
                            weight: 'normal',
                            align: 'left',
                            auto_offset: false,
                            bounds_top: paper.coords.top,
                            bounds_left: paper.coords.left,
                            bounds_h: paper.coords.h,
                            bounds_w: paper.coords.w
                        }).elm;
                        for (var n in honor_intro) {
                            honor.add(honor_intro[n]);
                        }

                        // Name
                        honor.add(
                                H.func.add.text({
                                    text: H.data.l10n.terms.end.your_name,
                                    top: '76%',
                                    left: '5%',
                                    w: '40%',
                                    h: '10%',
                                    fill: '#5c3519',
                                    stroke: false,
                                    size: '100%',
                                    weight: 'normal',
                                    align: 'left',
                                    auto_offset: false,
                                    bounds_top: paper.coords.top,
                                    bounds_left: paper.coords.left,
                                    bounds_h: paper.coords.h,
                                    bounds_w: paper.coords.w
                                }).elm
                                );

                        obj.textfield1 = H.func.add.button({
                            img: 'textbox',
                            top: '75%',
                            left: '45%',
                            w: '45%',
                            auto_offset: false,
                            bounds_top: paper.coords.top,
                            bounds_left: paper.coords.left,
                            bounds_h: paper.coords.h,
                            bounds_w: paper.coords.w,
                            callback: function () {
                                if (typeof obj.text1 !== 'undefined' && typeof obj.text1.elm !== 'undefined') {
                                    obj.text1.elm.destroy();
                                }
                                var keyboard = H.keyboard(function (text) {
                                    obj.text1 = H.func.add.text({
                                        text: text,
                                        top: '10%',
                                        left: '2%',
                                        w: '96%',
                                        fill: '#000000',
                                        stroke: false,
                                        size: '90%',
                                        weight: 'bold',
                                        align: 'left',
                                        auto_offset: false,
                                        bounds_top: obj.textfield1.coords.top,
                                        bounds_left: obj.textfield1.coords.left,
                                        bounds_h: obj.textfield1.coords.h,
                                        bounds_w: obj.textfield1.coords.w
                                    });
                                    honor.add(obj.text1.elm);
                                    game.add.sprite(0, 0, '');
                                    H.data.name = text;
                                });
                                keyboard.show();
                            }
                        });
                        honor.add(obj.textfield1.elm);


                        // E-Mail
                        honor.add(
                                H.func.add.text({
                                    text: H.data.l10n.terms.end.email_of_director,
                                    top: '84%',
                                    left: '5%',
                                    w: '40%',
                                    h: '10%',
                                    fill: '#5c3519',
                                    stroke: false,
                                    size: '90%',
                                    weight: 'normal',
                                    align: 'left',
                                    auto_offset: false,
                                    bounds_top: paper.coords.top,
                                    bounds_left: paper.coords.left,
                                    bounds_h: paper.coords.h,
                                    bounds_w: paper.coords.w
                                }).elm
                                );

                        obj.textfield2 = H.func.add.button({
                            img: 'textbox',
                            top: '83%',
                            left: '45%',
                            w: '45%',
                            auto_offset: false,
                            bounds_top: paper.coords.top,
                            bounds_left: paper.coords.left,
                            bounds_h: paper.coords.h,
                            bounds_w: paper.coords.w,
                            callback: function () {
                                if (typeof obj.text2 !== 'undefined' && typeof obj.text2.elm !== 'undefined') {
                                    obj.text2.elm.destroy();
                                }
                                var keyboard = H.keyboard(function (text) {
                                    obj.text2 = H.func.add.text({
                                        text: text,
                                        top: '10%',
                                        left: '2%',
                                        w: '96%',
                                        fill: '#000000',
                                        stroke: false,
                                        size: '90%',
                                        weight: 'bold',
                                        align: 'left',
                                        auto_offset: false,
                                        force_one_line: true,
                                        bounds_top: obj.textfield2.coords.top,
                                        bounds_left: obj.textfield2.coords.left,
                                        bounds_h: obj.textfield2.coords.h,
                                        bounds_w: obj.textfield2.coords.w
                                    });
                                    honor.add(obj.text2.elm);
                                    game.add.sprite(0, 0, '');
                                    H.data.address = text;
                                });

                                keyboard.show();
                            }
                        });
                        honor.add(obj.textfield2.elm);




                        /*                    
                         // Webview - form
                         //CocoonJS.App.loadInTheWebView('data/save_honor.htm');
                         
                         H.work.webview_coords = H.func.dim.get_coords({
                         top: '74%',
                         left: '50%',
                         w: '40%',
                         h: '30%',
                         heed_density: false,
                         auto_offset: false,
                         bounds_top: paper.coords.top,
                         bounds_left: paper.coords.left,
                         bounds_h: paper.coords.h,
                         bounds_w: paper.coords.w
                         });
                         
                         CocoonJS.App.loadInTheWebView('data/save_honor.htm');
                         */
                        // Display last element

                    }
                    // For cell phones and cocoonjs
                    else {
                        // Get your honor
                        honor.add(
                                H.func.add.text({
                                    text: H.data.l10n.terms.end.get_honor_heading,
                                    top: '56%',
                                    left: '5%',
                                    w: '84%',
                                    h: '10%',
                                    fill: '#5c3519',
                                    stroke: false,
                                    size: '100%',
                                    weight: 'bold',
                                    align: 'left',
                                    auto_offset: false,
                                    bounds_top: paper.coords.top,
                                    bounds_left: paper.coords.left,
                                    bounds_h: paper.coords.h,
                                    bounds_w: paper.coords.w
                                }).elm
                                );

                        var honor_intro = H.func.add.text({
                            text: H.data.l10n.terms.end.mobile_get_honor_instructions,
                            top: '64%',
                            left: '5%',
                            w: '84%',
                            fill: '#5c3519',
                            stroke: false,
                            size: '100%',
                            weight: 'normal',
                            align: 'left',
                            auto_offset: false,
                            bounds_top: paper.coords.top,
                            bounds_left: paper.coords.left,
                            bounds_h: paper.coords.h,
                            bounds_w: paper.coords.w
                        }).elm;
                        for (var n in honor_intro) {
                            honor.add(honor_intro[n]);
                        }
                    }


                    honor.add(game.add.sprite(0, 0, ''));
                },
                outFrame: 0,
                overFrame: 1,
                downFrame: 2
            });

            H.func.add.text({
                text: H.data.l10n.terms.end.pathfinder_honor,
                top: '53%',
                left: '5%',
                w: '80%',
                fill: '#20180F',
                stroke: false,
                size: '100%',
                weight: 'bold',
                align: 'center',
                auto_offset: false,
                contain: true,
                bounds_top: honor_button.coords.top,
                bounds_left: honor_button.coords.left,
                bounds_h: honor_button.coords.h,
                bounds_w: honor_button.coords.w
            });

        }
        /*
        else {
            var honor_button = H.func.add.button({
                img: 'button_background',
                top: '41%',
                left: '70%',
                w: '20%',
                callback: function() {
         
                },
				outFrame: 0,
				overFrame: 1,
				downFrame: 2
            });
			
			H.func.add.text({
				text: H.data.l10n.terms.end.pathfinder_honor,
				top: '53%',
				left: '5%',
				w: '80%',
				fill: '#20180F',
				stroke: false,
				size: '100%',
				weight: 'bold',
				align: 'center',
				auto_offset: false,
				bounds_top: honor_button.coords.top,
				bounds_left: honor_button.coords.left,
				bounds_h: honor_button.coords.h,
				bounds_w: honor_button.coords.w
			});
        }
        */
        
        /* Bars and Buttons */
        var wood2 = H.func.add.sprite({
            img: 'wooden_board',
            top: '18%',
            left: '95%',
            w: '55%'
        });
        var wood1 = H.func.add.sprite({
            img: 'wooden_board',
            top: '0%',
            left: '95%',
            w: '55%'
        });
        H.func.add.text({
            text: this.text1 + (typeof this.text3 !== 'undefined' ? this.text3 : ''),
            top: '48%',
            h: '40%',
            left: '9%',
            w: '80%',
            size: '170%',
            weight: 'bold',
            fill: '#FFFFFF',
            stroke: true,
            auto_offset: false,
            force_one_line: true,
            bounds_top: wood1.coords.top,
            bounds_left: wood1.coords.left,
            bounds_h: wood1.coords.h,
            bounds_w: wood1.coords.w
        });
        H.func.add.text({
            text: this.text2,
            top: '53%',
            h: '30%',
            left: '9%',
            w: '80%',
            size: '170%',
            weight: 'bold',
            fill: '#FFFFFF',
            stroke: true,
            auto_offset: false,
            force_one_line: true,
            bounds_top: wood2.coords.top,
            bounds_left: wood2.coords.left,
            bounds_h: wood2.coords.h,
            bounds_w: wood2.coords.w
        });
        
		
		/* Load Balloons */
		
		if ((H.work.end_reason === 'everything_answered') && (H.work.points >= H.config.rules.points_for_honor)) {
			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.physics.arcade.gravity.y = -20;
			var balloon1 = H.func.add.sprite({img: 'balloon', top: '70%', left: '62.5%', w: '3%', auto_offset: false}).elm;
			balloon1.anchor = new Phaser.Point(0.276, 1);
			balloon1.rotation = 0.2;
			var balloon2 = H.func.add.sprite({img: 'balloon', top: '70%', left: '62.5%', w: '3%', auto_offset: false}).elm;
			balloon2.anchor = new Phaser.Point(0.276, 1);
			balloon2.rotation = 0.7;
			var balloon3 = H.func.add.sprite({img: 'balloon', top: '70%', left: '62.5%', w: '3%', auto_offset: false}).elm;
			balloon3.anchor = new Phaser.Point(0.276, 1);
			balloon3.rotation = -0.3;
			
			var balloon4 = H.func.add.sprite({img: 'balloon', top: '69.2%', left: '57.5%', w: '3%', auto_offset: false}).elm;
			balloon4.anchor = new Phaser.Point(0.276, 1);
			balloon4.rotation = -0.1;
			var balloon5 = H.func.add.sprite({img: 'balloon', top: '69.2%', left: '57.5%', w: '3%', auto_offset: false}).elm;
			balloon5.anchor = new Phaser.Point(0.276, 1);
			balloon5.rotation = 0.2;
			var balloon6 = H.func.add.sprite({img: 'balloon', top: '69.2%', left: '57.5%', w: '3%', auto_offset: false}).elm;
			balloon6.anchor = new Phaser.Point(0.276, 1);
			balloon6.rotation = -0.6;
			
			setTimeout(function() {
				game.physics.enable(balloon1, Phaser.Physics.ARCADE);
				game.physics.enable(balloon2, Phaser.Physics.ARCADE);
				game.physics.enable(balloon3, Phaser.Physics.ARCADE);
			}, 3000);
			
			setTimeout(function() {
				game.physics.enable(balloon4, Phaser.Physics.ARCADE);
				game.physics.enable(balloon5, Phaser.Physics.ARCADE);
				game.physics.enable(balloon6, Phaser.Physics.ARCADE);
			}, 2000);
		}
		
		
        // Display last element
        game.add.sprite(0,0,'');
        
        // Save High Scores
        H.func.high_scores.save();

    };
	
/*	this.honor_substitute_buttons = {
		add_buttons: function() {
			// if (navigator.isCocoonJS) {
			
				if (typeof H.work.honor_subs_buttons === 'undefined' || !H.work.honor_subs_buttons) {
					H.work.honor_subs_buttons = game.add.group();    
				
					H.work.honor_subs_buttons.add(
						H.func.add.sprite({
							img: 'cover',
							top: '0%',
							left: '0%',
							w: '100%',
							h: '100%',
							scale: 'unproportional',
							auto_offset: false
						}).elm
					);
					
					H.work.honor_subs_buttons.add(
						H.func.add.text({
							text: H.data.l10n.terms.end.your_name,
							top: '6%',
							left: '2%',
							w: '15%',
							fill: '#FFFFFF',
							weight: 'bold',
							auto_offset: false,
							force_one_line: true
						}).elm
					);
				
					H.work.honor_subs_buttons.add(
						H.func.add.text({
							text: H.data.l10n.terms.end.email_of_director,
							top: '6%',
							left: '34.5%',
							w: '30%',
							fill: '#FFFFFF',
							weight: 'bold',
							auto_offset: false,
							force_one_line: true
						}).elm
					);
				
					obj.box_name = H.func.add.button({
						img: 'textbox',
						top: '5%',
						left: '13%',
						w: '20%',
						h: '7%',
						auto_offset: false,
						scale: 'unproportional',
						callback: function() {
							CocoonJS.App.forward('activate_field(\'name\')');
						}
					});

					obj.box_address = H.func.add.button({
						img: 'textbox',
						top: '5%',
						left: '60%',
						w: '20%',
						h: '7%',
						auto_offset: false,
						scale: 'unproportional',
						callback: function() {
							CocoonJS.App.forward('activate_field(\'address\')');
						}
					});
					
					obj.box_confirm_button = H.func.add.button({
						img: 'button_background',
						top: '0%',
						left: '82%',
						w: '16%',
						h: '13%',
						auto_offset: false,
						scale: 'unproportional',
						callback: function() {
							obj.honor_substitute_buttons.destroy();
						}
					});

					obj.box_confirm_button_text = H.func.add.text({
						text: H.data.l10n.terms.end.email_close,
						top: '50%',
						left: '5%',
						w: '80%',
						fill: '#20180F',
						stroke: false,
						size: '100%',
						weight: 'bold',
						align: 'center',
						auto_offset: false,
						force_one_line: true,
						bounds_top: obj.box_confirm_button.coords.top,
						bounds_left: obj.box_confirm_button.coords.left,
						bounds_h: obj.box_confirm_button.coords.h,
						bounds_w: obj.box_confirm_button.coords.w
					});
					
					
					H.work.honor_subs_buttons.add(obj.box_address.elm);
					H.work.honor_subs_buttons.add(obj.box_name.elm);
					H.work.honor_subs_buttons.add(obj.box_confirm_button.elm);
					H.work.honor_subs_buttons.add(obj.box_confirm_button_text.elm);
					
					
					
				}
			// }
		},
		write: function(field, text) {
			// if (navigator.isCocoonJS) {
			
				
				obj.honor_substitute_buttons.add_buttons();

			
				if (typeof (obj['box_' + field + '_text']) !== 'undefined') {
					obj['box_' + field + '_text'].elm.destroy();
					obj['box_' + field + '_text'] = false;
				}
				
				obj['box_' + field + '_text'] = H.func.add.text({
					text: text,
					top: '15%',
					left: '2%',
					w: '100%',
					//stroke: 'true',
					fill: '#3f2716',
					weight: 'bold',
					auto_offset: false,
					force_one_line: true,
					bounds_top: obj['box_' + field].coords.top,
					bounds_left: obj['box_' + field].coords.left,
					bounds_h: obj['box_' + field].coords.h,
					bounds_w: obj['box_' + field].coords.w
				});
				
				H.work.honor_subs_buttons.add(obj['box_' + field + '_text'].elm);
				H.work.honor_subs_buttons.add(game.add.sprite(0,0,''));
			// }
		},
		destroy: function() {
			// if (navigator.isCocoonJS) {
				H.work.honor_subs_buttons.destroy();
				H.work.honor_subs_buttons = false;
			// }
		}
	};*/

    
};

H.func.high_scores = {
    save: function(p) {

        if (typeof p === 'undefined' || p.name === 'undefined') {
            var p = {
                name: 'global',
                points: H.work.points
            };
        }
        
        // Get High Scores
        var high_scores_string = localStorage.getItem('Pitcairn_High_Scores');
        if (high_scores_string !== null) {
            var high_scores = JSON.parse(high_scores_string);
        } else {
            var high_scores = {};
        }
        
        // Add new values if necessary
        if (typeof high_scores[p.name] === 'undefined' || high_scores[p.name] < p.points) {
            high_scores[p.name] = p.points;
            
            // Save High Scores
            high_scores_string = JSON.stringify(high_scores);
            localStorage.setItem('Pitcairn_High_Scores', high_scores_string);
        }
        
    },
    send: function() {
		window.jsonp = function(data) {
			if (data === 'success') {
				H.func.misc.note(H.data.l10n.terms.end.email_sent_confirmation);
			}
			else {
				H.func.misc.note(H.data.l10n.terms.end.email_problem);
			}
		};
		
		var script = document.createElement('script');
		script.src = 'http://honor.ellenwhite.org/mailer.php?action=send_honor&name=' + H.data.name + '&address=' + H.data.address + '&callback=jsonp';
		document.getElementsByTagName('head')[0].appendChild(script);
    },
    save_and_send: function() {
		
		if (typeof H.data.name !== 'undefined' && typeof H.data.address !== 'undefined') {

			this.save({
				name: H.data.name,
				points: H.work.points
			});

			this.send();
		}
    }
};
