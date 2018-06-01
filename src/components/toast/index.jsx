import './style.css'
import React from 'react'
import Notification from './notification.jsx'
let newNotification
let paramsConfig

const setParamsConfig = (params) => {
	if (params) {
		paramsConfig = params;
	}
}

const getNewNotification = () => {
	if (!newNotification) {
		newNotification = Notification.reWrite()
	}
	return newNotification
}
const GetCustom = (type) => {
	let Error = paramsConfig.error;
	// @TODO
	return (
		<div>
			<Error />
		</div>
	)
}

const getDefaultTemple = (icon, content, type) => {
	let iconClassName = 'icon-error';
	if (type == 'success') {
		iconClassName = 'icon-success';
	}
	if (type == 'warning') {
		iconClassName = 'icon-warning'
	}

	return (<div>
		<div className="motor-toast">
			<span>
				<div className="motor-toast-notice">
					<div className="motor-toast-notice-content">
						<div className="motor-toast-text">
							{icon && <i className={`iconfont ${iconClassName}`}></i>}
							{content}
						</div>
					</div>
				</div>
			</span>
		</div>
	</div>)
}


const notice = (content, duration, onClose, type, icon, mask = false) => {

	let notificationInit = getNewNotification()
	notificationInit.notice({
		duration,
		onClose,
		mask,
		content: (paramsConfig) ? GetCustom(icon, content, type) : getDefaultTemple(icon, content, type),
	})
}

export default {
	init(params) {
		setParamsConfig(params);
	},
	info(content, duration, onClose, mask) {
		return notice(content, duration, onClose, 'show', null, mask)
	},
	success(content, duration, onClose, mask) {
		return notice(content, duration, onClose, 'success', 'success', mask)
	},
	warning(content, duration, onClose, mask) {
		return notice(content, duration, onClose, 'warning', 'warning', mask)
	},
	error(content, duration, onClose, mask) {
		return notice(content, duration, onClose, 'error', 'error', mask)
	},
	hide() {
		if (newNotification) {
			newNotification.destory()
			newNotification = null
		}
	}

}




