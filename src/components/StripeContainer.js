import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentForm } from './PaymentForm'

const PUBLIC_KEY = 'pk_test_i3oE0cGVo1zLagRF3x6x2XAv'
const stripePromise = loadStripe(PUBLIC_KEY)

export const StripeContainer = ({price}) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm price={price}/>
        </Elements>
    )
}