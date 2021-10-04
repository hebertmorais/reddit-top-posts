import React from "react";
import {
  Tag,
  Stack,
  Image,
  Heading,
  Text,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { capitalizeString } from "../../utils/common";

interface ContentViewerProps {
  title: string;
  author: string;
  created_utc: number;
  thumbnail: string;
  num_comments: number;
  ups: number;
  subreddit: string;
}

function ContentViewer({ post }: { post: ContentViewerProps }) {
  return (
    <Stack
      background="whiteAlpha.900"
      padding={4}
      marginTop={4}
      borderRadius={4}
      border="1px"
      borderColor="gray.200"
    >
      <Flex direction="row" align="center">
        <Avatar name={post.author} size="sm" />
        <Text color="gray.500" padding={2} fontSize="sm">
          Sent by<span>{post.author}</span> <span>2 hours ago</span>
        </Text>
      </Flex>
      <Heading as="h2" fontSize="lg">
        {post.title}
      </Heading>
      <Image src={post.thumbnail} alt={post.title} />
      <Flex justify="space-around">
        <Flex align="center">
          <ChatIcon />
          <Text marginLeft={1} fontSize="sm">
            {post.num_comments} comments
          </Text>
        </Flex>
        <Flex align="center" marginLeft={2}>
          <ArrowUpIcon />
          <Text marginLeft={1} fontSize="sm">
            {post.ups} ups
          </Text>
        </Flex>
        {post.subreddit && (
          <Tag colorScheme="orange">{capitalizeString(post.subreddit)}</Tag>
        )}
      </Flex>
    </Stack>
  );
}

export default ContentViewer;
