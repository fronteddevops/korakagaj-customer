import { useTranslation } from "react-i18next";
import BlogSidebar from "../components/elements/BlogSidebar";
import Layout from "../components/layout/Layout";
import Link from "next/link";

function Terms() {
  const { t } = useTranslation("common");
  return (
    <>
      <Layout parent={t("Home")} sub={t("Pages")} subChild={t("Terms")}>
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="single-page pr-30 mb-lg-0 mb-sm-5">
                  <div className="single-header style-2">
                    <h2>{t("Terms of Service")}</h2>
                    <div className="entry-meta meta-1 font-xs mt-15 mb-15">
                      <span className="h6">{t("ThisWebsite")}</span>
                    </div>
                  </div>
                  <figure className="single-thumbnail">
                    <img src="assets/imgs/blog/blog-10.jpg" alt="" />
                  </figure>
                  <div className="single-content">
                    <h4>{t("Privacy Policy")}</h4>

                    <span className="h6">{t("OurPrivacy")}</span>

                    <h4>{t("Use of This Site")}</h4>
                    <span className="h6">{t("SubjectToYour")}</span>
                    <span className="h6">{t("Youmaynot")}</span>
                    <br />
                    <br />

                    <div className="h6">{t("Youaregranted")}</div>
                  
                  </div>

                  <div className="single-content">
                    <h4>{t("Account")}</h4>
                    <span className="h6">{t("In order")}</span>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-3 primary-sidebar sticky-sidebar">
                                <BlogSidebar />
                            </div> */}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Terms;
