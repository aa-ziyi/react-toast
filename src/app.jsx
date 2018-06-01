import React, { Component } from 'react'
import Toast from './components/toast/index.jsx'
import PropTypes from 'prop-types';

class Error extends Component {
	static PropTypes = {
		title: '错误',
		content: '错误内容',
	}
	render() {
		return <div>
			<div>错误标题</div>
			<div>错误内容</div>
		</div>
	}
}

export default
	class App extends Component {
	constructor() {
		super()
		this.state = {
			duration: 2000
		}
		// Toast.init({
		// 	error: Error,
		// })
	}


	handleEmit() {
		Toast.info('success', 1000)
	}
	
	handleEmit2() {
		Toast.success('success', 1000)
	}

	render() {
		return (
			<div className="container">
				<div
					className="btn"
					onClick={this.handleEmit.bind(this)}
				>info提示</div>
				<div
					className="btn"
					onClick={this.handleEmit2.bind(this)}
				>成功提示</div>
			</div>
		)
	}
}
