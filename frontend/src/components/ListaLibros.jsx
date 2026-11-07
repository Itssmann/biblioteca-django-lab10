import { useState } from 'react'
import LibroCard from './LibroCard.jsx'

const anioActual = new Date().getFullYear()

// Recibe el arreglo inicial por props y lo guarda en el estado.
function ListaLibros({ libros: librosIniciales }) {
  const [libros, setLibros] = useState(librosIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [titulo, setTitulo] = useState('')
  const [anio, setAnio] = useState('')
  const [copias, setCopias] = useState('')
  const [error, setError] = useState('')

  // Filtro sin distinguir mayúsculas de minúsculas
  const filtrados = libros.filter((libro) =>
    libro.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  )

  function manejarEnvio(e) {
    e.preventDefault()
    const anioNum = Number(anio)
    const copiasNum = Number(copias)

    if (titulo.trim() === '') {
      setError('El título no puede estar vacío.')
      return
    }
    // Regla tomada de LibroSerializer.validate_anio (Semana 8)
    if (!Number.isInteger(anioNum) || anioNum < 1500 || anioNum > anioActual) {
      setError(`El año debe estar entre 1500 y ${anioActual}.`)
      return
    }
    if (!Number.isInteger(copiasNum) || copiasNum < 0) {
      setError('Las copias deben ser un número entero mayor o igual a 0.')
      return
    }

    const nuevo = {
      id: Math.max(0, ...libros.map((l) => l.id)) + 1,
      titulo: titulo.trim(),
      anio: anioNum,
      copias_disponibles: copiasNum,
    }
    setLibros([...libros, nuevo]) // arreglo NUEVO, sin push
    setTitulo('')
    setAnio('')
    setCopias('')
    setError('')
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por título..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {libros.length === 0 && <p className="vacio">No hay registros</p>}
      {libros.length > 0 && filtrados.length === 0 && (
        <p className="vacio">Ningún libro coincide con la búsqueda</p>
      )}

      <ul className="lista">
        {filtrados.map((libro) => (
          <LibroCard
            key={libro.id}
            titulo={libro.titulo}
            anio={libro.anio}
            isbn={libro.isbn}
            copias={libro.copias_disponibles}
          />
        ))}
      </ul>

      <form className="formulario" onSubmit={manejarEnvio}>
        <h3>Agregar libro</h3>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
        />
        <input
          type="number"
          placeholder="Copias"
          value={copias}
          onChange={(e) => setCopias(e.target.value)}
        />
        <button type="submit">Agregar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default ListaLibros
