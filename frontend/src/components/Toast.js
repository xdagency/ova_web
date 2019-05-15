import React, { Component } from 'react';

class Toast extends Component {
    render() {
        return (
            <div>
                <figure className={ this.props.showToast === true ? 'toast show' : 'toast' }>
                    {this.props.toastContent}
                </figure>
            </div>
        );
    }
}

export default Toast;