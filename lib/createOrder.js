import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { reset } from '../redux/cartSlice';

const createOrder = async (data) => {
  const dispatch = useDispatch();
  const router = useRouter();
  try {
    const res = await axios.post('http://localhost:3000/api/orders', data);
    res.status === 201 && router.push(`/orders/${res.data._id}`);
    dispatch(reset());
  } catch (err) {
    console.log(err);
  }
};

export default createOrder;
