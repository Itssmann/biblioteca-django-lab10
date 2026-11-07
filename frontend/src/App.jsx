import './App.css'
import { libros, autores, editoriales, lectores, librosConPrestamos } from './datos.js'
import Tarjeta from './components/Tarjeta.jsx'
import ListaLibros from './components/ListaLibros.jsx'
import AutorCard from './components/AutorCard.jsx'
import ListaLectores from './components/ListaLectores.jsx'
import LibroPrestamos from './components/LibroPrestamos.jsx'

function App() {
  const nombreApp = 'Biblioteca de barrio'
  const totalCopias = libros.reduce((suma, l) => suma + l.copias_disponibles, 0)

  return (
    <main className="contenedor">
      {/* ============ PARTE 1 ============ */}
      <h1>{nombreApp} — Catálogo</h1>
      <p>Copias disponibles en total: {totalCopias}</p>

      <Tarjeta titulo="Libros">
        <ListaLibros libros={libros} />
      </Tarjeta>

      <Tarjeta titulo="Autores y sus libros (relación 1:N)">
        <ul className="lista">
          {autores.map((autor) => (
            <AutorCard
              key={autor.id}
              nombre={autor.nombre}
              nacionalidad={autor.nacionalidad}
              libros={autor.libros}
            />
          ))}
        </ul>
      </Tarjeta>

      <hr />

      {/* ============ PARTE 2: investigación propia ============ */}
      <h1>Investigación propia — Biblioteca</h1>

      <Tarjeta titulo="Editoriales">
        <ul className="lista">
          {editoriales.map((editorial) => (
            <li key={editorial.id} className="tarjeta">
              <strong>{editorial.nombre}</strong> — {editorial.pais}
            </li>
          ))}
        </ul>
      </Tarjeta>

      <Tarjeta titulo="Lectores">
        <ListaLectores lectores={lectores} />
      </Tarjeta>

      <Tarjeta titulo="Libros y sus préstamos (modelo intermedio N:M)">
        <ul className="lista">
          {librosConPrestamos.map((libro) => (
            <LibroPrestamos key={libro.id} titulo={libro.titulo} prestamos={libro.prestamos} />
          ))}
        </ul>
      </Tarjeta>
    </main>
  )
}

export default App
