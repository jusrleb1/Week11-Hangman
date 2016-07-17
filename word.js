var letter = require('./letter');

var Word = function(wrd) {
	this.word = wrd;
	this.letters = [];
	this.found = false;
	this.getLetters = function() {
		for(var i=0; i<this.word.length; i++) {
			this.letters.push(new letter.Letter(this.word[i]));
		};
	};
	this.gameWon = function() {
		var counter = 0;
		for(var i=0; i<this.letters.length; i++) {
			if(this.letters[i].appear) {
				counter++;
			};
		};
		if(counter == this.letters.length) {
			this.found = true;
		};
		return this.found;
	};
	this.checkLetter = function(guessLetter) {
		var position = 0;
		for (var i=0; i<this.letters.length; i++) {
			if(this.letters[i].character == guessLetter) {
				this.letters[i].appear = true;
				position++;
			};
		};
		return position;
	};
	this.showWord = function() {
		var str = "";
		for(var i=0; i<this.letters.length; i++) {
			str += this.letters[i].showLetter();
		};
		return str;
	};
};

exports.Word = Word;