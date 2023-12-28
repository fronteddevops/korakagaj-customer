import { connect } from "react-redux";
import Layout from "../components/layout/Layout";
import nextConfig from "../next.config";
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import services from "../services";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
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

  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  const [updateCart, setUpdateCart] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [getadressUers, setGetaddress] = useState([]);
  const [Address, setAddress] = useState("");
  const [Data, setData] = useState([]);
  const [DiscountPer, setDiscountPer] = useState("");
  const [SubTotal, setSubTotal] = useState("");
  const [DiscountAmo, setDiscountAmo] = useState("");
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
    setSubTotal(sum);

    console.log(sum);
    setTotalQuantity(qty);
  };
  const getadress = async () => {
    try {
      const response = await services.myprofile.GET_MY_ADDRESS();
      if (response) {
        setGetaddress(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cardData();
    addressHandler();
    getadress();
  }, []);
  const cardData = async () => {
    if (localStorage.getItem("access_token")) {
      try {
        const response = await services.cart.GET_CART();
        console.log("1", response?.data?.data?.cartDetail?.cartDetails);
        console.log(response.data);
        if (response) {
          setUpdateCart(response?.data?.data?.cartDetail?.cartDetails);
          calculateTotalAmount(response?.data?.data?.cartDetail?.cartDetails);
        }

        if (response.data.discountAmount) {
          setDiscountPer(response.data.discountAmount?.discount);
          const DisAmt = JSON.parse(response?.data?.data?.discountCode);
          setDiscountAmo(DisAmt);
          // setSubTotal(JSON.parse(response?.data?.data?.totalAmount));
          const payableAmount =
            JSON.parse(response?.data?.data?.totalAmount) -
            response?.data?.data?.discountCode;
          // setTotalAmount(payableAmount);
        } else {
          // setSubTotal(response?.data?.data?.totalAmount);
          // setTotalAmount(response.data.data.totalAmount);
        }
      } catch (error) {
        console.error(error);
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
    if (localStorage.getItem("access_token")) {
      try {
        const response = await services.myprofile.GET_MY_ADDRESS();

        setAddressList(response?.data?.data);
        if (response?.data?.data?.length > 0) {
          response?.data?.data?.map((item) => {});
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCart = async (product) => {
    if (localStorage.getItem("access_token")) {
      const cart = await services.cart.GET_CART();
      const DicountID = cart?.data?.discountAmount?.id;
      let cartDetails = [];
      if (cart?.data?.data?.cartDetail?.cartDetails) {
        cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
      }
      cartDetails?.push(product);
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
      // const unique = [
      //   ...new Map(cartDetails?.map((item) => [item[key], item])).values(),
      // ];
      let totalAmountArr = unique.map((item) => {
        return item.finalAmount * item.selectedQuantity;
      });
      let totalQtyArr = unique.map((item) => {
        return item.selectedQuantity;
      });
      const sum = totalAmountArr.reduce((partialSum, a) => partialSum + a, 0);
      const qty = totalQtyArr.reduce((partialSum, a) => partialSum + a, 0);
      let data = {
        cartDetail: { cartDetails: unique, discountId: DicountID },
        totalAmount: sum,
        totalItems: unique.length,
        totalQuantity: qty,
      };
      console.log("UPDATE_CART");
      localStorage.setItem("cartItemsCount", unique.length);
      const updateCart = await services.cart.UPDATE_CART(data);
      toast.success("Cart updated!");
      localStorage.setItem("cartItemsCount", 0);
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
      // const unique = [
      //   ...new Map(
      //     cartDetails && cartDetails?.map((item) => [item[key], item])
      //   ).values(),
      // ];

      let data = {
        cartDetail: { cartDetails: unique },
      };

      localStorage.setItem("cartDetail", JSON.stringify(data?.cartDetail));
      toast.success("Cart updated!");
      cardData();
    }
  };

  const isLoggedIn = localStorage.getItem("access_token");
  async function checkoutHandler() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    await handleCart(updateCart[0]);
    const updateCartData = await services.cart.CHECKOUT();
    const userDetails = JSON.parse(localStorage.getItem("profile"));

    const options = {
      key: "rzp_test_ug6gBARp85Aq1j",
      currency: "INR",
      amount: updateCartData?.data?.totalAmount,
      order_id: updateCartData?.data?.razorpayPaymentDetails?.id,
      name: "KoraKagaj",
      description: "Thank you for ordering. Please initiate payment!",
      image:
        "http://korakagaj-dev.s3-website.ap-south-1.amazonaws.com/assets/imgs/theme/logo.svg",
      modal: {
        ondismiss: async () => {
          const data = {
            orderId: updateCartData?.data?.order?.id,
            paymentResponse: {
              id: updateCartData?.data?.razorpayPaymentDetails.id,
              status: "failed",
              amount: updateCartData?.data?.totalAmount,
            },
          };
          const response = await services.cart.PAYMENT_LOG(data);
          router.push("/failed");
        },
      },
      handler: function (response) {
        (async () => {
          const data = {
            orderId: updateCartData?.data?.order?.id,
            paymentResponse: {
              id: updateCartData?.data?.razorpayPaymentDetails.id,
              status: "paid",
              amount: updateCartData?.data?.totalAmount,
            },
          };
          try {
            const response = await services.cart.PAYMENT_LOG(data);

            router.push("/thankyou");
          } catch (err) {
            console.log(err);
          }
        })();
      },
      prefill: {
        name: userDetails.firstName,
        email: userDetails.email,
        phone_number: userDetails.phoneNumber,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const GET_MY_ADDRESS = async (IdAddress) => {
    try {
      const response = await services.myprofile.GET_MY_ADDRESS();
      setData(response?.data?.data.find((item) => item.id == IdAddress));
    } catch (error) {
      console.log(error);
    }
  };
  let IdAddress;
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const IdAddress = urlParams.get("id");
    setAddress(IdAddress);
    GET_MY_ADDRESS(IdAddress);
  }, []);

  return (
    <>
      <Layout
        parent={t("Home")}
        sub={
          <>
            <Link href="/products" as="/products">
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
                <div
                  className="cart-action text-Start"
                  style={{ marginBottom: "10px" }}
                >
                  <h3>{t("Preview Page")}</h3>
                </div>

                <div className="table-responsive">
                  {updateCart?.length > 0 ? "" : t("No Products")}
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
                        <th scope="col">{t("Quantity")}</th>
                        <th scope="col">{t("Subtotal")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {updateCart &&
                        updateCart.map((product, j) => {
                          return (
                            <tr key={j}>
                              <td
                                className="image product-thumbnail"
                                data-title="Image"
                              >
                                <img
                                  src={imageUrl + product.featuredImage}
                                  alt=""
                                  crossOrigin="anonymous"
                                />
                              </td>

                              <td
                                className="product-name"
                                data-title="Product Name"
                              >
                                <h5 className="product-name">
                                  <Link
                                    // href="/products/[slug]"
                                    // as={`/products/${product?.id}`}
                                    href={`/products/${product?.id}_${product?.productName}`}
                                    as={`/products/${product?.id}_${product?.productName}`}
                                  >
                                    <a>{product.productName}</a>
                                  </Link>
                                </h5>
                                {product?.selectedColor ||
                                product?.selectedSize ? (
                                  <div className="font-xs">
                                    {product?.selectedColor && (
                                      <>
                                        <div className="align-items-center row pe-0 ps-0 m-0">
                                          <div className="col pe-0 ps-0 m-0 p-0">
                                            <small className="mb-0 m-0">
                                              Color :
                                            </small>{" "}
                                            &nbsp;{" "}
                                            <span
                                              className="d-inline-block rounded-circle ps-1 pe-0 m-0 mt-2"
                                              style={{
                                                border: "1px solid black",
                                                width: "12px",
                                                height: "12px",
                                                backgroundColor:
                                                  product?.selectedColor,
                                              }}
                                            ></span>{" "}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {product?.selectedSize && (
                                      <small className="ml-md-2">
                                        Size: {product?.selectedSize}
                                      </small>
                                    )}
                                  </div>
                                ) : null}
                              </td>

                              <td
                                className="Fabric name"
                                data-title="Fabric name"
                              >
                                <span>{product?.fabric}</span>
                              </td>
                              <td className="price" data-title="Price">
                                <span>Rs. {product.finalAmount}</span>
                              </td>

                              <td className="text-center" data-title="Stock">
                                <div className="detail-qty border radius m-auto">
                                  <span className="qty-val">
                                    {product.selectedQuantity}
                                  </span>
                                </div>
                              </td>

                              <td className="text-right" data-title="SubTotal">
                                <span>
                                  Rs.{" "}
                                  {(
                                    product.finalAmount *
                                    product.selectedQuantity
                                  ).toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                <div className="divider center_icon mt-50 mb-50">
                  {/* <i className="fi-rs-fingerprint"></i> */}

                  <hr />
                </div>
                <div className="row mb-50">
                  <div className="col-lg-6 col-md-16">
                    <div className="col-lg-6">
                      {updateCart?.length > 0 && (
                        <div className="card mb-3 mb-lg-0">
                          <div className="card-header d-flex justify-content-between">
                            <h5 className="mb-0">{t("Select Address")}</h5>
                            {/* <h5 className="mb-0">{t("Selected Address")}</h5> */}
                          </div>

                          <div className="card-body">
                            <address>
                              {" "}
                              <span
                                style={{
                                  whiteSpace: "pre-wrap", // This property allows for line breaks
                                  wordWrap: "break-word", // This property allows for breaking words when needed
                                  overflowWrap: "break-word", // An alternative way to allow word breaking
                                  maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                }}
                              >
                                {Data?.address?.fullName}
                              </span>
                              <br />
                              <span
                                style={{
                                  whiteSpace: "pre-wrap", // This property allows for line breaks
                                  wordWrap: "break-word", // This property allows for breaking words when needed
                                  overflowWrap: "break-word", // An alternative way to allow word breaking
                                  maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                }}
                              >
                                {Data?.address?.phoneNumber}
                              </span>
                              <br />
                              <span
                                style={{
                                  whiteSpace: "pre-wrap", // This property allows for line breaks
                                  wordWrap: "break-word", // This property allows for breaking words when needed
                                  overflowWrap: "break-word", // An alternative way to allow word breaking
                                  maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                }}
                              >
                                {Data?.address?.houseNo}
                              </span>
                              <span
                                style={{
                                  whiteSpace: "pre-wrap", // This property allows for line breaks
                                  wordWrap: "break-word", // This property allows for breaking words when needed
                                  overflowWrap: "break-word", // An alternative way to allow word breaking
                                  maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                }}
                              >
                                {Data?.address?.address}
                              </span>
                              <br />
                              <span
                                style={{
                                  whiteSpace: "pre-wrap", // This property allows for line breaks
                                  wordWrap: "break-word", // This property allows for breaking words when needed
                                  overflowWrap: "break-word", // An alternative way to allow word breaking
                                  maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                }}
                              >
                                {Data?.address?.city}
                              </span>
                              <br />
                              <span
                                style={{
                                  whiteSpace: "pre-wrap", // This property allows for line breaks
                                  wordWrap: "break-word", // This property allows for breaking words when needed
                                  overflowWrap: "break-word", // An alternative way to allow word breaking
                                  maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                }}
                              >
                                {Data?.address?.pinCode}
                              </span>
                              <br />
                              <span
                                style={{
                                  whiteSpace: "pre-wrap", // This property allows for line breaks
                                  wordWrap: "break-word", // This property allows for breaking words when needed
                                  overflowWrap: "break-word", // An alternative way to allow word breaking
                                  maxWidth: "10ch", // Limit the text width to prevent excessive horizontal stretching
                                }}
                              >
                                {Data?.address?.state}
                              </span>
                            </address>
                          </div>
                        </div>
                      )}
                    </div>
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
                                  Rs. {SubTotal}
                                </span>
                              </td>
                            </tr>
                            {DiscountPer && (
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

                            {DiscountPer && (
                              <tr>
                                <td className="cart_total_label">
                                  {t("Discount Amount")}
                                </td>
                                <td className="cart_total_amount">
                                  <strong>
                                    <span className="font-xl fw-900 text-brand">
                                      Rs.{" "}
                                      <s>
                                        {(
                                          (totalAmount * DiscountPer) /
                                          100
                                        ).toFixed(2)}
                                      </s>
                                    </span>
                                  </strong>
                                </td>
                              </tr>
                            )}
                            {DiscountPer ? (
                              <tr>
                                <td className="cart_total_label">
                                  {t("Total")}
                                </td>
                                <td className="cart_total_amount">
                                  <strong>
                                    <span className="font-xl fw-900 text-brand">
                                      Rs.{" "}
                                      {(
                                        totalAmount -
                                        (totalAmount * DiscountPer) / 100
                                      ).toFixed(2)}
                                    </span>
                                  </strong>
                                </td>
                              </tr>
                            ) : (
                              <tr>
                                <td className="cart_total_label">
                                  {t("Total")}
                                </td>
                                <td className="cart_total_amount">
                                  <strong>
                                    <span className="font-xl fw-900 text-brand">
                                      Rs. {totalAmount?.toFixed(2)}
                                    </span>
                                  </strong>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-center">
                        {isLoggedIn ? (
                          <a
                            onClick={() => {
                              checkoutHandler();
                            }}
                            className="btn"
                          >
                            <i className="fi-rs-box-alt mr-10"></i>
                            {t("Proceed To CheckOut")}
                          </a>
                        ) : (
                          <a className={"btn"} href="/login">
                            <a className="btn ">
                              <i className="fi-rs-box-alt mr-10"></i>
                              {t("Proceed to Login")}
                            </a>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <div className="text-end"> */}

                  {/* </div> */}
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
