// import { configureStore } from '@reduxjs/toolkit';

// import api from '../RTK/apiSlice';
// import orderReducer from './orderSlice';

// const store = configureStore({
//     reducer: {
//       orders: orderReducer,
//       [api.reducerPath]: api.reducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(api.middleware),
//   });
  



// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';

// import api from '../RTK/apiSlice';
// import orderReducer from './orderSlice';



import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import api from '../RTK/apiSlice';
import orderReducer from './orderSlice';

const store = configureStore({
  reducer: {
    orders: orderReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, thunk),
});
   export default store;
