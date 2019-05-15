import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Setup extends Component {


    /////////////////////////
    // COPY LINK
    /////////////////////////

    _copyLink = (link) => {
        
        // grab the hidden field
        const el = document.getElementById("link");
        
        // select the field
        el.select();
        
        // copy the text in the field
        document.execCommand("copy");
        
        // Toast
        this.props.showToast('Link copied!');
    }


    render() {

        // Redirects
        // If there's no user A, redirect to home screen
        if (this.props.game_id === "") { return <Redirect to="/" /> }

        return (
            <div className="console__wrapper">

                <nav className="tabs">
                    <a className="tab selected" href="#0">Setup</a>
                </nav>
                
                <section className="block">

                    {/* Game details */}
                    <p><span className="var">Game ID</span> <span className="operator">=</span> <span className="param">{ this.props.game_id }</span></p>

                    <p>&nbsp;</p>

                    <p className="comment">/* Send the Game ID to a friend or use the button below to copy the link to email or text. */</p>
                
                    {/* Button to copy game link */}
                    <div className="btn btn--simple"><button onClick={this._copyLink}>&raquo; Copy game link &laquo;</button></div>

                    <p>&nbsp;</p>

                    <p className="comment">/* When you're ready, start playing! */</p>

                    <div className="btn btn--function"><Link to="/word">Start playing() &rarr;</Link></div>

                    {/* Hidden field that contains game link for copying */}
                    <input type="text" defaultValue={'http://localhost:3000/?gid=' + this.props.game_id} id="link" />
                
                </section>

            </div>
        );
    }
}

export default Setup;