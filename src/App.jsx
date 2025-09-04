import './App.css'
import { useState } from 'react'
import { MovieCard } from './components/MovieCard'
import { Header } from './components/Header'
import { FavoritesProvider } from './components/FavoritesProvider'

export function App() {
  const [results, setResults] = useState([])
  const [message, setMessage] = useState('')
  const [parameters, setParameters] = useState('')
  const [page, setPage] = useState(1)
  const ids = {}

  function submit(inputs) {
    var searchText = inputs.get('busca')
    var parameters = "&s=" + searchText
    var tipo = inputs.get('tipo')
    var ano = inputs.get('ano')
    if (tipo && tipo !== 'todos') {
      parameters += '&type=' + tipo
    }
    if (ano) {
      parameters += '&y=' + ano
    }
    setPage(1)
    setParameters(parameters)
    return showPage(parameters)
      .then(() => inputs.set('busca', ''))
  }

  function fetchOMDB(parameters) {
    return fetch("https://www.omdbapi.com/?apikey=6753eeb8" + parameters)
      .then(result => {
        if (!result.ok) {
          throw new Error('Search error.')
        }
        return result.json()
      })
  }

  function getDetail(id) {
    return fetchOMDB('&i=' + id)
  }

  function showCard(id) {
    setPage(1)
    return getDetail(id)
      .then(data => setResults([data]))
  }

  function showPage(parameters) {
    setMessage('Waiting...')
    return fetchOMDB(parameters)
      .then(result => {
        setMessage('')
        if (result.Response === "False") {
          setMessage('No results found.')
        }
        setResults(result.Search || [])
      })
      .catch(() => setMessage('Sorry, occurred an error. Try again later.'))
  }

  const movies = results.map(function (obj, i) {
    if (!ids.hasOwnProperty(obj.imdbID)) {
      ids[obj.imdbID] = 1
      return <MovieCard getDetail={getDetail} obj={obj} key={obj.imdbID} />
    }
  })

  return (
    <FavoritesProvider>
      <Header submit={submit} showCard={showCard} />
      <main>
        {
          message === '' && results.length > 0
            ? <>
              <div className='cards movies'>
                {movies}
              </div>
              <div className='nav-pages'>
                <button onClick={() => {
                  if (page > 2) {
                    showPage(parameters + '&page=' + (page - 1))
                    setPage(page - 1)
                  } else {
                    showPage(parameters)
                    setPage(1)
                  }
                }}>
                  previous
                </button>
                <button onClick={() => {
                  showPage(parameters + '&page=' + (page + 1))
                  setPage(page + 1)
                }}>
                  next
                </button>
              </div>
            </>
            : <p className='message' >{message}</p>
        }
      </main>
    </FavoritesProvider>
  )
}

