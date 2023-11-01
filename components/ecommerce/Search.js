
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import services from "../../services";
import Link from "next/link";
import nextConfig from "../../next.config";
import { useTranslation } from "react-i18next";
const Search = () => {
  const { t } = useTranslation("common");
    const [searchTerm, setSearchTerm] = useState("");
    const [prodcut,setProdcut]=useState([])
    const router = useRouter();
    const imageUrl=nextConfig.BASE_URL_UPLOADS
    const Router=useRouter()
    // Define your useEffect for specific side effects
    useEffect( () => {
        // You can put your side effects logic here
        // For example, you can perform some action when searchTerm changes
        {searchTerm.length>0   &&    searchProduct()}
        
     
    }, [searchTerm]);

    

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

        setProdcut(response?.data?.data?.rows)
    }
  } catch (error) {
    console.log(error)
  }
    };


    const handleSearch=(e)=>{
      if (e.target.value !== "") {
        setSearchTerm(e.target.value);
      } else if (e.target.value === "") {
        setSearchTerm(""); // Clear the search term
        setProdcut([]); // Clear search results
      }
    }
    return (
      <div>
  
    <span>
      <input
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={(e)=>{
          if(e.key==="Enter"){
            Router.push(`/products?searchProdcut=${e.target.value}`)
          }
        }}
        type="text"
        placeholder={t("Search")}
      />
    </span>

    {prodcut?.length > 0 ? (
  <div style={{ position: "absolute", width: "600px", zIndex: "5" }}>
    <div className="card bg-white">
    <ul className="list-group list-group-flush">
  {prodcut?.map((product, index) => (
    <li className="list-group-item bg-white" key={index}>
      <Link href="/products[slug]" as={`/products/${product?.id}`}>
        <a>
          <div style={{ display: 'flex' }}>
            <img
              className="default-img"
              src={imageUrl + product?.featuredImage}
              crossOrigin="anonymous"
              alt=""
              height={50}
              width={50}
            /> &nbsp; &nbsp;
            <h4 style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {product.productName}
            </h4>
          </div>
        </a>
      </Link>
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
