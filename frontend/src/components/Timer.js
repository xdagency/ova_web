import React, { Component } from 'react';

class Timer extends Component {

    constructor() {
        super();
        this.state = {
            seconds: 5,
            displayTimer: 'block'
        }
    }

    componentDidMount() {

        // set the display back to block
        this.setState({
            displayTimer: 'block'
        })

        // create an interval timer
        let timer = setInterval(() => {

            // if timer is at 1, clear the interval function and hide Timer
            if (this.state.seconds === 1) {
                clearInterval(timer);
                this.setState({
                    displayTimer: 'none'
                })
            }

            // call the countdown function
            this._countdown();

        }, 1000); // 1 second
    }

    _countdown = () => {

        // de-increment seconds by 1
        this.setState({
            seconds: this.state.seconds - 1
        });

    }

    render() {
        return (
            <article className="overlay" style={{ display: this.state.displayTimer }}>
                <section className="overlay__content">
                    <h3 className="large black">{this.state.seconds}</h3>
                </section>
            </article>
        );
    }
}

export default Timer;