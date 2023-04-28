import { api } from '~/utils/api'
import styles from '../index.module.css'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

interface Card {
  question: string
  answer: string
}

interface FlashcardListProps {
  cards: Card[]
}

export default function FlashcardList({ cards }: FlashcardListProps) {
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null)

  const flipCard = (index: number) => {
    setFlippedCardIndex(index === flippedCardIndex ? null : index)
  }

  useEffect(() => {
    console.log('Todo list updated:', cards)
  }, [cards])

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const totalCards = cards.length

  const goToNextCard = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  return (
    <>
      <div className='card-container'>
        <div className='arrow left' onClick={goToPreviousCard}>
          {/* <i className='fas fa-arrow-left'></i> */}
        </div>
        <div
          className={`card ${
            flippedCardIndex === currentCardIndex ? 'flipped' : ''
          }`}
          onClick={() => flipCard(currentCardIndex)}
        >
          <div className='front'>
            <div className='card-question'>
              {cards[currentCardIndex]?.question}
            </div>
          </div>
          <div className='back'>
            <div className='card-question'>
              {cards[currentCardIndex]?.question}
            </div>
            <div className='card-answer'>{cards[currentCardIndex]?.answer}</div>
          </div>
        </div>
        <div className='arrow right' onClick={goToNextCard}>
          {/* <i className='fas fa-arrow-right'></i> */}
        </div>
      </div>
    </>
  )
}
