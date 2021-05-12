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
    window.location.reload(false);
  };
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/address")
      .then(res => res.json())
      .then(data => {
        setAddresses(data);
      })
  }, [])

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container text-center">
      <h1 className="display-1">Simple Address Book Manager </h1>
      <form action="" className="row g-1">
        <div className="col-md-3">
          <h3><span class="badge bg-dark">Add Addreess Form</span></h3>
        </div>
        {/* <div className="col-md-2">
          <label className="col-form-label" htmlFor="">User Name: </label>
        </div> */}
        <div className="col-md-3">
          <input placeholder="Enter Name Here ... " className="form-control" type="text" name="" id="" onChange={(event) => { setUserName(event.target.value) }} required />
        </div>
        {/* <div className="col-md-2">
          <label className="col-form-label" htmlFor="">Contact Number: </label>
        </div> */}
        <div className="col-md-3">
          <input placeholder="Enter Contact Number Here ..." className="form-control" type="text" name="" id="" onChange={(event) => { setUserContact(event.target.value) }} required />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={addToList} type="submit">ADD ADDRESS</button>
        </div>
      </form>

      {/* <form class="row g-3">
          <div class="col-auto">
            <label for="inputPassword6" class="col-form-label">Password</label>
          </div>
          <div class="col-auto">
            <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" />
          </div>
          <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              Must be 8-20 characters long.
            </span>
          </div>
        </form> */}



      <hr />
      <input className="form-control" type="text" name="" id="" placeholder="Search Name or Mobile Number Here..." onChange={event => { setSearchTerm(event.target.value) }} />
      <hr />
      {
        addresses.filter((val) => {
          if (searchTerm == "") {
            return val;
          } else if (val.userName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val;
          } else if (val.userContact.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val;
          }
        }).map(address => <AddressList key={address._id} address={address}></AddressList>)
      }
    </div>
  );
}

export default App;
