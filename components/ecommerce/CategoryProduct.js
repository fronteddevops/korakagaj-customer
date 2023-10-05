import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../redux/action/productFiltersAction";
import Form from "react-bootstrap/Form";
import services from "../../services";
import { useEffect, useState } from "react";

const CategoryProduct = ({ updateProductCategory }) => {
  const [category, setCategory] = useState([]);
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
  //get category
  const getCategroy = async () => {
    try {
      const response = await services.category.GET_CATEGORY();
      if (response) {
        setCategory(response?.data?.data?.rows);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getCategroy()
  },[])
 
  return (
    <>
      <Form>

        <ul className="categories">
        <Form.Check // prettier-ignore
            type={"checkbox"}
            id={`default-all`}
            label={`All`}
            checked
            className="text-brand fw-700"
          />
        {category && category.map((item)=>(
            <Form.Check // prettier-ignore
            type={"checkbox"}
            id={`default-Jeans`}
            label={item?.categoryName}
          />
        ))}
         

        

        
        </ul>
      </Form>
    </>
  );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
