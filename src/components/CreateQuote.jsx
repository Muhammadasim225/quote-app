import { useMutation } from '@apollo/client';
import React, { useState , useEffect } from 'react'
// import { create_quote } from '../gqloperations/mutations';
import { create_quote } from '../gqloperations/mutations'
import { get_all_quote } from '../gqloperations/queries';
import { useNavigate } from 'react-router-dom';

const CreateQuote = () => {
  const navigate=useNavigate();

    const [quote,setQuote]=useState("");
    const [createlyQuote,{error,loading,data}]=useMutation(create_quote,{
      refetchQueries: [
        { query: get_all_quote },
      ]
    });

    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate('/login');
      }
    }, [navigate]);
   



    if(error){
      console.log(error.message);
    }
    else if(loading){
      return <h5>Loading...</h5>
    }
    if(data){
      console.log(data);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        createlyQuote({
          variables:{
            name:quote
            

          }
        });

    }
  return (
    <div className="container container">
      {
        error &&
        <div className="red card-panel">{error.message}</div>
      }
        {
        data &&
        <div className="green card-panel">{data.createQuote}</div>
      }
        <form onSubmit={handleSubmit}>
        <input type="text" name="quote" id="quote" value={quote} onChange={e=>setQuote(e.target.value)}        
        placeholder="Write your quote here"
 />
 <button type='submit' className="btn green">Create

 </button>

        </form>
       

    </div>
  )
}

export default CreateQuote