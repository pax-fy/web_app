import { gql } from "@apollo/client";

export const GET_USER_PROFILES_BY_ADDRESS = gql`
query Profiles($where: Profile_filter) {
    profiles(where: $where) {
      bio
      handle
      id
      avatar
      creator
      name
    }
  }
`