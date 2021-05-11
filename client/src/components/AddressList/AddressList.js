import React, { useState } from 'react';
import './AddressList.css'
import { axios } from 'axios';

const AddressList = (props) => {
    const { _id, userName, userContact } = props.address;

    

    return (
        <div>
            <div id="update"></div>
            <ul>
                <li>{userName} -- {userContact}</li>

            </ul>
        </div>
    );
};

export default AddressList;