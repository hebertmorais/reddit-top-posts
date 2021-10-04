import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';

function PostItem() {
  return (
    <Box width="100%">
         <Avatar name="Mark Markson" />
         <Text>Mark Markson</Text>
    </Box>
  );
}

export default PostItem;