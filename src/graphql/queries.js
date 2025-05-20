import { gql } from '@apollo/client';

// Authentication Queries
export const GET_ME = gql`
  query Me {
    me {
      id
      username
      role
      universityId
    }
  }
`;

export const GET_DASHBOARD_STATS = gql`
  query DashboardStats {
    dashboardStats {
      projects
      students
      tasks
      finishedProjects
    }
  }
`;

// Project Queries
export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      title
      description
      status
      startDate
      endDate
      progress
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
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      title
      description
      status
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
  }
`;

// Task Queries
export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      id
      title
      description
      status
      dueDate
      assignedTo {
        id
        username
      }
      project {
        id
        title
        description
      }
    }
  }
`;

export const GET_PROJECT_TASKS = gql`
  query GetProjectTasks($projectId: ID!) {
    getProjectTasks(projectId: $projectId) {
      id
      title
      description
      status
      dueDate
      assignedTo {
        id
        username
      }
    }
  }
`;

// Dropdown Options
export const GET_PROJECT_OPTIONS = gql`
  query GetProjectOptions {
    getProjectOptions {
      id
      title
    }
  }
`;

export const GET_STUDENT_OPTIONS = gql`
  query GetStudentOptions {
    getStudentOptions {
      id
      username
    }
  }
`;

// Categories
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

export const GET_PROJECT_PROGRESS = gql`
  query GetProjectProgress($projectId: ID!) {
    getProject(id: $projectId) {
      id
      progress
      tasks {
        id
        progress
      }
    }
  }
`;