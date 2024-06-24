import BrandFilter from './BrandFilter';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';
import PriceRange from './PriceRange';
import Rating from './Rating';
import SizeFilter from './SizeFilter';
import Tags from './Tags';

const ShopFilter = () => {
    return (
        <>
            <div className="product-fillter-header">
                <div className="row">
                    <div className="col-lg-2 col-md-4 mb-lg-0 mb-md-5 mb-sm-5">
                        <h5 className="mb-20">{t("Categories")}</h5>
                        <CategoryFilter/>
                    </div>
                    <div className="col-lg-2 col-md-4 mb-lg-0 mb-md-5 mb-sm-5">
                        <h5 className="mb-20">{t("Manufacturers")}</h5>
                        <BrandFilter/>
                    </div>
                    <div className="col-lg-2 col-md-4 mb-lg-0 mb-md-5 mb-sm-5">
                        <h5 className="mb-20">{t("Price range")}</h5>
                        <PriceRange/>
                    </div>
                    <div className="col-lg-2 col-md-4 mb-lg-0 mb-md-5 mb-sm-5">
                        <h5 className="mb-20">{t("By Tags")}</h5>
                        <Tags/>
                    </div>
                    <div className="col-lg-2 col-md-4 mb-lg-0 mb-md-5 mb-sm-5">
                        <h5 className="mb-20">{t("By Color")}</h5>
                        <ColorFilter/>
                        <h5 className="mb-15 mt-20">{t("By Size")}</h5>
                        <SizeFilter/>
                    </div>
                    <div className="col-lg-2 col-md-4 mb-lg-0 mb-md-5 mb-sm-5">
                        <h5 className="mb-20">{t("By Review")}</h5>
                        <Rating/>                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopFilter;
