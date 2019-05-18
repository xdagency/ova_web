import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import Start from './components/Start';
import Setup from './components/Setup';
import Word from './components/Word';
import Play from './components/Play';
import Blank from './components/Blank';
import Toast from './components/Toast';
import GameOver from './components/GameOver';
// import Redirect from 'react-router-dom/Redirect';

// const socket = io('https://ovagame.herokuapp.com');
const socket = io('http://localhost:8081');

class App extends Component {

  constructor() {
      super();
      this.state = {
          
          /* Config */
          // serverUrl: 'https://ovagame.herokuapp.com',
          serverUrl: 'http://localhost:8081',

          /* Redirects */
          redirectSetup: false,
          redirectWord: false,
          redirectPlay: false,
          redirectEnd: false,

          /* Game State */
          game_id: '',
          game_round: 1,
          letter_count: 4,

          /* Error Handling */
          validWordClass: '',
          showToast: false,
          toastContent: '',
          playerDropped: false,

          /* User States */
          is_user_a: false,
          is_user_b: false,
          
          user_a_name: '',
          user_a_score: 0,
          user_a_word: '',
          user_a_sWord: '',
          
          user_b_name: '',
          user_b_score: 0,
          user_b_word: '',
          user_b_sWord: ''
      }
  }


  /////////////////////////
  // COMPONENT DID MOUNT
  /////////////////////////

  componentDidMount() {

    console.log('-_-; well, this is embarrassing');

    // We are connected now
    socket.on('connect', () => {
    });


    // When user B joins, send their name to Word Scene for user A
    // Via the player-join socket
    socket.on('player-join', (data) => {

        this.setState({
            user_b_name: data.user_b_name,
            redirectWord: true
        });

    });

    
    // When both users have submitted a valid word, game (i.e. round) is started
    socket.on('game-start', (data) => {

        // Update state with the data from both players 
        // and redirect users to play screen
        this.setState({
            user_a_sWord: data.user_a_word,
            user_b_sWord: data.user_b_word,
            redirectWord: false,
            redirectPlay: true
        });

        // console.log('Game start fired!');

    });

    
    // User has guessed a wrong answer
    socket.on('wrong', () => {
        
        // window.alert('wrong guess');
        this.showToast('Wrong guess!');

    });


    // Check if a player has dropped
    // NOTE: Word.js is the only screen where we are checking if a player has dropped or not
    socket.on('player-drop', (data) => {

        this.setState({
            playerDropped: true,
            redirectSetup: false,
            redirectWord: false,
            redirectPlay: false
        })

    })


    // When a user has guessed correctly
    // but does not have enough points to end the game
    socket.on('round-end', (data) => {
        
        // console.log('Round end fired');

        // redirect back to word selection
        this.setState({
            game_round: data.game_round,
            letter_count: data.letter_count,
            user_a_score: data.user_a_score,
            user_b_score: data.user_b_score,
            redirectWord: true,
            redirectPlay: false,
            validWordClass: ''
        });

    });

    // When game is over...
    socket.on('game-over', (data) => {
        
        // console.log('GAME IS OVER!', data);

        // Update the game state
        this.setState({
            user_a_score: data.game.user_a.score,
            user_b_score: data.game.user_b.score,
            redirectEnd: true
        }, () => {

            // Only send game state to be saved if user is user A
            // So that duplicates of game state don't get sent
            if (this.state.is_user_a) {
                
                // The game state to send to backend to save in DB
                let gameState = {
                    game_id: this.state.game_id,
                    user_a_name: this.state.user_a_name,
                    user_b_name: this.state.user_b_name,
                    user_a_score: this.state.user_a_score,
                    user_b_score: this.state.user_b_score
                }
        
                axios.post(this.state.serverUrl + '/save-game', gameState)
                    .then(result => {
                        // Do nothing with the result
                    })
                    .catch(error => {
                        console.log('Send Game State Error:', error);
                    });
            }

        });

    });

    // When a rematch is initiated
    socket.on('start-rematch', (data) => {

        // reset game state and redirect back to word selection
        this.setState({
            game_round: 1,
            letter_count: 4,
            user_a_score: data.user_a_score,
            user_b_score: data.user_b_score,
            redirectEnd: false,
            redirectWord: true
        });

    });

  }


  /////////////////////////
  // START GAME
  /////////////////////////

  _onStartGame = (event, nickname) => {

        event.preventDefault();

        // stop function if name is blank
        // TODO: create error state for user when nickname blank
        // NOTE: using 'required' attribute to make nickname field required
        if (nickname === "") { 
            // console.log('ERR: nickname was blank');
            return; 
        }

        // User has actioned a new game so they will be 'USER A'
        // Set the state for userA
        this.setState({
            // reset the playerDropped flag and player 2 variables 
            // in case this is the user that didn't drop and still in same session 
            // and start a new game
            playerDropped: false, 
            game_round: 1, 
            letter_count: 4, 
            user_b_name: '', 
            user_b_score: 0,
            is_user_a: true, 
            user_a_name: nickname, 
            user_a_score: 0
        }, () => {

            // on the setState callback
            // emit this new game to the backend socket to create a new game object in array
            socket.emit('create-game', { nickname: nickname })

            // when server sends a 'game-info' emit...
            socket.on('game-info', (data) => {
                
                // console.log(data);

                // Update state with the game ID and redirect user to 'setup' screen
                this.setState({
                    game_id: data.game_id,
                    redirectSetup: true
                });

            });

        });

  }


  /////////////////////////
  // JOIN GAME
  /////////////////////////

  _onJoinGame = (event, nickname, game_id) => {

        event.preventDefault();

        // stop function if name is blank
        // TODO: create an error state for user when then try to enter a blank game ID
        // NOTE: using 'required' attribute to make nickname field required
        if (nickname === "") { 
            
            // console.log('ERR: nickname was blank');
            return; 
        }

        // User has actioned a join game so they will be 'USER B'
        // Set the state for userB
        this.setState({
            game_id: game_id.toUpperCase(),
            is_user_b: true,
            user_b_name: nickname
        }, () => {

            // on the setState callback
            // emit this new game to the backend socket to create a new game object in array
            socket.emit('join-game', { game_id: game_id.toUpperCase(), nickname: nickname })

            // when server sends a 'game-info' emit...
            socket.on('game-status', (data) => {
                
                // console.log(data);

                // check if game is full or not
                if (data.game === 'full') {
                    
                    // show toast error
                    this.showToast('Sorry, this game is full');
                
                // otherwise update the state with user A's name and redirect to /word
                } else {

                    // console.log(data);
                    this.setState({
                        user_a_name: data.user_a_name,
                        redirectWord: true
                    });

                }

            });

        });
      
  }


  /////////////////////////
  // CHOOSE WORD
  /////////////////////////

  _onChooseWord = (event, word) => {

        event.preventDefault();

        // First check if it's long enough
        // Word must be the correct length for the round
        if (word.length < this.state.letter_count) {
            
            this.showToast('Word is too short.');

            return;

        }

        // The word we are checking the dictionary API for
        let wordToCheck = {
            word: word
        }

        // send word to back end and see if it's legal
        axios.post(this.state.serverUrl + '/word', wordToCheck)

            // If it's a legal word
            .then(result => {
                
                // window.alert('Valid word');

                // Set a classname to display the overlay when word is valid
                // to 'lock in' word
                this.setState({
                    validWordClass: 'block'
                })

                // Emit back to backend the chosen word
                socket.emit('submit-word', { game_id: this.state.game_id, word: word })
            })

            // Or if the word is not legal, show an error
            .catch(error => {
                
                this.showToast('That is not a valid word.');

            });

  }


  /////////////////////////
  // GENERATE WORD
  /////////////////////////

  // This function lives in Word.js


  /////////////////////////
  // MAKE A GUESS
  /////////////////////////

  _onGuess = (event, guess, user) => {

        event.preventDefault();

        // hit the guess socket to send a user's guess to backend
        socket.emit('guess', {
            game_id: this.state.game_id,
            guess: guess,
            user: user
        });

        
        // See above guess.on socket function for return of sent guess

  }


  /////////////////////////
  // INITIATE A REMATCH
  /////////////////////////

  _onRematch = () => {

        // Send a rematch emit to the backend with the game ID
        socket.emit('rematch', {
            
            game_id: this.state.game_id

        });

        // Check socket.on('start-rematch) for function to begin the rematch

  }


  /////////////////////////
  // SHOW TOAST
  /////////////////////////

  showToast = (content) => {

        // first show the toast and its content
        this.setState({

            showToast: true,
            toastContent: content

        }, () => {

            // then after setting the state
            // timeout 3.5 seconds (duration of toast)
            // then clear the class for another potential toast error
            setTimeout(function() {

                this.setState({
                    showToast: false
                });
                
            }.bind(this), 3500);

        });

  }



  render() {

    return (
      <div className="app">

        <header className="main">
            <figure className="brand">Ova</figure>
        </header>

        <header className="console__header"></header>

        <main className="console">

          <Switch>
              
              <Route path="/" exact render={(props) => { 
                  return <Start match={props.match} 
                                location={props.location} 
                                _onStartGame={this._onStartGame} 
                                _onJoinGame={this._onJoinGame} 
                                gameIsFullClass={this.state.gameIsFullClass} 
                                redirectSetup={this.state.redirectSetup} 
                                redirectWord={this.state.redirectWord} /> }} />

              <Route path="/setup" render={(props) => { 
                  return <Setup match={props.match} 
                                game_id={this.state.game_id} 
                                showToast={this.showToast} 
                                serverUrl={this.state.serverUrl} /> }} />

              <Route path="/word" render={(props) => { 
                  return <Word match={props.match} 
                               serverUrl={this.state.serverUrl} 
                               game_id={this.state.game_id} 
                               round={this.state.game_round} 
                               letterCount={this.state.letter_count} 
                               _onGenerateWord={this._onGenerateWord} 
                               _onChooseWord={this._onChooseWord} 
                               is_user_a={this.state.is_user_a} 
                               is_user_b={this.state.is_user_b} 
                               user_a_name={this.state.user_a_name} 
                               user_b_name={this.state.user_b_name} 
                               user_a_score={this.state.user_a_score} 
                               user_b_score={this.state.user_b_score} 
                               validWordClass={this.state.validWordClass} 
                               inValidWordClass={this.state.inValidWordClass} 
                               playerDropped={this.state.playerDropped} 
                               redirectPlay={this.state.redirectPlay} /> }} />

              <Route path="/play" render={(props) => { 
                  return <Play match={props.match} 
                               _onGuess={this._onGuess} 
                               serverUrl={this.state.serverUrl} 
                               game_id={this.state.game_id} 
                               round={this.state.game_round} 
                               letterCount={this.state.letter_count} 
                               is_user_a={this.state.is_user_a} 
                               is_user_b={this.state.is_user_b} 
                               user_a_name={this.state.user_a_name} 
                               user_b_name={this.state.user_b_name} 
                               user_a_score={this.state.user_a_score} 
                               user_b_score={this.state.user_b_score} 
                               user_a_sWord={this.state.user_a_sWord} 
                               user_b_sWord={this.state.user_b_sWord} 
                               redirectWord={this.state.redirectWord} 
                               redirectEnd={this.state.redirectEnd} /> }} />

               <Route path="/game-over" render={(props) => { 
                  return <GameOver match={props.match} 
                               serverUrl={this.state.serverUrl} 
                               game_id={this.state.game_id}  
                               round={this.state.game_round} 
                               user_a_name={this.state.user_a_name} 
                               user_b_name={this.state.user_b_name} 
                               user_a_score={this.state.user_a_score} 
                               user_b_score={this.state.user_b_score} 
                               _onRematch={this._onRematch} /> }} />

              {/* <Route path="/game/:game_id" /> */}
              
              {/* Catch all */}
              <Route component={Blank} />

          </Switch>

          <Toast showToast={this.state.showToast} toastContent={this.state.toastContent} />

          </main>

      </div>
    );
  }

}

export default App;
