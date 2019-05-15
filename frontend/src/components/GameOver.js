import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class GameOver extends Component {
    render() {

        // Redirects
        // If there's no user A, redirect to home screen
        if (this.props.user_a_name === "") { return <Redirect to="/" /> }

        return (
            <div className="console__wrapper">

                <nav className="tabs">
                    <a className="tab selected" href="#0">Game Over</a>
                </nav>

                <h2 className="comment">/* We have a winner! */</h2>

                <p className="var">Winner <span className="operator">=</span> <span className="string">'{ this.props.user_a_score === 3 ? 'A' : 'B' }'</span></p>

                <p className="param">{ this.props.user_a_name }.score <span className="operator">=</span> <span className="num">{ this.props.user_a_score }</span> <span className="comment">{ this.props.is_user_a ? '// You' : '' }</span></p>

                <p className="param">{ this.props.user_b_name }.score <span className="operator">=</span> <span className="num">{ this.props.user_b_score }</span> <span className="comment">{ this.props.is_user_b ? '// You' : '' }</span></p>

                <p>&nbsp;</p>

                <p className="comment">// GAME DETAILS</p>

                <p className="var">Round <span className="operator">=</span> <span className="num">{ this.props.round }</span></p>

                <p className="var">Game ID <span className="operator">=</span> <span className="param">{ this.props.game_id }</span></p>

                {/*
                <form onSubmit={(event) => {this.props._onRematch(event)}} method="">
                    <button className="btn">Rematch</button>
                </form>
                */}

                <div className="btn"><Link to="/">Back to start &rarr;</Link></div>

            </div>
        );
    }
}

export default GameOver;