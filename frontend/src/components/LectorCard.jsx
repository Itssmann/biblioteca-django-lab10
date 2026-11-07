function LectorCard({ nombre, email = 'Sin correo' }) {
  return (
    <li className="tarjeta">
      <strong>{nombre}</strong> — {email}
    </li>
  )
}

export default LectorCard
