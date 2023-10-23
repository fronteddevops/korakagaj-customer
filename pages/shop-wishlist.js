import { connect } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import { addToCart } from "../redux/action/cart";
import nextConfig from "../next.config";
import SingleProduct from "../components/ecommerce/SingleProduct";

import {
    clearWishlist,
    closeWishlistModal,
    deleteFromWishlist
} from "../redux/action/wishlistAction";

const Wishlist = ({
    wishlist,
    clearWishlist,
    closeWishlistModal,
    deleteFromWishlist,
    addToCart,
}) => {
    const imageUrl = nextConfig.BASE_URL_UPLOADS;

    const handleCart = (product) => {
        addToCart(product);
        toast.success("Add to Cart !");
    };
    const calculateTotalPrice = (product) => {
        let itemTotalPrice = 0; // Initialize totalPrice to 0
    
        const basePrice = product.totalPrice || 0; // Ensure basePrice is a number or set it to 0
        const discountPercentage = product.discountPercentage || 0; // Ensure discountPercentage is a number or set it to 0
        const discountAmount = (basePrice * discountPercentage) / 100;
        itemTotalPrice = basePrice - discountAmount;
        return itemTotalPrice; // Return the calculated total price
      };
    return (
        <>
            <Layout parent="Home" sub="Shop" subChild="Wishlist">
                <section className="mt-50 mb-50">
                    <div className="container">
                    <div className="row product-grid-3">
                 

                
                      {wishlist.items?.map((item, i) => (
                        <div
                          className="col-lg-3 col-md-3 col-6 col-sm-6"
                          key={i}
                        >
                          <SingleProduct
                            product={item}
                          />
                          {/* <SingleProductList product={item}/> */}
                        </div>
                      ))}
                </div>
                       
                    </div>
                </section>
            </Layout>
        </>
    );
};

const mapStateToProps = (state) => ({
    wishlist: state.wishlist,
});

const mapDispatchToProps = {
    closeWishlistModal,
    deleteFromWishlist,
    clearWishlist,
    addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
