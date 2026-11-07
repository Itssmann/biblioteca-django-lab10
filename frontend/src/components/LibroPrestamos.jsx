import PrestamoItem from './PrestamoItem.jsx'

// Componente de la relación N:M (modelo intermedio): usa PrestamoItem por cada préstamo.
function LibroPrestamos({ titulo, prestamos }) {
  const total = prestamos.reduce((suma, p) => suma + p.dias_prestamo * Number(p.costo_por_dia), 0)

  return (
    <li className="tarjeta">
      <strong>{titulo}</strong> — {prestamos.length} préstamo(s)
      <ul>
        {prestamos.map((p) => (
          <PrestamoItem
            key={p.id}
            lector={p.lector}
            dias={p.dias_prestamo}
            costo={p.costo_por_dia}
            estado={p.estado}
            devuelto={p.devuelto}
          />
        ))}
      </ul>
      {prestamos.length === 0 && <p className="vacio">Sin préstamos</p>}
      <p style={{ color: '#555', fontSize: '0.9em' }}>Total facturado: S/ {total.toFixed(2)}</p>
    </li>
  )
}

export default LibroPrestamos
