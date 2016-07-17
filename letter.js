var Letter = function(char) {
	this.character = char.toLowerCase();
	this.appear = false;
	this.showLetter = function() {
		if(this.appear) {
			return this.character;
		} else if(this.character == " ") {
			this.appear = true;
			return " " + this.character + " ";
		} else {
			return "_ ";
		};
	};
};
exports.Letter = Letter;