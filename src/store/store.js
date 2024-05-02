import { createSlice, configureStore } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [],
  },
  reducers: {
    addNews(state, action) {
      state.newsList.push(action.payload);
    },
    deleteNews(state, action) {
      state.newsList = state.newsList.filter(
        (news) => news.id !== action.payload.id
      );
    },
    findNews(state, action) {
      return state.newsList.find((news) => news.id === action.payload.id);
    },
  },
});

export const { addNews, deleteNews, findNews } = newsSlice.actions;

export const selectNewsList = (state) => state.news.newsList;

export default configureStore({
  reducer: {
    news: newsSlice.reducer,
  },
});
