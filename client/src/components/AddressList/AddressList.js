import React, { useState } from 'react';
import './AddressList.css'
import axios from 'axios';

const AddressList = (props) => {
    const { _id, userName, userContact } = props.address;

    const [newUserName, setNewUserName] = useState('');

    const updateUserName = (id) => {

        axios.put("http://localhost:5000/update", {
            id: id,
            newUserName: newUserName,
        });
        // window.location.reload(true);
    };

    return (
        <div>
            <h1>{userName} -- {userContact}</h1>
            <form action="">
                <input
                    type="text"
                    placeholder="New Name"
                    onChange={(event) => {
                        setNewUserName(event.target.value);
                    }}
                />
                <button onClick={() => updateUserName(_id)}>Update</button>
            </form>
        </div>
    );
};

export default AddressList;