/* global H */

H.state.Main = function(game) {

    /*
     this.game;		//	a reference to the currently running game
     this.add;		//	used to add sprites, text, groups, etc
     this.camera;	//	a reference to the game camera
     this.cache;		//	the game cache
     this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
     this.load;		//	for preloading assets
     this.math;		//	lots of useful common math operations
     this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
     this.game;		//	the game game
     this.time;		//	the clock
     this.tweens;	//	the tween manager
     this.world;		//	the game world
     this.particles;	//	the particle manager
     this.physics;	//	the physics manager
     this.rnd;		//	the repeatable random number generator
     */

    var obj = this;

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
					width: '30%'
				}).elm
			);
			H.work.loading.push(
				H.func.add.sprite({
					img: 'loading_indicator_bar',
					top: '50%',
					left: '50%',
					width: '30%'
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
        game.load.spritesheet('button_back', 'img/basis/button_back_' + H.data.language + '.png', 250, 50);
        game.load.image('paper_light', 'img/basis/paper_light.png');
        game.load.image('paper_dark', 'img/basis/paper_dark.png');
        game.load.image('cover', 'img/basis/dark_cover.png');
        game.load.image('note_background', 'img/basis/note_background.jpg');
        
        // Main
		if (navigator.isCocoonJS) {
			game.load.image('board_basis', 'img/game/board_basis_small.jpg');
			game.load.image('board_cover', 'img/game/board_cover_small.png');
		}
		else {
			// game.load.image('board_basis', 'img/game/board_basis_small.jpg');
			// game.load.image('board_cover', 'img/game/board_cover_small.png');
			game.load.image('board_basis', 'img/game/board_basis.jpg');
			game.load.image('board_cover', 'img/game/board_cover.png');
		}
        game.load.image('player', 'img/game/figure_shadow.png');
        game.load.image('icon_points', 'img/game/points.png');
        game.load.image('icon_tokens', 'img/game/tokens.png');
        game.load.image('icon_time', 'img/game/time.png');
        game.load.image('status_text_background_rectangle', 'img/game/status_text_background_rectangle.png');
        game.load.image('status_text_background_circle', 'img/game/status_text_background_circle.png');
        game.load.image('button_stick', 'img/game/button_stick.png');
        game.load.spritesheet('button_redeem_tokens', 'img/game/button_redeem_tokens.png', 232, 70, 3);
        game.load.spritesheet('button_view_map', 'img/game/button_view_map.png', 222, 75, 3);
        game.load.spritesheet('button_answer_cards', 'img/game/button_answer_cards.png', 231, 70, 3);
        game.load.spritesheet('button_answers_primary', 'img/game/button_answers_primary.png', 682, 47, 3);
        game.load.spritesheet('button_answers_secondary', 'img/game/button_answers_secondary.png', 682, 47, 3);
        game.load.image('action_location', 'img/game/action_sign.png');
        game.load.image('action_answer_card', 'img/game/action_answer_card.png');
        game.load.image('action_bonus_question', 'img/game/action_bonus_question.png');
        game.load.image('action_time_extension', 'img/game/action_time_extension.png');        
        game.load.image('action_tokens', 'img/game/action_tokens.png');        
        game.load.image('action_points', 'img/game/action_points.png');        
        game.load.image('action_answer_card_unavailable', 'img/game/action_answer_card_unavailable.png');
        game.load.image('action_bonus_question_unavailable', 'img/game/action_bonus_question_unavailable.png');
        game.load.image('action_time_extension_unavailable', 'img/game/action_time_extension_unavailable.png');
        game.load.image('heading_redeem_tokens', 'img/game/redeem_tokens.png');
        game.load.spritesheet('background_redeem_tokens', 'img/game/background_redeem_tokens.png', 571, 139, 3);
        game.load.image('question_background_bonus', 'img/game/question_background_bonus.png');
        game.load.image('answer_cards_background', 'img/game/answer_cards_background.png');
        game.load.spritesheet('answer_cards_icon', 'img/game/answer_cards_icon.png', 133, 92);
        game.load.spritesheet('button_pause', 'img/game/button_pause.png', 90, 90);
        game.load.spritesheet('button_restart', 'img/game/button_restart.png', 90, 90);
        game.load.spritesheet('button_play', 'img/game/button_play.png', 90, 90);
        game.load.image('path_indicator', 'img/game/path_indicator.png');
        game.load.spritesheet('button_continue', 'img/game/button_continue.png', 273, 106, 3);
        game.load.image('volume_icon', 'img/game/volume_icon.png');
        game.load.spritesheet('volume_plus', 'img/game/volume_plus.png', 84, 78);
        game.load.spritesheet('volume_minus', 'img/game/volume_minus.png', 88, 78);
        game.load.image('volume_border', 'img/game/volume_border.png');
        
        // Stuff for the end
        game.load.image('paper_light', 'img/basis/paper_light.png');
        game.load.image('cover', 'img/basis/dark_cover.png');
        game.load.image('wooden_board', 'img/end/wooden_board.png');
        
        // Audio
        game.load.audio('sound_game_loop', ['audio/mp3/game_loop.mp3', 'audio/ogg/game_loop.ogg']);
        game.load.audio('sound_action', ['audio/mp3/action.mp3', 'audio/ogg/action.ogg']);
        game.load.audio('sound_action_wheel', ['audio/mp3/action_wheel.mp3', 'audio/ogg/action_wheel.ogg']);
        game.load.audio('sound_answer_right', ['audio/mp3/answer_right.mp3', 'audio/ogg/answer_right.ogg']);
        game.load.audio('sound_answer_wrong', ['audio/mp3/answer_wrong.mp3', 'audio/ogg/answer_wrong.ogg']);
        game.load.audio('sound_paper_flip', ['audio/mp3/paper_flip.mp3', 'audio/ogg/paper_flip.ogg']);
        game.load.audio('sound_time_running_out', ['audio/mp3/time_running_out.mp3', 'audio/ogg/time_running_out.ogg']);
        
    };

    this.create = function () {
    
        H.game.input.maxPointers = 1;
        H.work.game_counter++; 

        for (var n = 0; n < H.work.loading.length; n++) {
            H.work.loading[n].destroy();
        }
        
        // Reset
        if (typeof questions !== 'undefined') {
            questions.position = 0;
            questions.kind = 'primary';
            H.work.pause.total = 0;
            H.work.end_reason = '';
            H.work.question_shown = false;
        }
       
        // Define Game Path
        obj.path = 
            [{"sx":"573.6","sy":"1371.3","ex":"516.0","ey":"1289.3","c1x":"583.3","c1y":"1318.0","c2x":"576.1","c2y":"1283.4"},
            {"sx":"516.0","sy":"1289.3","ex":"130.1","ey":"1241.9","c1x":"260.8","c1y":"1314.2","c2x":"130.1","c2y":"1312.3"},
            {"sx":"130.1","sy":"1241.9","ex":"382.5","ey":"1154.0","c1x":"130.1","c1y":"1199.3","c2x":"240.5","c2y":"1171.5"},
            {"sx":"382.5","sy":"1154.0","ex":"637.8","ey":"1125.8","c1x":"484.9","c1y":"1141.4","c2x":"589.3","c2y":"1132.2"},
            {"sx":"637.8","sy":"1125.8","ex":"749.8","ey":"1107.7","c1x":"686.9","c1y":"1119.2","c2x":"722.0","c2y":"1112.8"},
            {"sx":"749.8","sy":"1107.7","ex":"770.8","ey":"1098.5","c1x":"757.8","c1y":"1106.2","c2x":"763.9","c2y":"1099.8"},
            {"sx":"770.8","sy":"1098.5","ex":"1014.9","ey":"1052.1","c1x":"822.3","c1y":"1089.0","c2x":"937.2","c2y":"1068.2"},
            {"sx":"1014.9","sy":"1052.1","ex":"1299.0","ey":"1099.9","c1x":"1132.0","c1y":"1027.8","c2x":"1236.2","c2y":"1076.6"},
            {"sx":"1299.0","sy":"1099.9","ex":"1507.3","ey":"1124.3","c1x":"1366.0","c1y":"1124.9","c2x":"1436.8","c2y":"1140.5"},
            {"sx":"1507.3","sy":"1124.3","ex":"1610.6","ey":"1017.3","c1x":"1576.0","c1y":"1108.6","c2x":"1536.4","c2y":"1031.4"},
            {"sx":"1610.6","sy":"1017.3","ex":"2054.6","ey":"1047.3","c1x":"1728.8","c1y":"994.9","c2x":"1946.2","c2y":"1013.8"},
            {"sx":"2054.6","sy":"1047.3","ex":"2131.6","ey":"1143.6","c1x":"2115.6","c1y":"1066.1","c2x":"2162.9","c2y":"1076.0"},
            {"sx":"2131.6","sy":"1143.6","ex":"2310.8","ey":"1175.3","c1x":"2106.2","c1y":"1198.7","c2x":"2283.8","c2y":"1176.5"},
            {"sx":"2310.8","sy":"1175.3","ex":"2503.0","ey":"1184.1","c1x":"2373.2","c1y":"1172.4","c2x":"2441.8","c2y":"1169.5"},
            {"sx":"2503.0","sy":"1184.1","ex":"2681.1","ey":"1304.8","c1x":"2571.9","c1y":"1200.7","c2x":"2623.5","c2y":"1267.4"},
            {"sx":"2681.1","sy":"1304.8","ex":"2508.6","ey":"1398.7","c1x":"2862.6","c1y":"1422.4","c2x":"2604.0","c2y":"1399.0"},
            {"sx":"2508.6","sy":"1398.7","ex":"2090.3","ey":"1436.6","c1x":"2365.6","c1y":"1398.3","c2x":"2227.5","c2y":"1387.6"},
            {"sx":"2090.3","sy":"1436.6","ex":"1690.1","ey":"1448.9","c1x":"1929.7","c1y":"1494.0","c2x":"1826.3","c2y":"1483.9"},
            {"sx":"1690.1","sy":"1448.9","ex":"1634.9","ey":"1330.5","c1x":"1620.6","c1y":"1431.0","c2x":"1580.7","c2y":"1393.8"},
            {"sx":"1634.9","sy":"1330.5","ex":"1584.8","ey":"1201.4","c1x":"1682.1","c1y":"1275.4","c2x":"1645.7","c2y":"1216.7"},
            {"sx":"1584.8","sy":"1201.4","ex":"1420.6","ey":"1254.8","c1x":"1523.1","c1y":"1185.9","c2x":"1466.0","c2y":"1216.5"},
            {"sx":"1420.6","sy":"1254.8","ex":"1296.5","ey":"1332.8","c1x":"1363.6","c1y":"1302.9","c2x":"1356.5","c2y":"1358.0"},
            {"sx":"1296.5","sy":"1332.8","ex":"1279.7","ey":"1320.3","c1x":"1290.6","c1y":"1330.3","c2x":"1287.4","c2y":"1321.5"},
            {"sx":"1279.7","sy":"1320.3","ex":"1006.3","ey":"1277.5","c1x":"1146.6","c1y":"1300.6","c2x":"1129.5","c2y":"1297.6"},
            {"sx":"1006.3","sy":"1277.5","ex":"987.5","ey":"1281.3","c1x":"1000.5","c1y":"1276.6","c2x":"993.1","c2y":"1281.8"},
            {"sx":"987.5","sy":"1281.3","ex":"627.8","ey":"1286.8","c1x":"865.5","c1y":"1268.3","c2x":"761.3","c2y":"1274.5"},
            {"sx":"627.8","sy":"1286.8","ex":"573.6","ey":"1371.3","c1x":"569.8","c1y":"1292.1","c2x":"582.5","c2y":"1319.9"}];

        
        // Extrapolate path to different image source		
		H.work.world_zoom = 1;
		if (navigator.isCocoonJS) {
			H.work.world_zoom = H.game.cache.getImage('board_basis').width/2880;
			for(var n in obj.path) {
				for(var m in obj.path[n]) {
					obj.path[n][m] *= H.work.world_zoom;
				}
			}
            if (H.work.game_counter <= 1) {
			 H.config.game.map_scale /= H.work.world_zoom;
            }
		}
        
        // Work with path for a smooth ride
        var total_length = 0;
        for(var n in obj.path) {
            obj.path[n].length = curve.get_curve_length(obj.path[n]);
            total_length += obj.path[n].length;
        }
        var length = 0;
        for (var n in obj.path) {
            obj.path[n].pos_start = length / total_length * 100;
            obj.path[n].pos_end = (length + obj.path[n].length) / total_length * 100;
            length += obj.path[n].length;
        }
                
        // Define Settings
        var map = game.cache.getImage('board_basis');
        obj.vars = {
            map_width      : map.width,
            map_height     : map.height,
            questions_spacing: 100/H.config.rules.primary_questions_amount,
            zoom_map_action: false,
            overlay: false
        };
        
        // Get highest and lowerst point on the map, in order to scale the player
        this.vars.lowest_y = 9999;
        this.vars.highest_y = 0;
        for(var n in this.path) {
            if (this.path[n].sy > this.vars.highest_y) {
                this.vars.highest_y = this.path[n].sy;
            }
            if (this.path[n].sy < this.vars.lowest_y) {
                this.vars.lowest_y = this.path[n].sy;
            }
        }

        // Set world size to game size - basically, everything has to fit nicely. Only the group with the map will be moved/zoomed.
        game.world.setBounds(0, 0, H.config.game.width, H.config.game.height);
        
        // Add two groups
        this.board = game.add.group();
        this.overlays = game.add.group();
        
        /* Load Header */
        var header = game.add.sprite(0, 0, 'header');
        header.width = game.world.bounds.width;
        header.height = H.func.dim.get_height('header', header.width);
        this.overlays.add(header);
        
        /* Load Footer */
        var footer_height = H.func.dim.get_height('footer', game.world.bounds.width);
        var footer = game.add.sprite(0, game.world.bounds.height - footer_height, 'footer');
        footer.width = game.world.bounds.width;
        footer.height = footer_height;
        
        /* Set bounding box to calculate position of other elements */
        // TODO: Delete once start will load first again
        //H.config.game.bounding_box.top += header.height;
        //H.config.game.bounding_box.bottom += footer.height;

        // Add Board
        this.board.create(0, 0, 'board_basis');
        
        // Add Path Indicators
        /*
        var pos, indicator, amount = 300;
        for(var n = 0; n < amount; n++) {
            pos = curve.get_path_position(n/amount*100);
            indicator = this.board.create(pos.x, pos.y, 'path_indicator');
            indicator.anchor = new Phaser.Point(0.5, 0.5);
        }
        */
        
        // Init Actions
        actions.init();

        // Add Player
        this.player = this.board.create(this.path[0].sx, this.path[0].sy, 'player');
        this.player.anchor = new Phaser.Point(0.703, 0.91);
        player.travel_to(this.player, 0, false, false);        
        
        // Add Cover Objects to Map
        this.board.create(0, 0, 'board_cover');
                
        //camera.fit(obj.board, false);
        camera.point(obj.board, H.config.game.map_scale, obj.path[0].sx, obj.path[0].sy, false);
            
        // Add Status (Points, Tokens, Time)
        var wood_cord = H.func.add.sprite({
            img: 'wood_cord',
            top: '0%',
            left: '77%',
            w: '20%',
            auto_offset: false
        });
        var boards = [];
        for (var n = 1; n <= 3; n++) {
            boards[n] = H.func.add.sprite({
                img: 'wood_status',
                top: n * wood_cord.coords.h,
                left: '77%',
                w: '20%',
                auto_offset: false
            });
            H.func.add.sprite({
                img: 'status_text_background_circle',
                top: '18%',
                left: '15%',
                h: '70%',
                auto_offset: false,
                bounds_top: boards[n].coords.top,
                bounds_left: boards[n].coords.left,
                bounds_h: boards[n].coords.h,
                bounds_w: boards[n].coords.w
            });
            H.func.add.sprite({
                img: 'status_text_background_rectangle',
                top: '18%',
                left: '33%',
                h: '70%',
                auto_offset: false,
                bounds_top: boards[n].coords.top,
                bounds_left: boards[n].coords.left,
                bounds_h: boards[n].coords.h,
                bounds_w: boards[n].coords.w
            });
        }

        // Add Points
        obj.points = {
            icon_elm:    H.func.add.sprite({
                                img: 'icon_points',
                                top: '30.4%',
                                left: '16.8%',
                                h: '40%',
                                auto_offset: false,
                                bounds_top: boards[1].coords.top,
                                bounds_left: boards[1].coords.left,
                                bounds_h: boards[1].coords.h,
                                bounds_w: boards[1].coords.w
                            }),
            amount_elm:  H.func.add.text({
                                text: '0',
                                top: '9%',
                                left: '37%',
                                w: '85%',
                                h: '85%',
                                fill: '#FFFFFF',
                                stroke: true,
                                size: '120%',
                                weight: 'bold',
                                auto_offset: false,
                                bounds_top: boards[1].coords.top,
                                bounds_left: boards[1].coords.left,
                                bounds_h: boards[1].coords.h,
                                bounds_w: boards[1].coords.w
                            }),
            amount: 0,
            update: function(points) {
                this.amount = Math.max(this.amount + points, 0);
                this.amount_elm.elm.setText(this.amount);
            }
        };

        // Add Tokens
        obj.tokens = {
            icon_elm:    H.func.add.sprite({
                                img: 'icon_tokens',
                                top: '28.7%',
                                left: '16.85%',
                                h: '50%',
                                auto_offset: false,
                                bounds_top: boards[2].coords.top,
                                bounds_left: boards[2].coords.left,
                                bounds_h: boards[2].coords.h,
                                bounds_w: boards[2].coords.w
                            }),
            amount_elm:  H.func.add.text({
                                text: '0',
                                top: '9%',
                                left: '37%',
                                w: '85%',
                                h: '85%',
                                fill: '#FFFFFF',
                                stroke: true,
                                size: '120%',
                                weight: 'bold',
                                auto_offset: false,
                                bounds_top: boards[2].coords.top,
                                bounds_left: boards[2].coords.left,
                                bounds_h: boards[2].coords.h,
                                bounds_w: boards[2].coords.w
                            }),
			minimum_for_button: (function() {
				var min_cost = 10000;
				for(var n in actions.actions.choose) {
					min_cost = Math.min(min_cost, actions.actions.choose[n].cost);
				}
				return min_cost;
			})(),
            amount: 0,
            update: function(tokens) {

                var previous_amount = this.amount;
            
                this.amount += tokens;
                this.amount_elm.elm.setText(this.amount);
                
                if (previous_amount < this.minimum_for_button && this.amount >= this.minimum_for_button) {
                    // Add Redeem Tokens Button
                    obj.button_redeem_tokens = H.func.add.button({
                        img: 'button_redeem_tokens',
                        top: '93%',
                        left: '94.9%',
                        w: '19%',
                        callback: function() {
                            if (!H.work.reader_open) {
                                actions.choose();
                            }
                        },
						outFrame: 0,
						overFrame: 1,
						downFrame: 2
                    });
					
					obj.button_redeem_tokens_text = H.func.add.text({
						text: H.data.l10n.terms.main.redeem_tokens,
						top: '24%',
						left: '5%',
						w: '90%',
						h: '52%',
						fill: '#20180F',
						stroke: false,
						size: '100%',
						weight: 'bold',
						align: 'center',
						auto_offset: false,
						bounds_top: obj.button_redeem_tokens.coords.top,
						bounds_left: obj.button_redeem_tokens.coords.left,
						bounds_h: obj.button_redeem_tokens.coords.h,
						bounds_w: obj.button_redeem_tokens.coords.w
					});
					
					// Display last element
					game.add.sprite(0,0,'');
					
					obj.button_view_map_text.elm.angle = 1.8;
                }
                else if (previous_amount >= this.minimum_for_button && this.amount < this.minimum_for_button) {
                     obj.button_redeem_tokens.elm.destroy();
                     obj.button_redeem_tokens_text.elm.destroy();
                 }
            }
        };

        // Add Time
        obj.time = {
            icon_elm:   H.func.add.sprite({
                            img: 'icon_time',
                            top: '28.7%',
                            left: '16.85%',
                            h: '50%',
                            auto_offset: false,
                            bounds_top: boards[3].coords.top,
                            bounds_left: boards[3].coords.left,
                            bounds_h: boards[3].coords.h,
                            bounds_w: boards[3].coords.w
                        }),
            amount_elm:  H.func.add.text({
                                text: H.func.misc.seconds_to_MMSS(H.config.rules.total_time_available),
                                top: '9%',
                                left: '37%',
                                w: '85%',
                                h: '85%',
                                fill: '#FFFFFF',
                                stroke: true,
                                size: '120%',
                                weight: 'bold',
                                auto_offset: false,
                                bounds_top: boards[3].coords.top,
                                bounds_left: boards[3].coords.left,
                                bounds_h: boards[3].coords.h,
                                bounds_w: boards[3].coords.w
                            }),
            amount: 0,
            start_time: parseInt(new Date().getTime() / 1000),
            last_time: parseInt(new Date().getTime() / 1000),
            update: function(delta) {
			
				if (typeof delta !== 'undefined') {
					this.start_time += delta;
					var current_time = parseInt(new Date().getTime() / 1000);
					var seconds = current_time - this.start_time - H.work.pause.total;
					this.amount = H.func.misc.seconds_to_MMSS(H.config.rules.total_time_available - seconds);
					this.amount_elm.elm.setText(this.amount);
				}
			
                var current_time = parseInt(new Date().getTime() / 1000);
                if (this.last_time !== current_time) {
                
                    // Update time
                    this.last_time = current_time;
                    var seconds = current_time - this.start_time - H.work.pause.total;
                    if (H.work.pause.active) {
                        seconds -= current_time - H.work.pause.start;
                    }
                    this.amount = H.func.misc.seconds_to_MMSS(H.config.rules.total_time_available - seconds);
                    this.amount_elm.elm.setText(this.amount);
                    
                    // Heartbeat
                    var heartbeat_time = 30;
                    if (seconds === H.config.rules.total_time_available - heartbeat_time) {
                        obj.sound.time_running_out.play('', 0, 0, true);
                    }
                    if (seconds > H.config.rules.total_time_available - heartbeat_time) {
                        var volume = (seconds - (H.config.rules.total_time_available - heartbeat_time)) / heartbeat_time;
                        obj.sound.time_running_out.volume = volume;
                    
                    }
                    
                    // End of Game
                    if (seconds >= H.config.rules.total_time_available) {
                        conclude_game('out_of_time');
                    }
                }
            },
			pause: {
				start: function() {
					H.work.pause.active = true;
					H.work.pause.start = parseInt(new Date().getTime() / 1000);
				
				},
				stop: function() {
					H.work.pause.active = false;
					var now = parseInt(new Date().getTime() / 1000);
					H.work.pause.total += (now - H.work.pause.start);
				},
				toggle: function() {
					if (H.work.pause.active === false) {
						obj.time.pause.start();
					} else {
						obj.time.pause.stop();
					}
				}
			}
        };
		
        // Add stick for buttons at bottom right corner
        H.func.add.sprite({
            img: 'button_stick',
            top: '100%',
            left: '86.5%',
            h: '30%',
            w: '1%',
            scale: 'unproportional'
        });
        
        // Add View Map Button
        obj.button_view_map = H.func.add.button({
            img: 'button_view_map',
            top: '78%',
            left: '94.65%',
            w: '19%',
            callback: function() {
                show_zoom_map();
            },
			outFrame: 0,
			overFrame: 1,
			downFrame: 2
        });
        obj.button_view_map_text = H.func.add.text({
            text: H.data.l10n.terms.main.view_map,
            top: '26%',
            left: '10%',
            w: '80%',
            fill: '#20180F',
            stroke: false,
            size: '100%',
            weight: 'bold',
			align: 'center',
			auto_offset: false,
			force_one_line: true,
            bounds_top: obj.button_view_map.coords.top,
            bounds_left: obj.button_view_map.coords.left,
            bounds_h: obj.button_view_map.coords.h,
            bounds_w: obj.button_view_map.coords.w
        });
		obj.button_view_map_text.elm.angle = 1.7;
        
        // Add Pause Button
        var button_pause = H.func.add.button({
            img: 'button_pause',
            top: '25%',
            left: '97.5%',
            w: '5%',
            bounds_top: 0,
            bounds_left: 0,
            bounds_h: header.height,
            bounds_w: header.width,
            callback: function () {
                if (H.work.pause.active === false) {
                    button_pause.elm.loadTexture('button_play');
                    obj.time.pause.start();
                    obj.sound.background.pause();
                    H.func.misc.note(H.data.l10n.terms.main.pause_start);
                }
                else {
                    button_pause.elm.loadTexture('button_pause');
                    obj.time.pause.stop();
                    obj.sound.background.resume();
                    H.func.misc.note(H.data.l10n.terms.main.pause_stop);
                }
            }
        });

        // Add Restart Button
        var button_restart = H.func.add.button({
            img: 'button_restart',
            top: '25%',
            left: '91.5%',
            w: '5%',
            bounds_top: 0,
            bounds_left: 0,
            bounds_h: header.height,
            bounds_w: header.width,
            callback: function() {
                game.sound.remove(obj.sound.background);
                H.game.state.start('start');
            }
        });
        
        // Add Volume Stuff
        H.func.add.sprite({
            img: 'volume_border',
            top: '35%',
            left: '84%',
            w: '10.33%',
            bounds_top: 0,
            bounds_left: 0,
            bounds_h: header.height,
            bounds_w: header.width
        });
        
        var button_volume_icon = H.func.add.sprite({
            img: 'volume_icon',
            top: '43%',
            left: '77.7%',
            h: '40%',
            bounds_top: 0,
            bounds_left: 0,
            bounds_h: header.height,
            bounds_w: header.width
        });
        
        var button_volume_up = H.func.add.button({
            img: 'volume_plus',
            top: '43%',
            left: '81.4%',
            h: '50%',
            bounds_top: 0,
            bounds_left: 0,
            bounds_h: header.height,
            bounds_w: header.width,
            callback: function() {
                if (H.work.background_volume === 0) {
                    obj.sound.background.resume();
                }
                H.work.background_volume = Math.min(1, H.work.background_volume+0.2);
                var realVolume = Math.round(Math.pow(H.work.background_volume, 2)*100)/100;
                obj.sound.background.fadeTo(500, realVolume);
            }
        });
        
        var button_volume_down = H.func.add.button({
            img: 'volume_minus',
            top: '43%',
            left: '84.8%',
            h: '50%',
            bounds_top: 0,
            bounds_left: 0,
            bounds_h: header.height,
            bounds_w: header.width,
            callback: function() {
                if (H.work.background_volume === 0) {
                    obj.sound.background.pause();
                }
                else {
                    H.work.background_volume = Math.round((H.work.background_volume-0.2) * 10) / 10;
                    var realVolume = Math.round(Math.pow(Math.max(0.1,H.work.background_volume), 2)*100)/100;
                    obj.sound.background.fadeTo(500, realVolume);
                }
            }
        });

        // Audio 
        this.sound = {
            background: game.add.audio('sound_game_loop', 1, true),
            answer_right: game.add.audio('sound_answer_right', 1, false),
            answer_wrong: game.add.audio('sound_answer_wrong', 1, false),
            paper_flip: game.add.audio('sound_paper_flip', 1, false),
            time_running_out: game.add.audio('sound_time_running_out', 1, true)
        };
        var volume = Math.round(Math.pow(Math.max(0.1,H.work.background_volume), 2)*100)/100;
        this.sound.background.play('', 0, volume, true);
        
        questions.init();
        player.travel_to(obj.player, 0, false, true);
        //player.travel_to(obj.player, 92.5, 2000, true);
        
        var intro_shown = localStorage.getItem('Pitcairn_Intro');
        if (intro_shown === null) {
		
			obj.time.pause.start();
			
			// Button Continue
			var button_continue = H.func.add.button({
				img: 'button_continue',
				top: '63%',
				left: '60%',
				w: '19%',
				callback: function() {
					background.elm.destroy();
					title.elm.destroy();
					for(var n in text.elm) {
						text.elm[n].destroy();
					}
					button_continue.elm.destroy();
					button_continue_text.elm.destroy();
					empty.destroy();
					localStorage.setItem('Pitcairn_Intro', 'shown');
					obj.time.pause.stop();
					questions.ask();
				},
				outFrame: 0,
				overFrame: 1,
				downFrame: 2
			});
			var button_continue_text = H.func.add.text({
				text: H.data.l10n.terms.main.instructions_button_continue,
				top: '48%',
				left: '5%',
				w: '75%',
				stroke: false,
				size: '110%',
				weight: 'bold',
				align: 'center',
				auto_offset: false,
				bounds_top: button_continue.coords.top,
				bounds_left: button_continue.coords.left,
				bounds_h: button_continue.coords.h,
				bounds_w: button_continue.coords.w
			});
			
			// Background
			var background = H.func.add.sprite({
				img: 'paper_light',
				top: '7%',
				left: '5%',
				h: '50%',
				w: '70%',
				auto_offset: false,
				scale: 'unproportional'
			});
			
			// Instructions Text
			var title = H.func.add.text({
				text: H.data.l10n.terms.main.instructions_title,
				top: '15%',
				left: '6%',
				w: '85%',
				fill: '#402715',
				size: '125%',
				weight: 'bold',
				auto_offset: false,
				bounds_top: background.coords.top,
				bounds_left: background.coords.left,
				bounds_h: background.coords.h,
				bounds_w: background.coords.w
			});
			var text = H.func.add.text({
				text: H.data.l10n.terms.main.instructions_text,
				top: '34%',
				left: '6%',
				w: '83%',
				fill: '#402715',
				size: '125%',
				weight: 'normal',
				auto_offset: false,
				bounds_top: background.coords.top,
				bounds_left: background.coords.left,
				bounds_h: background.coords.h,
				bounds_w: background.coords.w
			});
			var empty = game.add.sprite(0,0,'');
		}
		else {
			questions.ask();
		}
		
    };
    
    this.update = function () {
    
        // Camera Animation
        camera.update_animation();

        // Player animation
        player.update_animation();
        
        // Update time
        this.time.update();
        
    };



    
    /********************************************************/
    /*                                                      */
    /*          QUESTIONS                                   */
    /*                                                      */
    /********************************************************/
    
    var questions = {
        init: function() {
            for(var n in H.data.questions.primary) {
                H.data.questions.primary[n].id = n;
            };
            for(var n in H.data.questions.secondary) {
                H.data.questions.secondary[n].id = n;
            };

            this.primary = H.func.misc.shuffle_array(H.data.questions.primary).slice(0, H.config.rules.primary_questions_amount);
            this.secondary = H.func.misc.shuffle_array(H.data.questions.secondary);
        },
        ask: function() {
            var m = this;
            if (m.position === H.config.rules.primary_questions_amount) {
                conclude_game('everything_answered');
            }
            else {
                m.wrong_answers = 0;
                
                // If action is next
                var act_pos = actions.locations.places.indexOf(m.position + 0.5);
                if (act_pos !== -1) {
                
                    // Delete this element in the array so the counter will simply count over it next time
                    actions.locations.places.splice(act_pos, 1);
                    
                    // If the kind is secondary, change it to primary, since secondary is the same position as the action which would look weird
                    if (this.kind === 'secondary') {
                        this.kind = 'primary';
                    }
                    
                    //var aloc = curve.get_path_position((m.position+0.5) * obj.vars.questions_spacing);                            
                    player.travel_to(obj.player, (m.position+0.5) * obj.vars.questions_spacing, true, true, function() {
                        setTimeout(function() {
                            actions.shuffle();
                        }, H.config.animation.time_before_question);
                    });
                }
                else {
                    if (this.kind === 'primary') {
                        m.position++;
                        player.travel_to(obj.player, (m.position) * obj.vars.questions_spacing, true, true, function() {
                            setTimeout(function() {
                                m.show_question(m.primary[m.position-1], m.position-1, 'primary');
                            }, H.config.animation.time_before_question);
                        });
                    }
                    else {
                        var sec_question = m.secondary.splice(0,1)[0];
                        var slp = curve.get_path_position((m.position+0.5) * obj.vars.questions_spacing);
                        
                        player.travel_to(obj.player, (m.position+0.5) * obj.vars.questions_spacing, true, true, function() {
                            setTimeout(function() {
                                m.show_question(sec_question, m.position-1, 'secondary');
                            }, H.config.animation.time_before_question);
                        });
                    }
                }
            }
        },    
        show_question: function(question, number, kind) {
			if (!H.work.question_shown || kind === 'bonus') {
				obj.sound.paper_flip.play();
					
				// Have two potential question groups, in case kind is 'bonus' while another group is already open
				var group_name = 'question_group';
				if (kind === 'bonus') { group_name += '_bonus'; }
			
				// Create Group
				obj[group_name] = game.add.group();
				
				// Cover
				if (kind === 'bonus' && typeof obj.question_group !== 'undefined' && obj.question_group.exists === true) {
					obj[group_name].add(
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
				}
				
				// Background
				var bg_img;
				if (kind === 'primary') {
					bg_img = 'paper_light';
				}
				else if (kind === 'secondary') {
					bg_img = 'paper_dark';
				}
				else if (kind === 'bonus') {
					bg_img = 'question_background_bonus';
				}
				var background = H.func.add.sprite({
					img: bg_img,
					top: '5%',
					left: '5%',
					h: '90%',
					w: '70%',
					auto_offset: false,
					scale: 'unproportional'
				});
				obj[group_name].add(background.elm);
				
				// Question Text
				var tkind = (kind === 'primary' ? 'primary' : 'secondary');
				var lines = H.func.add.text({
					text: question.q,
					top: '9%',
					left: '6%',
					w: '85%',
					fill: '#' + (kind === 'secondary' ? 'e7caa1' : '402715'),
					size: '125%',
					weight: 'bold',
					auto_offset: false,
					bounds_top: background.coords.top,
					bounds_left: background.coords.left,
					bounds_h: background.coords.h,
					bounds_w: background.coords.w
				}).elm;
				if (typeof lines[1] !== 'undefined') {
					for (var n in lines) {
						obj[group_name].add(lines[n]);
					}
				}
				else {
					obj[group_name].add(lines);
				}

				// Add Buttons
				var answer = question.a[0];
				var buttons = H.func.misc.shuffle_array(question.a.slice(0));

				for(var n in buttons) {
					(function(n) {
									
						var button = H.func.add.button({
							img: 'button_answers_' + tkind,
							top: ((n*12.7) + 38) + '%',
							left: '6%',
							w: '85%',
							h: '12%',
							auto_offset: false,
							bounds_top: background.coords.top,
							bounds_left: background.coords.left,
							bounds_h: background.coords.h,
							bounds_w: background.coords.w,
							callback: function() {},
							outFrame: 0,
							overFrame: 1,
							downFrame: 2
						});
						obj[group_name].add(button.elm);
						
						var text = H.func.add.text({
							text: buttons[n],
							top: '15%',
							left: '2%',
							w: '96%',
							h: '85%',
							fill: '#' + (kind === 'primary' ? '311e10' : 'e7caa1'),
							size: '125%',
							weight: 'bold',
							force_one_line: true,
							auto_offset: false,
							bounds_top: button.coords.top,
							bounds_left: button.coords.left,
							bounds_h: button.coords.h,
							bounds_w: button.coords.w
						});
						if (typeof text.elm[1] !== 'undefined') {
							for (var n in text.elm) {
								obj[group_name].add(text.elm[n]);
							}
						}
						else {
							obj[group_name].add(text.elm);
						}

						button.elm.events.onInputDown.add(function() {
                            if (!H.work.reader_open) {
							     questions.evaluate(button.elm, text.elm, buttons[n] === answer ? true : false, kind);
                            }
						});

					}(n));
				}    
				
				H.work.question_shown = true;
            
				// Display last element
				game.add.sprite(0,0,'');
			}
            
        },
        evaluate: function(button, button_text, answer, kind) {
        
            if (H.work.pause.active) {
                return false;
            }
        
            if (!answer) {
                obj.sound.answer_wrong.play();
                this.wrong_answers++;
                button.kill();
                button_text.destroy();
            }
            else {
                obj.sound.answer_right.play();
                
                obj.points.update(H.config.rules['points_' + kind][this.wrong_answers]);
                obj.tokens.update(H.config.rules['tokens_' + kind][this.wrong_answers]);
                
                // Destroy question group
                var group_name = 'question_group';
                if (kind === 'bonus') { group_name += '_bonus'; }
                obj[group_name].destroy();
                
                if (kind === 'secondary') {
                    this.kind = 'primary';
                }
                else if (kind === 'primary' && this.wrong_answers > 0) {
                    this.kind = 'secondary';
                }
                else if (kind === 'bonus' && this.kind === 'secondary') {
                    this.kind = 'primary';
                }
                
				H.work.question_shown = false;
				
                if (typeof obj.question_group === 'undefined' || obj.question_group.exists === false) {
                    questions.ask();
                }
            }
        },
        position: 0,
        kind: 'primary'
    };

    
    /********************************************************/
    /*                                                      */
    /*          CAMERA                                      */
    /*                                                      */
    /********************************************************/
    
    var camera = {
        /*
            http://examples.phaser.io/_site/view_lite.html?d=groups&f=group+transform+-+tween.js&t=group%20transform%20-%20tween
        */
        fit: function(group, animate) {
            var scale = camera.get_min_scale(obj.vars.map_width, obj.vars.map_height);
            var y = H.config.game.height - (scale * obj.vars.map_height) - H.config.game.bounding_box.bottom;
            camera.scale = scale;
            camera.update({group: group, scale_x: scale, scale_y: scale, x: 0, y: y, animate: animate});
        },
        point: function(group, scale, cord_x, cord_y, animate) {
            scale = Math.max(camera.get_min_scale(obj.vars.map_width, obj.vars.map_height), scale);
            camera.scale = scale;
            var x = Math.min(0, Math.max((-cord_x*scale) + (H.config.game.width / 2), H.config.game.width - (scale * obj.vars.map_width)));
            var y = Math.min(0, Math.max((-cord_y*scale) + (H.config.game.height / 2), H.config.game.height - (scale * obj.vars.map_height)));
            camera.update({group: group, scale_x: scale, scale_y: scale, x: x, y: y, animate: animate});
        },
        get_min_scale: function(orig_width, orig_height) {
            return Math.max(H.config.game.width / orig_width, H.config.game.height / orig_height);
        },
        update: function(p) {
            if (!p.animate) {
                p.group.scale.x = p.scale_x;
                p.group.scale.y = p.scale_y;
                p.group.x = p.x;
                p.group.y = p.y;
            }
            else {
                var animation_speed = typeof(p.animate) === 'number' ? p.animate : H.config.animation.speed;
                camera.goal = {};
                var fps = Math.max(H.game.time.fps, 60);
                var steps = fps / (1000 / animation_speed);
                camera.goal.step = steps;
                p.step_scale_x = (p.scale_x - p.group.scale.x) / steps;
                p.step_scale_y = (p.scale_y - p.group.scale.y) / steps;
                p.step_x = (p.x - p.group.x) / steps;
                p.step_y = (p.y - p.group.y) / steps;
                for(var n in p) {
                    if (n !== 'animate') {
                        camera.goal[n] = p[n];
                    }
                }
            }
        },
        update_animation: function() {
            if (camera.goal !== false) {
                var g = camera.goal;
                g.group.scale.x = g.group.scale.x + g.step_scale_x;
                g.group.scale.y = g.group.scale.y + g.step_scale_y;
                g.group.x = g.group.x + g.step_x;
                g.group.y = g.group.y + g.step_y;
                g.step = g.step - 1;

                if (g.step === 0) {
                    camera.goal = false;
                    obj.vars.zoom_map_action = false;
                }
            }
        },
        scale: false,
        goal: false
    };

    
    /********************************************************/
    /*                                                      											  */
	/*          PLAYER                                      										  */
    /*                                                      											  */
    /********************************************************/
    
    var player = {
        travel_to: function(tplayer, position, animate, follow, callback) {
            if (typeof(animate) === 'undefined') {
                animate = false;
            }
            if (typeof(follow) === 'undefined') {
                follow = false;
            }
            if (position > 100) {
                position = 100;
            }
            else if (position < 0) {
                position = 0;
            }

            if (!animate || typeof(tplayer.relative_position) === 'undefined') {

                var pos = curve.get_path_position(position);

                // Move
                tplayer.x = pos.x;
                tplayer.y = pos.y;
                //tplayer.angle = pos.angle;
                var scale = ((tplayer.y - obj.vars.lowest_y) / (obj.vars.highest_y - obj.vars.lowest_y) * 0.25) + 0.3;
                tplayer.scale.setTo(scale, scale);
                tplayer.relative_position = position;

                // Follow with camera
                if (follow && camera.scale) {
                    camera.point(obj.board, camera.scale, pos.x, pos.y, false);
                }

            }
            else {
                player.animate(tplayer, position, animate, follow, callback);
            }
        },
        animate: function(tplayer, position, animate, follow, callback) {
            var animation_speed = typeof(animate) === 'number' ? animate : H.config.animation.speed;
            var fps = Math.max(H.game.time.fps, 60);
            var steps = fps / (1000 / animation_speed);
            var step_distance = (position - tplayer.relative_position) / steps;
            player.goal = {
                player: tplayer,
                step: steps,
                distance: step_distance,
                follow: follow,
                callback: callback
            };
        },
        update_animation: function() {
            if (player.goal !== false) {

                var p = player.goal;
                player.travel_to(p.player, p.player.relative_position + p.distance, false, p.follow);
                p.step = p.step - 1;
                if (p.step === 0) {
                    if (typeof player.goal.callback !== 'undefined') {
                        player.goal.callback();
                    }
                    player.goal = false;
                }
            }
        },
        goal: false
    };
    
    
    /********************************************************/
    /*                                                      														*/
    /*          ACTIONS                                    												 	*/
    /*                                                      														*/
    /********************************************************/
    
    var actions = {
        shuffle: function() {
			
			obj.time.pause.start();
		
            var m = this;
            
            var sound = game.add.audio('sound_action_wheel', 1, false);
            sound.play();
            
            m.draw_box('action', function(p) {
                var icon = [];
                var action_kinds = [];
                var actions_by_kinds = {};
				m.shown = true;
                for (var n in m.actions.shuffle) {
                
                    // Sort actions
                    if (typeof actions_by_kinds[m.actions.shuffle[n].image] === 'undefined') {
                        actions_by_kinds[m.actions.shuffle[n].image] = [];
                     }
                    actions_by_kinds[m.actions.shuffle[n].image].push(m.actions.shuffle[n]);
                }
                
                // Print actions
                var action_kinds = H.func.misc.shuffle_array(Object.keys(actions_by_kinds));
                for (var n in action_kinds) {
                    icon[n] = H.func.add.sprite({
                        img: actions_by_kinds[action_kinds[n]][0].image,
                        top: '34%',
                        left: '50%',
                        h: '26%',
                        bounds_top: p.background.coords.top,
                        bounds_left: p.background.coords.left,
                        bounds_h: p.background.coords.h,
                        bounds_w: p.background.coords.w
                    }).elm;
                    m.box.add(icon[n]);
                }
                
                
                // Display last element
                m.box.add(game.add.sprite(0, 0, ''));

                var top_icon_index = false;
                var change_order = function (n, wait, end) {
                    icon[n].bringToTop();
                    if (new Date().getTime() < end) {
                        wait = Math.pow(wait, 1.02);
                        setTimeout(function () {
                            n++;
                            if (n === icon.length) {
                                n = 0;
                            }
                            change_order(n, wait, end);
                        }, wait);
                    }
                    else {
                        top_icon_index = n;
                    }
                };
                var make_selection = function () {
                    if (top_icon_index !== false) {

                        obj.sound_select.play();

                        var action = H.func.misc.shuffle_array(actions_by_kinds[action_kinds[top_icon_index]])[0];

                        // Display
                        var text = H.func.add.text({
                            text: H.data.l10n.terms.main.actions[action.caption],
                            top: '54%',
                            left: '5%',
                            w: '90%',
                            size: '110%',
                            weight: 'bold',
                            align: 'center',
                            bounds_top: p.background.coords.top,
                            bounds_left: p.background.coords.left,
                            bounds_h: p.background.coords.h,
                            bounds_w: p.background.coords.w
                        });
                        if (typeof text.elm[1] !== 'undefined') {
                            for (var n in text.elm) {
                                m.box.add(text.elm[n]);
                            }
                        } else {
                            m.box.add(text.elm);
                        }

                        var continue_function = function () {
                            actions.destroy_box();
                            if (typeof obj.time.pause !== 'undefined') {
                                obj.time.pause.stop();
                            }
                            if (m.shown && (typeof obj.question_group === 'undefined' || obj.question_group.exists === false)) {
                                m.shown = false;
                                questions.ask();
                            }
                        };

                        // Continue button
                        var continue_button = H.func.add.button({
                            img: 'background_redeem_tokens',
                            left: '50%',
                            top: '85%',
                            w: '22%',
                            bounds_top: p.background.coords.top,
                            bounds_left: p.background.coords.left,
                            bounds_h: p.background.coords.h,
                            bounds_w: p.background.coords.w,
                            outFrame: 0,
                            overFrame: 1,
                            downFrame: 2,
                            callback: function () {
                                // This is lame... it's due to a bug in phaser - http://www.html5gamedevs.com/topic/9887-destroying-buttons-best-practices/
                                setTimeout(function () {
                                    continue_function();
                                }, 100);
                            }
                        });
                        m.box.add(continue_button.elm);

                        m.box.add(
                                H.func.add.text({
                                    text: H.data.l10n.terms.main.action_continue,
                                    top: '18%',
                                    left: '15%',
                                    w: '70%',
                                    size: 'stretch',
                                    weight: 'bold',
                                    auto_offset: false,
                                    bounds_top: continue_button.coords.top,
                                    bounds_left: continue_button.coords.left,
                                    bounds_h: continue_button.coords.h,
                                    bounds_w: continue_button.coords.w
                                }).elm
                                );

                        m.box.add(H.game.add.sprite(0, 0, ''));

                        // Execute function
                        obj[action.object].update(action.amount);

                        // Remove window after a few seconds and move on
                        setTimeout(function () {
                            continue_function();
                        }, 10000);
                    }
                    else {
                        setTimeout(make_selection, 100);
                    }
                };

                setTimeout(function () {
                    change_order(0, 50, new Date().getTime() + 2800, icon);
                }, 0);
                make_selection();

            });
        },
        choose: function() {
        
            if (H.work.pause.active || !H.work.question_shown) {
                return false;
            }
        
            var m = this;
            m.draw_box('redeem_tokens', function(p) {
            
				obj.time.pause.start();
			
                // Draw Buttons
                for(var n = 0; n < m.actions.choose.length; n++) {
                
                    var active = true;
                    if (m.actions.choose[n].cost > obj.tokens.amount) {
                        active = false;
                    }
                    
                    var token_background = H.func.add.button({
                        img: 'background_redeem_tokens',
                        left: '50%',
                        top: ((n*22)+35) + '%',
                        h: '16%',
                        w: '40%',
                        scale: 'unproportional',
                        bounds_top: p.background.coords.top,
                        bounds_left: p.background.coords.left,
                        bounds_h: p.background.coords.h,
                        bounds_w: p.background.coords.w,
						outFrame: 0,
						overFrame: 1,
						downFrame: 2
                    });
                    if (active) {
                        (function(a) {
                            token_background.elm.events.onInputDown.add(function() {
                                obj.tokens.update(0 - a.cost);
								obj.time.pause.stop();
                                obj.sound_select.play();
                                a.func();
                            });
                        })(m.actions.choose[n]);
                    } else {
                        (function(a) {
                            token_background.elm.events.onInputDown.add(function() {
                                H.func.misc.note(H.data.l10n.terms.main.action_not_enough_tokens);
                            });
                        })();
                    }
                    m.box.add(token_background.elm);

                    m.box.add(
                        H.func.add.sprite({
                            img: m.actions.choose[n].image + (active ? '' : '_unavailable'),
                            top: '50%',
                            left: '6%',
                            h: '80%',
                            bounds_top: token_background.coords.top,
                            bounds_left: token_background.coords.left,
                            bounds_h: token_background.coords.h,
                            bounds_w: token_background.coords.w
                        }).elm
                    );

                    m.box.add(
                        H.func.add.text({
                            text: m.actions.choose[n].caption,
                            top: '14%',
                            left: '28%',
                            w: '80%',
                            size: '100%',
                            weight: 'bold',
                            fill: (active ? '#402715' : '#333333'),
                            auto_offset: false,
                            bounds_top: token_background.coords.top,
                            bounds_left: token_background.coords.left,
                            bounds_h: token_background.coords.h,
                            bounds_w: token_background.coords.w
                        }).elm
                    );
                    
                    m.box.add(
                        H.func.add.text({
                            text: H.data.l10n.terms.main.cost + ': ' + m.actions.choose[n].cost + ' ' + H.data.l10n.terms.main.tokens,
                            top: '50%',
                            left: '28%',
                            w: '80%',
                            size: '100%',
                            weight: 'normal',
                            fill: (active ? '#402715' : '#333333'),
                            auto_offset: false,
                            bounds_top: token_background.coords.top,
                            bounds_left: token_background.coords.left,
                            bounds_h: token_background.coords.h,
                            bounds_w: token_background.coords.w
                        }).elm
                    );
                }
                
                // Display last element
                m.box.add(game.add.sprite(0,0,''));
                
            });
        },
        actions: {
            choose: [
                {
                    image: 'action_time_extension',
                    caption: H.data.l10n.terms.main.action_bonus_time + ': 30 ' + H.data.l10n.terms.main.seconds,
                    cost: 20,
                    func: function() {
                        obj.time.update(30);
                        H.func.misc.note(H.data.l10n.terms.main.action_time_left_1 + ' ' + obj.time.amount + ' ' + H.data.l10n.terms.main.action_time_left_2);
                        actions.destroy_box();
                        if (typeof obj.question_group === 'undefined' || obj.question_group.exists === false) {
                            questions.ask();
                        }
                    }
                },
                {
                    image: 'action_bonus_question',
                    caption: H.data.l10n.terms.main.action_risk_question,
                    cost: 15,
                    func: function() {
                        actions.destroy_box();
                        var sec_question = questions.secondary.splice(0,1)[0];
                        questions.show_question(sec_question, 1, 'bonus');
                    }
                },
                {
                    image: 'action_answer_card',
                    caption: H.data.l10n.terms.main.action_answer_card,
                    cost: 10,
                    func: function() {
                    
                        
                    
                        // Initialize if first time
                        if (typeof actions.answer_cards === 'undefined') {
                            
                            // Add button to open them and cover
                            H.func.add.sprite({
                                img: 'button_stick',
                                top: '64.9%',
                                left: '86.5%',
                                h: '10%',
                                w: '1%',
                                scale: 'unproportional'
                            });
                            
                            var answer_cards_button = H.func.add.button({
                                img: 'button_answer_cards',
                                top: '62%',
                                left: '94.9%',
                                w: '19%',
                                callback: function() {
                                    if (!H.work.reader_open) {
                                        if (actions.answer_cards.elements_shown) {
                                            actions.answer_cards.hide();
                                        }
                                        else {
                                            actions.answer_cards.show();
                                        }
                                    }
                                },
								outFrame: 0,
								overFrame: 1,
								downFrame: 2
                            });
					
							H.func.add.text({
								text: H.data.l10n.terms.main.answer_cards,
								top: '24%',
								left: '5%',
								w: '90%',
								h: '52%',
								fill: '#20180F',
								stroke: false,
								size: '100%',
								weight: 'bold',
								align: 'center',
								auto_offset: false,
								bounds_top: answer_cards_button.coords.top,
								bounds_left: answer_cards_button.coords.left,
								bounds_h: answer_cards_button.coords.h,
								bounds_w: answer_cards_button.coords.w
							});
							
							game.add.sprite(0,0,'');
                            
                            actions.answer_cards = {
                                'cards': function() {
                                    for (var a=[], i=0; i <= H.data.answer_cards; ++i) a[i] = i;
                                    return a.sort( function() { return 0.5 - Math.random(); } );
                                }(),
                                'index': -1,
                                'show': function() {
                                
                                    if (H.work.pause.active || !H.work.question_shown) {
                                        return false;
                                    }
                                
                                    this.answer_cards_opener_group = game.add.group();
                                    
                                    var m = this;
                                
                                    var background = H.func.add.sprite({
                                        img: 'answer_cards_background',
                                        top: '93.8%',
                                        left: '95%',
                                        w: '19.3%',
                                        h: '30%',
                                        scale: 'unproportional'
                                    });
                                    this.answer_cards_opener_group.add(background.elm);
                                    
                                    // Add Card Buttons
                                    for (var n = 0; n <= this.index; n++) {
                                        (function(n) {
                                            var button = H.func.add.button({
                                                img: 'answer_cards_icon',
                                                top: (7 + ((Math.ceil((n+1)/2)-1)*45)) + '%',
                                                left: ['8%', '53%'][n % 2],
                                                w: '40%',
                                                bounds_top: background.coords.top,
                                                bounds_left: background.coords.left,
                                                bounds_h: background.coords.h,
                                                bounds_w: background.coords.w,
                                                auto_offset: false,
                                                callback: function() {

                                                    if (H.work.pause.active || !H.work.question_shown || H.work.reader_open) {
                                                        return false;
                                                    }
                                                    
													obj.time.pause.start();
													
                                                    // m.answer_cards_group = game.add.group();
                                                
                                                    var id = actions.answer_cards.cards[n];
                                                    H.reader(H.data.l10n['answer_card_' + id], function() {
                                                        obj.time.pause.stop();
                                                    });
/*                                                    var cover = H.func.add.sprite({
                                                        img: 'cover',
                                                        top: 0,
                                                        left: 0 - H.config.game.bounding_box.left,
                                                        h: '100%',
                                                        w: '100%',
                                                        auto_offset: false,
                                                        scale: 'unproportional'
                                                    });
                                                    m.answer_cards_group.add(cover.elm);
                                                    var background = H.func.add.sprite({
                                                        img: 'paper_light',
                                                        top: '5%',
                                                        left: '5%',
                                                        h: '90%',
                                                        w: '70%',
                                                        auto_offset: false,
                                                        scale: 'unproportional'
                                                    });
                                                    m.answer_cards_group.add(background.elm);
                                                    
                                                    H.work.actions = m;*/


/*                                                    
                                                    // Display Webview
                                                    H.work.webview_coords = H.func.dim.get_coords({
                                                        top: '8%',
                                                        left: '5%',
                                                        w: '87%',
                                                        h: '71%',
                                                        heed_density: false,
                                                        auto_offset: false,
                                                        bounds_top: background.coords.top,
                                                        bounds_left: background.coords.left,
                                                        bounds_h: background.coords.h,
                                                        bounds_w: background.coords.w
                                                    });

                                                    CocoonJS.App.loadInTheWebView('data/' + H.data.language + '/answer_card_' + id + '.htm');
                                                    
                                                    // Display Back Button underneath webview
                                                    m.answer_cards_group.add(
                                                        H.func.add.button({
                                                            img: 'button_back',
                                                            top: '82%',
                                                            left: '5%',
                                                            w: '20%',
                                                            auto_offset: false,
                                                            bounds_top: background.coords.top,
                                                            bounds_left: background.coords.left,
                                                            bounds_h: background.coords.h,
                                                            bounds_w: background.coords.w,
                                                            callback: function() {
                                                                CocoonJS.App.hideTheWebView();
                                                                H.work.actions.hide_card();
																obj.time.pause.stop();
                                                            }
                                                        }).elm
                                                    );
*/
                                                    // Display last element
                                                    // m.answer_cards_group.add(game.add.sprite(0,0,''));
                                                    
                                                    
                                                    // m.hide();
                                                }
                                            });
                                            m.answer_cards_opener_group.add(button.elm);
                                            
                                            var num = H.func.add.text({
                                                text: (actions.answer_cards.cards[n]+1)+'',
                                                top: '17%',
                                                left: '18%',
                                                w: '80%',
                                                size: '150%',
                                                weight: 'bold',
                                                color: '#433424',
                                                bounds_top: button.coords.top,
                                                bounds_left: button.coords.left,
                                                bounds_h: button.coords.h,
                                                bounds_w: button.coords.w,
                                                auto_offset: false
                                            });
                                            m.answer_cards_opener_group.add(num.elm);
                                            
                                            // Display last element
                                            m.answer_cards_opener_group.add(
                                                game.add.sprite(0,0,'')
                                            );
                                            
                                        })(n);
                                    }
                                    
                                    // Make underlying buttons non clickable
                                    // obj.button_view_map.elm.inputEnabled = false;
                                    // obj.button_redeem_tokens.inputEnabled = false;
                                    
                                    actions.answer_cards.elements_shown = true;
                                    
                                },
                                'hide': function() {
                                    this.answer_cards_opener_group.destroy();
                                    setTimeout(
                                        function() { 
                                            //obj.button_view_map.elm.inputEnabled = true; 
                                            //obj.button_redeem_tokens.inputEnabled = true;
                                        },
                                        200);
                                    actions.answer_cards.elements_shown = false;
                                },
                                'hide_card': function() {
                                    this.answer_cards_group.destroy();
                                }
                            };
                        }
                        
                        // This happens whenever a new answer card is given
                        actions.answer_cards.index++;
                        actions.answer_cards.show();
                        actions.destroy_box();
                        
                        if (actions.answer_cards.index === 3) {
                            actions.actions.splice(2,1);
                        }
                        
                        if (typeof obj.question_group === 'undefined' || obj.question_group.exists === false) {
                            questions.ask();
                        }
                    }
                }
            ],
            shuffle: [
                {
                    image: 'action_tokens',
                    caption: 'dime_tabernacle',
                    object: 'tokens',
                    amount: 5
                },
                {
                    image: 'action_points',
                    caption: 'pitcairn',
                    object: 'points',
                    amount: 10
                },
                {
                    image: 'action_time_extension',
                    caption: 'meat',
                    object: 'time',
                    amount: 30
                },
                {
                    image: 'action_time_extension',
                    caption: 'health',
                    object: 'time',
                    amount: 20
                },
                {
                    image: 'action_time_extension',
                    caption: 'death_james',
                    object: 'time',
                    amount: -15
                },
                {
                    image: 'action_time_extension',
                    caption: 'death_henry',
                    object: 'time',
                    amount: -10
                },
                {
                    image: 'action_time_extension',
                    caption: 'railroad',
                    object: 'time',
                    amount: 20
                },
                {
                    image: 'action_points',
                    caption: 'civil_war',
                    object: 'points',
                    amount: -10
                },
                {
                    image: 'action_time_extension',
                    caption: 'willie_drowns',
                    object: 'time',
                    amount: -10
                },
                {
                    image: 'action_points',
                    caption: 'mission_ship',
                    object: 'points',
                    amount: 6
                },
                {
                    image: 'action_points',
                    caption: 'train_wreck',
                    object: 'points',
                    amount: -6
                },
                {
                    image: 'action_time_extension',
                    caption: 'headquarters',
                    object: 'time',
                    amount: 15
                },
				{
					image: 'action_tokens',
					caption: 'review_and_herald',
					object: 'tokens',
					amount: -5
				},
				{
					image: 'action_tokens',
					caption: 'steps_to_christ',
					object: 'tokens',
					amount: 5
				},
				{
					image: 'action_tokens',
					caption: 'large_audience',
					object: 'tokens',
					amount: 5
				},
				{
					image: 'action_tokens',
					caption: 'woodstreet',
					object: 'tokens',
					amount: 5
				},
				{
					image: 'action_tokens',
					caption: 'ohio',
					object: 'tokens',
					amount: -5
				},
				{
					image: 'action_tokens',
					caption: 'pray',
					object: 'tokens',
					amount: -5
				},
				{
					image: 'action_tokens',
					caption: 'expelled',
					object: 'tokens',
					amount: -5
				},
				{
					image: 'action_tokens',
					caption: 'disappointment',
					object: 'tokens',
					amount: -5
				}
            ]
        },
        draw_box: function(header, elements) {
        
            if (obj.vars.overlay) {
                return false;
            }
        
            var m = this;	
		
            // Create Group
            m.box = game.add.group();
            
            // Cover
            m.box.add(
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
            
            // Background
            var background = H.func.add.sprite({
                img: 'scroll',
                top: '50%',
                left: '50%',
                h: '90%',
                w: '80%'
            });
            m.box.add(background.elm);
            
            // Header
            m.box.add(
                H.func.add.text({
                    text: H.data.l10n.terms.main.action,
                    top: '15%',
                    left: '20%',
                    h: '5%',
					w: '60%',
					size: '140%',
					align: 'center',
					weight: 'bold',
                    bounds_top: background.coords.top,
                    bounds_left: background.coords.left,
                    bounds_h: background.coords.h,
                    bounds_w: background.coords.w
                }).elm
            );
            
            elements({
                box: m.box,
                background: background
            });
            
            obj.vars.overlay = true;
        },
        destroy_box: function() {
            this.box.destroy();
            obj.vars.overlay = false;
        },
        locations: {
            places: [
            ],
            init: function() {
				var not = {
						min: H.config.rules.primary_questions_amount * (86/100),
						max: H.config.rules.primary_questions_amount * (92.6/100)
				};
                
                do {
                    this.places.length = 0;
                    var diff = 10000;
                    for(var n = 0; n < H.config.rules.action_locations; n++) {
						var found = false;
						do  {
							var place = Math.floor(Math.random() * (H.config.rules.primary_questions_amount-2)) + 1.5;
							if (place < not.min || place > not.max) {
								found = true;
								this.places.push(place);
							}
						} while (found === false);
                    }
                    this.places.sort(function(a,b){ return a-b; });
                    for(n = 1; n < H.config.rules.action_locations; n++) {
                        diff = Math.min(diff, Math.abs(this.places[n] - this.places[n-1]));
                    }
                } while (diff < (H.config.rules.primary_questions_amount / (H.config.rules.action_locations+1) * 0.6));

                for(var n in this.places) {
                    var pos = curve.get_path_position(this.places[n] * obj.vars.questions_spacing);
                    var loc = obj.board.create(pos.x, pos.y, 'action_location');
                    var scale = ((pos.y - obj.vars.lowest_y) / (obj.vars.highest_y - obj.vars.lowest_y) * 0.2) + 0.3;
                    loc.scale.setTo(scale, scale);
                    loc.anchor = new Phaser.Point(0.6, 1);
                }

            }
        },
        init: function() {
            this.locations.init();
            obj.sound_select = game.add.audio('sound_action', 1, false);            
        },
		shown: false
    };
    
    
    /********************************************************/
    /*                                                      */
    /*          MISC                                        */
    /*                                                      */
    /********************************************************/
    
    // Show Map
    var show_zoom_map = function() {

        if (obj.vars.overlay || !H.work.question_shown || H.work.reader_open) {
            return false;
        }
        if (!obj.vars.zoom_map_action) {
            obj.vars.zoom_map_action = true;
            if (camera.scale === H.config.game.map_scale) {
                camera.fit(obj.board, true);
                //obj.button_view_map_text.elm.text = H.data.l10n.terms.main.zoom_in;
				obj.button_view_map_text.elm.destroy();
				obj.button_view_map_text = H.func.add.text({
					text: H.data.l10n.terms.main.zoom_in,
					top: '26%',
					left: '10%',
					w: '80%',
					fill: '#20180F',
					stroke: false,
					size: '100%',
					weight: 'bold',
					align: 'center',
					force_one_line: true,
					auto_offset: false,
					bounds_top: obj.button_view_map.coords.top,
					bounds_left: obj.button_view_map.coords.left,
					bounds_h: obj.button_view_map.coords.h,
					bounds_w: obj.button_view_map.coords.w
				});
				obj.button_view_map_text.elm.angle = 1.7;
				
				// Display last element
				game.add.sprite(0,0,'');
				
                if (typeof (obj.question_group) !== 'undefined') {
                    var tween = game.add.tween(obj.question_group).to({x: '-2000px'},H.config.animation.speed,Phaser.Easing.Linear.None,true);
                }
            }
            else {
                //var pos = curve.get_path_position(questions.position);
                var pos = curve.get_path_position(obj.player.relative_position);
                camera.point(obj.board, H.config.game.map_scale, pos.x, pos.y, true);
                //obj.button_view_map_text.elm.text = H.data.l10n.terms.main.view_map;
				obj.button_view_map_text.elm.destroy();
				obj.button_view_map_text = H.func.add.text({
					text: H.data.l10n.terms.main.view_map,
					top: '26%',
					left: '10%',
					w: '80%',
					fill: '#20180F',
					stroke: false,
					size: '100%',
					weight: 'bold',
					align: 'center',
					force_one_line: true,
					auto_offset: false,
					bounds_top: obj.button_view_map.coords.top,
					bounds_left: obj.button_view_map.coords.left,
					bounds_h: obj.button_view_map.coords.h,
					bounds_w: obj.button_view_map.coords.w
				});
				obj.button_view_map_text.elm.angle = 1.7;
				
				// Display last element
				game.add.sprite(0,0,'');
				
                if (typeof (obj.question_group) !== 'undefined') {
                    var tween = game.add.tween(obj.question_group).to({x: '2000px'},H.config.animation.speed,Phaser.Easing.Linear.None,true);
                }
            }
        }
    };
    
    // Path Functions
    var curve = {
        get_path_position: function(position) {
            
            position = Math.min(position, 99.999);
            
            // Get right path element
            if (position > obj.path[H.work.current_path_pos].pos_end && position < obj.path[H.work.current_path_pos+1].pos_end) {
                H.work.current_path_pos++;
            } else {
                H.work.current_path_pos = false;
                var n = 0;
                while(H.work.current_path_pos === false) {
                    if (position >= obj.path[n].pos_start && position < obj.path[n].pos_end) {
                        H.work.current_path_pos = n;
                    }
                    n++;
                }
            }

            // Find location within element
            var decimal = (position - obj.path[H.work.current_path_pos].pos_start) / (obj.path[H.work.current_path_pos].pos_end - obj.path[H.work.current_path_pos].pos_start);
            
            return this.get_curve_position(obj.path[H.work.current_path_pos], decimal, true);
            
        },
        get_curve_position: function(curve, pos, angle) {
        
            if (typeof angle === 'undefined') {
                angle = false;
            }
            
            var Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, Ex, Ey, x, y;
            Ax = ( (1 - pos) * curve.sx ) + (pos * curve.c1x);
            Ay = ( (1 - pos) * curve.sy ) + (pos * curve.c1y);
            Bx = ( (1 - pos) * curve.c1x ) + (pos * curve.c2x);
            By = ( (1 - pos) * curve.c1y ) + (pos * curve.c2y);
            Cx = ( (1 - pos) * curve.c2x ) + (pos * curve.ex);
            Cy = ( (1 - pos) * curve.c2y ) + (pos * curve.ey);
            
            Dx = ( (1 - pos) * Ax ) + (pos * Bx);
            Dy = ( (1 - pos) * Ay ) + (pos * By);
            Ex = ( (1 - pos) * Bx ) + (pos * Cx);
            Ey = ( (1 - pos) * By ) + (pos * Cy);
            
            x = ( (1 - pos) * Dx ) + (pos * Ex);
            y = ( (1 - pos) * Dy ) + (pos * Ey);
            
            var ret = {
                x: x,
                y: y
            };

            if (angle) {
                var theta = Math.atan2(Ex-Dx, -(Ey-Dy));
                ret.angle = theta * 180 / Math.PI;
            }

            return ret;
        },
        get_curve_length: function(curve) {
            var steps = 10;
            var step = 1/steps;
            var start, end, length = 0;
            for(var n = 0; n < steps; n++) {
                start = this.get_curve_position(curve, n*step);
                end = this.get_curve_position(curve, (n+1)*step);
                length += Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
            }
            return length;
        }
    };

    
    // Conclude Game
    var conclude_game = function(reason) {
        obj.sound.background.stop();
        obj.sound.time_running_out.stop();
        H.work.end_reason = reason;
        H.work.points = obj.points.amount;
        H.game.state.start('end');
    };
    
};
