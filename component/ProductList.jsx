import style from '../styles/ProductList.module.css'
import ProductCard from './ProductCard'

const ProductList = () => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>THE BEST PIZZA IN TOWN</h1>
            <p className={style.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident optio pariatur recusandae vitae est ea distinctio, rem soluta architecto blanditiis tempora velit,
                amet illo, deleniti illum delectus deserunt adipisci ex?
            </p>
            <div className={style.wrapper}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}

export default ProductList