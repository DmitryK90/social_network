import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = ({status, updateStatus}) => {
    let [editMode, setEditMode] = useState(false);
    let [newStatus, setStatus] = useState(status);

    useEffect(() => {
        setStatus(status);
    },[status]); // если props.status изменился, то запустится этот useEffect.

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        updateStatus(newStatus);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || '---'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} value={newStatus} autoFocus={true} onBlur={deactivateEditMode}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;