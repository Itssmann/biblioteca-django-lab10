import { useState } from 'react'

// Elemento del modelo intermedio (Prestamo) con su propio estado.
function PrestamoItem({ lector, dias, costo, estado, devuelto: devueltoInicial }) {
  const [devuelto, setDevuelto] = useState(devueltoInicial)

  return (
    <li>
      {lector}: {dias} días × S/ {Number(costo).toFixed(2)}{' '}
      {devuelto ? (
        <span className="stock">Devuelto</span>
      ) : (
        <span className="aviso">Pendiente</span>
      )}
      {estado === 'ATRASADO' && !devuelto && <span className="agotado"> ¡Atrasado!</span>}{' '}
      {!devuelto && <button onClick={() => setDevuelto(true)}>Marcar devuelto</button>}
    </li>
  )
}

export default PrestamoItem
