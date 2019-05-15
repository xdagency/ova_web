import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Blank extends Component {
    render() {
        return (
            <div className="console__wrapper">

                <nav className="tabs">
                    <a className="tab selected" href="#0">404</a>
                </nav>

                <p className="comment">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;|&nbsp;&nbsp;&nbsp;,-~&nbsp;/<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Y&nbsp;:|&nbsp;&nbsp;//&nbsp;&nbsp;/<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;jj&nbsp;/(&nbsp;.^<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>-"~"-v"<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Y<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jo&nbsp;&nbsp;o&nbsp;&nbsp;&nbsp;&nbsp;|<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&nbsp;~T~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;j<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>._-' _./<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;"~"&nbsp;&nbsp;|<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_,&nbsp;&nbsp;|<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/|&nbsp;;-"~ _&nbsp;&nbsp;l<br />
&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;l/&nbsp;,-"~&nbsp;&nbsp;&nbsp;&nbsp;\<br />
&nbsp;&nbsp;&nbsp;&nbsp;\//\/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.-&nbsp;\<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Y&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;Y<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;l&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;!<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_\&nbsp;&nbsp;&nbsp;&nbsp;/"\<br />
&nbsp;&nbsp;&nbsp;&nbsp;("&nbsp;~----(&nbsp;~&nbsp;&nbsp;&nbsp;Y.&nbsp;&nbsp;)<br />
~~~~~~~~~~~~~~~~~~~~~~~~~
                </p>
                
                <h2 className="comment">/&ast; Hmmmm... can't seem to find that page &ast;/</h2>

                <div className="btn"><Link to="/">Go to start &rarr;</Link></div>

            </div>
        );
    }
}

export default Blank;