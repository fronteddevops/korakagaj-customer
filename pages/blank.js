
import Layout from '../components/layout/Layout';
import { useTranslation } from "react-i18next";
function Test() {
    const { t, i18n } = useTranslation("common");
    return (
        <>
            <Layout parent={t("Home")} sub={t("Pages")} subChild={t("About")}>
                
            </Layout>
        </>
    );
}

export default Test;
