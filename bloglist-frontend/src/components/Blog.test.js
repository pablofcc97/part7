import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "test",
  author: "tester",
  url: "www.test.com",
  likes: 21,
};

const user = {
  username: "tester",
  name: "tester",
  password: "tester",
};

test("appears the correct info", () => {
  const component = render(<Blog blog={blog} user={user}></Blog>);

  expect(component.container).toHaveTextContent("test");
  expect(component.container).toHaveTextContent("tester");
  expect(component.container).not.toHaveTextContent("www.test.com");
  expect(component.container).not.toHaveTextContent("21");
});

test("click the button calls an eventHandler once", () => {
  const component = render(<Blog blog={blog} user={user}></Blog>);
  const button = component.getByText("View");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("www.test.com");
  expect(component.container).toHaveTextContent("21");
});

test("click the like button two times, calls two times the eventHandler", () => {
  const mockHandler = jest.fn();
  const component = render(
    <Blog blog={blog} user={user} LikeBlog={mockHandler}></Blog>,
  );
  const btnView = component.getByText("View");
  fireEvent.click(btnView);
  const btnLike = component.getByText("Like");
  fireEvent.click(btnLike);
  fireEvent.click(btnLike);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
