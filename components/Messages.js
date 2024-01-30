import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

export default function Messages(){
    const[messages, setMessages] = useState([]);

    useEffect(()=>{
        axios.get('/api/admin').then(response=>{
            setMessages(response.data);
            console.log(response.data);
        })
    }, [])
    return(
        <>
            <Navbar/>
            <table className="basic mt-2">
                <thead>
                    <tr>UserID</tr>
                    <tr>Time(UTC)</tr>
                    <tr>Message</tr>
                    <tr>Status</tr>
                </thead>
                <tbody>
                    {messages.map((message)=>(
                        <tr key={message._id}>
                        <td>{message['User ID']}</td>
                        <td>{message['Timestamp (UTC)']}</td>
                        <td>{message['Message Body']}</td>
                        <td>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                        Pending
                        </td>
                        <td>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
</svg>
Reply
</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}