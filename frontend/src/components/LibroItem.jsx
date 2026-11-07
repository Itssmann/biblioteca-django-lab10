// Elemento anidado de la relación 1:N (Autor -> Libros).
function LibroItem({ titulo, copias }) {
  return (
    <li>
      {titulo} ({copias} copias)
    </li>
  )
}

export default LibroItem
