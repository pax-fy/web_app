import { gql } from "@apollo/client";

export const  GET_VIDEO_BY_ID = gql`
query Notes($where: NoteWhereInput) {
    notes(where: $where) {
      metadata {
        content
      }
      createdAt
      deleted
      characterId
      character {
        characterId
        handle
        primary
        metadata {
          content
        }
        socialToken
        owner
        fromAddress
        createdAt
        updatedAt
        deletedAt
        
      }
      contractAddress
      deletedAt
      noteId
      publishedAt
      receivedTips {
        amount
        fee
        feeReceiverAddress
      }
      mintedNotes {
        noteId
      }
      locked
      owner
      stat {
        noteId
        viewDetailCount
        characterId
        viewCount
        viewInListCount
        note {
          links {
            linkType
            
            linklistId
            linkItemType
          }
        }
      }
    }
  }

`