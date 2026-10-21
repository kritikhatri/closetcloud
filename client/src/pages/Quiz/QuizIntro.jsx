import Button from '../../components/Button/Button.jsx'
import PhotoStack from '../../components/PhotoStack/PhotoStack.jsx'
import { labelFor } from '../../constants/wardrobe.js'
import { AESTHETICS, getLooks } from '../../data/inspiration.js'
import { PER_ROUND, ROUNDS } from '../../utils/quiz.js'
import styles from './Quiz.module.css'

const introLooks = getLooks(['pointe-tulle', 'beige-blazer-leaves', 'hay-bale-florals'])

export default function QuizIntro({ user, onStart }) {
  const saved = user?.styleAesthetics ?? []

  return (
    <section className={styles.intro}>
      <PhotoStack looks={introLooks} />
      <p className="eyebrow">Style quiz · about a minute</p>
      <h1 className={styles.introTitle}>
        Find your <em>aesthetic</em>
      </h1>
      <p className={styles.lead}>
        {ROUNDS} quick rounds of {PER_ROUND} outfits. Tap every look you’d wear, and we’ll
        match you to the styles that feel most like you.
      </p>

      {saved.length > 0 && (
        <p className={styles.savedNote}>
          Your saved style:{' '}
          <strong>{saved.map((value) => labelFor(AESTHETICS, value)).join(' · ')}</strong>.
          Retaking will let you replace it.
        </p>
      )}

      <Button onClick={onStart} className={styles.startButton}>
        {saved.length > 0 ? 'Retake the quiz' : 'Start the quiz'}
      </Button>

      <p className={styles.howScored}>
        How it’s scored: every style appears 3–4 times, and your match is simply the share of
        each style’s photos you picked. No AI, no guesswork.
      </p>
    </section>
  )
}
