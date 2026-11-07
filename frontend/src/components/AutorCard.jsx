import LibroItem from './LibroItem.jsx'

// Componente de la relación 1:N: usa OTRO componente (LibroItem) por cada libro.
function AutorCard({ nombre, nacionalidad, libros }) {
  const totalCopias = libros.reduce((suma, l) => suma + l.copias_disponibles, 0)

  return (
    <li className="tarjeta">
      <strong>{nombre}</strong> — {nacionalidad}
      <ul>
        {libros.map((libro) => (
          // Se convierte el nombre de la API (copias_disponibles) al nombre de la prop (copias)
          <LibroItem key={libro.id} titulo={libro.titulo} copias={libro.copias_disponibles} />
        ))}
      </ul>
      {libros.length === 0 && <p className="vacio">Sin libros registrados</p>}
      <p style={{ color: '#555', fontSize: '0.9em' }}>Total de copias de este autor: {totalCopias}</p>
    </li>
  )
}

export default AutorCard
