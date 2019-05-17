import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

class Start extends Component {

    constructor() {
        super();
        this.state = {
            inputNickname: '',
            inputGameId: '',
            tab_1: 'active',
            tab_2: 'inactive'
        }
    }

    componentDidMount() {

        document.getElementById("nickname").focus();

        // Get the URL query params
        const urlParams = queryString.parse(this.props.location.search);
        
        // If there's a GID in the URL
        // Set the state to that value to fill in the text input
        if (urlParams.gid !== undefined) {
            this.setState({
                tab_1: 'inactive',
                tab_2: 'active',
                inputGameId: urlParams.gid.toUpperCase()
            });
        }

    }

    // Tie nickname field to the state
    _onNicknameChange = (event) => {
        this.setState({
            inputNickname: event.target.value
        })
    }

    // Tie Game ID field to the state
    _onGameIdChange = (event) => {
        this.setState({
            inputGameId: event.target.value
        })
    }

    tab = (num) => {
        if (num === 1) {
            this.setState({
                tab_1: 'active',
                tab_2: 'inactive'
            })
        } else if (num === 2) {
            this.setState({
                tab_1: 'inactive',
                tab_2: 'active'
            })
        }
    } 

    render() {

        // Redirects
        if (this.props.redirectSetup) { return <Redirect to="/setup" /> }
        if (this.props.redirectWord) { return <Redirect to="/word" /> }

        return (
            <div className="console__wrapper">

                <nav className="tabs">
                    <a className={'tab ' + this.state.tab_1} href="#0" tabIndex="1" onClick={() => { this.tab(1) }}>New Game</a>
                    <a className={'tab ' + this.state.tab_2} href="#0" tabIndex="2" onClick={() => { this.tab(2) }}>Join Game</a>
                </nav>

                {/* Start new game */}
                <article className={'block ' + this.state.tab_1} id="tab_1">

                    <h4 className="subtle small">&uarr; If you're joining a game 2:102</h4>

                    <h1 className="comment">/&#42; Starting a new game? &#42;/</h1>
                        
                    {/* TODO: Turn actions to either start a game or join a game into tabs */}

                    <form onSubmit={(event) => {this.props._onStartGame(event, this.state.inputNickname)}}>

                    {/* Label and field for nickname */}
                    <section className="field__group">
                        <label htmlFor="nickname" className="var">Nickname <span className="operator">=</span> </label>
                        <input 
                            type="text" 
                            id="nickname" 
                            placeholder="Enter a nickname" 
                            className="" 
                            defaultValue={this.state.inputNickname} 
                            tabIndex="3" 
                            onChange={this._onNicknameChange} required />
                    </section>

                    <div className="btn btn--function"><button type="submit" tabIndex="4">Start a new game() &rarr;</button></div>

                    </form>

                </article>

                <article className={'block ' + this.state.tab_2} id="tab_2">

                    <h4 className="subtle small">&larr; Staring a game? 86:112</h4>

                    <form onSubmit={(event) => {this.props._onJoinGame(event, this.state.inputNickname, this.state.inputGameId) }}>

                    <h1 className="comment">/* Joining a game? */</h1>
 
                    {/* Label and field for nickname */}
                    <section className="field__group">
                        <label htmlFor="nickname_alt" className="var">Nickname <span className="operator">=</span> </label>
                        <input 
                            type="text" 
                            id="nickname_alt" 
                            placeholder="Enter a nickname" 
                            className="" 
                            tabIndex="5" 
                            defaultValue={this.state.inputNickname} 
                            onChange={this._onNicknameChange} required />
                    </section>
                    
                    <section className="field__group">
                        <label htmlFor="game_id" className="var">Game ID <span className="operator">=</span> </label>
                        <input 
                            type="text" 
                            id="game_id" 
                            placeholder="Enter game ID" 
                            className="" 
                            tabIndex="6" 
                            defaultValue={this.state.inputGameId} 
                            onChange={this._onGameIdChange} required />
                    </section>

                    {/* Join existing game */}
                    <div className="btn btn--function"><button type="submit" tabIndex="7">Join game() &rarr;</button></div>

                    </form>

                </article>

                <p>&nbsp;</p>

                <p className="comment">
&nbsp;,_,<br />
(.,.)&nbsp;&nbsp;&nbsp;hoot<br />
(&nbsp;&nbsp;&nbsp;)<br />
-"-"--------
                </p>

            </div>
        );
    }

}

export default Start;