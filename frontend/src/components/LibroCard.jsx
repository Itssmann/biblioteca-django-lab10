import { useState } from 'react'

// Props desestructuradas; `isbn` tiene un valor por defecto.
function LibroCard({ titulo, anio, isbn = 'Sin ISBN', copias }) {
  // Estado local: cada LibroCard tiene su PROPIO contador.
  const [reservas, setReservas] = useState(0)

  const sinCopias = copias === 0 || reservas >= copias

  return (
    <li className="tarjeta">
      <strong>{titulo}</strong> ({anio}) — ISBN {isbn}
      <br />
      {copias === 0 ? (
        <span className="agotado">Agotado</span>
      ) : (
        <span className="stock">Copias: {copias}</span>
      )}
      {copias === 1 && <span className="aviso"> ¡Última copia!</span>}
      <br />
      <button onClick={() => setReservas(reservas + 1)} disabled={sinCopias}>
        Reservar
      </button>
      {reservas > 0 && <span className="aviso"> Reservas: {reservas}</span>}
    </li>
  )
}

export default LibroCard
