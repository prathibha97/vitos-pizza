import Head from 'next/head';
import axios from 'axios';
import { useState } from 'react';
import Featured from '../component/Featured';
import ProductList from '../component/ProductList';
import styles from '../styles/Home.module.css';
import Add from '../component/Add';
import AddButton from '../component/AddButton';

export default function Home({ productList, isAdmin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Vitos Pizza</title>
        <meta name="description" content="Best pizza shop in Icon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {isAdmin && <AddButton setClose={setClose} />}
      <ProductList productList={productList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const mycookie = ctx.req?.cookies || '';
  let isAdmin = false;
  if (mycookie.token === process.env.TOKEN) {
    isAdmin = true;
  }
  const res = await axios.get('http://localhost:3000/api/products');
  return {
    props: {
      productList: res.data,
      isAdmin,
    },
  };
};
