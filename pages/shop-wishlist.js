import { connect } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import { addToCart } from "../redux/action/cart";
import nextConfig from "../next.config";
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
                        <div className="row">
                            <div className="col-12">
                                {wishlist.items.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table shopping-summery text-center">
                                            <thead>
                                                <tr className="main-heading">
                                                    <th scope="col" colSpan="2">
                                                        Product
                                                    </th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">
                                                        Stock Status
                                                    </th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {wishlist.items.map(
                                                    (product) => (
                                                        <tr>
                                                            <td className="image product-thumbnail">
                                                                  <img
                                src={imageUrl + product.featuredImage}
                                crossOrigin="an"
                                alt=""
                                className="img-fluid"
                                width="70"
                              />
                                                            </td>

                                                            <td className="product-des product-name">
                                                                <h5 className="product-name">
                                                                    <a>
                                                                        
                                                                            {product.productName}
                                                                        
                                                                    </a>
                                                                </h5>
                                                                <p className="font-xs">
                                                                {product.description}
                                                                </p>
                                                            </td>
                                                            <td
                                                                className="price"
                                                                data-title="Price"
                                                            >
                                                                 <span>${calculateTotalPrice(product)}</span>
                                                            </td>
                                                            <td
                                                                className="text-center"
                                                                data-title="Stock"
                                                            >
                                                                {product.stock ===
                                                                0 ? (
                                                                    <span className="text-danger font-weight-bold">
                                                                        Out of
                                                                        stock
                                                                    </span>
                                                                ) : (
                                                                    <span className="color3 font-weight-bold">
                                                                        In Stock
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td
                                                                className="text-right"
                                                                data-title="Cart"
                                                            >
                                                                {product.stock ===
                                                                0 ? (
                                                                    <button className="btn btn-sm btn-secondary">
                                                                        <i className="fi-rs-headset mr-5"></i>
                                                                        Contact
                                                                        Us
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="btn btn-sm"
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            handleCart(
                                                                                product
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fi-rs-shopping-bag mr-5"></i>
                                                                        Add to
                                                                        cart
                                                                    </button>
                                                                )}
                                                            </td>
                                                            <td
                                                                className="action"
                                                                data-title="Remove"
                                                            >
                                                                <a
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteFromWishlist(
                                                                            product.id
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fi-rs-trash"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                        <div className="text-right">
                                            <span
                                                className="clear-btn"
                                                onClick={clearWishlist}
                                            >
                                                Clear All
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <h4 className="mb-0">No Products</h4>
                                )}
                            </div>
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
