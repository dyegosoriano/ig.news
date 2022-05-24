import { signIn, useSession } from 'next-auth/react'

import getStripeJs from '../../services/stripe-js'
import { api } from '../../services/api'

import styles from './styles.module.scss'

interface ISubscribeProps {
  priceId: string
}

const SubscribeButton = ({ priceId }: ISubscribeProps) => {
  const { data: session } = useSession()

  async function handleSubscribe() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const { data } = await api.post('/subscribe')
      const { sessionId } = data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <button className={styles.subscribeButton} onClick={handleSubscribe} type="button">
      Subscribe now
    </button>
  )
}

export { SubscribeButton }
