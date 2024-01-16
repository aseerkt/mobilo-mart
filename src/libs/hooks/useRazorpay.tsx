import { RazorPayOptions } from '@/types/razorpay';

export interface RazorpaySuccessPayload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface UseRazorPayHookParams {
  onPaymentFail: Function;
}

export default function useMobiloRazorpay({
  onPaymentFail,
}: UseRazorPayHookParams) {
  const openGateway = (options: RazorPayOptions) => {
    // @ts-ignore
    const razorpay = new Razorpay(options);

    razorpay.on('payment.failed', onPaymentFail);

    razorpay.open();
  };

  return { openGateway };
}
