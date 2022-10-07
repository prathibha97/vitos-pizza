import Head from 'next/head';
import axios from 'axios';
import Featured from '../component/Featured';
import ProductList from '../component/ProductList';
import styles from '../styles/Home.module.css';

export default function Home({ productList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vitos Pizza</title>
        <meta name="description" content="Best pizza shop in Icon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList productList={productList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/products');
  return {
    props: {
      productList: res.data,
    },
  };
};
