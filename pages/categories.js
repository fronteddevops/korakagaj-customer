import Link from "next/link";
import Layout from "../components/layout/Layout";
import nextConfig from "../next.config";
import services from "../services";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation("common");
  const getCategories = async () => {
    try {
      const response = await services.category.GET_CATEGORY_ALL();
      if (response) {
        setCategories(response?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, [Categories]);

  const imageUrl = nextConfig.BASE_URL_UPLOADS;
  return (
    <>
      <Layout
        parent={t("Home")}
        sub={
          <Link href="/">
            <>{t("Categories")}</>
          </Link>
        }
        subChild={t("List")}
      >
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              {categories.map((item, i) => (
                <div className="col-lg-2 mb-20" key={i}>
                  <div className="card-1">
                    <figure className=" img-hover-scale overflow-hidden">
                      <Link
                        as={`/products?categoryId=${item.id}&categoryName=${item.categoryName}`}
                        href={`/products/categoryId=${item.id}`}
                      >
                        <a>
                          <img
                            src={imageUrl + item.image}
                            alt=""
                            crossOrigin="anonymous"
                            style={{
                              width: "200px",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                        </a>
                      </Link>
                    </figure>
                    <h5 className=" text-break">
                      <Link
                        as={`/products?categoryId=${item.id}&categoryName=${item.categoryName}`}
                        href={`/products/categoryId=${item.id}`}
                      >
                        <a>
                          {item.categoryName}
                          </a>
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
