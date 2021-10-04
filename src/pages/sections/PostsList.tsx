import { Box } from '@chakra-ui/react';
import React from 'react';
import PostItem from '../../components/PostItem';

function PostsList() {
  return (
   <Box>
     {Array(10).fill(0).map(item=> <PostItem/>)}
     </Box>
  );
}

export default PostsList;