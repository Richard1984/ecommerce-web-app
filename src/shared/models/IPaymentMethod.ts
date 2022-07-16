// For more information, please visit: https://stripe.com/docs/api/payment_methods/object
interface IPaymentMethod {
    id: string;
    card: {
        brand: string;
        last4: string;
    }
  }
  
  export const paymentMethodDefaultValue: IPaymentMethod = {
    id: "",
    card: {
        brand: "",
        last4: "",
    }
  };
  
  export default IPaymentMethod;
  