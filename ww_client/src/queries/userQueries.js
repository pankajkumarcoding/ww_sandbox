import { gql } from 'apollo-boost';

// User Sign-Up
const addUserMutation = gql`
  mutation ($name: String!, $pass: String!, $email: String!){
    addUser(name: $name, pass: $pass, email: $email){
      name
      email
    }
  }
`