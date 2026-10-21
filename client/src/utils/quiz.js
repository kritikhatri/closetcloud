import { AESTHETICS, LOOKS } from '../data/inspiration.js'

/*
  Style-quiz logic: plain functions with no React, so they're easy to
  test and to explain.

  How the scoring stays fair:
    Some aesthetics have more photos than others. If we just counted
    hearts, the aesthetic shown most often would usually "win". Instead
    every aesthetic appears 3–4 times across the quiz, and its score is
    the SHARE of its photos you picked (picked ÷ shown). Picking 3 of 3
    minimal looks beats picking 3 of 4 coquette looks.
*/

export const ROUNDS = 5
export const PER_ROUND = 6

/* Fisher–Yates shuffle: every order is equally likely. Returns a copy. */
function shuffle(list, random) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/*
  Builds 5 rounds of 6 looks.
  We walk round-robin through the aesthetics in a shuffled order, taking
  the next unused look of each. With 9 aesthetics and rounds of 6, a
  round never contains two looks of the same aesthetic.
  `random` can be swapped for a predictable function in tests.
*/
export function buildRounds(random = Math.random) {
  const order = shuffle(
    AESTHETICS.map((aesthetic) => aesthetic.value),
    random,
  )
  const queues = Object.fromEntries(
    order.map((value) => [
      value,
      shuffle(
        LOOKS.filter((look) => look.aesthetic === value),
        random,
      ),
    ]),
  )

  const sequence = []
  for (let i = 0; sequence.length < ROUNDS * PER_ROUND && i < 1000; i++) {
    const next = queues[order[i % order.length]].shift()
    if (next) sequence.push(next)
  }

  const rounds = []
  for (let r = 0; r < ROUNDS; r++) {
    rounds.push(shuffle(sequence.slice(r * PER_ROUND, (r + 1) * PER_ROUND), random))
  }
  return rounds
}

/*
  Turns the looks you picked into a ranked list:
    [{ aesthetic: 'coquette', picked: 3, shown: 4, score: 0.75 }, ...]
  Only aesthetics you picked at least once are included, best first.
*/
export function scoreQuiz(rounds, pickedIds) {
  const picked = new Set(pickedIds)
  const tally = {}
  for (const look of rounds.flat()) {
    tally[look.aesthetic] ??= { aesthetic: look.aesthetic, picked: 0, shown: 0 }
    tally[look.aesthetic].shown += 1
    if (picked.has(look.id)) tally[look.aesthetic].picked += 1
  }

  return Object.values(tally)
    .filter((row) => row.picked > 0)
    .map((row) => ({ ...row, score: row.picked / row.shown }))
    .sort((a, b) => b.score - a.score || b.picked - a.picked)
}
