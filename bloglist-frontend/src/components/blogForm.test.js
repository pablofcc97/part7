import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./blogForm";
import { click } from "@testing-library/user-event/dist/click";

test("Ther form call the event handler whit the correctly details", () => {
  const mockHandler = jest.fn();
  const component = render(<BlogForm createBlog={mockHandler}></BlogForm>);
  const title = component.container.querySelector(".blogInput--title");
  const author = component.container.querySelector(".blogInput--author");
  const url = component.container.querySelector(".blogInput--url");
  const form = component.container.querySelector(".form--createBlog");
  fireEvent.change(title, {
    target: { value: "Title test" },
  });
  fireEvent.change(author, {
    target: { value: "Author test" },
  });
  fireEvent.change(url, {
    target: { value: "URL test" },
  });
  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("Title test");
  expect(mockHandler.mock.calls[0][0].author).toBe("Author test");
  expect(mockHandler.mock.calls[0][0].url).toBe("URL test");
});
