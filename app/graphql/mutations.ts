import { gql } from '@apollo/client';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $name: String!
    $email: String!
    $phoneNumber: String  
    $companyName: String! 
    $role: String!       
    $service: String!
    $message: String!
  ) {
    createMessage(
      name: $name
      email: $email
      phoneNumber: $phoneNumber
      companyName: $companyName
      role: $role
      service: $service
      message: $message
    ) {
      id
      name
      email
      phoneNumber
      companyName
      role
      service
      message
      createdAt
    }
  }
`;