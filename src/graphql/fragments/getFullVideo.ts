import { gql } from "@apollo/client";

export const GET_FULL_VIDEO  = gql`

query Posts($where: Post_filter) {
    posts(where: $where) {
      source
      contentURI
      content
      title
      id
      linkKey
      linkItemType
      
      cover
      media
      mediaAddress
      MimeType
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