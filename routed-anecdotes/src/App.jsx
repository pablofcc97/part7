import { useState } from 'react'
import { useField } from './hooks'
import { BrowserRouter as Router,Routes, Route, Link, useParams, useNavigate, useMatch } from 'react-router-dom' //SE DEBE IMPORTAR ROUTER

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">Anecdotes</Link>
      <Link style={padding} to="/create">Create New</Link>
      <Link style={padding} to="/about">About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const Anecdote = ({anecdote}) => {
  //const id = useParams().id
  //const anecdote = anecdotes.find(a => a.id === Number(id))
  return(
    <div>
      <h2>{anecdote.content}</h2>
      <p>{`has ${anecdote.votes} votes`}</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate()
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const reset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.value,
      auhor:author.value,
      info:info.value,
      votes: 0
    })
    props.notificate(`A new anecdote ${content} created!`)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...(({ reset, ...object }) => object)(content)} />
        </div>
        <div>
          author
          <input name='author' {...(({ reset, ...object }) => object)(author)} />
        </div>
        <div>
          url for more info
          <input name='info' {...(({ reset, ...object }) => object)(info)} />
        </div>
        <input type="submit" value="create" />
        <button onClick={(event)=>reset(event)}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
                      ? anecdotes.find( a => a.id === Number(match.params.id))
                      : null

  const [notification, setNotification] = useState('')

  const notificate = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification ? <p>{notification}</p> :null}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/create' element={<CreateNew addNew={addNew} notificate={notificate} />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
