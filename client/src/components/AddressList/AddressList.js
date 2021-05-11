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
        window.location.reload(false);
    };

    const [newUserContact, setNewUserContact] = useState('');

    const updateUserContact = (id) => {

        axios.put("http://localhost:5000/updatecontact", {
            id: id,
            newUserContact: newUserContact,
        });
        window.location.reload(false);
    };

    const deleteUser = (id) => {

        axios.delete(`http://localhost:5000/delete/${id}`, {
            
        });
        window.location.reload(false);
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
            <form action="">
                <input
                    type="text"
                    placeholder="New User Contact"
                    onChange={(event) => {
                        setNewUserContact(event.target.value);
                    }}
                />
                <button onClick={() => updateUserContact(_id)}>Update</button>
            </form>
            <button onClick={() => deleteUser(_id)}>Delete</button>
            <hr />
        </div>
    );
};

export default AddressList;