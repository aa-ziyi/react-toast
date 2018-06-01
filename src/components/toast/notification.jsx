import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import Notice from './notice.jsx'

class Notification extends Component {
    constructor() {
        super()
        this.state = {
            notices: [],
            hasMask: true,
            currentNotice: {},
        }
    }
    add(notice) {
        const { currentNotice } = this.state;
        if (currentNotice.key) {
            this.remove(currentNotice.key);
        }
        const key = notice.key ? notice.key : notice.key = new Date().getTime();
        const mask = notice.mask ? notice.mask : false
        this.setState({
            currentNotice: notice,
            hasMask: mask
        })
    }
    remove(key) {
        this.setState((prevState) => ({
            currentNotice: {},
        }))
    }
    get noticeDom() {
        const { currentNotice } = this.state;
        const callback = () => {
            currentNotice.onClose && currentNotice.onClose()
            this.remove(currentNotice.key)
        }
        return <Notice
            key={currentNotice.key}
            {...currentNotice}
            emitCloseToast={callback}
        />
    }
    get maskDom() {
        const { notices, hasMask } = this.state
        if (notices.length > 0 && hasMask === true) {
            return (
                <div className="toast-box-mask"></div>
            )
        }
    }
    render() {
        return (
            <div className="toast-box">
                {this.maskDom}
                {this.noticeDom}
            </div>
        )
    }
}

Notification.reWrite = () => {
    let div
    div = document.createElement('div')
    document.body.appendChild(div)
    const notification = ReactDOM.render(<Notification />, div)
    return {
        notice(propertys) {
            notification.add(propertys)
        },
        remove(key) {
            notification.remove(key)
        },
        destory() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        },
        component: notification
    }
}

export default Notification
