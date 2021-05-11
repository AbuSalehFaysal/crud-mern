import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import AddressList from './components/AddressList/AddressList';


function App() {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const addToList = () => {
    axios.post("http://localhost:5000/insert", {
      userName: userName,
      userContact: userContact,
    });
  };
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/address")
      .then(res => res.json())
      .then(data => {
        setAddresses(data);
      })
  }, [])
  return (
    <div className="App">
      <h1>Simple Address Book Manager </h1>
      <form action="">
        <label htmlFor="">User Name: </label>
        <input type="text" name="" id="" onChange={(event) => { setUserName(event.target.value) }} required />
        <label htmlFor="">Contact Number: </label>
        <input type="text" name="" id="" onChange={(event) => { setUserContact(event.target.value) }} required />
        <button onClick={addToList} type="submit">Submit</button>
      </form>

      <hr />
      {
        addresses.map(address => <AddressList key={address._id} address={address}></AddressList>)
      }
    </div>
  );
}

export default App;
