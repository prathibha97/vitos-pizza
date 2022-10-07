/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import Image from 'next/image';
import Link from 'next/link';
import style from '../styles/ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <div className={style.container}>
      <Link href={`/product/${product._id}`}>
        <Image src={product.img} width={500} height={500} alt="" />
      </Link>
      <h1 className={style.title}>{product.title}</h1>
      <span className={style.price}>${product.prices[0]}</span>
      <p className={style.desc}>{product.desc}</p>
    </div>
  );
}

export default ProductCard;
