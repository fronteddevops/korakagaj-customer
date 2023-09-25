
import SingleProduct from "../ecommerce/SingleProduct";

const FeaturedTab = ({ products }) => {
    const showItem= 8
    return (
        <>
            {products.slice(0, showItem).map((product, i) => (
                <div className="col-lg-3 col-md-4 col-12 col-sm-6" key={i}>
                {console.log("=====================================product",product)}
                    <SingleProduct product={product} />
                </div>
            ))}
            {/* {products.map((product, i) => (
                <div className="col-lg-3 col-md-4 col-12 col-sm-6" key={i}>
                {console.log("=====================================product",product)}
                    <SingleProduct product={product} />
                </div>
            ))} */}
        </>
    );
};

export default FeaturedTab;
