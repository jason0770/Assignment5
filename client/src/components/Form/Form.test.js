import { render, screen } from "@testing-library/react";
import App from "../../App";
import { Provider } from "react-redux";
import { store } from "../../reducers/store";
import { BrowserRouter, useLocation } from "react-router-dom";
import user from "@testing-library/user-event";
import Form from "./Form";

test("Inventory Form UI Test1: Check visible texts", () => {
  render(
    <Provider store={store}>
      <Form />
    </Provider>
  );

  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground
  const headingElement = screen.getByRole("heading", {
    name: /a form for a product you purchased/i,
  });
  expect(headingElement).toBeInTheDocument();

  const formTitle = screen.getByText(/product purchase form/i);
  expect(formTitle).toBeInTheDocument();

  const itemName = screen.getByText(/item name:/i);
  expect(itemName).toBeInTheDocument();

  const itemNameInput = screen.getByRole("textbox", { name: /item name:/i });
  expect(itemNameInput).toBeInTheDocument();

  const itemSKU = screen.getByText(/item sku:/i);
  expect(itemSKU).toBeInTheDocument();

  const itemSKUInput = screen.getByRole("textbox", { name: /item sku:/i });
  expect(itemSKUInput).toBeInTheDocument();

  const itemManufacturer = screen.getByText(/item manufacturer:/i);
  expect(itemManufacturer).toBeInTheDocument();

  const itemManufacturerInput = screen.getByRole("textbox", {
    name: /item manufacturer:/i,
  });
  expect(itemManufacturerInput).toBeInTheDocument();

  const itemDescription = screen.getByText(/description:/i);
  expect(itemDescription).toBeInTheDocument();

  const itemDescriptionInput = screen.getByRole("textbox", {
    name: /description:/i,
  });
  expect(itemDescriptionInput).toBeInTheDocument();

  const itemPrice = screen.getByText(/price:/i);
  expect(itemPrice).toBeInTheDocument();

  const itemPriceInput = screen.getByRole("spinbutton", { name: /price:/i });
  expect(itemPriceInput).toBeInTheDocument();

  const itemImageItemOptions = screen.getByText(/image of item options/i);
  expect(itemImageItemOptions).toBeInTheDocument();

  const itemImageOptionLabel = screen.getByText(/post a image link/i);
  expect(itemImageOptionLabel).toBeInTheDocument();

  const itemImageOptionRadio = screen.getByRole("radio", {
    name: /post a image link/i,
  });
  expect(itemImageOptionRadio).toBeInTheDocument();

  const itemFileOptionLabel = screen.getByText(/upload a file/i);
  expect(itemFileOptionLabel).toBeInTheDocument();

  const itemFileOptionRadio = screen.getByRole("radio", {
    name: /upload a file/i,
  });
  expect(itemFileOptionRadio).toBeInTheDocument();

  const imageLink = screen.getByText(/image link:/i);
  expect(imageLink).toBeInTheDocument();

  const imageLinkInput = screen.getByRole("textbox", { name: /image link:/i });
  expect(imageLinkInput).toBeInTheDocument();

  const addButton = screen.getByRole("button", { name: /add/i });
  expect(addButton).toBeInTheDocument();

  const clearButton = screen.getByRole("button", { name: /clear/i });
  expect(clearButton).toBeInTheDocument();
});

test("Inventory Form UI Test2: Interaction Test Radio Button", async () => {
  //Source: https://stackoverflow.com/questions/74681284/test-for-button-click-to-call-a-mocked-function-fails
  const handleAddButton = jest.fn();
  render(
    <Provider store={store}>
      <Form testClick={handleAddButton} />
    </Provider>
  );

  user.setup();
  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground
  const itemFileOptionRadio = screen.getByRole("radio", {
    name: /upload a file/i,
  });
  expect(itemFileOptionRadio).toBeInTheDocument();

  await user.click(itemFileOptionRadio);

  const fileAddressLabel = screen.getByText(/file address:/i);
  expect(fileAddressLabel).toBeInTheDocument();

  const fileAddressInput = screen.getByLabelText(/file address:/i);
  expect(fileAddressInput).toBeInTheDocument();

  const imageLink = screen.queryByText(/image link:/i);
  //Source: https://testing-library.com/docs/guide-disappearance/
  expect(imageLink).not.toBeInTheDocument();

  const imageLinkInput = screen.queryByRole("textbox", {
    name: /image link:/i,
  });
  //Source: https://testing-library.com/docs/guide-disappearance/
  expect(imageLinkInput).not.toBeInTheDocument();
});

test("Inventory Form UI Test3: Interaction Test User Input and Clear Button", async () => {
  //Source: https://stackoverflow.com/questions/74681284/test-for-button-click-to-call-a-mocked-function-fails
  user.setup();
  render(
    <Provider store={store}>
      <Form />
    </Provider>
  );

  user.setup();
  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground
  const itemNameInput = screen.getByRole("textbox", { name: /item name:/i });
  expect(itemNameInput).toBeInTheDocument();

  //Source: https://www.youtube.com/watch?v=kqX14UyjhDM&ab_channel=Codevolution
  await user.type(
    itemNameInput,
    "Introduction to Machine Learning with Python: A Guide for Data Scientists Paperback – Nov. 15 2016"
  );
  expect(itemNameInput).toHaveValue(
    "Introduction to Machine Learning with Python: A Guide for Data Scientists Paperback – Nov. 15 2016"
  );

  const itemSKUInput = screen.getByRole("textbox", { name: /item sku:/i });
  expect(itemSKUInput).toBeInTheDocument();

  await user.type(itemSKUInput, "123-456");
  expect(itemSKUInput).toHaveValue("123-456");

  const itemManufacturerInput = screen.getByRole("textbox", {
    name: /item manufacturer:/i,
  });
  expect(itemManufacturerInput).toBeInTheDocument();

  await user.type(itemManufacturerInput, "Unavailable");
  expect(itemManufacturerInput).toHaveValue("Unavailable");

  const itemDescriptionInput = screen.getByRole("textbox", {
    name: /description:/i,
  });
  expect(itemDescriptionInput).toBeInTheDocument();

  await user.type(itemDescriptionInput, "Some text");
  expect(itemDescriptionInput).toHaveValue("Some text");

  const itemPriceInput = screen.getByRole("spinbutton", { name: /price:/i });
  expect(itemPriceInput).toBeInTheDocument();

  await user.type(itemPriceInput, "10");
  expect(itemPriceInput).toHaveValue(10);

  const imageLinkInput = screen.getByRole("textbox", { name: /image link:/i });
  expect(imageLinkInput).toBeInTheDocument();

  await user.type(
    imageLinkInput,
    "https://m.media-amazon.com/images/I/51d4ivN7DGL._SX379_BO1,204,203,200_.jpg"
  );
  expect(imageLinkInput).toHaveValue(
    "https://m.media-amazon.com/images/I/51d4ivN7DGL._SX379_BO1,204,203,200_.jpg"
  );

  const clearButton = screen.getByRole("button", { name: /clear/i });
  expect(clearButton).toBeInTheDocument();
  await user.click(clearButton);

  expect(itemNameInput).toHaveValue("");
  expect(itemSKUInput).toHaveValue("");
  expect(itemManufacturerInput).toHaveValue("");
  expect(itemDescriptionInput).toHaveValue("");
  expect(itemPriceInput).toHaveValue(null);
  expect(imageLinkInput).toHaveValue("");
});

test("Inventory Form UI Test4: Interaction Test Add Button", async () => {
  //Source: https://stackoverflow.com/questions/74681284/test-for-button-click-to-call-a-mocked-function-fails
  const handleAddButton = jest.fn();
  render(
    <Provider store={store}>
      <Form testClick={handleAddButton} />
    </Provider>
  );

  user.setup();
  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground

  const addButton = screen.getByRole("button", { name: /add/i });
  await user.click(addButton);
  expect(handleAddButton).toHaveBeenCalledTimes(1);
});
