import { Button, ButtonProps } from '@chakra-ui/button';
import useRazorpay from '../libs/useRazorpay';

function RazorpayButton({ disabled }: ButtonProps) {
  const { makePayment } = useRazorpay();

  return (
    <Button
      colorScheme='teal'
      color='white'
      fontWeight='semibold'
      onClick={makePayment}
      disabled={disabled}
    >
      Pay with Razorpay
    </Button>
  );
}

export default RazorpayButton;
