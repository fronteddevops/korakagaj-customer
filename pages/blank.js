
import Layout from '../components/layout/Layout';

function Test() {
    return (
        <>
            <Layout parent={t("Home")} sub={t("Pages")} subChild={t("About")}>
                
            </Layout>
        </>
    );
}

export default Test;
