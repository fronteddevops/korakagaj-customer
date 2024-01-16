import Link from "next/link";

const Breadcrumb = ({ parent, sub, subSub, subChild, noBreadcrumb }) => {
  return (
    <>
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
            {/* {subSub && <span></span>} */}
            {subChild}
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
