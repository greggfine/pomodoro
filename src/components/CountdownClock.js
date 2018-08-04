import React, { Component } from 'react';

class CountdownClock extends Component {
	constructor(props){
		super(props);

		this.state = {
			now: Date.now(),
			countdown: 0

		}

		this.handleClock = this.handleClock.bind(this)
		this.pauseClock = this.pauseClock.bind(this)
	}



	handleClock(then){
		this.interval = setInterval(() => {
			this.setState({
				countdown: then - Date.now()
			})
		}, 1000)
	}

	pauseClock(){
		clearInterval(this.interval);
	}
 	

	render(){
		const { minutes, seconds } = this.state;
		let then = this.state.now + 2 * 1000
		return(
			<div style={{ textAlign: 'center'}}>
		
				<h1> { this.state.now } / { then } </h1>
			{/* <h1> { this.state.countdown } </h1> */}
				<button onClick={this.handleClock(then)}>Play</button>
				<button onClick={this.pauseClock}>Pause</button>
			</div>
		)
	}
}


export default CountdownClock;