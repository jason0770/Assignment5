import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  currentItemID: 3,
};

export const getItemsAsync = createAsyncThunk("item/getItems", async () => {
  return await fetch("http://localhost:3001/items")
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => console.log(err));
});

export const addItemsAsync = createAsyncThunk("item/addItems", async (item) => {
  return await fetch("http://localhost:3001/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((resp) => {
      return resp.json();
    })
    .catch((err) => {
      console.log(err);
    });
});

export const deleteItemAsync = createAsyncThunk(
  "items/deleteItems",
  async (itemId) => {
    //Sources: https://rapidapi.com/guides/query-parameters-fetch
    return await fetch(`http://localhost:3001/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const deleteAllItemAsync = createAsyncThunk(
  "items/deleteAllItems",
  async () => {
    return await fetch("http://localhost:3001/items/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const updateItemsDetailsAsync = createAsyncThunk(
  "items/updateItemsDetails",
  async (itemElements) => {
    const itemId = itemElements[0];
    const itemDescription = itemElements[1];
    const itemPrice = itemElements[2];
    return await fetch(`http://localhost:3001/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemDescription, itemPrice }),
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const itemSlice = createSlice({
  name: "item",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getItemsAsync.pending, (state) => {})
      .addCase(getItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(getItemsAsync.rejected, (state, action) => {})
      .addCase(addItemsAsync.pending, (state) => {})
      .addCase(addItemsAsync.fulfilled, (state, action) => {
        state.items.itemList.push(action.payload);
      })
      .addCase(addItemsAsync.rejected, (state, action) => {})
      .addCase(deleteItemAsync.pending, (state) => {})
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        const itemId = action.payload[0].itemId;
        state.items.itemList = state.items.itemList.filter((item) => {
          return item.itemId !== itemId;
        });
      })
      .addCase(deleteItemAsync.rejected, (state, action) => {})
      .addCase(deleteAllItemAsync.pending, (state) => {})
      .addCase(deleteAllItemAsync.fulfilled, (state, action) => {
        state.items.itemList = [];
      })
      .addCase(deleteAllItemAsync.rejected, (state, action) => {})
      .addCase(updateItemsDetailsAsync.pending, (state) => {})
      .addCase(updateItemsDetailsAsync.fulfilled, (state, action) => {
        //Source: https://www.codevertiser.com/update-javascript-array-of-object/
        state.items.itemList = state.items.itemList.map((item) =>
          item.itemId === action.payload.itemId
            ? { ...item, ...action.payload }
            : item
        );

        // console.log("line 182", JSON.parse(JSON.stringify(state.items.itemList)))
      })
      .addCase(updateItemsDetailsAsync.rejected, (state, action) => {});
  },
});

export const { addItem, deleteItem, deleteAllItems, updateItemDescription } =
  itemSlice.actions;

export default itemSlice.reducer;
