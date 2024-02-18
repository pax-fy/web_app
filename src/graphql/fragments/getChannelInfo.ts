import { gql } from "@apollo/client";

export  const GET_CHANNEL_INF0_BY_ID =gql`

query Character($where: CharacterWhereUniqueInput!) {
    character(where: $where) {
      handle
      characterId
      metadata {
        content
      }
  }}
`