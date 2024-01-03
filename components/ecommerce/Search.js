import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import services from "../../services";
import nextConfig from "../../next.config";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
const Search = () => {
  const { t } = useTranslation("common");
  const [searchTerm, setSearchTerm] = useState("");
  const [prodcut, setProdcut] = useState([]);
  const router = useRouter();
  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  const Router = useRouter();
  useEffect(() => {
    {
      searchTerm.length > 2 && searchProduct();
    }
  }, [searchTerm]);

  const navigate = async (productId) => {
    await router.push("/products/[slug]", `/products/${productId}`);
  };
  const searchProduct = async () => {
    try {
      const response = await services.searchProdcut.SEARCH_PRODCUT(searchTerm);
      if (response) {
        setProdcut(response?.data?.data?.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    if (e.target.value !== "") {
      setSearchTerm(e.target.value);
    } else if (e.target.value === "") {
      setSearchTerm("");
      setProdcut([]);
    }
  };

  const handleCart = async (product) => {
    // const fabricPriceString = fabricPrice && JSON.parse(fabricPrice);
    // product.basePrice = fabricPriceString || product.basePrice;
    const color = JSON?.parse(product?.colour);
    const size = JSON?.parse(product.size);
    product.selectedColor = color[0];
    product.selectedSize = size[0];
    product.selectedQuantity = 1;
    if (localStorage.getItem("access_token")) {
      const cart = await services.cart.GET_CART();
      let cartDetails = [];
      if (cart?.data?.data?.cartDetail?.cartDetails) {
        cartDetails = cart?.data?.data?.cartDetail?.cartDetails;
      }
      cartDetails?.push(product);
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
      const updateCart = await services.cart.UPDATE_CART(data);

      toast.success("Add to Cart!");
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
      localStorage.setItem("cartDetail", JSON.stringify(data.cartDetail));
      toast.success("Add to Cart!");
    }
  };
  return (
    <div>
      <span>
        <input
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/products?searchProdcut=${e.target.value}`);
              setSearchTerm("");
              setProdcut([]);
            }
          }}
          type="text"
          placeholder={t("Search")}
        />
      </span>

      {prodcut?.length > 0 && (
        <div style={{ position: "absolute", width: "685px", zIndex: "5" }}>
          <div className="card bg-white">
            <ul className="list-group list-group-flush">
              {prodcut?.map((product, index) => (
                <li className="list-group-item bg-white" key={index}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      <img
                        className="default-img"
                        src={imageUrl + product?.featuredImage}
                        crossOrigin="anonymous"
                        alt=""
                        height={50}
                        width={50}
                      />
                      &nbsp; &nbsp;
                      <div>
                        <a
                          onClick={() => navigate(product?.id)}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "12px",
                          }}
                        >
                          <h4
                            style={{
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {product.productName}
                          </h4>
                          &nbsp;&nbsp;&nbsp;
                          <h4
                            style={{
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            ₹ {product.finalAmount}
                          </h4>
                          &nbsp;&nbsp;
                          <h4
                            style={{
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            ₹ <s>{product.totalPrice}</s>
                          </h4>
                          &nbsp;&nbsp;&nbsp;
                          <h4
                            style={{
                              maxWidth: "200px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              color: "#E74C26",
                            }}
                          >
                            {product.discountPercentage}% Off
                          </h4>
                        </a>
                      </div>
                    </div>

                    <div
                      className="product-action-1 show"
                      style={{ marginTop: "12px" }}
                    >
                      <a
                        aria-label="Add To Cart"
                        className="action-btn hover-up "
                        onClick={(e) => handleCart(product)}
                      >
                        <i
                          className="fi-rs-shopping-bag-add"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
