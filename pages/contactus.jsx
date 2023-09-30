import React, { useState } from "react";
import styles from "@/styles/Contact.module.css";
const Contactus = () => {



  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(name, email, phone, msg);
    const data={name,phone,email,msg};
    try {
      if(!name || !phone || !email || !msg){
        alert('fill all fields to continue')
        return;
      }
      const resp=await fetch("http://localhost:3000/api/postcontact",{
      method:'POST',
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify(data)
    })

    if(resp.ok){
      console.log("data submitted")
      alert('Thanks for contacting, We\'ll get back to you soon' )
      setEmail('')   
      setMsg('')
      setName('')
      setPhone('')
    }
    else{
      console.log("error")
      alert('Some Error Occured')
     
    }
    } catch (error) {
      console.log("some error")
      alert("Error , check your fields")
      
    }
    

  };




  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "msg") {
      setMsg(e.target.value);
    }
  };

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [msg, setMsg] = useState();
  return (
    <div className={styles.container}>
      <h1 style={{textAlign:'center'}}>Contact Us</h1>
      <form className={styles.container} style={{textAlign:'justify'}}>
     
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formLabel}>
            Enter your name
          </label>
          <input
            className={styles.input}
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formLabel}>
            Enter your Email
          </label>
          <input
            type="email"
            className={styles.input}
            id="email"
            value={email}
            onChange={handleChange}
            aria-describedby="emailHelp"
            name="email"
            required
          />
          <div id="emailHelp" style={{fontSize:'80%', marginTop:'3px'}} className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formLabel}>
            Enter your phone number
          </label>
          <input
            className={styles.input}
            type="number"
           
            value={phone}
            onChange={handleChange}
            id="phone"
            name="phone"
            required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="msg" className={styles.formLabel}>
            Enter your Message
          </label>
          <textarea
            name="msg"
            id="msg"
            cols="30"
            rows="10"
            className={styles.input}
            value={msg}
            required
            onChange={handleChange}
            placeholder="Write your message here"
          ></textarea>
        </div>
        <div className={styles.btnwrap}>

        <button
          type="submit"
          onClick={handleSubmit}
          className={styles.btn}
        >
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default Contactus;
