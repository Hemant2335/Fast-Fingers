import React from 'react'
import { useEffect } from 'react'

// Creating a Pragraph

interface Paragraph{
    text : string,
    number_of_words : number, 
}

// Calling the Backend Api call

const getPara = async () : Promise<void> =>{
    const res = await fetch("http://localhost:4000/" , {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    const data : Paragraph = await res.json()
    console.log(data);
}


const Typing = () => {
    useEffect(() => {
        getPara()
    }, [])
  return (
    <div>Typing</div>
  )
}

export default Typing