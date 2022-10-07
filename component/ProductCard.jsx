import Image from 'next/image';
import style from '../styles/ProductCard.module.css';

function ProductCard() {
  return (
    <div className={style.container}>
      <Image src="/images/pizza.png" width={500} height={500} alt="" />
      <h1 className={style.title}>FIORI DI ZUCCA</h1>
      <span className={style.price}>$19.90</span>
      <p className={style.desc}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
    </div>
  );
}

export default ProductCard;
