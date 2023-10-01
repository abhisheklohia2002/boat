import React, { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header";
import { SellerProducts } from "../components/SellerProducts";
import "./home.css";
import HomeCartProducts from "../components/HomeCartProducts";
import HomeCategories from "../components/HomeCategories";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, RemoveProduct } from "../store/ProductSlice";

let image_silder = [
  "https://www.boat-lifestyle.com/cdn/shop/files/Avengers_Web_5df16c6a-1005-4bc9-9c7d-aa18f71023c1_1440x.jpg?v=1695624588",
  "https://www.boat-lifestyle.com/cdn/shop/files/Deadpool_Web_1_1440x.jpg?v=1695626645",
  "https://www.boat-lifestyle.com/cdn/shop/files/Wave_Style_Call_WEB_1_1440x.jpg?v=1695129521",
  "https://www.boat-lifestyle.com/cdn/shop/files/Airdopes_161_ANC_WEB_83e48930-77e7-48a1-853e-d4e5b84283d2_1440x.png?v=1694842790",
];

let daily_poster = [
  {
    id: 1,
    poster:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/131_f04f74fd-45d4-4614-85cf-6ccf69c4cf90.jpg?v=1691395049",
    price: 999,
    name: "Airdopes 131",
    qty:1
  },

  {
    id: 2,
    poster:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD_161.jpg?v=1686297917",
    price: 999,
    name: "Airdopes 161",
    qty:1

  },
  {
    id: 3,
    poster:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/rockerz_ea76e8ff-d95c-49da-b6c9-fca4304dce11.jpg?v=1685686978",
    price: 899,
    name: "Rockerz 235 V2",
    qty:1

  },
];

let Launches = [
  {
    id: 4,
    poster:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Stone_350_Deadpool.jpg?v=1695622103",
    price: 1699,
    name: "Stone 352 DeadPool Edition",
    qty:1

  },
  {
    id: 5,
    poster:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Stone_350_Hulk.jpg?v=1695622102",
    price: 1599,
    name: "Stone 352 Hulk Edition",
    qty:1

  },
  {
    id: 6,
    poster:
      "	https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Stone_350_Thor.jpg?v=1695622103",
    price: "1499",
    name: "Stone 350 Thor Edition",
    qty:1

  },
];

let best_boat = [
  {
    qty:1
,
    id: 7,
    name: "AirDopes 161",
    price: 999,
    poster:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD_161.jpg?v=1686297917",
  },
  {
    qty:1
    ,
    id: 8,
    name: "Airdopes 131 PRO",
    price: 1099,
    poster:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD_141_d277995b-31ae-420d-b5b4-1161515335ed.jpg?v=1687428689",
  },
  {
    qty:1
    ,
    id: 9,
    name: "Wave Flex Connect",
    price: 1499,
    poster:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Wave_Flex_Connect.jpg?v=1689751649",
  },
];

let Categories_details = [
  {

    id: 1,
    name: "True Wireless Earbuds",
    poster:
      "https://www.boat-lifestyle.com/cdn/shop/files/True-wireless-earbuds_small.png?v=1684842854",
  },
  {
    id: 2,
    name: "Neckbands",
    poster:
      "https://www.boat-lifestyle.com/cdn/shop/files/Neckbands_bc6343f4-622f-4ebd-bb36-205643c3bf78_small.png?v=1684842854",
  },

  {
    id: 3,
    name: "Smart Watches",
    poster:
      "https://www.boat-lifestyle.com/cdn/shop/files/Smartwatches_88f12bcf-24bd-4e3a-aacb-ecc204f62179_small.png?v=1684842853",
  },
  {
    id: 4,
    name: "wireless Headphones",
    poster:
      "https://www.boat-lifestyle.com/cdn/shop/files/Wireless-Headphones_small.png?v=1684842854",
  },
  {
    id: 5,
    name: "Wireless Speakers",
    poster:
      "https://www.boat-lifestyle.com/cdn/shop/files/Wireless-Speaker_small.png?v=1684842854",
  },
  {
    id: 6,
    name: "wired Headphones",
    poster:
      "	https://www.boat-lifestyle.com/cdn/shop/files/Wired-Headphones_small.png?v=1684842854",
  },
  {
    id: 7,
    name: "wired Phones",
    poster:
      "https://www.boat-lifestyle.com/cdn/shop/files/Wired-Earphones_small.png?v=1684842854",
  },
];

export default function Home() {
  const [image_show, Setimage_show] = useState(image_silder[0]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  let image_count = 0;
  const select = useSelector((state) => state.ProductSlice);
  const dispatch = useDispatch();
 

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
  


  const SliderImage = () => {
    if (image_count === image_silder.length) {
      image_count = 0;
    }
    Setimage_show(image_silder[image_count]);
    image_count++;
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      SliderImage();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <Header BtnRef={btnRef} HitClick={onOpen} />
      <div style={{ paddingTop: "5rem" }}>
        <img style={{ width: "100%" }} src={image_show} alt="" />

        <h3 className="font-semibold text-3xl p-8">
          Explore <b>Bestsellers</b>
        </h3>

        <div className="horizontal-scroll-container">
          <SellerProducts
            poster="https://www.boat-lifestyle.com/cdn/shop/files/quinn_N8V0FmOXVCG4QfYvPSp1w.jpg"
            videourl="https://www.boat-lifestyle.com/cdn/shop/files/quinn_RUxbhR7CvjkNtlFUDxgw9.mp4"
          />
          <SellerProducts
            poster="https://www.boat-lifestyle.com/cdn/shop/files/quinn_9O6xvZXZ3kYLbUbtsnj4S.jpg"
            videourl="https://www.boat-lifestyle.com/cdn/shop/files/quinn_Bejc8URjU1NSXdhabLCmD.mp4"
          />
          <SellerProducts
            poster="https://www.boat-lifestyle.com/cdn/shop/files/quinn_KXwTUL2r91fh5uAHqSyIH.jpg"
            videourl="https://www.boat-lifestyle.com/cdn/shop/files/quinn_OyJHanx4QSdUN3OVGTO7C.mp4"
          />
          <SellerProducts
            poster="https://www.boat-lifestyle.com/cdn/shop/files/quinn_v90hMzAEa585W2YTUR9UF.jpg"
            videourl="https://www.boat-lifestyle.com/cdn/shop/files/quinn_CpsRIdJWtpXyFN3enwbXd.mp4"
          />
        </div>

        <h3 className="font-semibold text-3xl p-8">
          Daily <b>Deals</b>
        </h3>

        <div className="flex justify-evenly">
          {daily_poster.map((e, i) => (
            <HomeCartProducts
              key={i}
              poster={e.poster}
              price={e.price}
              name={e.name}
              id={e.id}
              qty={e.qty}
            />
          ))}
        </div>

        <h3 className="font-semibold text-3xl p-8">
          Shop By <b>Categories</b>
        </h3>

        <div className="flex justify-evenly">
          {Categories_details?.map((e, i) => (
            <HomeCategories key={i} poster={e.poster} name={e.name} id={e.id}/>
          ))}
        </div>

        <h3 className="font-semibold text-3xl p-8">
          New <b>Launches</b>
        </h3>
        <div className="flex justify-evenly">
          {Launches?.map((e, i) => (
            <HomeCartProducts
              key={i}
              poster={e.poster}
              price={e.price}
              name={e.name}
              id={e.id}
              qty = {e.qty}
            />
          ))}
        </div>

        <h3 className="font-semibold text-3xl p-8">
          Best <b>Of boAt</b>
        </h3>
        <div className="flex justify-around w-2/4 align-middle pl-3">
          <h3 className="font-bold text-md  hover:font-semibold cursor-pointer">
            Best Sellers
          </h3>
          <h3 className="font-bold text-md  hover:font-semibold cursor-pointer">
            Top Earbuds
          </h3>
          <h3 className="font-bold text-md  hover:font-semibold cursor-pointer">
            Top Watches
          </h3>
          <h3 className="font-bold text-md  hover:font-semibold cursor-pointer">
            Trending Wireless
          </h3>

          <h3 className="font-bold text-md  hover:font-semibold cursor-pointer">
            Trending ANC
          </h3>
        </div>

        <div className="flex justify-evenly pt-10">
          {best_boat?.map((e, i) => (
            <HomeCartProducts
              key={i}
              poster={e.poster}
              price={e.price}
              name={e.name}
              id={e.id}
              qty={e.qty}
            />
          ))}
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
          <DrawerFooter>
          <div className="flex">
           <Box className="text-xl  text-black-900 font-bold uppercase pr-5">
              Subtotal :
            </Box>{" "}
            <Box className="font-semibold text-xl text-black-800">
              ₹ {total_amount}
            </Box>
           </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
