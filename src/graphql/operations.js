import { gql } from '@apollo/client';
// Authentication Mutations
export const SIGN_UP = gql`
  mutation SignUp(
    $username: String!
    $password: String!
    $role: String!
    $universityId: String
  ) {
    signUp(
      username: $username
      password: $password
      role: $role
      universityId: $universityId
    ) {
      token
      user {
        id
        username
        role
      }
      redirectUrl
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        role
      }
      redirectUrl
    }
  }
`;

// Project Mutations
export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $title: String!
    $description: String
    $categoryName: String!
    $status: ProjectStatus!
    $startDate: String
    $endDate: String
    $memberUsernames: [String!]!
  ) {
    createProject(
      title: $title
      description: $description
      categoryName: $categoryName
      status: $status
      startDate: $startDate
      endDate: $endDate
      memberUsernames: $memberUsernames
    ) {
      id
      title
      description
      status
      startDate
      endDate
      category {
        id
        name
      }
      members {
        id
        username
      }
    }
  }
`;

export const UPDATE_PROJECT_PROGRESS = gql`
  mutation UpdateProjectProgress($projectId: ID!, $progress: Int!) {
    updateProjectProgress(projectId: $projectId, progress: $progress) {
      id
      progress
    }
  }
`;

// Task Mutations
export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String
    $projectTitle: String!
    $assignedToUsername: String!
    $status: TaskStatus
    $dueDate: String
  ) {
    createTask(
      title: $title
      description: $description
      projectTitle: $projectTitle
      assignedToUsername: $assignedToUsername
      status: $status
      dueDate: $dueDate
    ) {
      id
      title
      status
      dueDate
      assignedTo {
        id
        username
      }
      project {
        id
        title
      }
    }
  }
`;

// Category Mutations
export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      id
      name
    }
  }
`;

// Deletion Mutations
export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const DELETE_ALL_PROJECTS = gql`
  mutation DeleteAllProjects {
    deleteAllProjects
  }
`;

export const DELETE_ALL_TASKS = gql`
  mutation DeleteAllTasks {
    deleteAllTasks
  }
`;