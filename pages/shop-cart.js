import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import nextConfig from "../next.config";
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import services from "../services";
import { useTranslation } from "react-i18next";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
const Cart = ({ }) => {
  const { t } = useTranslation("common");
  //image constant url
  const imageUrl = nextConfig.BASE_URL_UPLOADS;

  const [updateCart, setUpdateCart] = useState([])
  const [addressList, setAddressList] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(1)
  const [selectedAddress, setSelectedAddress] = useState(0)

  //Calculate the total amount using the reduce method
  const calculateTotalAmount = (prodcutData) => {
    let totalAmountArr = prodcutData.map((item) => {
      return item.finalAmount * item.selectedQuantity

    })
    let totalQtyArr = prodcutData.map((item) => {
      return item.selectedQuantity

    })
    const sum = totalAmountArr.reduce((partialSum, a) => partialSum + a, 0);
    const qty = totalQtyArr.reduce((partialSum, a) => partialSum + a, 0);
    console.log(totalAmountArr, sum)
    setTotalAmount(sum)
    setTotalQuantity(qty)
  };
  //set total price in add to card all prodcut 
  useEffect(() => {
    cardData()
    addressHandler()
  }, [])
  //card data get function
  const cardData = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const response = await services.cart.GET_CART()

        if (response) {
          setUpdateCart(response?.data?.data[0].cartDetail.cartDetails)
          calculateTotalAmount(response?.data?.data[0].cartDetail.cartDetails);

        }
      } catch (error) {
        console.log(error)
      }
    } else {
      if (localStorage.getItem("cartDetail")) {
        const cartLocal = localStorage.getItem('cartDetail') && JSON.parse(localStorage.getItem('cartDetail'))
        setUpdateCart(cartLocal.cartDetails)
        calculateTotalAmount(cartLocal.cartDetails);

      }

    }
  }

const addressHandler = async() => {
  if (localStorage.getItem("access_token")) {
  try {
    const response = await services.myprofile.GET_MY_ADDRESS();
        console.log(response.data.data);
        setAddressList(response.data.data)
        if(response.data.data.length > 0){
          response.data.data.map((item)=> {
            if(item.defaultAddress){
              setSelectedAddress(item.id)
            }
          })
        }
  } catch (error) {
    console.log(error)
  }}
}
  const handleCart = async (product) => {
    if (localStorage.getItem("access_token")) {
      const cart = await services.cart.GET_CART()

      let cartDetails = []
      if (cart.data.data[0].cartDetail) {
        cartDetails = cart.data.data[0].cartDetail.cartDetails
      }
      cartDetails?.push(product)
      const key = 'id';
      const unique = [...new Map(cartDetails?.map(item =>
        [item[key], item])).values()];
        let totalAmountArr = unique.map((item) => {
          return item.finalAmount * item.selectedQuantity
    
        })
        let totalQtyArr = unique.map((item) => {
          return item.selectedQuantity
    
        })
        const sum = totalAmountArr.reduce((partialSum, a) => partialSum + a, 0);
        const qty = totalQtyArr.reduce((partialSum, a) => partialSum + a, 0);
      let data = {
        cartDetail: { cartDetails: unique },
        totalAmount: sum,
        totalItems: unique.length,
        totalQuantity: qty,
        addressId: selectedAddress,
      }
      console.log(data)
      const updateCart = await services.cart.UPDATE_CART(data)
      console.log(updateCart)
      toast.success("Cart updated!");
      cardData()


    } else {
      const cart = localStorage.getItem('cartDetail') && JSON.parse(localStorage.getItem('cartDetail'))
      let cartDetails = []
      if (cart) {
        cartDetails = cart.cartDetails
      }
      cartDetails.push(product)
      const key = 'id';
      const unique = [...new Map(cartDetails.map(item =>
        [item[key], item])).values()];

      let data = {
        cartDetail: { cartDetails: unique }
      }

      localStorage.setItem('cartDetail', JSON.stringify(data.cartDetail))
      toast.success("Cart updated!");
      cardData()
    }
  };
  const increaseQuantity = (product) => {
    product.selectedQuantity = product.selectedQuantity + 1;
    handleCart(product)
  }
  const decreaseQuantity = (product) => {
    product.selectedQuantity = product.selectedQuantity - 1;
    handleCart(product)

  }
  const clearCart = async () => {
    if (localStorage.getItem("access_token")) {

      let data = {
        cartDetail: { cartDetails: [] },
        totalAmount: 0,
        totalItems: 0,
        totalQuantity: 0,
        addressId: selectedAddress,
      }
      console.log(data)
      const updateCart = await services.cart.UPDATE_CART(data)
      console.log(updateCart)
      toast.success("Cart updated!");
      cardData()


    } else {
      let data = {
        cartDetail: { cartDetails: [] }
      }
      localStorage.setItem('cartDetail', JSON.stringify(data.cartDetail))
      toast.success("Cart updated!");
      cardData()
    }
  }
  const deleteFromCart = async(product) => {
    if (localStorage.getItem("access_token")) {
    let updatedCartData  = [...updateCart]
    let index
    updateCart.map((item, i)=>{
      if(item.id == product.id) {
        index = i
      }
    })
    updatedCartData.splice(index, 1)
    console.log(updateCart, updatedCartData)
      let data = {
        cartDetail: { cartDetails: updatedCartData },
        totalAmount: totalAmount,
        totalItems: updatedCartData.length,
        totalQuantity: totalQuantity,
        addressId: selectedAddress,
      }
      console.log(data)
      const updateCartData = await services.cart.UPDATE_CART(data)
      console.log(updateCartData)
      toast.success("Cart updated!");
      cardData()


    } else {
      let updatedCartData  = [...updateCart]
    let index
    updateCart.map((item, i)=>{
      if(item.id == product.id) {
        index = i
      }
    })
    updatedCartData.splice(index, 1)
      let data = {
        cartDetail: { cartDetails: updatedCartData }
      }

      localStorage.setItem('cartDetail', JSON.stringify(data.cartDetail))
      toast.success("Cart updated!");
      cardData()
    }
  }
  const isLoggedIn = localStorage.getItem("access_token")
  // const checkoutHandler = async() => {
  //   try {
  //     await handleCart(updateCart[0])
  //     const updateCartData = await services.cart.CHECKOUT()   
  //     console.log(updateCartData)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  async function checkoutHandler() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    await handleCart(updateCart[0])
    const updateCartData = await services.cart.CHECKOUT()   
    console.log(updateCartData)
    const options = {
      key: "rzp_test_ug6gBARp85Aq1j",    //id from key_id generation dashboard
      currency: 'INR',
      amount: updateCartData.data.totalAmount,
      order_id: updateCartData.data.razorpayPaymentDetails.id,
      name: "KoraKagaj",
      description: "Thank you for ordering. Please initiate payment!",
      image: "http://korakagaj-dev.s3-website.ap-south-1.amazonaws.com/assets/imgs/theme/logo.svg",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        alert("Transaction successful");
      },
      prefill: {
        name: "Anjani Soni",
        email: "anjani@gmail.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <>
      <Layout parent={t("Home")} sub={<><a href="/products"> {t("Product")}</a></>} subChild={t("Cart")}>
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  {updateCart.length <= 0 && t("No Products")}
                  <table
                    className={
                      updateCart?.length > 0
                        ? "table shopping-summery text-center clean"
                        : "d-none"
                    }
                  >
                    <thead>
                      <tr className="main-heading">
                        <th scope="col">{t("Image")}</th>
                        <th scope="col">{t("Name")}</th>
                        <th scope="col">{t("Price")}</th>
                        <th scope="col">{t("Quantity")}</th>
                        <th scope="col">{t("Subtotal")}</th>
                        <th scope="col">{t("Remove")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        updateCart && updateCart.map((product, j) => {


                          return (
                            <tr key={j}>
                              <td className="image product-thumbnail">
                                <img
                                  src={imageUrl + product.featuredImage}
                                  alt=""
                                  crossOrigin="anonymous"
                                />
                              </td>

                              <td className="product-des product-name">
                                <h5 className="product-name">
                                  <Link href="/products/[slug]" as={`/products/${product?.id}`}>
                                    <a>{product.productName}</a>
                                  </Link>
                                </h5>
                                {product?.selectedColor || product?.selectedSize ? <p className="font-xs">
                                  {product?.selectedColor && <>Color : {product?.selectedColor} <br /></>}
                                  {product?.selectedSize && <>Size : {product?.selectedSize} <br /></>}


                                </p> : null}
                              </td>
                              <td className="price" data-title="Price">
                                <span>Rs. {product.finalAmount}</span>
                              </td>

                              <td className="text-center" data-title="Stock">
                                <div className="detail-qty border radius m-auto">
                                  <a
                                    onClick={(e) => decreaseQuantity(product)}
                                    className="qty-down"
                                  >
                                    <i className="fi-rs-angle-small-down"></i>
                                  </a>
                                  <span className="qty-val">{product.selectedQuantity}</span>
                                  <a
                                    onClick={(e) => increaseQuantity(product)}
                                    className="qty-up"
                                  >
                                    <i className="fi-rs-angle-small-up"></i>
                                  </a>
                                </div>
                              </td>

                              <td className="text-right" data-title="Cart">
                                <span>Rs. {product.finalAmount * product.selectedQuantity}</span>
                              </td>
                              <td className="action" data-title="Remove">
                                <a
                                  onClick={(e) => deleteFromCart(product)}
                                  className="text-muted"
                                >
                                  <i className="fi-rs-trash"></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })
                      }
                      <tr>
                        <td colSpan="6" className="text-end">
                          {updateCart.length > 0 && (
                            <a onClick={clearCart} className="text-muted">
                              <i className="fi-rs-cross-small"></i>
                              Clear Cart
                            </a>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="cart-action text-end">
               
                <Link className={'btn'} href="/products">
                  <button className={'btn'}>
                    <i className="fi-rs-shopping-bag mr-10"></i>
                    {t("Continue Shopping")}
                    </button>
                    </Link>
                    
                </div>
                <div className="divider center_icon mt-50 mb-50">
                  <i className="fi-rs-fingerprint"></i>
                </div>
                <div className="row mb-50">
                  <div className="col-lg-6 col-md-12">
                    <div className="heading_s1 mb-3">
                      <h4>Select Address</h4>
                    </div>

                    <form className="field_form shipping_calculator">
                      <div className="form-row">
                        <div className="form-group col-lg-12">
                          <div className="custom_select">
                            <select className="form-control select-active" value={selectedAddress} onChange={(e)=> setSelectedAddress(e.target.value)}>
                              <option value="">{t("Choose a option...")}</option>
                              {addressList && addressList.length > 0 && addressList.map((item)=>{
                                return (
                                  <option value={item.id}>{item.address.address}</option>
                                )
                              })}

                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-lg-12">
                          <Link href={'/myprofile?index=4'}>
                          <button className="btn  btn-sm w-100">
                            <i className="fi-rs-shuffle mr-10"></i>
                            Add new address
                          </button>
                          </Link>
                        </div>
                      </div>
                    </form>
                    {/* Apply Coupon Hide */}
                    {/* <div className="mb-30 mt-50">
                      <div className="heading_s1 mb-3">
                        <h4>{t("Apply Coupon")}</h4>
                      </div>
                      <div className="total-amount">
                        <div className="left">
                          <div className="coupon">
                            <form action="#" target="_blank">
                              <div className="form-row row justify-content-center">
                                <div className="form-group col-lg-6">
                                  <input
                                    className="font-medium"
                                    name="Coupon"
                                    placeholder={t("Enter your Coupon")}
                                  />
                                </div>
                                <div className="form-group col-lg-6">
                                  <span className="btn  btn-sm">
                                    <i className="fi-rs-label mr-10"></i>
                                    {t("Apply")}
                                  </span>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="border p-md-4 p-30 border-radius cart-totals">
                      <div className="heading_s1 mb-3">
                        <h4>{t("Cart Totals")}</h4>
                      </div>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td className="cart_total_label">
                                {t("Cart Subtotal")}
                              </td>
                              <td className="cart_total_amount">
                                <span className="font-lg fw-900 text-brand">
                                  Rs. {totalAmount}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="cart_total_label">{t("Shipping")}</td>
                              <td className="cart_total_amount">
                                <i className="ti-gift mr-5"></i>
                                {t("Free Shipping")}
                              </td>
                            </tr>
                            <tr>
                              <td className="cart_total_label">{t("Total")}</td>
                              <td className="cart_total_amount">
                                <strong>
                                  <span className="font-xl fw-900 text-brand">
                                    Rs. {totalAmount}
                                  </span>
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {isLoggedIn ? <a onClick={()=> checkoutHandler()} href="#" className="btn ">
                        <i className="fi-rs-box-alt mr-10"></i>
                        {t("Proceed To CheckOut")}
                      </a> : <Link className={'btn'} href="/login"><a href="#" className="btn ">
                        <i className="fi-rs-box-alt mr-10"></i>
                        {t("Proceed to Login")}
                      </a></Link>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
  activeCart: state.counter,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);