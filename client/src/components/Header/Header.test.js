import { render, screen } from '@testing-library/react';
import App from '../../App';
import { Provider } from 'react-redux';
import { store } from '../../reducers/store';
import { BrowserRouter, MemoryRouter, useLocation } from "react-router-dom";
import user from "@testing-library/user-event"

//Source: https://testing-library.com/docs/example-react-router/
const LocationDisplay = () => {
  const location = useLocation()
  return <div data-testid="location-display">{location.pathname}</div>
}

test('Inventory Navigation UI Test1: Check visible texts', () => {
  
  render(
    // Source: https://stackoverflow.com/questions/60329421/usedispatch-error-could-not-find-react-redux-context-value-please-ensure-the
    <BrowserRouter>
     <Provider store={store}>
      <App/>
      <LocationDisplay/>
     </Provider>
     </BrowserRouter>
  );

  //Source: https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd&ab_channel=Codevolution
  //Tool I used: Testing Playground
  const pageTitle = screen.getByRole('heading', {name: "CPSC455: Applied Industry Practices"})
  expect(pageTitle).toBeInTheDocument()

  const homePageButton = screen.getByRole('link', {name: "Home"});
  expect(homePageButton).toBeInTheDocument()

  const aboutPageButton = screen.getByRole('link', {name: "About"});
  expect(aboutPageButton).toBeInTheDocument()
})

test('Inventory Navigation UI Test2: Click About Page', async() => {

  render(
    // Source: https://stackoverflow.com/questions/60329421/usedispatch-error-could-not-find-react-redux-context-value-please-ensure-the
    <BrowserRouter>
     <Provider store={store}>
      <App/>
      <LocationDisplay/>
     </Provider>
     </BrowserRouter>
  );

  user.setup()
  
  const aboutPageButton = screen.getByRole('link', {name: "About"});
  expect(aboutPageButton).toBeInTheDocument()

  await user.click(aboutPageButton)
  expect(screen.getByTestId('location-display')).toHaveTextContent('/about')
  
})

//Source: https://testing-library.com/docs/example-react-router/
test('Inventory Navigation UI Test3: Navigate to Incorrect Page First Time', async() => {

  let badRoute = '/aboutt'

  render(
    <MemoryRouter initialEntries={[badRoute]}>
     <Provider store={store}>
      <App/>
     </Provider>
      <LocationDisplay/>
    </MemoryRouter>
  );

  expect(screen.getByTestId('location-display')).toHaveTextContent('/aboutt')

  let pageContent = screen.getByText('Sorry, you navigated to a wrong page.');
  expect(pageContent).toBeInTheDocument()

})

//Source: https://testing-library.com/docs/example-react-router/
test('Inventory Navigation UI Test4: Navigate to Incorrect Page Second Time', async() => {

  let badRoute = '/t'

  render(
    <MemoryRouter initialEntries={[badRoute]}>
     <Provider store={store}>
      <App/>
     </Provider>
      <LocationDisplay/>
    </MemoryRouter>
  );

  expect(screen.getByTestId('location-display')).toHaveTextContent('/t')

  let pageContent = screen.getByText('Sorry, you navigated to a wrong page.');
  expect(pageContent).toBeInTheDocument()

})

test('Inventory Navigation UI Test5: Click Back to Home Page from About Page', async() => {

  render(
    // Source: https://stackoverflow.com/questions/60329421/usedispatch-error-could-not-find-react-redux-context-value-please-ensure-the
    <BrowserRouter>
     <Provider store={store}>
      <App/>
      <LocationDisplay/>
     </Provider>
     </BrowserRouter>
  );

  user.setup()
  
  const aboutPageButton = screen.getByRole('link', {name: "About"});
  expect(aboutPageButton).toBeInTheDocument()

  await user.click(aboutPageButton)
  expect(screen.getByTestId('location-display')).toHaveTextContent('/about')

  const homePageButton = screen.getByRole('link', {name: "Home"});
  expect(homePageButton).toBeInTheDocument()

  await user.click(homePageButton)
  expect(screen.getByTestId('location-display')).toHaveTextContent('/')

})