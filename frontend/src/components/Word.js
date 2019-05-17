import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class Word extends Component {

    constructor() {
        super();
        this.state = {
            word: ''
        }
    }


    componentDidMount() {

       // document.getElementById("werd").focus();

    }

    /////////////////////////
    // WORD FIELD
    /////////////////////////

    _onWordChange = (event) => {

        // Update state as we type in the word field
        this.setState({
            word: event.target.value
        })
    }


    /////////////////////////
    // GENERATE WORD
    /////////////////////////

    _onGenerateWord = (event) => {

        event.preventDefault();

        // grab a pre-generated word from backend
        axios.get(this.props.serverUrl + '/word?round=' + this.props.round)

            // set the data of the word field to the retrieved word
            .then(result => {
                this.setState({
                    word: result.data.word
                })
            })
            
            // Or throw an error if there is one
            .catch(error => {
                console.log('/api/word error:', error);
            });

    }


    render() {

        // Redirects
        // If there's no user A, redirect to home screen
        if (this.props.user_a_name === "") { return <Redirect to="/" /> }
        // If both users are ready redirect to Play component
        if (this.props.redirectPlay === true) { return <Redirect to="/play" /> }

        return (
            <div className="console__wrapper">

                <nav className="tabs">
                    <a className="tab selected" href="#0">Choose a word</a>
                </nav>

                <p className="comment">/* Choose a { this.props.letterCount }-letter word. Something your opponent will have trouble guessing ;) */</p>

                <form>

                    <label htmlFor="werd" className="var">Your word <span className="operator">=</span></label>
                    <input 
                        type="text" 
                        name="word" 
                        id="werd" 
                        placeholder={'Enter your ' + this.props.letterCount + '-letter word'} 
                        value={this.state.word} 
                        onChange={this._onWordChange} 
                        maxLength={this.props.letterCount} 
                        tabIndex="1" 
                        required />
                    
                    <div className="btn"><button onClick={(event) => { this._onGenerateWord(event) }}>&raquo; Generate a random word instead &laquo;</button></div>

                    <div className="btn btn--function"><button onClick={(event) => { this.props._onChooseWord(event, this.state.word) }}>Submit word() &rarr;</button></div>

                </form>

                <section className="scores">

                    <p>&nbsp;</p>
                    <p className="comment">// GAME DETAILS (First to 3 points wins)</p>
                    <p className="param">
                        { this.props.user_a_name }.score <span className="operator">=</span> <span className="num">{ this.props.user_a_score }</span> <span className="comment">{ this.props.is_user_a ? '// You' : '' }</span><br />
                        { this.props.user_b_name === "" ? 'undefined' : this.props.user_b_name }.score <span className="operator">=</span> <span className="num">{ this.props.user_b_score }</span> <span className="comment">{ this.props.is_user_b ? '// You' : '' }</span>
                    </p>
                    
                    <p>
                        <span className="var">Round</span> <span className="operator">=</span> <span className="num">{ this.props.round }</span><br />
                        <span className="var">Game ID</span> <span className="operator">=</span> <span className="param">{ this.props.game_id }</span>
                    </p>

                </section>


                {/* Page Overlays */}

                <article className="overlay" style={{ display: this.props.validWordClass }}>
                    <section className="overlay__content">
                        <p className="black"><strong>{ this.state.word }</strong> locked in.</p>
                        <p className="black small">Waiting for other players</p>
                    </section>
                </article>

                <article className="overlay" style={{ display: this.props.playerDropped ? 'block' : '' }}>
                    <section className="overlay__content">
                        <p className="black">Opponent has dropped out of the game</p>
                        <p className="black small">You win by forfeit!</p>
                        <p><Link to="/" className="btn btn--function">Start a new game() &rarr;</Link></p>
                    </section>
                </article>

            </div>
        );
    }

}

export default Word;