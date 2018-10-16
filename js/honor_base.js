/*

Sonst
====
- Luftballons: http://www.blendswap.com/blends/view/26372
- Start: 3-2-1-Balloon animation

http://jsfiddle.net/4famh/

- Letters falling, balloons, bouncing männchen
- Pitcairn start screen

------------------------------------------------

- Schönere Notes von Simon

----------------------------------------------------

- Anweisungen zu Beginn
- Continue button bei Aktionen
- View map sollte nicht immer gehen.
- E-Mail verschicken


*/

if (!navigator.isCocoonJS) {
    if (window.innerWidth / 16 * 9 < window.innerHeight) {
        var canvas_width = window.innerWidth;
        var canvas_height = parseInt(window.innerWidth / 16 * 9);
        var canvas_left = 0;
        var canvas_top = (window.innerHeight - canvas_height) / 2;
    }
    else {
        var canvas_height = window.innerHeight;
        var canvas_width = parseInt(window.innerHeight / 9 * 16);
        var canvas_top = 0;
        var canvas_left = (window.innerWidth - canvas_width) / 2;
    }
}


H = {
    state: {},
    reader: function(p, callback) {
        var obj = this;
        obj.background_elements = [];
        obj.page_elements = [];
        text_obj = JSON.parse( JSON.stringify( p ) );

        if (typeof H.work.reader_open === 'undefined') {
            H.work.reader_open = false;
        }

        var get_data = function() {

            // Cover
            obj.background_elements.push(H.func.add.sprite({
                img: 'cover',
                top: '0%',
                left: '0%',
                w: '100%',
                h: '100%'
            }).elm);

            // Paper
            var paper = H.func.add.sprite({
                img: 'reader_background',
                top: '2%',
                left: '2%',
                w: '98%',
                h: '98%',
                auto_offset: false
            });
            obj.background_elements.push(paper.elm);
			
            /* Add Back-Button */
            obj.background_elements.push(H.func.add.button({
				img: 'button_back',
                top: '81%',
                left: '10%',
                w: '18%',
                auto_offset: false,
                bounds_top: paper.coords.top,
                bounds_left: paper.coords.left,
                bounds_h: paper.coords.h,
                bounds_w: paper.coords.w,
                callback: function() {
                    hide();
                }
            }).elm);

            /* Text */

            // Definitions
            var def = {
                title: {
                    size: '150%',
                    weight: 'bold'
                },
                p: {
                    size: '120%',
                    weight: 'normal',
                    margin_bottom: 0.4
                }
            };

            if (text_obj[0]['elm'] === 'title') {
                var title = text_obj.shift();
            }
            var text = '';
            for(var n in text_obj) {
                text += (text === '' ? '' : "\n\n") + text_obj[n]['text'];
            }

            var coords = H.func.dim.get_coords({
                text: '',
                top: '10%',
                left: '10%',
                w: '68%',
                h: '70%',
                auto_offset: false,
                bounds_top: paper.coords.top,
                bounds_left: paper.coords.left,
                bounds_h: paper.coords.h,
                bounds_w: paper.coords.w
            });
            var text_info = H.func.dim.get_text_info({
                text: text,
                width: coords.w,
                size: def.p.size,
                weight: def.p.weight
            });

            // Calculate Pages
            var pages = [];
            var page_num = 0;
            var pos = 0;
            pages[page_num] = [];

            // Push Title to Pages
            if (typeof title !== 'undefined') {
                pages[page_num].push({
                    text: title.text,
                    top: coords.top,
                    left: coords.left,
                    w: coords.w,
                    size: def.title.size,
                    weight: def.title.weight
                });
                pos += text_info.line_height / parseInt(def.p.size) * 200;
            }

            // Push Text Lines to Pages
            for(var n in text_info.lines) {

                if (pos + text_info.line_height > coords.h) {
                    page_num++;
                    pages[page_num] = [];
                    pos = 0;
                    if (text_info.lines[n] === '') {
                        continue;
                    }
                }

                pages[page_num].push({
                    text: text_info.lines[n],
                    top: coords.top + pos,
                    size: def.p.size,
                    left: coords.left,
                    w: coords.w,
                    weight: 'normal'
                });

                // Add to pos
                if (text_info.lines[n] === '') {
                    pos += text_info.line_height * def.p.margin_bottom;
                }
                else {
                    pos += text_info.line_height;
                }
            }

            return pages;
        };

        var show = function(page) {
            if (typeof page === 'undefined') {
                page = 0;
            }

            for (var n in obj.page_elements) {
                obj.page_elements[n].destroy();
            }
            obj.page_elements.length = 0;

            for(var n in obj.text_data[page]) {
                obj.page_elements.push(
                    H.func.add.text({
                        text: obj.text_data[page][n].text,
                        top: obj.text_data[page][n].top - H.config.game.bounding_box.top,
                        left: obj.text_data[page][n].left,
                        w: '100%',
                        auto_offset: false,
                        size: obj.text_data[page][n].size,
                        weight: obj.text_data[page][n].weight
                    }).elm
                );
            }

            if (page > 0) {
                obj.page_elements.push(
                    H.func.add.button({
                        img: 'reader_arrow',
                        top: '38%',
                        left: '4%',
                        w: '5%',
                        auto_offset: false,
                        callback: function() {
                            show(page-1);
                        }
                    }).elm
                );
            }

            if (page < obj.text_data.length - 1) {
                var right_arrow = H.func.add.button({
                    img: 'reader_arrow',
                    top: '38%',
                    left: '92%',
                    w: '5%',
                    auto_offset: false,
                    callback: function() {
                        show(page+1);
                    }
                });
                right_arrow.elm.anchor = new Phaser.Point(0.5, 1);
                right_arrow.elm.angle = 180;
                obj.page_elements.push(right_arrow.elm);
            }

            H.game.add.sprite(0,0,'');

            H.work.reader_open = true;

        };

        var hide = function() {
            for (var n in obj.background_elements) {
                obj.background_elements[n].destroy();
            }
            obj.background_elements.length = 0;
            for (var n in obj.page_elements) {
                obj.page_elements[n].destroy();
            }
            obj.page_elements.length = 0;

            H.work.reader_open = false;

            if (typeof callback !== 'undefined') {
                callback();
            }
        };

        obj.text_data = get_data();

        show();

        return {
            // show: show
        };
    },
    keyboard: function(callback, initial_value) {

        var elm = this;

        elm.shift = false;
        elm.text = '';
        if (typeof initial_value !== 'undefined') {
            elm.text = initial_value;
        }

        var keyboard_settings = {
            margin: 0.06,
            ratio: 1.2
        };

        var keyboard_map = [
            [
                {
                    def: 'Q',
                    shift: '1',
                    size: 1
                },
                {
                    def: 'W',
                    shift: '2',
                    size: 1
                },
                {
                    def: 'E',
                    shift: '3',
                    size: 1
                },
                {
                    def: 'R',
                    shift: '4',
                    size: 1
                },
                {
                    def: 'T',
                    shift: '5',
                    size: 1
                },
                {
                    def: 'Y',
                    shift: '6',
                    size: 1
                },
                {
                    def: 'U',
                    shift: '7',
                    size: 1
                },
                {
                    def: 'I',
                    shift: '8',
                    size: 1
                },
                {
                    def: 'O',
                    shift: '9',
                    size: 1
                },
                {
                    def: 'P',
                    shift: '0',
                    size: 1
                }
            ],
            [
                {
                    class: 'empty',
                    size: 0.5
                },
                {
                    def: 'A',
                    shift: '@',
                    size: 1
                },
                {
                    def: 'S',
                    shift: '#',
                    size: 1
                },
                {
                    def: 'D',
                    shift: '&',
                    size: 1
                },
                {
                    def: 'F',
                    shift: '*',
                    size: 1
                },
                {
                    def: 'G',
                    shift: '-',
                    size: 1
                },
                {
                    def: 'H',
                    shift: '+',
                    size: 1
                },
                {
                    def: 'J',
                    shift: '=',
                    size: 1
                },
                {
                    def: 'K',
                    shift: '(',
                    size: 1
                },
                {
                    def: 'L',
                    shift: ')',
                    size: 1
                }
            ],
            [
                {
                    class: 'shift',
                    size: 1.5
                },
                {
                    def: 'Z',
                    shift: '_',
                    size: 1
                },
                {
                    def: 'X',
                    shift: '$',
                    size: 1
                },
                {
                    def: 'C',
                    shift: '"',
                    size: 1
                },
                {
                    def: 'V',
                    shift: '\'',
                    size: 1
                },
                {
                    def: 'B',
                    shift: ':',
                    size: 1
                },
                {
                    def: 'N',
                    shift: ';',
                    size: 1
                },
                {
                    def: 'M',
                    shift: '/',
                    size: 1
                },
                {
                    class: 'delete',
                    size: 1.5
                }
            ],
            [
                {
                    class: 'empty',
                    size: 1
                },
                {
                    def: '@',
                    size: 1
                },
                {
                    def: ' ',
                    size: 5
                },
                {
                    def: '.',
                    shift: ',',
                    size: 1
                },
                {
                    class: 'confirm',
                    size: 2
                }
            ]
        ];

        /* Get dimensions */
        var max_size = 0;
        for(var n in keyboard_map) {
            var row = 0;
            for (var m in keyboard_map[n]) {
                row += keyboard_map[n][m].size;
            }
            max_size = Math.max(max_size, row);
        }

        keyboard_settings.width = H.config.game.width;
        keyboard_settings.unit_size = H.config.game.width / max_size;
        keyboard_settings.height = keyboard_settings.unit_size * keyboard_map.length / keyboard_settings.ratio;
        keyboard_settings.top = H.config.game.height - H.config.game.bounding_box.bottom - keyboard_settings.height;

        var show = function() {

            elm.elements = [];

            elm.elements.push(H.func.add.sprite({
                img: 'cover',
                top: '0%',
                left: '0%',
                w: '100%',
                h: '100%'
            }).elm);

            var textbox_wrapper = H.func.add.sprite({
                img: 'text_box',
                top: '5%',
                left: '2%',
                w: '96%',
                h: '20%',
                auto_offset: false
            });
            elm.textbox = H.func.add.text({
                text: '',
                top: '30%',
                fill: '#000000',
                weight: 'bold',
                size: '200%',
                left: '12%',
                w: '80%',
                force_one_line: true,
                bounds_top: textbox_wrapper.coords.top,
                bounds_left: textbox_wrapper.coords.left,
                bounds_h: textbox_wrapper.coords.h,
                bounds_w: textbox_wrapper.coords.w
            });

            elm.elements.push(textbox_wrapper.elm);
            elm.elements.push(elm.textbox.elm);


            for(var n = 0; n < keyboard_map.length; n++) {
                var top = keyboard_settings.top + (n / keyboard_settings.ratio * keyboard_settings.unit_size);
                var size = 0;
                for(var m = 0; m < keyboard_map[n].length; m++) {
                    var key_top = top + (keyboard_settings.unit_size * keyboard_settings.margin);
                    var key_height = keyboard_settings.unit_size / keyboard_settings.ratio * (1-(2 * keyboard_settings.margin));
                    var key_left = (size * keyboard_settings.unit_size) + (keyboard_settings.unit_size * keyboard_settings.margin);
                    var key_width = (keyboard_settings.unit_size * keyboard_map[n][m].size) - (2 * keyboard_settings.margin * keyboard_settings.unit_size);

                    keyboard_map[n][m].key_top = key_top;
                    keyboard_map[n][m].key_left = key_left;
                    keyboard_map[n][m].key_height = key_height;
                    keyboard_map[n][m].key_width = key_width;

                    (function(km, n, m) {
                        // If regular key
                        if (typeof km.class === 'undefined') {
                            var button = H.game.add.button(key_left, key_top, 'keyboard_key_light', function() {
                                var character = (!elm.shift ? km.def : (typeof km.shift !== 'undefined' ? km.shift : km.def));
                                elm.text += character;
                                elm.textbox.elm.text = elm.text;
                            },
                            this, 0, 1, 2);
                            button.width = key_width;
                            button.height = key_height;
                            elm.elements.push(button);

                            var text = H.func.add.text({
                                text: (!elm.shift ? km.def : km.shift),
                                top: '30%',
                                left: '5%',
                                w: '90%',
                                align: 'center',
                                size: '140%',
                                weight: 'bold',
                                fill: '#FFFFFF',
                                auto_offset: false,
                                bounds_top: key_top,
                                bounds_left: key_left,
                                bounds_h: key_height,
                                bounds_w: key_width
                            });
                            elm.elements.push(text.elm);

                            keyboard_map[n][m]['text'] = text.elm;
                        }
                        else if (km.class === 'shift' || km.class === 'delete' || km.class === 'confirm') {
                            var button = H.game.add.button(key_left, key_top, 'keyboard_key_dark', function() {
                                if (km.class === 'shift') {
                                    elm.shift = !elm.shift;

                                    for(var o = 0; o < keyboard_map.length; o++) {
                                        for(var q = 0; q < keyboard_map[o].length; q++) {
                                            var character = (!elm.shift ? keyboard_map[o][q].def : (typeof keyboard_map[o][q].shift !== 'undefined' ? keyboard_map[o][q].shift : keyboard_map[o][q].def));
                                            if (typeof (keyboard_map[o][q]['text']) !== 'undefined') {
                                                keyboard_map[o][q]['text'].text = character;
                                            }
                                        }
                                    }
                                }
                                else if (km.class === 'delete') {
                                    elm.text = elm.text.substring(0, elm.text.length - 1);
                                    elm.textbox.elm.text = elm.text;
                                }
                                else if (km.class === 'confirm') {
                                    hide();
                                    callback(elm.text);
                                }
                            },
                            this, 0, 1, 2);
                            button.width = key_width;
                            button.height = key_height;
                            elm.elements.push(button);

                        }

                        if (km.class === 'shift') {
                            elm.elements.push(H.func.add.text({
                                text: '123',
                                top: '30%',
                                left: '5%',
                                w: '90%',
                                align: 'center',
                                size: '140%',
                                weight: 'bold',
                                fill: '#FFFFFF',
                                auto_offset: false,
                                bounds_top: key_top,
                                bounds_left: key_left,
                                bounds_h: key_height,
                                bounds_w: key_width
                            }).elm);
                        }
                        if (km.class === 'delete') {
                            elm.elements.push(H.func.add.text({
                                text: H.data.l10n.terms.basis.keyboard_del,
                                top: '30%',
                                left: '5%',
                                w: '90%',
                                align: 'center',
                                size: '140%',
                                weight: 'bold',
                                fill: '#FFFFFF',
                                auto_offset: false,
                                bounds_top: key_top,
                                bounds_left: key_left,
                                bounds_h: key_height,
                                bounds_w: key_width
                            }).elm);
                        }
                        if (km.class === 'confirm') {
                            elm.elements.push(H.func.add.text({
                                text: H.data.l10n.terms.basis.keyboard_confirm,
                                top: '30%',
                                left: '5%',
                                w: '90%',
                                align: 'center',
                                size: '140%',
                                weight: 'bold',
                                fill: '#FFFFFF',
                                auto_offset: false,
                                bounds_top: key_top,
                                bounds_left: key_left,
                                bounds_h: key_height,
                                bounds_w: key_width
                            }).elm);
                        }

                    })(keyboard_map[n][m], n, m);

                    size += keyboard_map[n][m].size;
                }
            }
			
            
            H.game.add.sprite(0,0,'');

        };

        var hide = function() {
            for(var n in elm.elements) {
                elm.elements[n].destroy();
            }
            elm.elements.length = 0;
        };

        // show();

        return {
            show: show,
            hide: hide
        };
    },
    func: {
        add: {
            sprite: function(p) {
                var coords = H.func.dim.get_coords(p);
                var sprite = H.game.add.sprite(coords.left, coords.top, p.img);
                sprite.width = coords.w;
                sprite.height = coords.h;
                
                return {
                    elm: sprite,
                    coords: coords
                };
            },
            button: function(p) {
			
				var defaults = {
					outFrame: 0,
					overFrame: 0,
					downFrame: 0
				};
                for(var n in defaults) {
                    if (typeof p[n] === 'undefined') {
                        p[n] = defaults[n];
                    }
                }
			
                var coords = H.func.dim.get_coords(p);
                var button = H.game.add.button(coords.left, coords.top, p.img, p.callback, p.callback_context, p.overFrame, p.outFrame, p.downFrame);
                button.width = coords.w;
                button.height = coords.h;
                
                return {
                    elm: button,
                    coords: coords
                };
            },
            text: function(p) {
            
                var defaults = {
                    face: 'Times New Roman', // Fontin, IM FELL Great Primer PRO
                    size: '100%',
                    fill: '#20180F',  //402715
                    align: 'left',
                    weight: 'normal',
                    stroke: false,
					stretch: false,
					force_one_line: false,
                    contain: false,
					log: false
                };

                for(var n in defaults) {
                    if (typeof p[n] === 'undefined') {
                        p[n] = defaults[n];
                    }
                }
				
				// size: stretch
				if (p.size === 'stretch') {
					p.stretch = true;
					p.size = '100%';
				}

                var coords = H.func.dim.get_coords(p);
                var text_info = H.func.dim.get_text_info({
                    text: p.text,
                    width: coords.w,
                    size: p.size,
                    weight: p.weight
                });
				
				if (p.log) {
					H.func.misc.debug(text_info);
					console.log(text_info);
				}
				
				if (p.force_one_line && text_info.lines.length > 1) {
					text_info.lines.length = 0;
					text_info.lines[0] = p.text;
					p.stretch = true;
				}

                var elements = [];
				var widths = [];
                for (var n = 0; n < text_info.lines.length; n++) {
                    elements[n] = H.game.add.text(
                        coords.left,
                        coords.top+(n*text_info.line_height),
                        text_info.lines[n]
                    );
					if (p.log) {
						H.func.misc.debug({
							text: text_info.lines[n],
							hight: coords.top+(n*text_info.line_height)
						});
					}
                    elements[n].font = p.face;
                    elements[n].fontSize = text_info.text_size;
                    elements[n].fill = p.fill;
                    elements[n].align = p.align;
                    elements[n].fontWeight = p.weight;
					widths[n] = elements[n].width;
                    if (p.stroke) {
                        elements[n].stroke = '#000000';
                        elements[n].strokeThickness = H.config.game.width / 1920 * 8;
                    }
                }
				
				if (p.stretch) {
					var max_width = 0;
					var max_height = 0;
					for (var n = 0; n < text_info.lines.length; n++) {
						max_width = Math.max(max_width, elements[n].width);
						max_height = Math.max(max_height, elements[n].height);
					}

					var ratio = p.w / max_width;
					for (var n = 0; n < text_info.lines.length; n++) {
                        if (!p.force_one_line || ratio < 1) {
						  elements[n].fontSize = elements[n].fontSize * ratio;
                        }
					}
				}

                if (p.contain) {
                    if (text_info.lines.length === 1) {
                        if (elements[0].width > p.w) {
                            var ratio = elements[0].width / p.w;
                            elements[0].fontSize = elements[0].fontSize / ratio;
                        }
                    }
                }
				
				// Center, if necessary
				if (p.align === 'center') {
					for (var n = 0; n < text_info.lines.length; n++) {
						var element_left = ((p.w - elements[n].width) / 2) + p.left;
						elements[n].position = new Phaser.Point(element_left, elements[n].position.y);
					}
				}
				
				
                
                /*

                text.wordWrap = true;
                text.wordWrapWidth = coords.w;
                //console.log(text.lineSpacing);
                */
                
                return {
                    elm: (elements.length > 1 ? elements : elements[0]),
                    coords: coords
                };
            },
            text_image: function(p) {
                var coords = H.func.dim.get_coords(p);
                var text = H.game.add.sprite(coords.left, coords.top, p.img);
                text.width = coords.w;
                text.height = coords.h;
                
                return {
                    elm: text,
                    coords: coords
                };
            },
            retro_text: function(p) {
            
                var defaults = {
                    face: 'egw1',
                    size: '100%',
                    fill_bounding_box: false
                };

                for(var n in defaults) {
                    if (typeof p[n] === 'undefined') {
                        p[n] = defaults[n];
                    }
                }
            
                p.size = H.config.game.width / 1920 * parseInt(p.size);
            
                var font = H.game.add.retroFont(p.font, 26, 60, Phaser.RetroFont.TEXT_SET1, 14);
                font.text = p.text;
                var coords = H.func.dim.get_coords(p);
                var text = H.game.add.image(coords.left, coords.top, font);
                
                if (p.fill_bounding_box) {
                    text.width = coords.w;
                    text.height = coords.h;
                }
                else {
                    var ratio = parseInt(p.size) / 100;
                    text.width *= ratio;
                    text.height *= ratio;
                }
                
            },
            bitmap_text: function(p) {
            
                var defaults = {
                    face: 'egw1',
                    size: '100%'                
                };
                
                for(var n in defaults) {
                    if (typeof p[n] === 'undefined') {
                        p[n] = defaults[n];
                    }
                }

                var coords = H.func.dim.get_coords(p);
                
                var text_size = H.config.game.width / 4000 * parseInt(p.size);
                
                var text = H.game.add.bitmapText(
                    coords.left,
                    coords.top,
                    p.face,
                    p.text,
                    text_size
                );
                
                return {
                    elm: text,
                    coords: coords
                };
            }
        },
        dim: {
            get_text_info: function(p) {
                
                var weight = 1;
                if (p.weight === 'bold') {
                    weight = 0.85;
                }
                

                var text_size = H.config.game.width / 5000 * parseInt(p.size);
                var values = {
                    text_size: text_size,
                    characters_per_line: (p.width / 500 * weight) * ((0.0211502 * Math.pow(parseInt(text_size), 2)) - (2.670837 * parseInt(text_size)) + 104.82346),
                    line_height: text_size * 1.3
                };
				if (navigator.isCocoonJS) {
					values.characters_per_line *= 0.85;
				}
                
                var lines = [''];
                while(p.text.match("\n")) {
                    p.text = p.text.replace(/\n/, '-||-');
                }
                var words = p.text.split(/\s/);
                var c = 0;
                for(var n = 0; n < words.length; n++) {
                    if (words[n].match(/-\|\|-/)) {
                        var parts = words[n].split(/-\|\|-/);
                        lines[c] += (lines[c] === '' ? '' : ' ') + parts.shift();
                        while(parts.length > 0) {
                            c++;
                            lines[c] = parts.shift();
                        }
                    }
                    else {
                        if (lines[c].length + words[n].length > values.characters_per_line) {
                            c++;
                            lines[c] = '';
                        }
                        if (lines[c] !== '') {
                            lines[c] += ' ';
                        }
                        lines[c] += words[n];
                    }
                }
                
                values.lines = lines;

                return values;
                
            },
            get_coords: function(p) {
            
                // Get Variables
                var defaults = {
                    img: false,
                    top: 0,
                    left: 0,
                    w: 0,
                    h: 0,
                    offset_x: 0,
                    offset_y: 0,
                    bounds_top: H.config.game.bounding_box.top,
                    bounds_left: H.config.game.bounding_box.left,
                    bounds_w: H.config.game.width - H.config.game.bounding_box.left - H.config.game.bounding_box.right,
                    bounds_h: H.config.game.height - H.config.game.bounding_box.top - H.config.game.bounding_box.bottom,
                    max_w: 9999,
                    max_h: 9999,
                    auto_offset: true,
                    heed_density: false,
                    scale: 'proportional' // 'unproportional'
                };
                for(var n in defaults) {
                    if (typeof p[n] === 'undefined') {
                        p[n] = defaults[n];
                    }
                }
                
                // Return false if wrong values
                if (!p.bounds_w || !p.bounds_h) {
                    return false;
                }
                                
                // Get proper position
                if ((typeof (p.left) === 'string') && (p.left.indexOf('%') !== -1)) {
                    p.left = p.bounds_left + Math.min((p.bounds_w / 100 * parseFloat(p.left)), p.bounds_w);
                } 
                else {
                    p.left = p.bounds_left + Math.min(parseFloat(p.left), p.bounds_w);
                }
                if ((typeof (p.top) === 'string') && (p.top.indexOf('%') !== -1)) {
                    p.top = p.bounds_top + Math.min((p.bounds_h / 100 * parseFloat(p.top)), p.bounds_h);
                } 
                else {
                    p.top = p.bounds_top + Math.min(parseFloat(p.top), p.bounds_h);
                }
                p.w = ((typeof (p.w) === 'string') && (p.w.indexOf('%') !== -1)) ? p.bounds_w / 100 * parseFloat(p.w) : parseFloat(p.w);
                p.h = ((typeof (p.h) === 'string') && (p.h.indexOf('%') !== -1)) ? p.bounds_h / 100 * parseFloat(p.h) : parseFloat(p.h);

                // Correct scale
                if (p.w > 0 && p.h > 0 && p.scale === 'proportional') {
                    p.scale = 'unproportional';
                }
                
                // Get missing image dimension
				if (typeof H.game.cache._images[p.img] !== 'undefined' && typeof H.game.cache._images[p.img].frameData !== 'undefined') {
					var frames = H.game.cache._images[p.img].frameData._frames.length;
				} else {
					var frames = 1;
				}
                if (p.img) {
                    if (p.w === 0 && p.h === 0) {
                        p.w = H.game.cache.getImage(p.img).width / frames;
                    }
                    if (p.scale === 'proportional') {
                        if (p.w > 0) {
                            p.h = H.game.cache.getImage(p.img).height/(H.game.cache.getImage(p.img).width/frames)*p.w;
                        }
                        if (p.h > 0) {
                            p.w = (H.game.cache.getImage(p.img).width/frames)/H.game.cache.getImage(p.img).height*p.h;
                        }
                    }
                }
                
                // Scale down if larger than bounding box or max-values
                var limit_w = Math.min(p.bounds_w, p.max_w);
                var limit_h = Math.min(p.bounds_h, p.max_h);
                var ratio = 1;
                if (p.w > limit_w) {
                    ratio = limit_w/p.w;
                }
                if (p.h > limit_h) {
                    ratio = Math.min(ratio, limit_h/p.h);
                }
                if (ratio < 1) {
                    p.w *= ratio;
                    p.h *= ratio;
                }
                
                // Correct offset due to anchor
                if (p.auto_offset) {
                    p.offset_x -= p.w * (p.left - p.bounds_left) / p.bounds_w;
                    p.offset_y -= p.h * (p.top - p.bounds_top) / p.bounds_h;
                }
                
                var density = 1;
                if (p.heed_density) {
                    density = window.devicePixelRatio;
                }
                
                // Return values
                return {
                    left: (p.left + p.offset_x) * density,
                    top: (p.top + p.offset_y) * density,
                    w: p.w * density,
                    h: p.h * density
                };
                
            },
            get_height: function(img, width) {
                var full_width = H.game.cache.getImage(img).width;
                var full_height = H.game.cache.getImage(img).height;
                return full_height/full_width*width;
            }
        },
        misc: {
            shuffle_array: function(array) { // http://jsfiddle.net/kcr8z/
                var currentIndex = array.length
                , temporaryValue
                , randomIndex
                ;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            },
            delay: function(p) { 
                if (typeof p.counter === 'undefined') {
                    p.counter = 0;
                } else {
                    p.counter++;
                }
                if (p.test.call(p.this_arg)) {
                    p.callback(p.vars);
                }
                else {
                    if (p.counter <= 40) {
                        setTimeout(H.func.misc.delay(p), 100);
                    }
                }
            },
            seconds_to_MMSS: function(sec) {
                var sec_num = parseInt(sec, 10); // don't forget the second param
                var hours   = Math.floor(sec_num / 3600);
                var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds = sec_num - (hours * 3600) - (minutes * 60);

                if (hours   < 10) {hours   = "0"+hours;}
                if (minutes < 10) {minutes = "0"+minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}
                //var time    = hours+':'+minutes+':'+seconds;
                var time = minutes + ':' + seconds;
                return time;
            },
            note: function(note, time) {
            
                if (typeof time === 'undefined') {
                    time = 4000;
                }
                
				var note_group = H.game.add.group();
				
                var background = H.func.add.sprite({
                    img: 'note_background',
                    top: '100%',
                    left: '0%',
                    w: '100%',
                    h: '20%',
                    scale: 'unproportional'
                });
                
                var text = H.func.add.text({
                    text: note,
                    top: '20%',
                    left: '10%',
                    w: '80%',
                    size: '130%',
					fill: '#FFFFFF',
					weight: 'bold',
					stroke: true,
                    auto_offset: false,
                    bounds_top: background.coords.top,
                    bounds_left: background.coords.left,
                    bounds_h: background.coords.h,
                    bounds_w: background.coords.w
                });
				
				note_group.add(background.elm);
				note_group.add(text.elm);

                // Display last element
                var last = H.game.add.sprite(0,0,'');
                
                setTimeout(function() {
                    note_group.destroy();
                    last.destroy();
                }, time);
                
            },
			debug: function(text) {
			
				if (typeof text !== 'string') {
					text = JSON.stringify(text);
					while (text.indexOf(',') !== -1) {
						text = text.replace(',', "\n");
					}
					
					// text = JSON.stringify(text);
					// text = text.replace(',', "\n");
				}
			
				if (typeof H.work.debug === 'undefined') {
					H.work.debug = text;
				}
				else {
					H.work.debug = text + "\n" + H.work.debug;
				}
				if (typeof H.work.debug_elm !== 'undefined' && H.work.debug_elm !== false) {
					for(var n in H.work.debug_elm) {
						H.work.debug_elm[n].destroy();
					}
					H.work.debug_elm.length = 0;
				}
				
				console.log(H.work.debug);
				
				var lines = H.work.debug.split("\n");
				H.work.debug_elm = [];
				for(var n in lines) {
					H.work.debug_elm.push(H.game.add.text(
						32,
						130 + (n*30),
						lines[n]
					));
					H.work.debug_elm[H.work.debug_elm.length-1].fontSize = '28px';
					H.work.debug_elm[H.work.debug_elm.length-1].fill = '#FFFFFF';
					H.work.debug_elm[H.work.debug_elm.length-1].fontWeight = 'normal';
					H.work.debug_elm[H.work.debug_elm.length-1].stroke = '#000000';
					H.work.debug_elm[H.work.debug_elm.length-1].strokeThickness = 3;
				}
			},
            load_language: function(lang, callback) {
                H.data.language = lang;
                localStorage.setItem('Pitcairn_Lang', lang);
                LazyLoad.js(
                    [
                    'data/' + H.data.language + '/lang.js',
                    'data/' + H.data.language + '/questions.js',
                    'data/' + H.data.language + '/instructions.js',
                    'data/' + H.data.language + '/story.js',
                    'data/' + H.data.language + '/answer_card_0.js',
                    'data/' + H.data.language + '/answer_card_1.js',
                    'data/' + H.data.language + '/answer_card_2.js',
                    'data/' + H.data.language + '/answer_card_3.js',
                    'data/' + H.data.language + '/answer_card_4.js',
                    'data/' + H.data.language + '/answer_card_5.js'
                    ],
                    function() {
                        callback();
                    }
                );
            }
        }

    },
    config: {
        game: {
            width: navigator.isCocoonJS ? window.innerWidth : canvas_width, //  * window.devicePixelRatio
            height: navigator.isCocoonJS ? window.innerHeight : canvas_height, //  * window.devicePixelRatio
            bounding_box: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            map_scale: 2,
            ratio: window.devicePixelRatio
        },
        animation: {
            speed: 1000,
            time_before_question: 400
        },
        rules: {
            primary_questions_amount: 40, //40
            total_time_available: 420, // 420
            points_for_honor: 200, //200 
            action_locations: 5, // 5
            points_primary: {
                0: 5,
                1: 2,
                2: 0,
                3: 0
            },
            tokens_primary: {
                0: 2, // 2
                1: 1,
                2: 0,
                3: 0
            },
            points_secondary: {
                0: 0,
                1: 0,
                2: 0,
                3: 0
            },
            tokens_secondary: {
                0: 3,
                1: 1,
                2: 0,
                3: 0
            },
            points_bonus: {
                0: 25,
                1: 0,
                2: -15,
                3: -30
            },
            tokens_bonus: {
                0: 0,
                1: 0,
                2: 0,
                3: 0
            }
        },
        languages: [
            {
                iso: 'en',
                full: 'english'
            },
            {
                iso: 'ge',
                full: 'german'
            },
            {
                iso: 'sp',
                full: 'spanish'
            },
            {
                iso: 'fr',
                full: 'french'
            },
            {
                iso: 'de',
                full: 'danish'
            },
            {
                iso: 'ru',
                full: 'russian'
            },
            {
                iso: 'po',
                full: 'portuguese'
            }
        ]
    },
    work: {
        camera: {
            goal: false
        },
        current_path_pos: 0,
        pause: {
            active: false,
            total: 0
        },
		question_shown: false,
        game_counter: 0,
        background_volume: 0.6
    },
    data: {
        questions: {},
        answer_cards: 6,
        l10n: {}
    }
};

H.config.game.map_scale *= H.config.game.width / 1920; // Wouldn't work earlier because game.width isn't set.

localStorage.setItem('Pitcairn_width', H.config.game.width);
localStorage.setItem('Pitcairn_height', H.config.game.height);

//CocoonJS.App.onLoadInTheWebViewFailed.addEventListener(function(pageURL) {
//    console.error("Could not load the HTML file in the webview");
//});