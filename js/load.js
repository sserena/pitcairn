LazyLoad.js('js/phaser.min.js', function() {
//	LazyLoad.js('js/CocoonJS.js', function() {
//		LazyLoad.js('js/CocoonJS_App.js', function() {
//			LazyLoad.js('js/CocoonJS_App_ForCocoonJS.js', function() {
				LazyLoad.js('js/honor_base.js', function() {
					var lang = localStorage.getItem('Pitcairn_Lang');
					if (lang === null) {
						lang = get_default_language();
					}
					H.func.misc.load_language(lang, function() {
						LazyLoad.js('js/honor_boot.js', function() {
							LazyLoad.js('js/honor_splash.js', function() {
								LazyLoad.js('js/honor_start.js', function() {
									LazyLoad.js('js/honor_main.js', function() {
										LazyLoad.js('js/honor_end.js', function() {
											LazyLoad.js('js/honor_launch.js');
										});
									});
								});
							});
						});
					});
				});
//			});
//		});
//	});
});

function get_default_language() {
	var languages = {
		'en': 'english',
		'de': 'german',
		'es': 'spanish',
		'fr': 'french',
		'da': 'danish'
	};
	var get_lang_only = function(l) {
		if (l.indexOf('-') !== false) {
			var parts = l.split('-');
			return parts[0];
		}
		else {
			return l;
		}
	};
	
	var lang = navigator.languages ? navigator.languages : (navigator.language || navigator.userLanguage);
	if (typeof lang === 'object') {
		for(var n in lang) {
			var lang_only = get_lang_only(lang[n]);
			if (typeof languages[lang_only] !== 'undefined') {
				return languages[lang_only];
			}
		}
	}
	else {
		var lang_only = get_lang_only(lang);
		if (typeof languages[lang_only] !== 'undefined') {
			return languages[lang_only];
		}
	}
	return languages['en'];
	
}