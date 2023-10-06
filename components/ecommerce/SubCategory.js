import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateProductCategory } from "../../redux/action/productFiltersAction";
import Form from "react-bootstrap/Form";
import services from "../../services";
import { useEffect, useState } from "react";


const CategoryProduct = ({ updateProductCategory }) => {
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log('hkkkkkkkkkkkkkkkkkkkhkkkkkkkkk',selectedCategories)
  const removeSearchTerm = () => {
    router.push({
      pathname: "/products",
    });
  };

  const toggleCategory = (categoryName) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryName)) {
        // If the category is already selected, remove it
        return prevSelectedCategories.filter((category) => category !== categoryName);
      } else {
        // If the category is not selected, add it
        return [...prevSelectedCategories, categoryName];
      }
    });
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

  const toggleSelectAll = () => {
    setSelectAll((prevState) => !prevState);
    // Update the selectedCategories state based on the new state of selectAll
    if (!selectAll) {
      // If "Select All" was unchecked, select all categories
      setSelectedCategories(category.map((item) => item.categoryName));
    } else {
      // If "Select All" was checked, deselect all categories
      setSelectedCategories([]);
    }
  };
  updateProductCategory(selectedCategories)
  useEffect(()=>{
    getCategroy()
   
  },[])

  return (
    <>
    <Form>
    <ul className="categories">
    <Form.Check
      type="checkbox"
      id={`default-all`}
      label={`All`}
      checked={selectAll}
      onChange={toggleSelectAll}
      className="text-brand fw-700"
    />
    {category &&
      category.map((item) => (
        <Form.Check
          key={item.id}
          type="checkbox"
          id={`default-${item.categoryName}`}
          label={item.categoryName}
          onChange={() => toggleCategory(item.categoryName)}
          checked={selectedCategories.includes(item.categoryName)}
        />
      ))}
  </ul>
    </Form>
  </>
  );
};

export default connect(null, { updateProductCategory })(CategoryProduct);
