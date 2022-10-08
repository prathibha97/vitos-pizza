/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { reset } from '../redux/cartSlice';

function ButtonWrapper({ currency, showSpinner }) {
  // This values are the props in the UI
  const { total } = useSelector((state) => state.cart);
  const router = useRouter();
  const Dispatch = useDispatch();

  const amount = total;
  const style = { layout: 'vertical' };
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const createOrder = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/orders', data);
      res.status === 201 && router.push(`/orders/${res.data._id}`);
      Dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => actions.order
          .create({
            purchase_units: [{ amount: { currency_code: currency, value: amount } }],
          })
          .then((orderId) => orderId)}
        onApprove={(data, actions) => actions.order.capture().then((details) => {
          // Your code here after capture the order
          const { shipping } = details.purchase_units[0];
          createOrder({
            customer: shipping.name.full_name,
            address: shipping.address.address_line_1,
            total:total,
            method: 1,
          });
        })}
      />
    </>
  );
}

export default ButtonWrapper;
