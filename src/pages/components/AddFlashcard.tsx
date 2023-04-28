import { useState, ChangeEvent } from 'react'
import { api } from '~/utils/api'

interface Card {
  question: string
  answer: string
}

interface AddFlashcardProp {
  addFlashcard: (card: Card) => void
}

export default function AddFlashcard({ addFlashcard }: AddFlashcardProp) {
  const mutation = api.mutationTest.hello.useMutation()

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value)
  }

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }

  const handleLogin = () => {
    const card: Card = { question, answer }
    mutation.mutate(card)
    addFlashcard(card)
    setQuestion('')
    setAnswer('')
  }

  return (
    <>
      <div class='w-full max-w-xs'>
        <div className='mb-4'>
          <label className='mb-2 block text-sm font-bold text-white'>
            Question
          </label>
          <input
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            type='text'
            placeholder='Which is the capital of France?'
            value={question}
            onChange={handleQuestionChange}
          />
        </div>
        <div className='mb-4'>
          <label className='mb-2 block text-sm font-bold text-white'>
            Answer
          </label>
          <input
            className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            type='text'
            placeholder='Paris'
            value={answer}
            onChange={handleAnswerChange}
          />
        </div>
        <button className='btn btn-blue' onClick={handleLogin}>
          Add New Flashcard
        </button>
      </div>
    </>
  )
}
