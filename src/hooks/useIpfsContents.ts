import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { apolloClient } from '@/graphql/apolloClient';
import { GET_ALL_VIDEOS } from '@/graphql/fragments/getVideos';

const useReadPosts = (categories) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // Query posts from subgraph
      //const subgraphData = await fetchPostsFromSubgraph();

      const {data, loading, error, errors} = await apolloClient.query({
				query : GET_ALL_VIDEOS})

          console.log("get all videos from fetcher", data)
      // Extract CIDs from subgraph data
      const cids = data?.post?.map(post => post.contentURI);

       console.log("all post cids", cids)

      // Fetch content for each CID and filter by categories
      const filteredPosts = await Promise.all(cids.map(async (cid) => {
        const content = await fetchContentFromIPFS(cid);
        return { cid, content };
      }));

        console.log("all filtered contents", filteredPosts)
      // Filter posts by categories
      const categorizedPosts = filteredPosts.filter(post => post.content.categories.some(category => categories.includes(category)));

      setPosts(categorizedPosts);
    };

    fetchPosts();
  }, [categories]);

  return posts;
};



const fetchContentFromIPFS = async (cid) => {
  // Perform logic to fetch content from IPFS based on CID
  // Example:
  const response = await fetch(`https://ipfs.subsocial.network/ipfs/${cid}`);
  const data = await response.json();
  return data;
};

export default useReadPosts;
