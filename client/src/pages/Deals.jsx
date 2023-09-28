import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import "./deal.css";
import { Select,Drawer,DrawerBody,DrawerFooter,DrawerHeader
,  DrawerOverlay,
DrawerContent,
DrawerCloseButton,
useDisclosure,
Divider,
} from '@chakra-ui/react'
import { DealsCart } from "../components/DealsCart";
import { Button } from "@chakra-ui/react";
import deals_data from "./deal.json"
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, RemoveProduct } from "../store/ProductSlice";
let cabels  = deals_data.cables;
    let watch = deals_data.watch
export default function Deals() {
  const [selectedOption, setSelectedOption] = useState('');
    const [open, setOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    
    const select = useSelector((state) => state.ProductSlice);
    const dispatch = useDispatch();
   const [count,setcount] = useState(0)
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
let total_amount;
if(select.length>=1){
  total_amount = select.reduce((acc,product)=>{
 return acc + (product.price*product.qty);
  },0)
  console.log(total_amount)
}


const handleSelectChange = (e) => {
  
  const selectedValue = e.target.value;
  

  setSelectedOption(selectedValue);

if(selectedOption[16]==="w"){
  for(var i = 0;i<cabels.length;i++){
    for(var j = 0; j<cabels.length-i-1; j++){
      if(cabels[j].price<cabels[j+1].price){
        var temp = cabels[j];
        cabels[j]  = cabels[j+1];
        cabels[j+1] = temp
      }
    }
  }

  for(var i = 0;i<watch.length;i++){
    for(var j = 0; j<watch.length-i-1; j++){
      if(watch[j].price<watch[j+1].price){
        var temp = watch[j];
        watch[j]  = watch[j+1];
        watch[j+1] = temp
      }
    }
  }
  console.log(watch,cabels)
setcount((count)=>count+1)
}
else if(selectedOption === "Price,low to high"){
  for(var i = 0;i<cabels.length;i++){
    for(var j = 0; j<cabels.length-i-1; j++){
      if(cabels[j].price>cabels[j+1].price){
        var temp = cabels[j];
        cabels[j]  = cabels[j+1];
        cabels[j+1] = temp
      }
    }
  }

  for(var i = 0;i<watch.length;i++){
    for(var j = 0; j<watch.length-i-1; j++){
      if(watch[j].price>watch[j+1].price){
        var temp = watch[j];
        watch[j]  = watch[j+1];
        watch[j+1] = temp
      }
    }
  }
  console.log(watch,cabels)

  setcount((count)=>count+1)


}
};
useEffect(()=>{

},[count])

  return (
    <>
      <Header BtnRef={btnRef} HitClick={onOpen} />
      <div style={{ paddingTop: "5rem" }}>
        <h3 className="font-bold text-2xl p-8 pl-24 pt-16 ">
          Daily Deals
        </h3>

        <div className="flash_sale">
          <p className="m-0 uppercase flash_text ">
            <span className="thunder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lightning-fill"
                viewBox="0 0 16 16"
              >
                <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5z"></path>
              </svg>
            </span>
          </p>

          <div className="flashtimer">
            <h4 className="timer__title">Ending In:</h4>
            <div className="time-display">
              <div className="timer-block" style={{ display: "none" }}>
                <span className="">00</span>
              </div>

              <div className="timer-block" style={{ display: "none" }}>
                <span className="">00</span>
              </div>

              <div className="timer-block" style={{ display: "none" }}>
                <span className="">00</span>
              </div>

              <div className="timer-block milliseconds">
                <span>00</span>
              </div>
            </div>
          </div>
        </div>


<div className="flex justify-between pr-5 pl-5 mt-8">
<Button size={"md"} width={150}>
  Filter {">"}
</Button>
<Select
 value={selectedOption} 
 onChange={handleSelectChange} 
color={"ActiveBorder"} fontWeight={"semibold"} background={"#eff4f7"} fontFamily={"inherit"} size = {"md"} width={"44"} placeholder='Sort By: Featured'>
  <option value='New Arrivals'>New Arrivals</option>
  <option value='Best Selling'>Best Selling</option>

  <option value='Price,low to high'>Price,high to low</option>
  <option value='Price,high to low'>Price,low to high</option>
</Select>
</div>


<div className="grid grid-cols-3">
 {
  cabels?.map((e,i)=> <DealsCart key  = {i} id = {e.id} name = {e.name} poster = {e.poster} price = {e.price} />)
 }
</div>

<div className="grid grid-cols-3">
 {
  watch?.map((e,i)=> <DealsCart key  = {i} id = {e.id} name = {e.name} poster = {e.poster} price = {e.price} />)
 }
</div>
      </div>


      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
          className="font-bold uppercase"
          >Your Cart
          <Divider/>
          </DrawerHeader>

          <DrawerBody>
            {select.length !== 0 ? (
         <div className="overflow-auto">
          {
            select?.map((e,i)=>(
              <div className="flex justify-evenly place-content-center align-middle mb-3">
              <div><img className="w-24 rounded-md" src={e.poster} alt={e.name} /></div>
              <div className="pt-5 text-center">
                <span className="font-semibold uppercase text-sm">
                  {e.name}
                </span>
                
                <br />
               

                <span className="font-extralight">
                ₹ {e.price * e.qty }
                </span>
                <br />
                <Button background={"InactiveCaption"} size={"sm"} className="rounded-md">
                  Better Sound 
                </Button>
              </div>
              <div className="flex justify-center align-middle pt-8">
                <Button onClick={()=>HandleRemove(e.id)} size={"sm"}>
                  -
                </Button>
                <span className="p-1">
                 {e.qty}
                </span>
                <Button onClick={()=>HandleAddToCart(e.id,e.name,e.poster,e.price,1)} size={"sm"}>
                  +
                </Button>
              </div>
             
            </div>
            ))
          }
<Divider/>
         </div>
            ) : (
              <div className="pl-32 text-left pt-40 pr-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="112.731"
                  height="124.316"
                  viewBox="0 0 112.731 124.316"
                >
                  <g transform="translate(-3235.117 6880.904)">
                    <path
                      d="M509.34,3199.823a.947.947,0,0,1-.947-.947v-11.064a19.073,19.073,0,1,0-38.146,0v11.064a.947.947,0,0,1-1.894,0v-11.064a21.145,21.145,0,0,1,6.085-14.89,20.882,20.882,0,0,1,22.993-4.559,21.1,21.1,0,0,1,12.857,19.449v11.064A.947.947,0,0,1,509.34,3199.823Z"
                      transform="translate(2799.417 -10047.617)"
                      fill="#4e5358"
                    ></path>
                    <path
                      d="M521.3,3254.225a.306.306,0,0,1-.137-.58,3.165,3.165,0,0,0,.457-.287,2.115,2.115,0,0,1,.791-.4.306.306,0,0,1,.148.594,1.522,1.522,0,0,0-.582.3,3.688,3.688,0,0,1-.541.337A.3.3,0,0,1,521.3,3254.225Z"
                      transform="translate(2815.908 -10020.475)"
                      fill="#4e5358"
                    ></path>
                    <g transform="translate(1018.755 -698.496)">
                      <path
                        d="M459.184,3175.473l-14.666,1.042-.2,106.408,15.187,2.169Z"
                        transform="translate(1772.545 -9346.648)"
                        fill="#d0d9de"
                      ></path>
                      <path
                        d="M459.683,3174.936l.323,110.732-16.189-2.312.2-107.307ZM459,3284.515l-.317-108.506-13.669.971-.2,105.508Z"
                        transform="translate(1772.545 -9346.648)"
                        fill="#4e5358"
                      ></path>
                      <path
                        d="M459.7,3174.386l-16,1.074v94.6l.036,15.031,16.028,2.862h.136Z"
                        transform="translate(1787.925 -9346.648)"
                        fill="#d0d9de"
                      ></path>
                      <path
                        d="M460.2,3173.852l.2,114.6h-.681l-.044-.008-16.439-2.936-.037-15.448v-95.069l.466-.031Zm-.8,113.53-.2-112.46-15,1.007v94.133l.035,14.612Z"
                        transform="translate(1787.925 -9346.648)"
                        fill="#4e5358"
                      ></path>
                    </g>
                    <g transform="translate(3266.214 -6869.684)">
                      <path
                        d="M548.666,3175.46l-80.906-.082.084,113.638,80.69-6.159v-107.4Z"
                        transform="translate(-467.4 -3176.46)"
                        fill="#fff"
                      ></path>
                      <path
                        d="M467.259,3174.878h.5l80.906.082v.5h.368v107.86l-.462.035-81.228,6.2v-.539Zm80.775,1.081-79.774-.08.083,112.6,79.691-6.083Z"
                        transform="translate(-467.4 -3176.46)"
                        fill="#4e5358"
                      ></path>
                    </g>
                    <path
                      d="M472.15,3263.515l-28.419-4.646,14.146-10.568Z"
                      transform="translate(2792.976 -10021.005)"
                      fill="#868c91"
                    ></path>
                    <path
                      d="M473.521,3264.246l-31.032-5.073,15.446-11.54Zm-28.548-5.68,25.806,4.219-12.961-13.816Z"
                      transform="translate(2792.976 -10021.005)"
                      fill="#4e5358"
                    ></path>
                    <path
                      d="M483.283,3196.426a4.083,4.083,0,1,0-4.083-4.083A4.1,4.1,0,0,0,483.283,3196.426Z"
                      transform="translate(2802.558 -10041.086)"
                      fill="#c7d2dd"
                    ></path>
                    <path
                      d="M513.683,3196.426a4.083,4.083,0,1,0-4.083-4.083A4.192,4.192,0,0,0,513.683,3196.426Z"
                      transform="translate(2812.197 -10041.086)"
                      fill="#c7d2dd"
                    ></path>
                    <path
                      d="M522.34,3199.823a.947.947,0,0,1-.947-.947v-11.064a19.074,19.074,0,1,0-38.146,0v11.064a.947.947,0,0,1-1.894,0v-11.064a21.145,21.145,0,0,1,6.085-14.89,20.882,20.882,0,0,1,22.993-4.559,21.1,21.1,0,0,1,12.857,19.449v11.064A.947.947,0,0,1,522.34,3199.823Z"
                      transform="translate(2803.541 -10047.617)"
                      fill="#4e5358"
                    ></path>
                    <path
                      d="M20.865,29.139l3.147-7.123L.777,22.9l3.812,6.906Zm-2.695-12.1L11.773.328,5.329,22.076Z"
                      transform="translate(3297.439 -6829.365)"
                      fill="#4e5358"
                    ></path>
                    <path
                      d="M22.032,31.149l-16.856.7L.812,23.946l4.822-.184L12.573.345l7.084,18.5L7.314,23.7,25.632,23ZM5.72,30.809l15.7-.647,2.694-6.1L2.461,24.9Zm6.971-27.46L6.943,22.757l11.459-4.5Z"
                      transform="translate(3296.58 -6830.877)"
                      fill="#4e5358"
                    ></path>
                  </g>
                </svg>

                <h3 style={{}} className="font-bold w-80 pt-5 text-xl relative right-10">
                  Your Cart is feeling lonely
                </h3>
                <Button
                  style={{ background: "black", color: "whitesmoke" }}
                  className="mt-5"
                  size={"md"}
                >
                  Start Shopping
                </Button>
              </div>
            )}
          </DrawerBody>
          <DrawerFooter >
<span className="text-xl to-blue-950 text-blue-900 font-bold uppercase pr-5">Subtotal :</span> <span className="font-semibold text-xl text-blue-800">
₹ {total_amount}
</span>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
