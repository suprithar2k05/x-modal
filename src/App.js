import { useState, useRef } from "react";
import "./styles.css";

const INITIAL_FORM = {
  username: "",
  email: "",
  phone: "",
  dob: "",
};
export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isOpen, setModal] = useState(false);
  const modalRef = useRef(null);
  const handleModalClose = (e) => {
    if (e.target !== modalRef.current) return;
    setModal(!isOpen);
    setFormData(INITIAL_FORM);
  };

  const handleModal = (e) => {
    setModal(!isOpen);
    setFormData(INITIAL_FORM);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    const { phone, dob } = formData;
    console.log(new Date(dob));
    let now = new Date();
    e.preventDefault();
    if (phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (new Date(dob) > now) {
      alert("Invalid date of birth. Date of birth cannot be in the future");
    } else {
      setFormData(INITIAL_FORM);
    }
  };

  const { username, email, phone, dob } = formData;
  return (
    <>
      <div className="App">
        <h1>User Details Modal</h1>
        <button onClick={handleModal}>Open Form</button>
      </div>
      {isOpen && (
        <div className="modal" ref={modalRef} onClick={handleModalClose}>
          <div className="modal-content">
            <h1>Fill Details</h1>
            <form onSubmit={submitHandler}>
              <div>
                <label>Username:</label>
                <br />
                <input
                  id="username"
                  name="username"
                  value={username}
                  onChange={changeHandler}
                  type="text"
                  required
                />
              </div>
              <div>
                <label>Email Address:</label>
                <br />
                <input
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  onChange={changeHandler}
                />
              </div>
              <div>
                <label>Phone Number:</label>
                <br />
                <input
                  id="phone"
                  name="phone"
                  value={phone}
                  type="number"
                  onChange={changeHandler}
                />
              </div>
              <div>
                <label>Date of Birth:</label>
                <br />
                <input
                  id="dob"
                  required
                  name="dob"
                  value={dob}
                  type="date"
                  onChange={changeHandler}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
