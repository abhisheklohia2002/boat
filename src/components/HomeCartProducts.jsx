import React, { useEffect, useState } from 'react';
import "./homecart.css";
import { Button } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { AddProduct, RemoveProduct } from '../store/ProductSlice';

export default function HomeCartProducts(
  { poster, price, name, id, qty }
) {
  const [loader, setLoader] = useState(true);
  let timeout;
  const dispatch = useDispatch();
  const select = useSelector((state) => state.ProductSlice);

  const HandleAddToCart = (id, name, poster, price, qty) => {
    const existingProduct = select.find(product => product.id === id);

    if (existingProduct) {
      const updatedQty = existingProduct.qty + qty;
      const payload = {id, name, poster, price, qty:updatedQty}
      dispatch(RemoveProduct(payload))

      dispatch(AddProduct(payload));
      console.log(select);
    } else {
      const payload = {
        id,
        name,
        poster,
        price,
        qty
      };
      dispatch(AddProduct(payload));
      console.log(select);
    }
    setLoader(false);
    timeout = setTimeout(() => {
      setLoader(true);
    }, 2000);
  };

  const HandleRemove = (id) => {
    const existingProduct = select.find(product => product.id === id);
if(existingProduct){
  if(existingProduct.qty > 1){
    const updatedQty = existingProduct.qty - 1;
    const payload = {id,name:existingProduct.name,poster:existingProduct.poster,price:existingProduct.price,qty:updatedQty};
    dispatch(RemoveProduct(payload));
    dispatch(AddProduct(payload))

  }
  else {
    const payload = { id };
    dispatch(RemoveProduct(payload));
    console.log(select);
  }
}
  
  };

  return (
    <div key={id} className='main_home_cart'>
      <img className=' rounded-xl' src={poster} alt={name} />
      <span className='span_hour'>
        60 Hours Playback
      </span>
      <span className='flex justify-between align-middle'>
        <h3 className='font-bold text-gray-700'>
          {name}
        </h3>
        <h3>
          <span className='bg-black rounded-xl mr-1 text-black cursor-pointer'>
            {qty} <span className='bg-red-900 rounded-xl pl-3 text-red-900 cursor-pointer'>
              0
            </span>
          </span>
        </h3>
      </span>
      <span className='flex justify-between align-middle'>
        <h3 className='pt-2 font-bold'>
          ₹{price} <del className='font-semibold'>₹2000 </del> <b className='text-teal-500'>67% off</b>
        </h3>
        <Button
          className='mt-2 font-bold text-gray-700 '
          color={"black"} size='md'
          onClick={() => HandleAddToCart(id, name, poster, price, 1)} // Always add 1 quantity when adding to cart
        >
          {
            loader ?
              "Add To Cart" : <Spinner />
          }
        </Button>
      </span>
    </div>
  )
}
