import React, { Component } from 'react';

class CountdownClock extends Component {
	constructor(props){
		super(props);

		this.state = {
			minutes: 1,
			seconds: 0,
			sessionLength: 1,
			breakLength: 1,
			playState: false
		}

		this.handleClock = this.handleClock.bind(this)
		this.pauseClock = this.pauseClock.bind(this)
		this.resetClock = this.resetClock.bind(this)
		this.incrementSessionLength = this.incrementSessionLength.bind(this)
		this.decrementSessionLength = this.decrementSessionLength.bind(this)
		this.incrementBreakLength = this.incrementBreakLength.bind(this)
		this.decrementBreakLength = this.decrementBreakLength.bind(this)
		this.handleBreak = this.handleBreak.bind(this)
	}



	handleClock(){
		this.interval = setInterval(() => {
			if(this.state.seconds === 0 && this.state.minutes === 0){
				this.pauseClock()
				this.handleBreak()
				
			} else if(this.state.seconds === 0){
					this.setState({
						seconds: 60
					})
					this.state.minutes -= 1;
			}

			this.setState({
				seconds: this.state.seconds -= 1,
				playState: true
			})
		}, 100)
	}

	handleBreak(){
		this.setState({
			minutes: this.state.breakLength -1,
			seconds: 60,
			playState: true
		})
		this.interval = setInterval(() => {
			if(this.state.seconds === 1 && this.state.minutes === 0){
				this.setState({
					minutes: 1,
					seconds: 0,
					sessionLength: 1,
					playState: true,
				})
				this.handleClock()
			} else if(this.state.seconds === 1){
					this.setState({
						seconds: 60
					})
					this.state.minutes -= 1;
			}
			else{
				this.setState({
					seconds: this.state.seconds -= 1,
					})
				}
			}, 200)
			
	}

	pauseClock(){
		clearInterval(this.interval);
		this.setState({
			playState: false
		})
	}

	resetClock(){
		this.pauseClock()
		this.setState({
			minutes: 1,
			seconds: 0,
			sessionLength: 1,
			playState: false,
			breakLength: 1
		})
	}

	incrementSessionLength(){
		if(this.state.sessionLength < 60 && !this.state.playState){
			this.setState({
				sessionLength: this.state.sessionLength += 1,
				minutes: this.state.sessionLength,
				seconds: 0
			})	
		} 
	}

	decrementSessionLength(){
		if(this.state.breakLength > 1 && !this.state.playState){
			this.setState({
			sessionLength: this.state.sessionLength -= 1,
			minutes: this.state.sessionLength,
			seconds: 0
		})
		} 
		
	}

	incrementBreakLength(){
		if(this.state.breakLength < 60 && !this.state.playState){	
			this.setState({
				breakLength: this.state.breakLength += 1
			})
		}
	}

	decrementBreakLength(){
		if(this.state.breakLength > 1 && !this.state.playState){
			this.setState({
				breakLength: this.state.breakLength -= 1
			})
		}
	}
 	

	render(){
		const { minutes, seconds } = this.state;
		let then = this.state.now + 2 * 1000
		return(
			<div style={{ textAlign: 'center'}}>

				<div>
					<h2>Break Length</h2>
					<button onClick={this.decrementBreakLength}>minus</button>
					<span>{this.state.breakLength}</span>
					<button onClick={this.incrementBreakLength}>plus</button>
				</div>

				<div>
					<h2>Session Length</h2>
					<button onClick={this.decrementSessionLength}>minus</button>
					<span>{this.state.sessionLength}</span>
					<button onClick={this.incrementSessionLength}>plus</button>
				</div>
				<h1> { String(minutes).padStart(2, "0") }:{ String(seconds).padStart(2, '0') }  </h1>
				<button onClick={this.handleClock}>Play</button>
				<button onClick={this.pauseClock}>Pause</button>
				<button onClick={this.resetClock}>Reset</button>
			</div>
		)
	}
}


export default CountdownClock;