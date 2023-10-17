
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import nextConfig  from '../next.config';
import services from '../services';
import { useEffect, useState } from 'react';
function Categories() {
    const [categories,setCategories]=useState([])
    const getCategories= async()=>{
        try {
            const response =await services.category.GET_CATEGORY()
            if(response){
         setCategories(response?.data?.data?.rows)
            }
        } catch (error) {
           console.log(error)
        }
    }
   useEffect(()=>{
       getCategories()
   },[Categories])
     
   const imageUrl=nextConfig.BASE_URL_UPLOADS
    return (
        <>
            <Layout parent="Home" sub="Categories" subChild="List">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            {categories.map((item, i) => (
                                <div className="col-lg-2 mb-20" key={i}>
                                    <div className="card-1">
                                        <figure className=" img-hover-scale overflow-hidden">
                                            <Link href={`/products?id=${item.id}`} >
                                            <a>
                                                    <img
                                                        src={imageUrl+item.image}
                                                        alt=""
                                                     
                                                        crossOrigin='anonymous'
                                                    />
                                                </a>
                                            </Link>
                                        </figure>
                                        <h5>
                                            <Link href="/products">
                                                <a>{item.categoryName}</a>
                                            </Link>
                                        </h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    );
}

export default Categories;
