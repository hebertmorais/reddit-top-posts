import React, { useState } from "react";
import {
  Tag,
  Stack,
  Image,
  Heading,
  Text,
  Flex,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { ChatIcon, ArrowUpIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { saveAs } from "file-saver";
import Lightbox from "react-awesome-lightbox";
// Required stylesheet
import "react-awesome-lightbox/build/style.css";
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

function ContentViewer({
  post,
  onClose,
}: {
  post: ContentViewerProps;
  onClose?: any;
}) {
  const [thumbnailOpen, setThumbnailOpen] = useState(false);
  const handleSaveImage = () => saveAs(post.thumbnail, `${post.title}.jpg`);

  return (
    <Stack
      background="whiteAlpha.900"
      padding={4}
      marginTop={4}
      borderRadius={4}
      border="1px"
      borderColor="gray.200"
    >
      <Flex
        width="100%"
        justify="flex-end"
        display={{ base: "flex", md: "none" }}
      >
        <Button
          justifySelf="flex-end"
          leftIcon={<SmallCloseIcon />}
          colorScheme="red"
          variant="outline"
          onClick={onClose}
        >
          Close
        </Button>
      </Flex>
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

      {thumbnailOpen && (
        <Lightbox
          image={post.thumbnail}
          title={post.title}
          onClose={() => setThumbnailOpen(false)}
        />
      )}

      {post.thumbnail && (
        <>
          <Button
            colorScheme="green"
            variant="outline"
            onClick={handleSaveImage}
          >
            Download Image
          </Button>
          <Button
            colorScheme="orange"
            variant="outline"
            onClick={() => setThumbnailOpen(true)}
          >
            Zoom In
          </Button>
        </>
      )}
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
