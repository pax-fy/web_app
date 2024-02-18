import { useQuery } from "@tanstack/react-query";
import axios from 'axios'

type videoComments = {
    profileId? : any
    videoId ? : any
}
export const useGetVideoComments = ({profileId, videoId} : videoComments) => {
    const COMMENTS_BASE_URL = `https://indexer.crossbell.io/v1/notes?limit=20&toCharacterId=${profileId}&toNoteId=${videoId}&includeDeleted=false&includeEmptyMetadata=false&includeCharacter=true&includeHeadCharacter=false&includeHeadNote=false&includeNestedNotes=true`;
     
    const fetchvideoComments = async () => {
        return axios.get(COMMENTS_BASE_URL);
      };

      const {
        data: comments,
        isLoading: isCommentsLoading,
        isError: isCommentsError,
        error: commentsError,
      } = useQuery(["comments-data"], fetchvideoComments);

      return {
        comments,
        commentsError,
        isCommentsError,
    
      }

}