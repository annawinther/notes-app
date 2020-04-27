/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNotes = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      status
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        status
      }
      nextToken
    }
  }
`;
