// Componente contenedor: recibe un título y children (equivale a un {% block %} / {% include %} con contenido).
function Tarjeta({ titulo, children }) {
  return (
    <section className="tarjeta-grande">
      <h2>{titulo}</h2>
      {children}
    </section>
  )
}

export default Tarjeta
