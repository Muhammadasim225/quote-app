import {gql} from '@apollo/client'
export const create_signup=gql`
mutation createUser($userNnew:UserInput!){
  user:signupUser(userNnew:$userNnew){
  firstname
  }
}
`
export const get_login=gql`
mutation LoginUser($userSignIn:loginUserInput!){
  loginUser(userSignIn:$userSignIn){
    token
  }
}`
export const create_quote=gql`
mutation creationOfQuote($name:String!){
  createQuote(name:$name)
}`
