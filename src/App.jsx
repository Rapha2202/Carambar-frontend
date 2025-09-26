import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [joke, setJoke] = useState({})
  const [loading, setLoading] = useState(true)
  const [showAnswer, setShowAnswer] = useState(false)
  const [newJoke, setNewJoke] = useState(false)

  useEffect(() => {
    document.title = "Carambar & Co"

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/blagues/random`)
      .then(response => {
        setJoke(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })

  }, [newJoke])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="bg-[#fedb27] h-[100vh] flex flex-col items-center">
        <div>
          <p className="text-4xl font-bold text-[#e10079] py-2">Carambar & Co</p>
        </div>
        <div>
          <p className="text-2xl text-center font-bold">Blague Aléatoire</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 my-4 w-full mx-8 md:mx-0 md:w-1/2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xl font-bold mb-4">{joke.joke}</p>
            <button
              className="bg-[#e10079] text-white px-4 py-2 rounded hover:bg-pink-700 mb-4"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? "Cacher la réponse" : "Voir la réponse"}
            </button>
          </div>
          {showAnswer && <p className="text-lg font-semibold">{joke.answer}</p>}
        </div>
        <button
          className="bg-[#e10079] text-white px-4 py-2 rounded hover:bg-pink-700"
          onClick={() => { setNewJoke(!newJoke); setShowAnswer(false); }}
        >
          Nouvelle blague
        </button>
      </div>

    </>
  )
}

export default App
