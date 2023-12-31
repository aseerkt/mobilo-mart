import axios from 'axios';
import router from 'next/router';
import { useToast } from '@chakra-ui/toast';
import { Address } from '@/types/address';
import { RazorPayOptions } from '@/types/razorpay';
import useUser from './useUser';
import useOrders from './useOrders';
import { useStore } from '../store';

const KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

export default function useRazorpay() {
  const getCurrentAddress = useStore((state) => state.getCurrentAddress);
  const isCartEmpty = useStore((state) => state.isCartEmpty);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);
  const { revalidate: revalidateOrders } = useOrders();
  const { user } = useUser();
  const toast = useToast();

  const address = getCurrentAddress();
  const isEmpty = isCartEmpty();
  const totalPrice = getTotalPrice();

  const getOrderId = async (
    amount: number,
    address: Address,
    receipt: string
  ) => {
    const data = {
      amount,
      receipt,
      notes: address,
    };
    const res = await axios.post('/orders', data);
    return res.data.id;
  };

  const displayRazorpay = (
    options: RazorPayOptions,
    onPaymentFail: Function
  ) => {
    // @ts-ignore
    const razorGateway = new Razorpay(options);

    razorGateway.on('payment.failed', function (response: any) {
      console.error(response.error);
      onPaymentFail();
    });

    razorGateway.open();
  };

  const onPaymentFail = () =>
    toast({
      id: 'payment failed',
      title: 'Payment failed',
      status: 'error',
      isClosable: true,
      duration: 2000,
    });

  const onPaymentSuccess = async () => {
    const res = await axios.post('/orders/save', {
      orders: cartItems.map((item) => ({
        mobile: item.mobile.id,
        qty: item.qty,
      })),
      address,
    });

    if (res.data.ok) {
      await revalidateOrders();
      toast({
        id: 'payment success',
        title: 'Order placed',
        description: 'Payment Successfull',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
      clearCart();
      toast({
        id: 'clear cart',
        title: 'Cart cleared',
        status: 'info',
        isClosable: true,
        duration: 2000,
      });
      router.push('/orders');
    }
  };

  const makePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Made it here');
    if (!address || isEmpty) return;

    const order_id = await getOrderId(totalPrice, address, `${user.id}`);

    const options: RazorPayOptions = {
      key: KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: totalPrice.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Mobilo Mart',
      description: 'Purchase Mobile',
      image:
        'https://i.pinimg.com/originals/20/27/3c/20273cfda041b47e89e057a4c2296928.png',
      order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        console.log(response);
        onPaymentSuccess();
      },
      prefill: {
        name: address.fullName,
        email: address.emailAddress,
        contact: String(address.mobileNumber),
      },
      notes: {
        streetAddress: address.streetAddress,
        city: address.city,
        state: address.state,
      },
      theme: {
        color: '#000',
      },
    };

    displayRazorpay(options, onPaymentFail);
    e.preventDefault();
  };

  return { makePayment };
}
