import {
  Avatar,
  Box,
  Text,
  Image,
  Stack,
  Heading,
  Flex,
  Divider,
  Button,
  Tag,
  TagLabel,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import React from "react";
import { ChatIcon, SmallCloseIcon } from "@chakra-ui/icons";

interface PostItemProps {
  title: string;
  author: string;
  created_utc: number;
  thumbnail: string;
  num_comments: number;
}
function PostItem({
  post,
  read = false,
  handleClick,
}: {
  post: PostItemProps;
  read?: boolean;
  handleClick?: any;
}) {
  return (
    <LinkBox
      backgroundColor="whiteAlpha.900"
      borderRadius={8}
      width="100%"
      padding={4}
      marginBottom={2}
      border="1px"
      borderColor="gray.200"
      onClick={handleClick}
    >
      <LinkOverlay href="#">
        <Stack>
          <Flex direction="row" align="center">
            <Avatar name={post.author} size="sm" />
            <Text color="gray.500" padding={2}>
              Sent by<span>{post.author}</span> <span>2 hours ago</span>
            </Text>
            <Flex flex="1" justify="flex-end">
              <Button
                alignSelf="center"
                leftIcon={<SmallCloseIcon />}
                colorScheme="orange"
                variant="outline"
                size="small"
                padding={1}
                borderRadius="full"
              >
                Dismiss
              </Button>
            </Flex>
          </Flex>
          <Box>
            <Stack>
              <Image src={post.thumbnail} alt={post.title} />
              <Heading as="h2">{post.title}</Heading>
              <Divider orientation="horizontal" />
              <Flex align="center">
                <ChatIcon />
                <Text marginLeft={2} fontSize="sm">
                  {post.num_comments} comments
                </Text>
                {!read && (
                  <Flex flex="1" justify="flex-end">
                    <Tag size="sm" variant="subtle" colorScheme="orange">
                      <TagLabel>NEW</TagLabel>
                    </Tag>
                  </Flex>
                )}
              </Flex>
            </Stack>
          </Box>
        </Stack>
      </LinkOverlay>
    </LinkBox>
  );
}

export default PostItem;
