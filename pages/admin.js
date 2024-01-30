import Alert from "@/components/Alert";
import Messages from "@/components/Messages";
import Navbar from "@/components/Navbar";
import AdminChat from "@/components/adminchat";
import io from 'socket.io-client';
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import DataPage from "@/components/DataPage";
import JsonData from "@/components/jsonData";

export default function Admin(){
    // const socket = io('http://localhost:3001');
    // const [messages, setMessages] = useState([]);
    // useEffect(()=>{
    //     axios.get('/api/admin').then(response=>{
        
    //         setMessages(response.data)
    //     })
    // }, [])
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    function handleSubmit(e){
        e.preventDefault();
    

        if(password=="Admin-Branch"){
            console.log("Correct Password");
            setLogin(true);
            
        }else{
            console.log("wrong");
            
            alert('Incorrect password');
        }

    }
    return(
        <>
        {!login && 
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://d2c5ectx2y1vm9.cloudfront.net/assets/logo-485b81d3b9c7d0948100d5af0c6add2a27271ae40c65cdb6e98be5907ceaee32.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your Admin Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  onChange={e=>setName(e.target.value)}
                  value={name}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={e=>setEmail(e.target.value)}
                  value={email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={e=>setPassword(e.target.value)}
                  value={password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
              
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
     }
    
    {login && <>

    {/* <AdminChat socket={socket}/> */}
    <div className="flex flex-col flex-1">
    <div>
    <Navbar/>
    
      <div className="flex items-center justify-center gap-2" style={{ position: 'absolute', top: 10, right: 10 }}>
    
        <img src="https://th.bing.com/th/id/OIP.5n41jHLjCl7Fk1NBVLkepgHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Avatar" width={40} height={40} />
        <h1>Welcome, {name}!</h1>
      </div>
    </div>
    
    {/* <AdminChat/> */}
    <JsonData/>
    </div>
    
    </>}
    
    
    </>
    
  )
}
    
