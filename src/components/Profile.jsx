import { useQuery } from '@apollo/client'
import React from 'react'
import { getMyProfile } from '../gqloperations/queries';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const navigate=useNavigate();

  if(!localStorage.getItem("token")){
    navigate('/login')
    return <h1>Unauthorized Access</h1>
  }


  const {error,loading,data}=useQuery(getMyProfile, {
    fetchPolicy: "network-only", // always fetch fresh data
  });

 
  if (loading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    console.log("Sweston",error);
  }
  if (!data || !data.ppf) return <p>No profile found</p>;

  
  return (
    <div className='container my-container'>

    <div className="center-align">
    <img className='circle' style={{border:"2px solid",marginTop:"10px"}} src={`https://robohash.org/${data.ppf.firstname}`} alt="" />
    <h5>{data.ppf.firstname} {data.ppf.lastname}</h5>
    <h6>Email - {data.ppf.email} </h6>
    </div>
<h3>Your Quotes</h3>
{
data.ppf.quotes.map((d,index)=>{
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
      
  )
}

export default Profile