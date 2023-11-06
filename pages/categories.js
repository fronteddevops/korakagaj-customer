
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
            <Layout parent={t("Home")} sub={<a  href="/"> <>{t("Categories")}</></a>} subChild={t("List")}>
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            {categories.map((item, i) => (
                                <div className="col-lg-2 mb-20" key={i}>
                                    <div className="card-1">
                                        <figure className=" img-hover-scale overflow-hidden">
                                        <Link as={`/products?categoryId=${item.id}&categoryName=${item.categoryName} `} href={`/products/categoryId=${item.id}`}  >
                                    <a>
                                        <img
                                            src={ imageUrl+item.image}
                                            alt=""
                                            crossOrigin="anonymous"
                                               style={{ width: '200px', height: '150px', objectFit: 'cover' }}
                                        />
                                    </a>
                                </Link>
                                        </figure>
                                        <h5>
                                        <Link as={`/products?categoryId=${item.id}&categoryName=${item.categoryName} `} href={`/products/categoryId=${item.id}`}  >
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
