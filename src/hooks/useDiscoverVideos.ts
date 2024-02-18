import { useQuery } from "@apollo/client";
import { DISCOVER_VIDEOS } from "@/graphql/fragments/discoverVideos";
import { APP_ID } from "@/assets/constant";

export const useDiscoverVideos = () => {
    const {data, loading, error} = useQuery(DISCOVER_VIDEOS, {
        variables : {
            "where": {
                "metadata": {
                  "content": {
                    "path": [
                      "sources"
                    ],
                    "array_contains": [APP_ID]
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