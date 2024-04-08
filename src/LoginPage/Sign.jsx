import React, { useState } from 'react'
import "./Login.css"
import { auth } from '../Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Sign = () => {
    const [user,setUser] = useState({
        email:'',
        password:''
    });
    const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]:value,

        })


    }

    const handleSubmit =async(e) =>{
        try{
            e.preventDefault();
          const userCredential = await createUserWithEmailAndPassword(auth,user.email,user.password);
          console.log(userCredential);
          localStorage.setItem('userEmail', user.email);
        //   navigate('/')
        //   setNotify("Congrats")
        }catch(err){
          console.log(err)
        }
        setUser({
            email:'',
            password:''
        })
    
      };
       
    
    
  return (
   <>
   <div >
   
  
    <form className='Signup' onSubmit={handleSubmit}>
    <h1>SignUp Page</h1>
   
    <input type="name" placeholder='Enter your Name'  required/>
    <input type="email" name="email" value={user.email} onChange={handleInput} placeholder='Enter your Email' required />
    <input type="password" name="password" value={user.password} onChange={handleInput} placeholder='Password' required />
  <Link to='/'> <button type='submit'>Sign Up</button></Link>
   </form>

   </div>

   </>

   

   
  )
}

export default Sign