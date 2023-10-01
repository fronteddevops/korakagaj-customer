import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../redux/action/productFiltersAction";
import Form from 'react-bootstrap/Form';

const BrandFilter = ({ updateProductFilters }) => {
    const brands = [
        {value: "All"},
        {value: "Red"},
        {value: "Blue"},
        {value: "Green"},
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
                        <Form.Check // prettier-ignore
                        type={'checkbox'}
                        id={`default-checkbox`}
                        label={`${tag.value}`}
                        checked={tag.value == 'All'}
                        className={`text-brand ${tag.value == 'All' && 'fw-700'}`}
                    />
                       
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
