import { useTranslation } from "react-i18next";
import Layout from "../components/layout/Layout";
import BlogSidebar from "./../components/elements/BlogSidebar";
import Link from "next/link";

function Privacy() {
  const { t } = useTranslation("common");
  return (
    <>
      <Layout parent={t("Home")} sub={t("Pages")} subChild={t("Privacy")}>
        <section className="mt-50 mb-50">
          <div className="container">
            <div className="row">
            
            <div className="col-lg-12">
  <div className="single-page pr-30">
                    
                  <div className=" style-2">
                    <h2>{t("Privacy&Policyforkorakagajcom")}</h2>
                    <h2>{t("Tex3DInnovativesPvtLtd")}</h2>
                    </div>
                  <div className="text-end">
                  <span  
                    style={{textAlign:"end"}}>
                        {t("EffectiveDate")} : 06/07/2023
                      </span>
                  </div>
                
                  <div className="single-content">
                    <h4>{t("1.Introduction")}</h4>
                    <span className="post-by">{t("Welcometo")}</span>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("2.InformationWeCollect")}</h4>
                    <span className="post-by">{t("Toprovide")}</span>
                    <br></br>
                    <br></br>

                    <span className="post-by">{t("a.Personal")}</span>
                    <br></br>
                    <span className="post-by">{t("b.Design")}</span>
                    <br></br>
                    <span className="post-by">{t("c.Transaction")}</span>
                    <br></br>
                    <span className="post-by">{t("d.Communication")}</span>
                    <br></br>
                    <span className="post-by">{t("e.Device")}</span>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("3.HowWeUseYourInformation")}</h4>
                    <span className="post-by">{t("WeUtilize")}</span>
                    <br></br>
                    <br></br>

                    <span className="post-by">{t("a.Providing")}</span>
                    <br></br>
                    <span className="post-by">{t("b.Communication")}</span>
                    <br></br>
                    <span className="post-by">{t("c.Personalization")}</span>
                    <br></br>
                    <span className="post-by">{t("d.Marketing")}</span>
                    <br></br>
                    <span className="post-by">{t("e.Analytics")}</span>
                    <br></br>
                    <span className="post-by">{t("f.Legal")}</span>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("4.InformationSharing")}</h4>
                    <span className="post-by">{t("Wemay")}</span>
                    <br></br>
                    <br></br>

                    <span className="post-by">{t("a.ServiceProviders")}</span>
                    <br></br>
                    <span className="post-by">{t("b.BusinessTransfers")}</span>
                    <br></br>
                    <span className="post-by">{t("c.LegalCompliance")}</span>
                    <br></br>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("5.DataSecurity")}</h4>
                    <span className="post-by">{t("Weprioritize")}</span>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("6.Cookies")}</h4>
                    <span className="post-by">{t("Ourwebsite")}</span>
                  </div>
                  <br></br>

                  <div className="single-content">
                    <h4>{t("7.ChildrensPrivacy")}</h4>
                    <span className="post-by">{t("Ourservices")}</span>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("8.ChangestothisPolicy")}</h4>
                    <span className="post-by">{t("Wereserve")}</span>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("9.ContactUs")}</h4>
                    <span className="post-by">{t("Ifyou")}</span>
                    <br></br>
                    <br></br>
                    <span className="post-by">{t("Email")}</span>
                    <br></br>
                    <span className="post-by">{t("Address")}</span>
                    <br></br>
                    <br></br>
                    <span className="post-by">
                      {t("LastUpdated")} : 02/03/2023
                    </span>
                    <br></br>
                    <br></br>
                    <span className="post-by">{t("Tex3D")}</span>
                    <br></br>
                    <span className="post-by">{t("Gadwal")}</span>
                    <br></br>
                    <span className="post-by">{t("INDIA")}</span>
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

export default Privacy;
