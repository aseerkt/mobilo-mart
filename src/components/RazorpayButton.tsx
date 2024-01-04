import { useStore } from '@/store';
import { addressSelectors } from '@/store/addressStore';
import { cartSelectors } from '@/store/cartStore';
import { RazorPayOptions } from '@/types/razorpay';
import { Button, ButtonProps, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import { useSWRConfig } from 'swr';
import Address from '../../server/src/entities/Address';
import useRazorpay from '../libs/useRazorpay';

function RazorpayButton({ disabled }: ButtonProps) {
  const address = useStore(addressSelectors.getCurrentAddressSelector);
  const isCartEmpty = useStore(cartSelectors.isCartEmptySelector);
  const totalPrice = useStore(cartSelectors.totalPriceSelector);
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const toast = useToast();

  const { openGateway } = useRazorpay({
    onPaymentFail,
    onPaymentSuccess,
  });

  function onPaymentFail() {
    toast({
      id: 'payment failed',
      title: 'Payment failed',
      status: 'error',
      isClosable: true,
      duration: 2000,
    });
  }

  async function onPaymentSuccess() {
    const res = await axios.post('/orders/save', {
      orders: cartItems.map((item) => ({
        mobile: item.mobile.id,
        qty: item.qty,
      })),
      address,
    });

    if (res.data.ok) {
      await mutate('/api/orders');
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
  }

  const createRazorpayOrder = async (
    amount: number,
    address: Address,
    receipt: string
  ) => {
    const data = {
      amount,
      receipt,
      notes: address,
    };
    const res = await axios.post(
      `/api/users/${session.user.id}/orders/razorpay`,
      data
    );
    return res.data.id;
  };

  async function handleOrderPayment() {
    if (isCartEmpty || !address) return;

    const order_id = await createRazorpayOrder(
      totalPrice,
      address,
      session.user.id
    );

    const options: RazorPayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Enter the Key ID generated from the Dashboard
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

    openGateway(options);
  }

  return (
    <Button
      colorScheme='teal'
      color='white'
      fontWeight='semibold'
      onClick={handleOrderPayment}
      disabled={disabled}
    >
      Pay with Razorpay
    </Button>
  );
}

export default RazorpayButton;
