import { useState } from 'react'
import LectorCard from './LectorCard.jsx'

function ListaLectores({ lectores: lectoresIniciales }) {
  const [lectores, setLectores] = useState(lectoresIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const filtrados = lectores.filter((lector) =>
    lector.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  )

  function manejarEnvio(e) {
    e.preventDefault()
    // Regla tomada de la API de la Semana 8: el nombre no puede quedar vacío
    if (nombre.trim() === '') {
      setError('El nombre del lector no puede estar vacío.')
      return
    }
    // Lector.email es un EmailField: debe tener formato de correo
    if (!email.includes('@')) {
      setError('El correo debe contener @.')
      return
    }
    const nuevo = {
      id: Math.max(0, ...lectores.map((l) => l.id)) + 1,
      nombre: nombre.trim(),
      email: email.trim(),
    }
    setLectores([...lectores, nuevo]) // arreglo NUEVO, sin push
    setNombre('')
    setEmail('')
    setError('')
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar lector..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {lectores.length === 0 && <p className="vacio">No hay registros</p>}
      {lectores.length > 0 && filtrados.length === 0 && (
        <p className="vacio">Ningún lector coincide con la búsqueda</p>
      )}
      <ul className="lista">
        {filtrados.map((lector) => (
          <LectorCard key={lector.id} nombre={lector.nombre} email={lector.email} />
        ))}
      </ul>

      <form className="formulario" onSubmit={manejarEnvio}>
        <h3>Agregar lector</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Agregar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default ListaLectores
