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
              <div className="col-lg-12">
                <div className="single-page pr-30 mb-lg-0 mb-sm-5">
                  <div className="single-header style-2">
                    <h2>{t("Terms of Service")}</h2>
                    <div className="entry-meta meta-1 font-xs mt-15 mb-15">
                      <span className="h6">{t("ThisWebsite")}</span>
                    </div>
                  </div>
                  {/* <figure className="single-thumbnail">
                    <img src="assets/imgs/blog/blog-10.jpg" alt="" />
                  </figure> */}
                  <div className="single-content">
                    <h4>{t("Privacy Policy")}</h4>

                    <span className="h6">{t("OurPrivacy")}</span>
<br></br><br></br>
                    <h4>{t("Use of This Site")}</h4>
                    <span className="h6">{t("SubjectToYour")}</span>
                    <span className="h6">{t("Youmaynot")}</span>
                    <br />
                    <br />

                    <div className="h6">{t("Youaregranted")}</div>
                  
                  </div>
                  <br></br>
                  <div className="single-content">

                    <h4>{t("Account")}</h4>
                    <span className="h6">{t("In order")}</span>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("ElectronicCommunication")}</h4>
                    <span className="h6">{t("whenYou")}</span>
                  </div>
                  <br></br>
                  <div className="single-content">

                    <h4>{t("UserContent")}</h4>
                    <span className="h6">{t("ThisSitemayinclude")}
                    
                    </span>
                    <br></br>
                    <span className="h6">{t("ByusinganyInteractive")}
                    </span>
                   
                <ul>
                  <li>
                  <span className="h6">
                    {t("UserContentthatisunlawful")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("UserContentthatwouldconstitute")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("UserContentthatdisplays")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("UserContentthatmayimpinge")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("UserContentthatmakesfalseormisleading")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("UserContentthatmayinfringeanypatent")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("UserContentthatimpersonatesanyperson ")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("Viruses, malware of any kind")}
                    </span>
                  </li>
                </ul>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("RightinUserContentHeading")}</h4>
                    <span className="h6">{t("RightsinUserContent")}</span>
                    <span className="h6">{t("BypostingUserContenttothisSite")}</span>
                    
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("FeedbackHeading")}</h4>
                    <span className="h6">{t("Feedback")}</span>
                    
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("RestrictionsonRightstoUseHeading")}</h4>
                    <span className="h6">{t("RestrictionsonRightstoUse")}</span>
                    <ul>
                  <li>
                  <span className="h6">
                    {t("download‚modify‚reproduce")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("removeanycopyright")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("useanyrobot‚ spider")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("collectanyinformationabout")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("reformat or frame any ")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("createuseraccounts")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("createortransmitoother")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t(" submittothisSiteanycontent")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("copyorstoreanyUserContent")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("takeanyactionthatimposes‚ ")}
                    </span>
                  </li>
                  <li>
                  <span className="h6">
                    {t("usethisSiteand/oranyUserContent")}
                    </span>
                  </li>
                </ul>
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("OwnershipHeading")}</h4>
                    <span className="h6">{t("Ownership")}</span>
                    
                    
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("PurchasesonthisSiteHeading")}</h4>
                    <span className="h6">{t("PurchasesonthisSite")}</span><br></br>
                    <span className="h6">{t("Theriskoflossandtitleforitems")}</span><br></br>
                    <span className="h6">{t("WhenWeshiptoyouorperyour")}</span><br></br>
                    <span className="h6">{t("Onlyvalidcreditcardsorother")}</span><br></br>
                    <span className="h6">{t("Allreturnsaregoverned")}</span><br></br>
                    <span className="h6">{t("Weattempttobeasaccurateaspossible")}</span><br></br>
                    </div>
                    <br></br>
                  <div className="single-content">
                    <h4>{t("LinksHeading")}</h4>
                    <span className="h6">{t("Links")}</span>
                    
                    
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("TerminationHeading")}</h4>
                    <span className="h6">{t("Youmayterminate")}</span>
                    
                    
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("IndemnificationHeading")}</h4>
                    <span className="h6">{t("Indemnification")}</span>
                    
                    
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("DisclaimersHeading")}</h4>
                    <span className="h6">{t("Disclaimers")}</span>
                    <span className="h6">{t("PARTICULARPURPOSEORUSE")}</span>
                    
                    
                  </div>
                  <br></br>
                  <div className="single-content">
                    <h4>{t("ExclusivityofRemedy;LimitationofLiabilityHeading")}</h4>
                    <span className="h6">{t("ExclusivityofRemedy;LimitationofLiabilityHeading")}</span>
                    </div>
                    <br></br>
                    <div className="single-content">
                    <h4>{t("RemediesHeading")}</h4>
                    <span className="h6">{t("Remedies")}</span>
                    </div>
                    <br></br>
                    <div className="single-content">
                    <h4>{t("ModificationstoSiteHeading")}</h4>
                    <span className="h6">{t("ModificationstoSite")}</span>
                    </div>
                    <br></br>
                    <div className="single-content">
                    <h4>{t("NoThird-PartyBeneficiariesHeading")}</h4>
                    <span className="h6">{t("NoThird-PartyBeneficiaries")}</span>
                    </div>
                    <br></br>
                    <div className="single-content">
                    <h4>{t("MiscellaneousHeading")}</h4>
                    <span className="h6">{t("Miscellaneous")}</span>
                    </div>
                    <br></br>
                    <div className="single-content">
                    <h4>{t("QuestionsHeading")}</h4>
                    <span className="h6">{t("Questions")}</span>
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
