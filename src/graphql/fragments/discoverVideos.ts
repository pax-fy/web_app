import { gql } from "@apollo/client";

export const DISCOVER_VIDEOS =gql`
query _count($where: NoteWhereInput) {
  notes(where: $where) {
    character {
      uri
      stat {
        characterId
      }
      handle
      characterId
      fromAddress
      owner
      primary
      metadata{
        content
      }
      socialToken
      createdAt
      
    }
    characterId
    contractAddress
    createdAt
    deleted
    deletedAt
    linkKey
    metadata {
      content
      status
      uri
    }
    locked
    noteId
    owner
    uri
  }
}


`