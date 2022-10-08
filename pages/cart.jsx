/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';
import ButtonWrapper from '../component/PayplalButton';
import styles from '../styles/Cart.module.css';

function Cart() {
  const currency = 'USD';
  const dispatch = useDispatch();
  const { products, total } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image src={product.img} layout="fill" objectFit="cover" alt="" />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  {product.extras.map((extra) => (
                    <span key={extra._id} className={styles.extras}>
                      {extra.text},{' '}
                    </span>
                  ))}
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>${product.price * product.quantity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>
            $0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button type="button" className={styles.payButton}>
                CASH ON DELIVER
              </button>
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'AUICZf7LSSUf-Fj2WlU22sGc55lnod6plImOUnc0nH8MmrWxHxlqcAwHkQh_vsu65XKLD30dATOlZuIf',
                  components: 'buttons',
                  currency: 'USD',
                  'disable-funding': 'credit,card,p24',
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button type="button" className={styles.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
