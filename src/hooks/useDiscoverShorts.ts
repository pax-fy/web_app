import { useQuery } from "@apollo/client";
import { DISCOVER_VIDEOS } from "@/graphql/fragments/discoverVideos";
import { SHORT_APP_ID } from "@/assets/constant";
export const useDiscoverShorts = () => {
    const {data, loading, error} = useQuery(DISCOVER_VIDEOS, {
        variables : {
            "where": {
                "metadata": {
                  "content": {
                    "path": [
                      "sources"
                    ],
                    "array_contains": [SHORT_APP_ID]
                  }
                }
              }
        }
    })

    return {
        data,
        loading,
        error
    }
}