import { useState, ChangeEvent } from "react";
import { api } from '~/utils/api'

interface Card {
  question: string
  answer: string
}

interface AddFlashcardProp {
  addFlashcard: (card: Card) => void;
}

export default function AddFlashcard({ addFlashcard }: AddFlashcardProp) {
    const mutation = api.mutationTest.hello.useMutation()

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value);
    };

    const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    };

    const handleLogin = () => {
        const card: Card = { question, answer };
        mutation.mutate(card)
        addFlashcard(card)
        setQuestion('');
        setAnswer('');
    };

    return (
        <>
            <input type="text" placeholder='Question' value={question} onChange={handleQuestionChange} />
            <input type="text" placeholder='Answer' value={answer} onChange={handleAnswerChange} />
            <button className='btn btn-blue' onClick={handleLogin}>Add New Flashcard</button>
        </>
    );
}
