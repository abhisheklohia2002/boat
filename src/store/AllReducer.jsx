import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
const Store = configureStore({
    reducer:{
ProductSlice
    }
})

export default Store;
