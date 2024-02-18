import { useQuery } from "@apollo/client";
import { GET_USER_PROFILES_BY_ADDRESS } from "@/graphql/fragments/getUserProfiles";
import { SHORT_APP_ID } from "@/assets/constant";
export const useGetUserProfiles = (address : any) => {
    const {data, loading, error} = useQuery(GET_USER_PROFILES_BY_ADDRESS, {
        variables : {
            "where": {
                "creator": address
              }
        }
    })

    return {
        data,
        loading,
        error
    }
}