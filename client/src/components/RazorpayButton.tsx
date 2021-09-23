import useCartStore from '@/store/cartStore';

function RazorpayButton() {
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  return <div></div>;
}

export default RazorpayButton;
