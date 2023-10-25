import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import services from "../../services";
import Link from "next/link";
const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [prodcut,setProdcut]=useState([])
    const router = useRouter();

    // Define your useEffect for specific side effects
    useEffect(() => {
        // You can put your side effects logic here
        // For example, you can perform some action when searchTerm changes
        {searchTerm.length>0  && searchProduct()}
        
        console.log("searchTerm has changed:", searchTerm);
    }, [searchTerm]);

    const handleSearch = () => {
        console.log("click");
        router.push({
            pathname: "/products",
            query: {
                search: searchTerm,
            },
        });
        setSearchTerm("");
    };

    const handleInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    const searchProduct = async () => {
    
  try {
    const response= await services.searchProdcut.SEARCH_PRODCUT(searchTerm)
    if(response){
        console.log("======================",response)
        setProdcut(response?.data?.data?.rows)
    }
  } catch (error) {
    console.log(error)
  }
    };

    return (
        <div>
      <form>
      <input
  value={searchTerm}
  onKeyDown={handleInput}
  onChange={(e) => {
    if (e.target.value !== "") {
      setSearchTerm(e.target.value);
    } else if (e.target.value === "") {
      setSearchTerm(""); // Clear the search term
      setProdcut([]); // Clear search results
    }
  }}
  type="text"
  placeholder="Search"
/>

      </form>
      {prodcut?.length > 0 ? (
  <div style={{ position: "absolute", width: "600px", zIndex: "5" }}>
    <div className="card bg-white">
      <ul className="list-group list-group-flush">
        {prodcut?.map((product, index) => (
          <li className="list-group-item bg-white" key={index}>
            <Link href="/products/[slug]" as={`/products/${product?.id}`}>
<a>
<h4>{product.productName}</h4>
</a>
</Link>
            {/* Additional content can be added here */}
          </li>
        ))}
      </ul>
    </div>
  </div>
) : null}
</div>

    )
};

export default Search;
