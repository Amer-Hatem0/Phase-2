import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      role
    }
  }
`;


export const GET_CHAT_HISTORY = gql`
  query GetChatHistory($receiverId: ID!) {
    getChatHistory(receiverId: $receiverId) {
      message
      timestamp
      sender {
        id
        username
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($receiverId: ID!, $message: String!) {
    sendMessage(receiverId: $receiverId, message: $message) {
      message
      timestamp
    }
  }
`;

export const GET_MY_TASKS = gql`
  query GetMyTasks {
    getMyTasks {
      id
      title
      description
      status
      dueDate
      project {
        id
        title
      }
      assignedTo {
        id
        username
      }
    }
  }
`;

