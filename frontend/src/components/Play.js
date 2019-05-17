import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Timer from './Timer';

class Play extends Component {

    constructor() {
        super();
        this.state = {
            inputGuess: '',
            user: '',
            overlayClass: ''
        }
    }

    componentDidMount() {

        // document.getElementById("guess").focus();

        // set which user is guessing
        this.setState({
            user: this.props.is_user_a ? 'a' : 'b'
        })

    }

    _onGuessChange = (event) => {

        // Update state as we type in the guess field
        this.setState({
            inputGuess: event.target.value
        })
    }

    render() {

        // Redirects
        // If there's no user A, redirect to home screen
        if (this.props.user_a_name === "") { return <Redirect to="/" /> }
        // If a user has made a correct guess, redirect both players back to /word with new props
        if (this.props.redirectWord === true) { return <Redirect to="/word" /> }
        // If one player has one redirect to a game over screen
        if (this.props.redirectEnd === true) { return <Redirect to="/game-over" /> }

        return (
            <div className="console__wrapper">

                <nav className="tabs">
                    <a className="tab selected" href="#0">Guess the word</a>
                </nav>

                <p className="comment">/* Try to unscramble the following word before your opponent unscrambles yours :/ */</p>

                <p className="comment">----------</p>
                <h2 className="operator">
                    {this.props.is_user_a ? this.props.user_b_sWord.toUpperCase() : this.props.user_a_sWord.toUpperCase()}
                </h2>
                <p className="comment">----------</p>

                <article className="block">
                    <form>

                        {/* Label and field for user's guess */}
                        <label htmlFor="nickname" className="var">Guess <span className="operator">=</span></label>
                        <input 
                            type="text" 
                            id="guess" 
                            placeholder="Enter your guess" 
                            className="" 
                            value={this.state.inputGuess} 
                            onChange={this._onGuessChange} 
                            tabIndex="1" 
                            required />

                        <div className="btn btn--function"><button onClick={(event) => {this.props._onGuess(event, this.state.inputGuess, this.state.user) }}>Make guess() &rarr;</button></div>

                    </form>
                </article>

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

                <Timer />

            </div>
        );
    }
}

export default Play;