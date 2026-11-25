import {useState} from 'react'
import './App.css'
import headerImage from './assets/cookieicon.png'

function App() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  function startEditing(index) {
    const recipe = recipes [index]
    setTitle(recipe.title)
    setAuthor(recipe.author)
    setEditingIndex(index)
  }

  function removeRecipe (indexToRemove) {
    setRecipes(recipes.filter((recipe, index) => 
      index !== indexToRemove))

  }

  return (
    <>
    <header className="site-header">
      <img className="site-header__image" src={headerImage} alt="Receptsamlingens logotyp"></img>
      <div>
        <p className="site-header__label">Receptbibliotek</p>
        <h1>Receptsamlingen</h1>
        <p>Favoriter att komma ihåg och göra om och om igen</p>
      </div>
    </header>

    <main className="page">
      <p className="eyebrow">DIN PERSONLIGA RECEPTSAMLING</p>
      <h1>Ditt receptbibliotek</h1>
      <section className="recipe-form" aria-label="Receptregister">

        <h2>Lägg till ett recept</h2>

        <label>
          Titel
          <input type="text" 
          placeholder="Kladdkaka" 
          value={title}
          onChange={(event) =>
          setTitle(event.target.value)}/>
        </label>

        <label>
          Författare
          <input type="text" 
          placeholder="Camilla Hamid" 
          value={author}
          onChange={(event) =>
          setAuthor(event.target.value)}/>
        </label>

        <button
         type="button"
          onClick={() => { 
            if (!title.trim() || !author.trim()) {
              setError('Fyll i både recept och författare.')
              return
            } setError('')

            const newRecipe = { title: title, author: author }
            if (editingIndex === null) {
              setRecipes([...recipes, newRecipe])
            } else {
              setRecipes(
            recipes.map((recipe, index) =>
              index === editingIndex ? newRecipe: recipe
          )
        )
        }
        setTitle('')
        setAuthor('')
        setEditingIndex(null)
        }}
        >
          {editingIndex === null ? 'Lägg till recept':'Spara ändringar'}
          </button> 
      </section>
      {error && <p>{error}</p>}
      <section>
        <h2>Mina recept</h2>
      {recipes.map((recipe, index) => (
        <article key={index}>
          <h3>{recipe.title}</h3>
          <p>Författare: {recipe.author}</p>
          <button onClick={() =>
      removeRecipe (index)}>
        Ta bort
      </button>
      <button onClick={() => 
      startEditing(index)}>
        Redigera
      </button>
        </article>
        ))}
       </section>
        </main>
        </>
  )
}

export default App

