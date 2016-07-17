var prompt = require('prompt');
var inquirer = require('inquirer');
var figlet = require('figlet');
var Word = require('./word');
var Game = require('./game');

prompt.start();

game = {
	words: Game.Game.words,
	guessedLetters: [],
	roundsWon: 0,
	guessesRemaining: 10, 
	currentWord: null, 
	startGame: function (wrd){
		this.guessedLetters = [];
		this.resetGuesses();
		this.currentWord = new Word.Word(this.words[Math.floor(Math.random()* this.words.length)]);
		this.currentWord.getLetters(); //populate currentWord (made from Word constructor function) object with letters
		figlet('Full Stack', function(err, data) {
		    if (err) {
		        console.log('Something went wrong...');
		        console.dir(err);
		        return;
		    };
		    console.log(data)
		});
		figlet('Hangman', function(err, data) {
		    if (err) {
		        console.log('Something went wrong...');
		        console.dir(err);
		        return;
		    };
		    console.log(data)
		});
	    console.log(this.currentWord.showWord() + '\n');
		this.consolePrompt();
	}, 
	resetGuesses : function(){
		this.guessesRemaining = 10;
	},
	consolePrompt : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
		  if(result.guessLetter.charCodeAt() >= 97 && result.guessLetter.charCodeAt() <= 122 && result.guessLetter.length == 1) {  
		    console.log('Letter guessed: ' + result.guessLetter);
		    var numUserGuesses = self.currentWord.checkLetter(result.guessLetter);
		    if (numUserGuesses == 0){
			    if(self.guessedLetters.indexOf(result.guessLetter) < 0) {
    				self.guessedLetters.push(result.guessLetter);
    				self.guessesRemaining--;
			    	console.log('You guessed wrong!');
  			    	console.log('Number of guesses remaining: ', self.guessesRemaining);
				    console.log(self.currentWord.showWord() + '\n');
				    console.log('Used Letters: ' + self.guessedLetters);
			    } else {
			    	console.log('You already used that letter.  Try again.');
			    };
		    } else {
		    	if(self.guessedLetters.indexOf(result.guessLetter) < 0) {
    				self.guessedLetters.push(result.guessLetter);
			    	console.log('You guessed right!');
  			    	console.log('Number of guesses remaining: ', self.guessesRemaining);
				    console.log(self.currentWord.showWord() + '\n');
				    console.log('Used Letters: ' + self.guessedLetters);
			    } else {
			    	console.log('You already used that letter.  Try again.');
			    };
	    		if(self.currentWord.gameWon()) {
			    	figlet(self.currentWord.word, function(err, data) {
					    if (err) {
					        console.log('Something went wrong...');
					        console.dir(err);
					        return;
					    };
					    console.log(data)
					});
					figlet('You Win!!!', function(err, data) {
					    if (err) {
					        console.log('Something went wrong...');
					        console.dir(err);
					        return;
					    };
					    console.log(data)
					});
					figlet('Play Again!', function(err, data) {
					    if (err) {
					        console.log('Something went wrong...');
					        console.dir(err);
					        return;
					    };
					    console.log(data)
					});
					
			    	inquirer.prompt([
			    		{
			    			type: "confirm",
			    			message: "Would you like to play again?",
			    			name: "play"
			    		}
		    		]).then(function(answers) {
		    			if(answers.play) {
		    				self.startGame();
		    			} else {
		    				return;
		    			};
		    		});
			    };
		    };
		    
		    if ((self.guessesRemaining > 0) && (self.currentWord.found == false)){
		    	self.consolePrompt();
		    } else if(self.guessesRemaining == 0){
		    	figlet('You Lose :(', function(err, data) {
				    if (err) {
				        console.log('Something went wrong...');
				        console.dir(err);
				        return;
				    };
				    console.log(data)
				});
				figlet(self.currentWord.word, function(err, data) {
				    if (err) {
				        console.log('Something went wrong...');
				        console.dir(err);
				        return;
				    };
				    console.log(data)
				});
				figlet('Play Again!', function(err, data) {
				    if (err) {
				        console.log('Something went wrong...');
				        console.dir(err);
				        return;
				    };
				    console.log(data)
				});
		    	inquirer.prompt([
			    		{
			    			type: "confirm",
			    			message: "Would you like to play again?",
			    			name: "play"
			    		}
		    		]).then(function(answers) {
		    			if(answers.play) {
		    				self.startGame();
		    			} else {
		    				return;
		    			};
	    		});
		    };
		  } else {
		  	console.log("Please enter a valid letter");
		  	self.consolePrompt();
		  };
		});
	}
};

game.startGame();