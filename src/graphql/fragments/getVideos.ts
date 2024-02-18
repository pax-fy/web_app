import { gql } from "@apollo/client";


export const GET_ALL_VIDEOS = gql`
query Posts {
    posts {
      contentURI
      content
      id
      linkKey
      linkItemType
      swipo
      profile {
        creator
        id
        name
        avatar
        handle
      }
    }
  }
`