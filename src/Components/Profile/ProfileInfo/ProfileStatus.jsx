import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status:e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        //prevState - предыдущий state. Все эти параметры по умолчанию забились.
        if(prevProps.status !== this.props.status) { //setState лучше оборачивать в if, может зациклится из-за изменений.
            this.setState({
                status: this.props.status
            })
        }
        // let a = this.state; // тут можем достучаться к актуальным state.
        // let b = this.props; // тут можем достучаться к актуальным props.
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '---'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode}
                               value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;