import { gql } from "urql";

export const booksQuery = gql`
  query books($page: Int, $limit: Int) {
    books(page: $page, limit: $limit) {
      id
      name
      imageUrl
      description
    }
  }
`;
