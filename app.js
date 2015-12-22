(function($) {

	/**
	 * Words list to select from
	*/
	var wordsList = [
		'Help',
		'Love',
		'Hate',
		'Desperate',
		'Open',
		'Close',
		'Baby',
		'Girl',
		'Yeah',
		'Whoa',
		'Start',
		'Finish',
		'Beginning',
		'End',
		'Fight',
		'War',
		'Running',
		'Want',
		'Need',
		'Fire',
		'Myself',
		'Alive',
		'Life',
		'Dead',
		'Death',
		'Kill',
		'Different',
		'Alone',
		'Lonely',
		'Darkness',
		'Home',
		'Gone',
		'Break',
		'Heart',
		'Floating',
		'Searching',
		'Dreaming',
		'Serenity',
		'Star',
		'Recall',
		'Think',
		'Feel',
		'Slow',
		'Speed',
		'Fast',
		'World',
		'Work',
		'Miss',
		'Stress',
		'Please',
		'More',
		'Less',
		'only',
		'World',
		'Moving',
		'lasting',
		'Rise',
		'Save',
		'Wake',
		'Over',
		'High',
		'Above',
		'Taking',
		'Go',
		'Why',
		'Before',
		'After',
		'Along',
		'See',
		'Hear',
		'Feel',
		'Change',
		'Body',
		'Being',
		'Soul',
		'Spirit',
		'God',
		'Angel',
		'Devil',
		'Demon',
		'Believe',
		'Away',
		'Everything',
		'Shared',
		'Something',
		'Everything',
		'Control',
		'Heart',
		'Away',
		'Waiting',
		'Loyalty',
		'Shared',
		'Remember',
		'Yesterday',
		'Today',
		'Tomorrow',
		'Fall',
		'Memories',
		'Apart',
		'Time',
		'Forever',
		'Breath',
		'Lie',
		'Sleep',
		'Inside',
		'Outside',
		'Catch',
		'Be',
		'Pretending'
	];

	/**
	 * Default options are set here
	*/
	var defaultOptions = {
		'maxWords': 3,
		'maxOffset': 5
	};

	/**
	 * Select 1 to `max` words from the words list
	*/
	var selectWords = function(max) {
		if(!max || isNaN(max) || max < 1) max = 1;
		var howMany = Math.ceil(Math.random() * max);
		var listLength = wordsList.length;
		var words = [];
		for(var i = 0; i < howMany; i++) {
			var r = Math.floor(Math.random() * listLength);
			words.push(wordsList[r]);
		}
		return words;
	};

	/**
	 * Build and fire request to the Spotify Web API
	*/
	var doSearch = function(options, callback) {
		var words = (options.words) ? options.words : selectWords(options.maxWords);
		var offset = Math.ceil(Math.random() * options.maxOffset);
		var url = 'https://api.spotify.com/v1/search?type=track&limit=1&offset=' + offset + '&q=' + words.join('%20');
		$.getJSON(url, callback);
	};

	/**
	 * Get info on a random song from the Spotify Web API
	*/
	$.getRandomSong = function(options, callback) {
		if(!callback && typeof options == 'function') {
			callback = options;
			options = {};
		}
		options = $.extend(defaultOptions, options);
		options.words = selectWords(options.maxWords);
		doSearch(options, function(response) {
			if(response.tracks.total === 0 || response.tracks.items.length === 0) return $.getRandomSong(options, callback);
			return callback(response.tracks.items[0]);
		});
	};

}(jQuery));
