import { gql } from '@apollo/client';

// Fragments for reusable fields
export const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    id
    title
    description
    status
    startDate
    endDate
    createdAt
    category {
      id
      name
    }
    createdBy {
      id
      username
    }
    members {
      id
      username
    }
  }
`;

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    username
    role
    universityId
  }
`;

// Queries
export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      ...ProjectFields
    }
  }
  ${PROJECT_FIELDS}
`;

export const GET_ME = gql`
  query GetMe {
    me {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`;

export const GET_STUDENT_OPTIONS = gql`
  query GetStudentOptions {
    getStudentOptions {
      id
      username
    }
  }
`;