import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query {
    getTodos {
      id
      content
      success
      createdAt
      updatedAt
    }
  }
`;

export const GET_TODO = gql`
  query ($id: Int!) {
    getTodo(id: $id) {
      id
      content
      success
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TODO = gql`
  mutation createTodo($content: String!) {
    create(content: $content) {
      id
      content
      success
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: Int!, $content: String!) {
    update(id: $id, content: $content) {
      id
      content
      success
      createdAt
      updatedAt
    }
  }
`;

export const CHECK_TODO = gql`
  mutation checkTodo($id: Int!, $success: Boolean!) {
    check(id: $id, success: $success)
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    delete(id: $id)
  }
`;