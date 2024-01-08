import { connect } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import nextConfig from "../next.config";
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import services from "../services";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
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
const Cart = ({}) => {
  const { t } = useTranslation("common");
  //image constant url

  const imageUrl = nextConfig.BASE_URL_UPLOADS;

  const [updateCart, setUpdateCart] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(0);

  const [getadressUers, setGetaddress] = useState([]);

  //Discount
  const [Discount, setDiscount] = useState("");
  const [DiscountID, setDiscountID] = useState("");
  const [RemoveStatus, setRemoveStatus] = useState(false);
  const [DiscountPer, setDiscountPer] = useState(0);
  const [CouponDis, setCouponDis] = useState(false);
  const router = useRouter();

  const calculateTotalAmount = (prodcutData) => {
    let totalAmountArr = prodcutData?.map((item) => {
      return item.finalAmount * item.selectedQuantity;
    });
    let totalQtyArr = prodcutData?.map((item) => {
      return item.selectedQuantity;
    });
    const sum = totalAmountArr?.reduce((partialSum, a) => partialSum + a, 0);
    const qty = totalQtyArr?.reduce((partialSum, a) => partialSum + a, 0);

    setTotalAmount(sum);
    setTotalQuantity(qty);
  };
  //set total price in add to card all prodcut
  const getadress = async () => {
    if (localStorage.getItem("access_token")) {
      let a = 0;

      if (selectedAddress == a) {
        try {
          const response = await services.myprofile.GET_MY_ADDRESS();
          if (response) {
            setGetaddress(response?.data?.data);
            // setSelectedAddress(response?.data?.data[0].id);
            a = response?.data?.data[0].id;
            const res = response?.data?.data.find(
              (item) => item?.defaultAddress === true
            );
            setSelectedAddress(res?.id);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    cardData();
  }, []);
  useEffect(() => {
    if (selectedAddress && updateCart && updateCart?.length > 0) {
      handleCart(updateCart[0]);
    }
  }, [selectedAddress]);
  const cardData = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const response = await services.cart.GET_CART();
        if (response?.data?.discountAmount) {
          setDiscount(response?.data?.discountAmount?.couponCode);

          if (response?.data?.discountAmount?.couponCode.length) {
            setCouponDis(true);
            setRemoveStatus(true);
          }
          setDiscountPer(response?.data?.discountAmount?.discount);
        }
        if (response) {
          setUpdateCart(response?.data?.data?.cartDetail?.cartDetails);
          addressHandler();
          getadress();
          calculateTotalAmount(response?.data?.data?.cartDetail?.cartDetails);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      if (localStorage.getItem("cartDetail")) {
        const cartLocal =
          localStorage.getItem("cartDetail") &&
          JSON.parse(localStorage.getItem("cartDetail"));
        setUpdateCart(cartLocal.cartDetails);
        calculateTotalAmount(cartLocal.cartDetails);
      }
    }
  };

  const addressHandler = async () => {
    let a = 0;
    if (localStorage.getItem("access_token")) {
      if (selectedAddress == a) {
        try {
          const response = await services.myprofile.GET_MY_ADDRESS();

          setAddressList(response?.data?.data);
          a = response?.data?.data[0]?.id;

          const res = response?.data?.data.find(
            (item) => item.defaultAddress === true
          );
          setSelectedAddress(res?.id);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const handleCart = async (product, qtytype) => {
    if (localStorage.getItem("access_token")) {
      const cart = await services.cart.GET_CART();
      if (cart?.data?.discountAmount) {
        setDiscountID(cart?.data?.discountAmount?.id);
      }

      let cartDetails = [];
      if (cart?.data?.data?.cartDetail?.cartDetails) {
        cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
      }

      cartDetails?.push(product);
      let unique = cartDetails?.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t?.id === value?.id &&
              t?.selectedSize === value?.selectedSize &&
              t?.selectedColor === value?.selectedColor &&
              t?.fabric === value?.fabric
          )
      );

      let totalAmountArr = unique?.map((item) => {
        return item?.finalAmount * item?.selectedQuantity;
      });
      let totalQtyArr = unique?.map((item) => {
        return item?.selectedQuantity;
      });
      const sum = totalAmountArr.reduce((partialSum, a) => partialSum + a, 0);
      const qty = totalQtyArr.reduce((partialSum, a) => partialSum + a, 0);
      if (qtytype) {
        unique.map((item) => {
          if (
            item.id == product.id &&
            item.selectedColor == product.selectedColor &&
            item.selectedSize == product.selectedSize &&
            item.fabric === product.fabric
          ) {
            item.selectedQuantity = qtytype;
          }
          return item;
        });
      }
      let data = {
        cartDetail: { cartDetails: unique, discountId: DiscountID },
        totalAmount: sum,
        totalItems: unique.length,
        totalQuantity: qty,
        addressId: selectedAddress,
      };
      localStorage.setItem("cartItemsCount", unique.length);
      const updateCart = await services.cart.UPDATE_CART(data);
      toast.success("Cart updated!");
      cardData();
    } else {
      const cart =
        localStorage.getItem("cartDetail") &&
        JSON.parse(localStorage.getItem("cartDetail"));
      let cartDetails = [];
      if (cart) {
        cartDetails = cart.cartDetails;
      }
      cartDetails.push(product);
      const key = "id";
      const unique = cartDetails.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.id === value.id &&
              t.selectedSize === value.selectedSize &&
              t.selectedColor === value.selectedColor &&
              t.fabric === value.fabric
          )
      );

      let data = {
        cartDetail: { cartDetails: unique },
      };
      localStorage.setItem("cartItemsCount", unique.length);
      localStorage.setItem("cartDetail", JSON.stringify(data?.cartDetail));
      toast.success("Cart updated!");
      cardData();
    }
  };
  const increaseQuantity = (product) => {
    product.selectedQuantity = product.selectedQuantity + 1;
    handleCart(product, product.selectedQuantity);
  };
  const decreaseQuantity = (product) => {
    if (product.selectedQuantity == 1) {
      return;
    } else {
      product.selectedQuantity = product.selectedQuantity - 1;
      handleCart(product, product.selectedQuantity);
    }
  };
  const clearCart = async () => {
    if (localStorage.getItem("access_token")) {
      let data = {
        cartDetail: { cartDetails: [] },
        totalAmount: 0,
        totalItems: 0,
        totalQuantity: 0,
        addressId: selectedAddress,
      };
      localStorage.setItem("cartItemsCount", 0);
      const updateCart = await services.cart.UPDATE_CART(data);
      toast.success("Cart updated!");
      cardData();
    } else {
      let data = {
        cartDetail: { cartDetails: [] },
      };
      localStorage.setItem("cartDetail", JSON.stringify(data.cartDetail));
      localStorage.setItem("cartItemsCount", 0);
      toast.success("Cart updated!");
      cardData();
    }
  };
  const deleteFromCart = async (product) => {
    if (localStorage.getItem("access_token")) {
      let updatedCartData = [...updateCart];
      let index;
      updateCart.map((item, i) => {
        if (
          item.id == product.id &&
          item.selectedColor == product.selectedColor &&
          item.selectedSize == product.selectedSize &&
          item.fabric === product.fabric
        ) {
          index = i;
        }
      });

      updatedCartData.splice(index, 1);

      let data = {
        cartDetail: { cartDetails: updatedCartData },
        totalAmount: totalAmount,
        totalItems: updatedCartData.length,
        totalQuantity: totalQuantity,
        addressId: selectedAddress,
      };
      localStorage.setItem("cartItemsCount", updatedCartData.length);
      const updateCartData = await services.cart.UPDATE_CART(data);
      toast.success("Cart updated!");
      cardData();
    } else {
      let updatedCartData = [...updateCart];
      let index;
      updateCart.map((item, i) => {
        if (
          item.id == product.id &&
          item.selectedColor == product.selectedColor &&
          item.selectedSize == product.selectedSize &&
          item.fabric === product.fabric
        ) {
          index = i;
        }
      });
      updatedCartData.splice(index, 1);
      let data = {
        cartDetail: { cartDetails: updatedCartData },
      };

      localStorage.setItem("cartDetail", JSON.stringify(data.cartDetail));
      localStorage.setItem("cartItemsCount", updatedCartData.length);
      toast.success("Cart updated!");
      cardData();
    }
  };
  const isLoggedIn = localStorage?.getItem("access_token");

  const ApplyCoupon = async (e) => {
    e.preventDefault();
    const data = {
      couponcode: Discount,
    };
    const query = new URLSearchParams(data);
    try {
      const response = await services.Discount.GET_DISCOUNT(query);
      if (response) {
        setDiscountID(response?.data?.data?.id);
        setDiscountPer(response?.data?.data?.discount);
        setRemoveStatus(true);
        toast.success("Apply Coupon!");
        // await handleCart(updateCart[0]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid Coupon!");
    }
  };
  const ClearCoupon = async () => {
    setDiscount("");
    setDiscountID("");
    setDiscountPer(0);
    setRemoveStatus(false);
    setCouponDis(false);
    // await handleCart(updateCart[0]);
    toast.success("Coupon Remove!");
  };

  useEffect(() => {
    if (updateCart && updateCart?.length > 0) RemoveCoupon(updateCart[0]);
  }, [DiscountID]);
  const RemoveCoupon = async (product, qtytype) => {
    if (localStorage.getItem("access_token")) {
      const cart = await services.cart.GET_CART();
      if (cart?.data?.discountAmount) {
        // setDiscountID(cart?.data?.discountAmount?.id);
      }

      let cartDetails = [];
      if (cart?.data?.data?.cartDetail?.cartDetails) {
        cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
      }

      cartDetails?.push(product);
      let unique = cartDetails?.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t?.id === value?.id &&
              t?.selectedSize === value?.selectedSize &&
              t?.selectedColor === value?.selectedColor &&
              t?.fabric === value?.fabric
          )
      );

      let totalAmountArr = unique?.map((item) => {
        return item?.finalAmount * item?.selectedQuantity;
      });
      let totalQtyArr = unique?.map((item) => {
        return item?.selectedQuantity;
      });
      const sum = totalAmountArr.reduce((partialSum, a) => partialSum + a, 0);
      const qty = totalQtyArr.reduce((partialSum, a) => partialSum + a, 0);
      if (qtytype) {
        unique.map((item) => {
          if (
            item.id == product.id &&
            item.selectedColor == product.selectedColor &&
            item.selectedSize == product.selectedSize &&
            item.fabric === product.fabric
          ) {
            item.selectedQuantity = qtytype;
          }
          return item;
        });
      }

      let data = {
        cartDetail: { cartDetails: unique, discountId: DiscountID },
        totalAmount: sum,
        totalItems: unique.length,
        totalQuantity: qty,
        addressId: selectedAddress,
      };
      localStorage.setItem("cartItemsCount", unique.length);
      const updateCart = await services.cart.UPDATE_CART(data);
      toast.success("Cart updated!");
      cardData();
    } else {
      const cart =
        localStorage.getItem("cartDetail") &&
        JSON.parse(localStorage.getItem("cartDetail"));
      let cartDetails = [];
      if (cart) {
        cartDetails = cart.cartDetails;
      }
      cartDetails.push(product);
      const key = "id";
      const unique = cartDetails.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.id === value.id &&
              t.selectedSize === value.selectedSize &&
              t.selectedColor === value.selectedColor &&
              t.fabric === value.fabric
          )
      );

      let data = {
        cartDetail: { cartDetails: unique },
      };
      localStorage.setItem("cartItemsCount", unique.length);
      localStorage.setItem("cartDetail", JSON.stringify(data?.cartDetail));
      toast.success("Cart updated!");
      cardData();
    }
  };
  let totalAm;
  return (
    <>
      <Layout
        parent={t("Home")}
        sub={
          <>
            <Link href="/products" as={`/products`}>
              {t("Product")}
            </Link>
          </>
        }
        subChild={t("Cart")}
      >
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  {updateCart?.length > 0 ? "" : t("No Products")}

                  {isMobile ? (
                    <>
                      {updateCart &&
                        updateCart.map((product, j) => {
                          return (
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  // alignItems: "flex-start",
                                  marginBottom: "10px",
                                }}
                              >
                                <img
                                  src={`${imageUrl}${product.featuredImage}`}
                                  alt=""
                                  crossOrigin="anonymous"
                                  style={{
                                    maxWidth: "110px",
                                    marginRight: "20px",
                                  }}
                                />

                                <div>
                                  <h5>
                                    {/* <Link
                                      href={`/products/${product?.id}_${product?.productName}`}
                                      as={`/products/${product?.id}_${product?.productName}`}
                                    > */}
                                    <Link
                                      href={`/products/${product?.slug}`}
                                      as={`/products/${product?.slug}`}
                                    >
                                      <a>{product.productName}</a>
                                    </Link>
                                  </h5>
                                  <span
                                    style={{
                                      marginTop: "0px",
                                    }}
                                  >
                                    {" "}
                                    {product?.discountPercentage}% off{" "}
                                  </span>{" "}
                                  &nbsp;&nbsp;
                                  <span style={{ fontWeight: "bold" }}>
                                    {product?.discountPercentage != 0 &&
                                      "Limited Time Deal"}
                                  </span>
                                  <div style={{ marginTop: "0px" }}>
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Rs. {product?.finalAmount}
                                    </span>{" "}
                                    &nbsp;&nbsp; M.R.P.{" "}
                                    <s>{product?.totalPrice}</s>
                                  </div>
                                  {product?.selectedColor ||
                                  product?.selectedSize ? (
                                    <div style={{ marginTop: "0px" }}>
                                      {product?.selectedColor && (
                                        <div>
                                          {t("Color")} : &nbsp;
                                          <span
                                            className="d-inline-block rounded-circle ps-1 pe-0 m-0 mt-2"
                                            style={{
                                              border: "1px solid black",
                                              width: "12px",
                                              height: "12px",
                                              backgroundColor:
                                                product?.selectedColor,
                                            }}
                                          ></span>
                                        </div>
                                      )}
                                      {product?.selectedSize && (
                                        <div className="col -12">
                                          {t("Size")} : {product?.selectedSize}
                                        </div>
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                              {localStorage.getItem("access_token") && (
                                <div
                                  style={{
                                    marginTop: "10px",
                                    marginLeft: "3px",
                                  }}
                                  className="text-center"
                                >
                                  <span
                                    style={{
                                      marginTop: "10px",
                                      backgroundColor: "orange",
                                      padding: "10px",
                                    }}
                                  >
                                    <a
                                      onClick={(e) => decreaseQuantity(product)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="10"
                                        width="14"
                                        viewBox="0 0 448 512"
                                      >
                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                      </svg>
                                    </a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <span
                                      style={{
                                        fontSize: "20px",
                                        marginBottom: "2px",
                                      }}
                                    >
                                      {product.selectedQuantity}
                                    </span>
                                    &nbsp;&nbsp;
                                    <span>
                                      <a
                                        onClick={(e) =>
                                          increaseQuantity(product)
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          x="0px"
                                          y="0px"
                                          width="20"
                                          height="10"
                                          viewBox="0 0 24 26"
                                        >
                                          <path
                                            fill-rule="evenodd"
                                            d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                                          ></path>
                                        </svg>
                                      </a>
                                    </span>
                                  </span>

                                  <span
                                    style={{
                                      float: "right",
                                      marginRight: "10px",
                                      transform: "scale(1.6)",
                                    }}
                                  >
                                    <a
                                      onClick={(e) => deleteFromCart(product)}
                                      className="text-muted"
                                    >
                                      <i className="fi-rs-trash"></i>
                                    </a>
                                  </span>
                                </div>
                              )}
                              <hr />
                            </div>
                          );
                        })}
                      <div className="text-end">
                        {updateCart && updateCart.length > 0 && (
                          <a onClick={clearCart} className="text-muted">
                            <i className="fi-rs-cross-small"></i>
                            {t("Clear Cart")}
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
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
                          <th scope="col">{t("Fabric Name")}</th>
                          <th scope="col">{t("Price")}</th>
                          {localStorage.getItem("access_token") && (
                            <th scope="col">{t("Quantity")}</th>
                          )}
                          <th scope="col">{t("Subtotal")}</th>
                          <th scope="col">{t("Remove")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {updateCart &&
                          updateCart.map((product, j) => (
                            <tr key={j}>
                              <td
                                className="image product-thumbnail"
                                data-title={t("Image")}
                                // style={{marginLeft:"130px"}}
                              >
                                <img
                                  src={`${imageUrl}${product.featuredImage}`}
                                  alt=""
                                  crossOrigin="anonymous"
                                />
                              </td>
                              <td
                                className="product-des product-name"
                                data-title={t("Product Name")}
                              >
                                <h5 className="product-name">
                                  <Link
                                    // href="/products/[slug]"
                                    // as={`/products/${product?.id}`}
                                    href={`/products/${product?.slug}`}
                                    as={`/products/${product?.slug}`}
                                  >
                                    <a>{product.productName}</a>
                                  </Link>
                                </h5>
                                {product?.selectedColor ||
                                product?.selectedSize ? (
                                  <div className="row">
                                    {product?.selectedColor && (
                                      <div className="col-12">
                                        Color :
                                        <span
                                          className="d-inline-block rounded-circle ps-1 pe-0 m-0 mt-2"
                                          style={{
                                            border: "1px solid black",
                                            width: "12px",
                                            height: "12px",
                                            backgroundColor:
                                              product?.selectedColor,
                                          }}
                                        ></span>
                                      </div>
                                    )}
                                    {product?.selectedSize && (
                                      <div className="col -12">
                                        Size : {product?.selectedSize}
                                      </div>
                                    )}
                                  </div>
                                ) : null}
                              </td>

                              <td
                                className="Fabric name"
                                data-title={t("Fabric name")}
                              >
                                <span>{product?.fabric}</span>
                              </td>
                              <td className="price" data-title={t("Price")}>
                                <span>
                                  Rs.&nbsp;
                                  {product?.finalAmount}
                                </span>
                              </td>
                              {localStorage.getItem("access_token") && (
                                <>
                                  <td
                                    className="text-center"
                                    data-title={t("Quantity")}
                                  >
                                    <div className="detail-qty border radius m-auto">
                                      <a
                                        onClick={(e) =>
                                          increaseQuantity(product)
                                        }
                                        className="qty-up"
                                      >
                                        <i className="fi-rs-angle-small-up"></i>
                                      </a>

                                      <span className="qty-val">
                                        {product.selectedQuantity}
                                      </span>

                                      <a
                                        onClick={(e) =>
                                          decreaseQuantity(product)
                                        }
                                        className="qty-down"
                                      >
                                        <i className="fi-rs-angle-small-down"></i>
                                      </a>
                                    </div>
                                  </td>
                                </>
                              )}
                              <td
                                className="text-right"
                                data-title={t("Subtotal")}
                              >
                                <span>
                                  Rs.{" "}
                                  {(
                                    product.finalAmount *
                                    product.selectedQuantity
                                  ).toFixed(2)}
                                </span>
                              </td>
                              <td className="action" data-title={t("Remove")}>
                                <a
                                  onClick={(e) => deleteFromCart(product)}
                                  className="text-muted"
                                >
                                  <i className="fi-rs-trash"></i>
                                </a>
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td colSpan="12" className="text-end">
                            {updateCart && updateCart.length > 0 && (
                              <a onClick={clearCart} className="text-muted">
                                <i className="fi-rs-cross-small"></i>
                                {t("Clear Cart")}
                              </a>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="cart-action text-center">
                  <Link className={"btn"} href="/products" as={`/products`}>
                    <button className={"btn"}>
                      <i className="fi-rs-shopping-bag mr-10"></i>
                      {t("Continue Shopping")}
                    </button>
                  </Link>
                </div>
                <div className="divider center_icon mt-50 mb-50">
                  <hr />
                </div>
                <div className="row mb-50">
                  {updateCart &&
                    updateCart.length > 0 &&
                    addressList.length > 0 && (
                      <div className="heading_s1 mb-3">
                        <h4> {t("Select Address")}</h4>
                      </div>
                    )}
                  <div className="col-lg-6 col-md-12">
                    <form className="field_form shipping_calculator">
                      <div className="form-row">
                        <div className="form-group col-lg-12">
                          <div className="custom_select">
                            {updateCart &&
                              updateCart.length > 0 &&
                              addressList.length > 0 && (
                                <select
                                  className="form-control select-active"
                                  value={selectedAddress}
                                  onChange={(e) => {
                                    setSelectedAddress(e.target.value);
                                  }}
                                >
                                  <option value="">
                                    {t("Choose a option...")}
                                  </option>
                                  {addressList &&
                                    addressList.length > 0 &&
                                    addressList.map((item) => {
                                      return (
                                        <option value={item.id}>
                                          {item.address.address}
                                        </option>
                                      );
                                    })}
                                </select>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        {isLoggedIn && (
                          <div className="form-group col-lg-12">
                            {updateCart && updateCart.length > 0 && (
                              <Link href={"/myprofile?index=4"}>
                                <button className="btn  btn-sm w-100">
                                  <i className="fi-rs-shuffle mr-10"></i>
                                  {t("Add new address")}
                                </button>
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </form>
                    {isLoggedIn && updateCart && updateCart.length > 0 && (
                      <hr />
                    )}
                    {isLoggedIn && updateCart && updateCart.length > 0 && (
                      <form className="field_form shipping_calculator">
                        <div className="form-row">
                          <div className="form-group col-lg-12">
                            <div className="custom_select">
                              <input
                                placeholder={t("Enter Coupon Code")}
                                onChange={(e) => {
                                  setDiscount(e.target.value.trimStart());
                                  if (e.target.value.length > 0) {
                                    setCouponDis(true);
                                  }
                                  if (e.target.value.length == 0) {
                                    setCouponDis(false);
                                  }
                                }}
                                value={Discount}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 ">
                            <button
                              className="btn btn-sm w-100"
                              onClick={(e) => ApplyCoupon(e)}
                              disabled={!CouponDis}
                            >
                              {t("Apply Coupon")}
                            </button>
                          </div>
                          {RemoveStatus && (
                            <div className="form-group text-end">
                              <a onClick={ClearCoupon} className="text-muted">
                                <i className="fi-rs-cross-small"></i>
                                {t("Remove Coupon")}
                              </a>
                            </div>
                          )}
                        </div>
                      </form>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-12">
                    {updateCart && updateCart.length > 0 && (
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
                                    Rs. {totalAmount.toFixed(2)}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="cart_total_label">
                                  {t("Shipping")}
                                </td>
                                <td className="cart_total_amount">
                                  <i className="ti-gift mr-5"></i>
                                  {t("Free Shipping")}
                                </td>
                              </tr>
                              {DiscountPer != 0 && (
                                <tr>
                                  <td className="cart_total_label">
                                    {t("Discount Percentage")}
                                  </td>
                                  <td className="cart_total_amount">
                                    <i className="ti-gift mr-5"></i>
                                    {DiscountPer}%
                                  </td>
                                </tr>
                              )}
                              {DiscountPer != 0 && (
                                <tr>
                                  <td className="cart_total_label">
                                    {t("Discount Amount")}
                                  </td>
                                  <td className="cart_total_amount">
                                    <strong>
                                      <span className="font-xl fw-900 text-brand">
                                        Rs.
                                        <s>
                                          {" "}
                                          {DiscountPer == 0
                                            ? totalAmount
                                            : (
                                                (totalAmount * DiscountPer) /
                                                100
                                              ).toFixed(2)}
                                        </s>
                                      </span>
                                    </strong>
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td className="cart_total_label">
                                  {t("Total")}
                                </td>
                                <td className="cart_total_amount">
                                  <strong>
                                    <span className="font-xl fw-900 text-brand">
                                      Rs.
                                      {(DiscountPer == 0
                                        ? totalAmount
                                        : totalAmount * (1 - DiscountPer / 100)
                                      ).toFixed(2)}
                                    </span>
                                  </strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {isLoggedIn ? (
                          <a
                            onClick={() => {
                              if (selectedAddress) {
                                router.push(`/Continue?id=${selectedAddress}`);
                              } else {
                                if (addressList.length > 0) {
                                  toast.error("Choose your address");
                                } else {
                                  toast.error("Add your address");
                                }
                              }
                            }}
                            className="btn d-block"
                          >
                            {t("Continue Order")}
                          </a>
                        ) : (
                          <Link href="/login" as={`/login`}>
                            <a className="btn ">
                              <i className="fi-rs-box-alt mr-10"></i>
                              {t("Proceed to Login")}
                            </a>
                          </Link>
                        )}
                      </div>
                    )}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
