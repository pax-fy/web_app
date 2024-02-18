import { gql } from "@apollo/client";

export  const GET_CREATOR_CONTENTS = gql`
query Notes($where: NoteWhereInput) {
    notes(where: $where) {
      noteId
      metadata {
        content
        uri
      }
      createdAt
      contractAddress
      characterId
      deleted
      locked
      stat {
        characterId
        noteId
        viewCount
        viewDetailCount
        viewInListCount
      }
      owner
      publishedAt
    }
  }

`