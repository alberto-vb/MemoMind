import { api } from '~/utils/api'

interface Card {
  question: string
  answer: string
}

interface Set {
  name: string
  cards: Card[]
}

export default function FlashingCardSets() {
  const sets = api.test.listFlashcardsSets.useQuery().data
  console.log('Sets', sets)
  return (
    <>
      <div>
        {sets &&
          sets.map((set: Set) => (
              <div className='text-white' key={set.name}>
                {set.name}
                {set.cards &&
                  set.cards.map((card: Card, index: number) => (
                    <div key={index}>
                      <div>{card.question}</div>
                      <div>{card.answer}</div>
                    </div>
                  ))}
              </div>
          ))}
      </div>
    </>
  )
}
