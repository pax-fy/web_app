import {useQuery} from '@apollo/client'
import { GET_CREATOR_CONTENTS } from '@/graphql/getCreatorContents'


export const useGetCreatorContents = ({channelId} : any) =>  {
    const {data, loading, error} = useQuery(GET_CREATOR_CONTENTS, {
        variables : {
            "where": {
                "characterId": {
                  "equals": 53095
                },
                "AND": [
                  {
                    "metadata": {
                      "content": {
                        "path": [
                           "sources"
                        ],
                         "array_contains": ["xTube_v1"]
                      }
                    }
                  }
                ]
              }
        }
    })

    return {
        data,
        loading,
        error
    }

}