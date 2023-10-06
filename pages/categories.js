
import Link from 'next/link';
import Layout from '../components/layout/Layout';

function Categories() {
    var data = [
        {
            id: 1,
            title: "T-Shirt",
            img: "category-thumb-1.jpg",
        },
        {
            id: 2,
            title: "Bags",
            img: "category-thumb-2.jpg",
        },
        {
            id: 3,
            title: "Sandan",
            img: "category-thumb-3.jpg",
        },
        {
            id: 4,
            title: "Scarf Cap",
            img: "category-thumb-4.jpg",
        },
        {
            id: 5,
            title: "Shoes",
            img: "category-thumb-5.jpg",
        },
        {
            id: 6,
            title: "Pillowcase",
            img: "category-thumb-6.jpg",
        },
        {
            id: 7,
            title: "Jumpsuits",
            img: "category-thumb-7.jpg",
        },
        {
            id: 8,
            title: "Hats",
            img: "category-thumb-8.jpg",
        },
        {
            id: 5,
            title: "Shoes",
            img: "category-thumb-5.jpg",
        },
        {
            id: 6,
            title: "Pillowcase",
            img: "category-thumb-6.jpg",
        },
        {
            id: 7,
            title: "Jumpsuits",
            img: "category-thumb-7.jpg",
        },
        {
            id: 8,
            title: "Hats",
            img: "category-thumb-8.jpg",
        },
    ];
    return (
        <>
            <Layout parent="Home" sub="Categories" subChild="List">
                <section className="mt-50 mb-50">
                    <div className="container">
                        <div className="row">
                            {data.map((item, i) => (
                                <div className="col-lg-2 mb-20" key={i}>
                                    <div className="card-1">
                                        <figure className=" img-hover-scale overflow-hidden">
                                            <Link href="/products">
                                                <a>
                                                    <img
                                                        src={`assets/imgs/shop/${item.img}`}
                                                        alt=""
                                                    />
                                                </a>
                                            </Link>
                                        </figure>
                                        <h5>
                                            <Link href="/products">
                                                <a>{item.title}</a>
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
