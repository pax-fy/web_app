import { useQuery } from "@apollo/client";
import { GET_ALL_VIDEOS } from "@/graphql/fragments/getVideos";
import { APP_ID } from "@/assets/constant";

export const useGetAllVideos = () => {
    const {data : allVids, loading : allVidsLoading, error:allVidsError} = useQuery(GET_ALL_VIDEOS)

    return {
        allVids,
        allVidsLoading,
        allVidsError
    }
}