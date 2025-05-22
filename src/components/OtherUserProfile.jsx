import { useQuery } from '@apollo/client'
import React from 'react'
import { getUserById } from '../gqloperations/queries';
import { useParams } from 'react-router-dom';
const OtherUserProfile = () => {
    const {userId}=useParams()
  const {error,loading,data}=useQuery(getUserById,{
    variables:{
        userId:userId
    }
  })

 
  if (loading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    console.log(error.message);
  }
  
  return (
    <div className='container my-container'>

        <div>
            <div className="center-align">
            <img className='circle' style={{border:"2px solid",marginTop:"10px"}} src={`https://robohash.org/${data.user.firstname}`} alt="" />
            <h5>{data.user.firstname} {data.user.lastname}</h5>
            <h6>Email - {data.user.email} </h6>
            </div>
       <h3>Your Quotes</h3>
       {
        data.user.quotes.map((d,index)=>{
          return(
            <div key={index}>
          <blockquote>
          <h6>{d.name}</h6>
      </blockquote>
      </div>
          )
        })
       }
        </div>
    </div>
  )
}

export default OtherUserProfile