import { createSlice } from "@reduxjs/toolkit";
import  Swal  from "sweetalert2";

const initialState = {
    cartItems: []
  }

  const cartSlice  = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const existingItem = state.cartItems.find( item => item._id == action.payload._id)
            if(!existingItem){
                state.cartItems.push(action.payload)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product added to cart successfully",
                    showConfirmButton: true,
                    timer: 15000
                  });
            }else{
                // alert("item already exists")
                Swal.fire({
                    title: "<strong>item already added to cart</strong>",
                    icon: "warning",
                    html: ``,
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText: `
                      <i class="fa fa-thumbs-up"></i> Ok
                    `,
                    confirmButtonAriaLabel: "",
                    cancelButtonText: ``,
                    cancelButtonAriaLabel: ""
                  });

            }
        },
        removeFromCart:(state,action)=>{
            console.log(action);
            

            state.cartItems = state.cartItems.filter( item => item._id !== action.payload._id)
        },
        clearCart:(state,action)=>{
            state.cartItems = []
        }
    }
  })


//   export actions

export const {addToCart,removeFromCart,clearCart} = cartSlice.actions
export default cartSlice.reducer

