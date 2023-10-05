import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../redux/action/productFiltersAction";

const BrandFilter = ({ updateProductFilters }) => {
    const brands = [
        {value: "back"},
        {value: "red"},
        {value: "orange"},
        {value: "yellow"},
    ];


    const [selectedBrands, setBrands] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const filters = {
            brand: selectedBrands,
        };

        updateProductFilters(filters);
    }, [selectedBrands]);

    const handleClick = (i, target) => {
        setBrands(target);
        setActive(active == i ? 0 : i);
    };

    return (
        <>
        <ul className="categor-list">
        {brands.map((tag, i) => (
                    <li onClick={() => handleClick(i, tag.value)} key={i}>
                        <a
                            className={
                                active == i
                                    ? "cat-item text-brand"
                                    : "cat-item text-muted"
                            }
                        >
                            {i == 0 ? "All" : `${tag.value}`}
                        </a>
                    </li>
                ))}
        </ul>
          
        </>
    );
};

const mapStateToProps = (state) => ({
    products: state.products.items,
});

const mapDidpatchToProps = {
    updateProductFilters,
};

export default connect(mapStateToProps, mapDidpatchToProps)(BrandFilter);
