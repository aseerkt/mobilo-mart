import { createOrder, getRazorpayOrderId } from '@/libs/services/orders';
import { useStore } from '@/store';
import { addressSelectors } from '@/store/addressStore';
import { cartSelectors } from '@/store/cartStore';
import { Address } from '@/types/address';
import { RazorPayOptions, RazorResponse } from '@/types/razorpay';
import { Button, ButtonProps, useToast } from '@chakra-ui/react';
import useRazorpay from '@/libs/hooks/useRazorpay';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import { useRef } from 'react';
import { useSWRConfig } from 'swr';

function RazorpayButton({ disabled }: ButtonProps) {
  const address = useStore(addressSelectors.getCurrentAddressSelector);
  const isCartEmpty = useStore(cartSelectors.isCartEmptySelector);
  const totalPrice = useStore(cartSelectors.totalPriceSelector);
  const cartItems = useStore((state) => state.cartItems);
  const clearCart = useStore((state) => state.clearCart);
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const toast = useToast();
  const orderIdRef = useRef<string>('');

  const { openGateway } = useRazorpay({
    onPaymentFail,
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

  async function onPaymentSuccess(payload: RazorResponse) {
    const res = await createOrder({
      orderItems: cartItems.map((item) => ({
        product: item.product,
        qty: item.qty,
      })),
      razorpayPaymentId: payload.razorpay_payment_id,
      razorpaySignature: payload.razorpay_signature,
      orderId: orderIdRef.current,
      address,
    });

    if (res.ok) {
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
      orderIdRef.current = '';
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
    try {
      const res = await getRazorpayOrderId(data);
      orderIdRef.current = res.id;
      return res.id;
    } catch (error) {
      console.log('catched error', error);
    }
  };

  async function handleOrderPayment() {
    if (isCartEmpty || !address) return;

    const orderId = await createRazorpayOrder(
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
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
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
      handler: onPaymentSuccess,
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
