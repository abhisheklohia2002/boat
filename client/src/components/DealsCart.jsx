import React, { useState } from 'react'
import { Button, Divider } from '@chakra-ui/react'
import "./homecart.css"
import { Spinner } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AddProduct, RemoveProduct } from '../store/ProductSlice'

export const DealsCart = ({
    id,name,poster,price
}) => {

    const [loader,setLoader] = useState(true);
    let timeout;
    const dispatch = useDispatch();
    const select = useSelector((state) => state.ProductSlice);

    
    
    const HandleAddToCart = (id, name, poster, price, qty)=>{
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
    
    }
  return (
    <div key = {id}  className='rounded-xl m-3' style={{background:"#eff4f7",border:"2px solid lightgray"}}>
<div className='flex justify-around align-middle  pt-0 pb-0 pl-10' >
    <p className='pt-5 rounded-md'>
    <img  className='rounded-lg' src={poster} alt={name} />

    </p>
    <h3 className='pt-5  pl-10 font-bold'>
        <span style={{color:"black"}} className='text-xl'>
        {name}
        </span>
        <br />
       <span style={{color:"black"}} className='mt-2'><span className='text-xl'>₹{price} </span> <del className='text-sm pl-3'>₹500</del><b className='text-red-500 pl-14'> 67% off</b></span>
       <Divider color={"GrayText"} fontWeight={800} width={250} className='mt-2' />

<p className='flex pt-4'>
    <Button color={"teal"} fontWeight={"bold"} fontFamily={"cursive"} background={"#eff4f7"} size={"xs"} mr={5}>
        13mm driver
    </Button>
    <Button color={"teal"} fontFamily={"cursive"} fontWeight={"bold"}  size={"xs"}>
        IVP Technology
    </Button>
</p>


<p className=' pt-10 pr-12 mb-5'>
    <Button  onClick={()=>HandleAddToCart(id,name,poster,price,1)} background={"black"} color={"white"} width={200}>
    {
            
            loader?
            "Add To Cart": <Spinner/> }
    </Button>
</p>

    </h3>
   
</div>

    </div>
  )
}
