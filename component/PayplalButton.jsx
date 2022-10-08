/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import createOrder from '../lib/createOrder';

function ButtonWrapper({ currency, showSpinner }) {
  // This values are the props in the UI
  const { total } = useSelector((state) => state.cart);

  const amount = total;
  const style = { layout: 'vertical' };
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

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
        createOrder={(data, actions) =>
          actions.order
          .create({
            purchase_units: [{ amount: { currency_code: currency, value: amount } }],
          })
          .then((orderId) => orderId)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then((details) => {
          // Your code here after capture the order
          const { shipping } = details.purchase_units[0];
          createOrder({
            customer: shipping.name.full_name,
            address: shipping.address.address_line_1,
            total,
            method: 1,
          });
        })
        }
      />
    </>
  );
}

export default ButtonWrapper;
