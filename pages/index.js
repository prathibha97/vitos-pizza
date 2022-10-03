import Head from "next/head";
import Image from "next/image";
import Featured from "../component/Featured";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vitos Pizza</title>
        <meta name="description" content="Best pizza shop in Icon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
    </div>
  );
}
