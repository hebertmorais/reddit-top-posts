import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../test-utils";
import PostItem from "../PostItem";
import MockPost from "./mockPost.json";

describe("Assert items exist", function () {
  test("should render user name", function () {
    render(<PostItem post={MockPost} />);
    const postAuthor = screen.getByText(MockPost.author);
    expect(postAuthor).toBeInTheDocument();
  });

  test("should render the title", function () {
    render(<PostItem post={MockPost} />);
    const postTitle = screen.getByText(MockPost.title);
    expect(postTitle).toBeInTheDocument();
  });

  test("should render the dismiss button", function () {
    render(<PostItem post={MockPost} />);
    const deleteButton = screen.getByRole("button");
    expect(deleteButton).toBeInTheDocument();
  });

  test("should render the number of comments", function () {
    render(<PostItem post={MockPost} />);
    const commentsIndicator = screen.getByText("958 comments");
    expect(commentsIndicator).toBeInTheDocument();
  });

  test("should render the thumbnail", function () {
    render(<PostItem post={MockPost} />);
    const postThumbnail = screen.getByAltText(MockPost.title);
    expect(postThumbnail).toBeInTheDocument();
  });

  test("should render the formatted date", function () {
    render(<PostItem post={MockPost} />);
    Date.now = jest.fn(() => 1419819714);
    const formattedPostDate = screen.getByText("2 hours ago");
    expect(formattedPostDate).toBeInTheDocument();
  });

  test("should render the formatted date", function () {
    render(<PostItem post={MockPost} />);
    Date.now = jest.fn(() => 1419819714);
    const formattedPostDate = screen.getByText("2 hours ago");
    expect(formattedPostDate).toBeInTheDocument();
  });

  test("should render the NEW tag if the post has not been read", function () {
    render(<PostItem post={MockPost} read={false} />);
    const newTag = screen.getByText("NEW");
    expect(newTag).toBeInTheDocument();
  });
});
