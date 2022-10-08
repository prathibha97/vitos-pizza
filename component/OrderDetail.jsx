import { useState } from 'react';
import styles from '../styles/OrderDetail.module.css';

function OrderDetail({ total, createOrder }) {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');

  const handleClick = () => {
    createOrder({
      customer,
      address,
      total,
      method: 0,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay $12 after delivery</h1>
        <div className={styles.item}>
          <label className={styles.lable}>Name Surname</label>
          <input
            type="text"
            placeholder="John Doe"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.lable}>Phone Number</label>
          <input type="text" placeholder="+1 234 567 89" className={styles.input} />
        </div>
        <div className={styles.item}>
          <label className={styles.lable}>Adress</label>
          <textarea
            type="text"
            placeholder="Elton St. 505 NY"
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="button" className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
}

export default OrderDetail;
