import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name:"product",
    initialState:[],
    reducers:{
        AddProduct:(state,action)=>{
         
state.push(action.payload)
        },
        RemoveProduct:(state,action)=>{
            const productToRemove = action.payload;

            return state.filter(product => product.id !== productToRemove.id);
        }
    }
})

export const {AddProduct,RemoveProduct} = ProductSlice.actions;
export default  ProductSlice.reducer;
