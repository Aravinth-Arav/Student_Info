import React, { useState } from "react";
import "./form.css";
import { Link } from "react-router-dom";
import axios from 'axios';


export function Form() {

  const [userData, setUserData] = useState({
    id: '',
    full_name: '',
    age: '',
    email: '',
    department: '',
    phone_number: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send user data to the API endpoint
    axios.post('http://localhost:3017/addStudent', userData)
      .then(response => {
        console.log('Data successfully submitted:', response.data);
        // Clear form fields after successful submission
        setUserData({
          id: '',
          full_name: '',
          age: '',
          email: '',
          department: '',
          phone_number: '',
        });
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

    return (
        <>
            <div className=" container m-auto text-center col-lg-6 col-md-6">
                <form className="p-4" onSubmit={handleSubmit}>
                    <h3 className="text-center p-1 col-lg-9 col-md-9 col-12 text-warning">Student Information</h3>
                    <input type="int" placeholder="Student_Id" id="id" onSubmit={handleChange} className="m-3 text-center col-12 col-lg-6 col-md-6 col-12 col-lg-6 col-md-6 input_reg p-2" /><br>
                    </br>
                    <input type="text" placeholder="Name" id="name" onSubmit={handleChange} className="m-3 text-center col-12 col-lg-6 col-md-6 input_reg  p-2" /> <br>
                    </br>
                    <input type="int" placeholder="Age" id="age" onSubmit={handleChange} className="m-3 text-center col-12 col-lg-6 col-md-6 col-12 col-lg-6 col-md-6 input_reg p-2" /><br>
                    </br>
                    <input type="email" placeholder="E-mail" id="email" onSubmit={handleChange} className="m-3 text-center col-12  col-lg-6 col-md-6 input_reg  p-2" /><br>
                    </br>
                    <input type="text" placeholder="Department" id="department" onSubmit={handleChange} className="m-3 text-center col-6 col-lg-6 col-md-6  input_reg  p-2" /><br>
                    </br>
                    <input type="int" placeholder="Number" id="phone_number" onSubmit={handleChange} className="m-3 text-center col-6 col-lg-6 col-md-6  input_reg  p-2" /><br>
                    </br>
                    <Link to='/details'><button type="submit" className=" bg-info mx-auto text-light m-4 text-center col-6 col-lg-6 col-md-6 p-2 sub_form">Submit</button></Link>
                    

                </form>
            </div>
        </>
    );
}