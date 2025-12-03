import { gql } from '@apollo/client';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $name: String!
    $email: String!
    $phoneNumber: String  # Use String! if you want to make this mandatory on the backend
    $companyName: String! # Updated from 'social'
    $role: String!        # Updated from 'company'
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