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
import "react-awesome-lightbox/build/style.css";
import { capitalizeString, getFormattedDateFromNow } from "../../utils/common";

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
      background="white"
      padding={4}
      margin={{ base: 0, lg: 4 }}
      borderRadius={4}
      border="1px"
      borderColor="gray.200"
      shadow="lg"
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
          Sent by<span>{post.author}</span>{" "}
          <span>{getFormattedDateFromNow(post.created_utc)}</span>
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
