import { Button } from '@chakra-ui/button';
import useRazorpay from '../libs/useRazorpay';

function RazorpayButton() {
  const { makePayment } = useRazorpay();

  return (
    <Button
      colorScheme='teal'
      color='white'
      fontWeight='semibold'
      onClick={makePayment}
    >
      Pay with Razorpay
    </Button>
  );
}

export default RazorpayButton;
