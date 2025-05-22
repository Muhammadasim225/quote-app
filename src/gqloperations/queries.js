import {gql} from '@apollo/client'
export const get_all_quote=gql`query getAllQuotes{
  quotes{
    by{
      _id
      firstname
    }
    name
}
  
}`

export const getMyProfile=gql
  `query getMyProfile{
  ppf:myProfile{
    _id
    firstname
    lastname
    email
    quotes{
      name
    }
    
  }
}`


  export const getUserById=gql
  `query getUserById($userId:ID!){
  user(_id:$userId){
    _id
    firstname
    lastname  
    email
    quotes{
      by
      name
    }
  }
}`