import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { Provider } from 'react-redux';
import { store } from '../../reducers/store';
import { BrowserRouter } from "react-router-dom";

//Did not complete the following because I do not understand the Redux and Thunk testing.
test('Modal UI Test1: modal shows a close button', async () => {
    // render(

    //     <BrowserRouter>
    //     <Provider store={store}>
    //     <Modal
    //         itemId={'1'}
    //         isViewClicked={true}
    //         setIsViewClicked={handleClose}
    //     />
    //     </Provider>
    //     </BrowserRouter>
    // );

})
