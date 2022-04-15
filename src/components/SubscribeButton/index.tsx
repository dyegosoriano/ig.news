import styles from './styles.module.scss'

interface ISubscribeProps {
  priceId: string
}

const SubscribeButton = ({ priceId }: ISubscribeProps) => {
  return (
    <button className={styles.subscribeButton} type="button">
      Subscribe now
    </button>
  )
}

export { SubscribeButton }
