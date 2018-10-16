/* global H */

H.state.Start = function(game) {
    this.preload = function() {
    
        //Set-up our preloader sprite
        game.load.image('loading_background_bar', 'img/basis/loading_background_bar.png');  
        game.load.image('loading_indicator_bar', 'img/basis/loading_indicator_bar.png');
        
        H.work.loading = [];
        H.work.loading.push(
            H.func.add.text({
                text: H.data.l10n.terms.start.loading,
                top: '42%',
                left: '10%',
                w: '80%',
				align: 'center',
				fill: '#FFFFFF',
				weight: 'bold'
            }).elm
        );
		if (!navigator.isCocoonJS) {
			H.work.loading.push(
				H.func.add.sprite({
					img: 'loading_background_bar',
					top: '50%',
					left: '50%',
					w: '30%',
					max_w: 434
				}).elm
			);
			H.work.loading.push(
				H.func.add.sprite({
					img: 'loading_indicator_bar',
					top: '50%',
					left: '50%',
					w: '30%',
					max_w: 435
				}).elm
			);
			game.load.setPreloadSprite(H.work.loading[2]);
		}
		
        // Basis
        game.load.image('header', 'img/basis/header.jpg');
        game.load.image('footer', 'img/basis/footer.jpg');
        game.load.image('logo', 'img/basis/logo.png');
        game.load.image('scroll', 'img/basis/scroll.png');
        game.load.image('wood_cord', 'img/basis/wood_cord.png');
        game.load.image('wood_status', 'img/basis/wood_status.png');
        // game.load.image('button_back', 'img/basis/button_back.png');
        game.load.spritesheet('button_back', 'img/basis/button_back_' + H.data.language + '.png', 250, 50);
        game.load.image('cover', 'img/basis/dark_cover.png');
        game.load.image('reader_background', 'img/basis/paper_light.png');
        game.load.spritesheet('reader_arrow', 'img/basis/arrow.png', 45, 75);
        
        // Start
        game.load.image('start_background', 'img/start/background.jpg');
        game.load.spritesheet('start_button_background', 'img/start/button_background.png', 223, 124, 3);
        game.load.spritesheet('start_button_seal', 'img/start/start_seal.png', 111, 105, 3);
        game.load.image('start_caption_start_the_game', 'img/start/start_the_game_caption_' + H.data.language + '.png');

        // Flags
        for(n in H.config.languages) {
            game.load.spritesheet('flag_' + H.config.languages[n].iso, 'img/start/flag_' + H.config.languages[n].iso + '.png', 64, 64, 3);
        }
        
        // Audio
        game.load.audio('background', ['audio/mp3/theme.mp3', 'audio/ogg/theme.ogg']);
		//game.load.audio('sound_game_loop', ['audio/mp3/game_loop.mp3', 'audio/ogg/game_loop.ogg']); // Shorter loading time afterwards
        
        // Font
        //game.load.bitmapFont('egw1', 'fonts/egw1_0.png', 'fonts/egw1.xml');
        //game.load.image('egw1', 'fonts/ubuntu_mono.png');
    };
    
    this.create = function() {

		for (var n = 0; n < H.work.loading.length; n++) {
            H.work.loading[n].destroy();
        }
        
        var obj = this;
    
        /* Load Background */
        var background = game.add.sprite(0, 0, 'start_background');

        // Scale so it fits world as neatly as possible
        background.scale.x = background.scale.y = 1 / Math.min(game.cache.getImage('start_background').width / game.world.bounds.width, game.cache.getImage('start_background').height / game.world.bounds.height);
        
        /* Load Header */
        var header = game.add.sprite(0, 0, 'header');
        header.width = game.world.bounds.width;
        header.height = H.func.dim.get_height('header', header.width);
        
        /* Load Footer */
        var footer_height = H.func.dim.get_height('footer', game.world.bounds.width);
        var footer = game.add.sprite(0, game.world.bounds.height-footer_height, 'footer');
        footer.width = game.world.bounds.width;
        footer.height = footer_height;
        
        /* Set bounding box to calculate position of other elements */
        H.config.game.bounding_box.top = header.height;
        H.config.game.bounding_box.bottom = footer.height;
        
        /* Add Flags */
        var left = 95;
        for(n in H.config.languages) {
            (function(lang) {
                H.func.add.button({
                    img: 'flag_' + lang.iso,
                    top: '50%',
                    left: left + '%',
                    w: '5%',
                    callback: function() {
                        H.func.misc.load_language(lang.full, function() {
                            H.game.sound.remove(music);
                            H.game.state.start('start');
                        });
                    },
                    callback_context: this,
                    bounds_top: 0,
                    bounds_left: 0,
                    bounds_h: header.height,
                    bounds_w: header.width,
                    outFrame: 0,
                    overFrame: 1,
                    downFrame: 2
                });
                left -= 7;
            })(H.config.languages[n]);
        }
        
        /* Add Instructions-Button */
        var buttons_instructions = H.func.add.button({
            img: 'start_button_background',
            top: '92.5%',
            left: '8%',
            w: '20%',
            callback: function() {
                //this.elements.introduction();
                if (!H.work.reader_open) {
                    H.reader(H.data.l10n.instructions);
                }
            },
            callback_context: this,
			outFrame: 0,
			overFrame: 1,
			downFrame: 2
        });
		
        H.func.add.text({
            text: H.data.l10n.terms.start.instructions,
            top: '62%',
            left: '5%',
            w: '90%',
            h: '10%',
            fill: '#20180F',
            stroke: false,
            size: '110%',
            weight: 'bold',
			align: 'center',
			auto_offset: false,
            bounds_top: buttons_instructions.coords.top,
            bounds_left: buttons_instructions.coords.left,
            bounds_h: buttons_instructions.coords.h,
            bounds_w: buttons_instructions.coords.w
        });
		
        /* Add Story-Button */
        var buttons_story = H.func.add.button({
            img: 'start_button_background',
            top: '92.5%',
            left: '36%',
            w: '20%',
            callback: function() {
                // this.elements.story();
                if (!H.work.reader_open) {
                    H.reader(H.data.l10n.story);
                }
            },
            callback_context: this,
			outFrame: 0,
			overFrame: 1,
			downFrame: 2
        });
		
        H.func.add.text({
            text: H.data.l10n.terms.start.story,
            top: '62%',
            left: '5%',
            w: '90%',
            h: '10%',
            fill: '#20180F',
            stroke: false,
            size: '110%',
			align: 'center',
            weight: 'bold',
			auto_offset: false,
            bounds_top: buttons_story.coords.top,
            bounds_left: buttons_story.coords.left,
            bounds_h: buttons_story.coords.h,
            bounds_w: buttons_story.coords.w
        });

        
        /* Add Scroll */
        var scroll = H.func.add.sprite({
            img: 'scroll',
            top: '10%',
            left: '8%',
            w: '50%',
            h: '75%'
        });
        
        /* High Scores */
        
        // Get high scores
        var high_scores = {};
        var high_scores_string = localStorage.getItem('Pitcairn_High_Scores');
        if (high_scores_string !== null) {
            var high_scores_json = JSON.parse(high_scores_string);
            for(var n in high_scores_json) {
                if (n === 'global') {
                    var high_scores_alltime = high_scores_json[n];
                }
                else {
                    high_scores[n] = high_scores_json[n];
                }
            }
        }
        
        var wood_cord = H.func.add.sprite({
            img: 'wood_cord',
            top: '0%',
            left: '65%',
            w: '30%',
            auto_offset: false
        });
        var high_scores_heading = H.func.add.sprite({
            img: 'wood_status',
            top: wood_cord.coords.h,
            left: '65%',
            w: '30%',
            auto_offset: false
        });
        H.func.add.text({
            text: H.data.l10n.terms.start.high_scores,
            top: '20%',
            left: '15%',
            w: '70%',
            h: '60%',
            contain: true,
            fill: '#FFFFFF',
            force_one_line: true,
            stroke: true,
            size: '140%',
            weight: 'bold',
            auto_offset: false,
            bounds_top: high_scores_heading.coords.top,
            bounds_left: high_scores_heading.coords.left,
            bounds_h: high_scores_heading.coords.h,
            bounds_w: high_scores_heading.coords.w
        });
        
        if (!high_scores_alltime) {
            var high_scores_heading_none_available = H.func.add.sprite({
                img: 'wood_status',
                top: wood_cord.coords.h + high_scores_heading.coords.h,
                left: '65%',
                w: '30%',
                auto_offset: false
            });
            H.func.add.text({
                text: H.data.l10n.terms.start.not_yet_available,
                top: '30%',
                left: '15%',
                w: '70%',
                h: '85%',
                contain: true,
                stroke: true,
                fill: '#FFFFFF',
                size: '90%',
                weight: 'bold',
                auto_offset: false,
                bounds_top: high_scores_heading_none_available.coords.top,
                bounds_left: high_scores_heading_none_available.coords.left,
                bounds_h: high_scores_heading_none_available.coords.h,
                bounds_w: high_scores_heading_none_available.coords.w
            });
        }
        else {
            var high_scores_board = H.func.add.sprite({
                img: 'wood_status',
                top: wood_cord.coords.h + high_scores_heading.coords.h,
                left: '65%',
                w: '30%',
                auto_offset: false
            });
            H.func.add.text({
                text: H.data.l10n.terms.start.all_time + ': ' + high_scores_alltime,
                top: '30%',
                left: '15%',
                w: '85%',
                h: '85%',
                stroke: true,
                fill: '#FFFFFF',
                size: '90%',
                weight: 'bold',
                auto_offset: false,
                bounds_top: high_scores_board.coords.top,
                bounds_left: high_scores_board.coords.left,
                bounds_h: high_scores_board.coords.h,
                bounds_w: high_scores_board.coords.w
            });
        }
        var c = 2;
        for(var n in high_scores) {
            var high_scores_board = H.func.add.sprite({
                img: 'wood_status',
                top: wood_cord.coords.h + (c * high_scores_heading.coords.h),
                left: '65%',
                w: '30%',
                auto_offset: false
            });
            H.func.add.text({
                text: n.toUpperCase() + ': ' + high_scores[n],
                top: '30%',
                left: '15%',
                w: '85%',
                h: '85%',
                stroke: true,
                fill: '#FFFFFF',
                size: '90%',
                weight: 'bold',
                auto_offset: false,
                bounds_top: high_scores_board.coords.top,
                bounds_left: high_scores_board.coords.left,
                bounds_h: high_scores_board.coords.h,
                bounds_w: high_scores_board.coords.w
            });
            c++;
        }
        
        this.elements = {
            current_elements: [],
            scroll: function() {
                
                this.remove();
                
                /* Add Logo */
                this.current_elements.push(
                    H.func.add.sprite({
                        img: 'logo',
                        top: '30%',
                        left: '50%',
                        h: '35%',
                        bounds_top: scroll.coords.top,
                        bounds_left: scroll.coords.left,
                        bounds_h: scroll.coords.h,
                        bounds_w: scroll.coords.w
                    })
                );
                
                /* Start the Game Caption */
                this.current_elements.push(
                    H.func.add.sprite({
                        img: 'start_caption_start_the_game',
                        top: '75%',
                        left: '20%',
                        w: '55%',
                        bounds_top: scroll.coords.top,
                        bounds_left: scroll.coords.left,
                        bounds_h: scroll.coords.h,
                        bounds_w: scroll.coords.w
                    })
                );
                
                /* Start the Game */
                this.current_elements.push(
                    H.func.add.button({
                        img: 'start_button_seal',
                        top: '70%',
                        left: '85%',
                        w: '20%',
                        bounds_top: scroll.coords.top,
                        bounds_left: scroll.coords.left,
                        bounds_h: scroll.coords.h,
                        bounds_w: scroll.coords.w,
                        callback: function() {
                            if (!H.work.reader_open) {
                                game.sound.remove(music);
                                H.game.state.start('main');
                            }
                        },
						outFrame: 0,
						overFrame: 1,
						downFrame: 2
                    })
                );
                
                // Display last element
                game.add.sprite(0,0,'');
            },
            introduction: function() {
                this.remove();
                
				H.work.webview_coords = H.func.dim.get_coords({
                    top: '35%',
                    left: '40%',
                    w: '88%',
                    h: '62%',
                    bounds_top: scroll.coords.top,
                    bounds_left: scroll.coords.left,
                    bounds_h: scroll.coords.h,
                    bounds_w: scroll.coords.w
				});
//				CocoonJS.App.loadInTheWebView('data/' + H.data.language + '/instructions.htm');
//				if (document.getElementById("CocoonJS_App_ForCocoonJS_WebViewDiv")) {
//					document.getElementById("CocoonJS_App_ForCocoonJS_WebViewDiv").style.borderBottom="1px solid #402715";
//				}
                
                this.current_elements.push(
                    /* Add Back-Button */
                    H.func.add.button({
                        img: 'button_back',
                        top: '79%',
                        left: '8%',
                        w: '25%',
                        auto_offset: false,
                        bounds_top: scroll.coords.top,
                        bounds_left: scroll.coords.left,
                        bounds_h: scroll.coords.h,
                        bounds_w: scroll.coords.w,
                        callback: function() {
                            this.elements.scroll();
                        },
                        callback_context: obj
                    })
                );

                
                // Display last element
                this.current_elements.push({
                    elm: game.add.sprite(0,0,'')
                });
            },
            story: function() {
                this.remove();

				H.work.webview_coords = H.func.dim.get_coords({
                    top: '35%',
                    left: '40%',
                    w: '88%',
                    h: '62%',
                    bounds_top: scroll.coords.top,
                    bounds_left: scroll.coords.left,
                    bounds_h: scroll.coords.h,
                    bounds_w: scroll.coords.w
				});
//				CocoonJS.App.loadInTheWebView('data/' + H.data.language + '/story.htm');
//				if (document.getElementById("CocoonJS_App_ForCocoonJS_WebViewDiv")) {
//					document.getElementById("CocoonJS_App_ForCocoonJS_WebViewDiv").style.borderBottom="1px solid #402715";
//				}
                
                this.current_elements.push(
                    /* Add Back-Button */
                    H.func.add.button({
                        img: 'button_back',
                        top: '79%',
                        left: '8%',
                        w: '25%',
                        auto_offset: false,
                        bounds_top: scroll.coords.top,
                        bounds_left: scroll.coords.left,
                        bounds_h: scroll.coords.h,
                        bounds_w: scroll.coords.w,
                        callback: function() {
                            this.elements.scroll();
                        },
                        callback_context: obj
                    })
                );
                
                // Display last element
                this.current_elements.push({
                    elm: game.add.sprite(0,0,'')
                });
            },
            remove: function() {
//				CocoonJS.App.hideTheWebView();
                for(var n in this.current_elements) {
                    this.current_elements[n].elm.destroy();
                }
                this.current_elements.length = 0;
            }
        };
        
        this.elements.scroll();
        
        // Audio
        var music = game.add.audio('background', 1, true);
        var volume = Math.round(Math.pow(Math.max(0.1,H.work.background_volume), 2)*100)/100;
        music.play('', 0, volume, true);
    };
};
