import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../redux/action/productFiltersAction";
import Form from 'react-bootstrap/Form';

const CategoryProduct = ({ updateProductCategory }) => {
    const router = useRouter();

    const removeSearchTerm = () => {
        router.push({
            pathname: "/products",
        });
    };

    const selectCategory = (e, category) => {
        e.preventDefault();
        removeSearchTerm();
        updateProductCategory(category);
        // router.push('/')
    };
    return (
        <>
         <Form>
            <ul className="categories">
                
                    <Form.Check // prettier-ignore
                        type={'checkbox'}
                        id={`default-all`}
                        label={`All`}
                        checked
                        className="text-brand fw-700"
                    />
              
                
                <Form.Check // prettier-ignore
                        type={'checkbox'}
                        id={`default-Jeans`}
                        label={`Round Neck`}
                    />
                   
                
                <Form.Check // prettier-ignore
                        type={'checkbox'}
                        id={`default-Shoe`}
                        label={`Collar`}
                    />
                  
              
               
            </ul>
            </Form>
        </>
    );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
