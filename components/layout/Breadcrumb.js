import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumb = ({ parent, sub, subSub, subChild, noBreadcrumb }) => {
  const Route = useRouter();
  return (
    <>
      {Route.route == "/thankyou" || Route.route == "/failed" ? null : (
        <div className={`page-header breadcrumb-wrap ${noBreadcrumb}`}>
          <div className="container">
            <div className="breadcrumb">
              <Link href="/">
                <a>{parent}</a>
              </Link>
              {/* <span></span> {sub}
      <span></span> {subSub}
      {subChild} */}
              <span></span> {sub}
              <span></span> {subSub}
              {Route.pathname != "/fabric" && <>{subSub && <span></span>}</>}
              {/* {subSub && <span></span>} */}
              {subChild}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Breadcrumb;
