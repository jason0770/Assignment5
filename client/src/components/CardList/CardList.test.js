import { render, screen } from "@testing-library/react";
import App from "../../App";
import { Provider } from "react-redux";
import { store } from "../../reducers/store";
import { BrowserRouter, useLocation } from "react-router-dom";
import user from "@testing-library/user-event";
import CardList from "./CardList";

test("Inventory CardList UI Test1: Check visible texts", async () => {
  render(
    <Provider store={store}>
      <CardList />
    </Provider>
  );

  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground
  const itemListHeading = screen.getByRole("heading", {
    name: /item card list/i,
  });
  expect(itemListHeading).toBeInTheDocument();

  const skuCodes = await screen.findAllByText("SKU Code", { exact: false });
  expect(skuCodes.length).toBe(2);

  const manufacturers = await screen.findAllByText("Manufacturer:", {
    exact: false,
  });
  expect(manufacturers.length).toBe(2);

  const imageHeadings = await screen.findAllByText("image of", {
    exact: false,
  });
  expect(imageHeadings.length).toBe(2);

  const images = await screen.findAllByRole("img");
  expect(images.length).toBe(2);

  const imageCaptions = await screen.findAllByText("Hardcover of", {
    exact: false,
  });
  expect(imageCaptions.length).toBe(2);

  const viewButtons = await screen.findAllByRole("button", { name: "View" });
  expect(viewButtons.length).toBe(2);

  const deleteButtons = await screen.findAllByRole("button", {
    name: "Delete",
  });
  expect(deleteButtons.length).toBe(2);

  const deleteAllButton = await screen.findAllByRole("button", {
    name: "Delete All",
  });
  expect(deleteAllButton.length).toBe(1);
});

test("Inventory CardList UI Test2: Interaction Test: Delete All Button", async () => {
  user.setup();
  const handleDeleteAllButton = jest.fn();
  render(
    <Provider store={store}>
      <CardList testDeleteAllClick={handleDeleteAllButton} />
    </Provider>
  );

  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground
  const deleteAllButtons = await screen.findAllByRole("button", {
    name: "Delete All",
  });
  expect(deleteAllButtons.length).toBe(1);

  await user.click(deleteAllButtons[0]);

  expect(handleDeleteAllButton).toHaveBeenCalledTimes(1);
});

test("Inventory CardList UI Test3: Interaction Test: View Button", async () => {
  user.setup();
  const handleViewButton = jest.fn();
  render(
    <Provider store={store}>
      <CardList testViewClick={handleViewButton} />
    </Provider>
  );

  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground
  const viewButtons = await screen.findAllByRole("button", { name: "View" });
  expect(viewButtons.length).toBe(2);

  await user.click(viewButtons[0]);

  expect(handleViewButton).toHaveBeenCalledTimes(1);

  await user.click(viewButtons[1]);

  expect(handleViewButton).toHaveBeenCalledTimes(2);
});

test("Inventory CardList UI Test4: Interaction Test: Delete Button", async () => {
  user.setup();
  const handleDeleteButton = jest.fn();
  render(
    <Provider store={store}>
      <CardList testDeleteClick={handleDeleteButton} />
    </Provider>
  );

  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground
  const deleteButtons = await screen.findAllByRole("button", {
    name: "Delete",
  });
  expect(deleteButtons.length).toBe(2);

  await user.click(deleteButtons[0]);

  expect(handleDeleteButton).toHaveBeenCalledTimes(1);

  await user.click(deleteButtons[1]);

  expect(handleDeleteButton).toHaveBeenCalledTimes(2);
});
