import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../test-utils";
import ContentViewer from "../ContentViewer";
import MockPost from "../../../components/PostItem/__tests__/mockPost.json";

describe("Assert items exist", function () {
  test("should render user name", function () {
    render(<ContentViewer post={MockPost} />);
    const postAuthor = screen.getByText(MockPost.author);
    expect(postAuthor).toBeInTheDocument();
  });

  test("should render the title", function () {
    render(<ContentViewer post={MockPost} />);
    const postTitle = screen.getByText(MockPost.title);
    expect(postTitle).toBeInTheDocument();
  });

  test("should render the number of comments", function () {
    render(<ContentViewer post={MockPost} />);
    const commentsIndicator = screen.getByText("958 comments");
    expect(commentsIndicator).toBeInTheDocument();
  });

  test("should render the thumbnail", function () {
    render(<ContentViewer post={MockPost} />);
    const postThumbnail = screen.getByAltText(MockPost.title);
    expect(postThumbnail).toBeInTheDocument();
  });

  test("should render the formatted date", function () {
    render(<ContentViewer post={MockPost} />);
    Date.now = jest.fn(() => 1419819714);
    const formattedPostDate = screen.getByText("2 hours ago");
    expect(formattedPostDate).toBeInTheDocument();
  });

  test("should render the post subreddit", function () {
    render(<ContentViewer post={MockPost} />);
    const subreddit = screen.getByText("Funny");
    expect(subreddit).toBeInTheDocument();
  });

  test("should render the post ups count", function () {
    render(<ContentViewer post={MockPost} />);
    const upsCount = screen.getByText("4841 ups");
    expect(upsCount).toBeInTheDocument();
  });
});
