// ==============================================================
// IMPORT
// ==============================================================
import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import AddressList from './components/AddressList/AddressList';

// ==============================================================
// FUNCTION
// ==============================================================
function App() {

  // ==============================================================
  // POST DATA
  // ==============================================================
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const addToList = () => {
    axios.post("http://localhost:5000/insert", {
      userName: userName,
      userContact: userContact,
    });
    window.location.reload(false);
  };

  // ==============================================================
  // FETCH DATA
  // ==============================================================
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/address")
      .then(res => res.json())
      .then(data => {
        setAddresses(data);
      })
  }, [])

  // ==============================================================
  // SEARCH DATA
  // ==============================================================
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container text-center">
      <h1 className="display-1">Simple Address Book Manager </h1>
      
      {/* ADDRESS FORM */}
      <form action="" className="row g-1">
        <div className="col-md-3">
          <h3><span class="badge bg-dark">Add Addreess Form</span></h3>
        </div>
        <div className="col-md-3">
          <input placeholder="Enter Name Here ... " className="form-control" type="text" name="" id="" onChange={(event) => { setUserName(event.target.value) }} required />
        </div>
        <div className="col-md-3">
          <input placeholder="Enter Contact Number Here ..." className="form-control" type="text" name="" id="" onChange={(event) => { setUserContact(event.target.value) }} required />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={addToList} type="submit">ADD ADDRESS</button>
        </div>
      </form>
      <hr />

      {/* SEARCH INPUT */}
      <input className="form-control" type="text" name="" id="" placeholder="Search Name or Mobile Number Here..." onChange={event => { setSearchTerm(event.target.value) }} />
      <hr />

      {/* DATA FILTERING AND MAPPING */}
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
