// https://razorpay.com/docs/payment-gateway/web-integration/standard/#step-2-pass-order-id-and-other-options
// made by using http://json2ts.com/

export interface Prefill {
  name: string;
  email: string;
  contact: string;
}

export interface Notes {
  streetAddress: string;
  city: string;
  state: string;
}

export interface Theme {
  color: string;
}

export interface RazorResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorPayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  handler: (res: RazorResponse) => void;
  prefill: Prefill;
  notes: Notes;
  theme: Theme;
}
