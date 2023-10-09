import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateProductFilters } from "../../redux/action/productFiltersAction";
import Form from 'react-bootstrap/Form';

const BrandFilter = ({ updateProductFilters }) => {
    const brands = [
      
        {value: "Red"},
        {value: "Blue"},
        {value: "Green"},
    ];

    const [selectedBrands, setSelectedBrands] = useState("");
console.log("setSelectedBrands",selectedBrands)
    useEffect(() => {
        const filters = {
            brand: selectedBrands,
        };

        updateProductFilters(filters);
    }, [selectedBrands]);

    const handleCheckboxChange = (value) => {
        if (value) {
            // If "All" is selected, clear the selectedBrands array
            setSelectedBrands(value);
        } else {
            // If another brand is selected, update the selectedBrands array
            if (selectedBrands.includes(value)) {
                setSelectedBrands(selectedBrands.filter(brand => brand !== value));
            } else {
                setSelectedBrands([...selectedBrands, value]);
            }
        }
    };

    return (
        <>
            <ul className="categor-list">
                {brands.map((tag, i) => (
                    <li onClick={() => handleCheckboxChange(tag.value)} key={i}>
                        <Form.Check
                            type={'checkbox'}
                            id={`checkbox-${tag.value}`}
                            label={tag.value}
                            checked={selectedBrands.includes(tag.value)}
                            className={`text-brand ${tag.value === 'All' && 'fw-700'}`}
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

const mapDispatchToProps = {
    updateProductFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandFilter);
