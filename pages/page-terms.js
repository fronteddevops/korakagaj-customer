import { useTranslation } from "react-i18next";
import BlogSidebar from "../components/elements/BlogSidebar";
import Layout from "../components/layout/Layout";
import Link from "next/link";

function Terms() {
    const { t} = useTranslation("common");
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
                                            <span className="h6">
                                            {t("ThisWebsite")}
                                            </span>
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











                                        <h4>{t("Governing Law")}</h4>
                                        <p>{t("These Terms shall be governed and construed in accordance with the laws of Viet Nam, without regard to its conflict of law provisions.")}</p>
                                        <p>{t("Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.")}</p>
                                        <h4>{t("Changes")}</h4>
                                        <p>{t("We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.")}</p>
                                        <p>{t("By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.")}</p>
                                        <h4>{t("Contact Us")}</h4>
                                        <p>
                                            {t("If you have any questions about these Terms, please")}
                                            <Link href="/page-contact">
                                                <a>{t("Contact Us")}</a>
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 primary-sidebar sticky-sidebar">
                                <BlogSidebar />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Terms;
