# Especificación — Semana 10: Componentes, props, estado y eventos (React)

## Contexto
Estoy en la carpeta de la **Semana 10**. Mi proyecto frontend de la **Semana 9** (React + Vite, tema "Biblioteca") está en la carpeta de la Semana 9. Debes **copiarlo aquí y aplicar lo nuevo del Lab 10**. No toques la carpeta de la Semana 9.

## Paso 0 — Preparación
1. Copia la carpeta `frontend` de la Semana 9 a la Semana 10 **sin `node_modules`, `dist` ni `.git`**.
2. Dentro de `frontend` ejecuta `npm install`.
3. Ejecuta `git init` en la carpeta de la Semana 10 (repositorio nuevo) y crea `.gitignore` con `node_modules/`, `dist/`.
4. Crea `src/components/` y `src/datos.js`.

## Reglas de este lab (importantes)
- Un componente por archivo en `src/components`, nombre en MAYÚSCULA, `export default`.
- Props **desestructuradas**, algunas con **valor por defecto**.
- **No** se pasan funciones entre componentes (eso es la Semana 11) y **no** se consume la API (Semana 12). El estado y los eventos viven **dentro del componente que los usa**.
- Al agregar a un arreglo del estado: `setX([...x, nuevo])`, **nunca** `push`.
- Cada elemento de `map()` lleva `key` única.
- Al terminar: `npm run lint` (sin errores; oxlint no imprime nada si está bien) y `npm run build`.

## Datos
`src/datos.js` exporta los arreglos movidos desde `App.jsx`, con la **misma forma que la API de la Semana 8** (decimales como texto):

```js
// Datos escritos a mano con la MISMA FORMA que las respuestas de la API de la Semana 8.
// Los decimales llegan como texto ("1.50").

// Forma de GET /api/libros/ (LibroSerializer)
export const libros = [
  { id: 1, titulo: 'Los ríos profundos', autor: 1, editorial: 1, categoria: 1, isbn: '9789500703847', anio: 1958, disponible: true, copias_disponibles: 3 },
  { id: 2, titulo: 'Cien años de soledad', autor: 2, editorial: 2, categoria: 2, isbn: '9780307474728', anio: 1967, disponible: true, copias_disponibles: 1 },
  { id: 3, titulo: '1984', autor: 3, editorial: 2, categoria: 2, isbn: '9780451524935', anio: 1949, disponible: false, copias_disponibles: 0 },
  { id: 4, titulo: 'El principito', autor: 4, editorial: 1, categoria: 3, isbn: '9780156012195', anio: 1943, disponible: true, copias_disponibles: 5 },
  { id: 5, titulo: 'Rayuela', autor: 5, editorial: 2, categoria: 2, isbn: '9788437604572', anio: 1963, disponible: true, copias_disponibles: 1 },
]

// Relación 1:N (Autor -> Libros): un arreglo dentro de cada registro
export const autores = [
  {
    id: 1, nombre: 'José María Arguedas', nacionalidad: 'Peruana',
    libros: [
      { id: 1, titulo: 'Los ríos profundos', copias_disponibles: 3 },
      { id: 6, titulo: 'Yawar fiesta', copias_disponibles: 2 },
    ],
  },
  {
    id: 2, nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana',
    libros: [{ id: 2, titulo: 'Cien años de soledad', copias_disponibles: 1 }],
  },
  { id: 3, nombre: 'George Orwell', nacionalidad: 'Británica', libros: [] },
]

// ---- PARTE 2: investigación propia ----
export const editoriales = [
  { id: 1, nombre: 'Losada', pais: 'Argentina' },
  { id: 2, nombre: 'Sudamericana', pais: 'Argentina' },
  { id: 3, nombre: 'Salamandra', pais: 'España' },
]

export const lectores = [
  { id: 1, nombre: 'María Fernández', email: 'maria.fernandez@correo.com' },
  { id: 2, nombre: 'Juan Pérez', email: 'juan.perez@correo.com' },
  { id: 3, nombre: 'Lucía Quispe', email: 'lucia.quispe@correo.com' },
]

// Modelo intermedio N:M (Libro <-> Lector a través de Prestamo)
export const librosConPrestamos = [
  {
    id: 1, titulo: 'Los ríos profundos',
    prestamos: [
      { id: 1, lector: 'María Fernández', estado: 'PENDIENTE', devuelto: false, dias_prestamo: 7, costo_por_dia: '1.50' },
      { id: 2, lector: 'Juan Pérez', estado: 'DEVUELTO', devuelto: true, dias_prestamo: 5, costo_por_dia: '1.00' },
    ],
  },
  {
    id: 2, titulo: 'Cien años de soledad',
    prestamos: [
      { id: 3, lector: 'Lucía Quispe', estado: 'ATRASADO', devuelto: false, dias_prestamo: 10, costo_por_dia: '2.00' },
    ],
  },
  { id: 3, titulo: '1984', prestamos: [] },
]
```

## Código (probado: lint y build sin errores)

### src/components/Tarjeta.jsx
```jsx
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
```

### src/components/LibroCard.jsx
```jsx
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
```

### src/components/ListaLibros.jsx
```jsx
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
```

### src/components/LibroItem.jsx
```jsx
// Elemento anidado de la relación 1:N (Autor -> Libros).
function LibroItem({ titulo, copias }) {
  return (
    <li>
      {titulo} ({copias} copias)
    </li>
  )
}

export default LibroItem
```

### src/components/AutorCard.jsx
```jsx
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
```

### src/components/LectorCard.jsx
```jsx
function LectorCard({ nombre, email = 'Sin correo' }) {
  return (
    <li className="tarjeta">
      <strong>{nombre}</strong> — {email}
    </li>
  )
}

export default LectorCard
```

### src/components/ListaLectores.jsx
```jsx
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
```

### src/components/PrestamoItem.jsx
```jsx
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
```

### src/components/LibroPrestamos.jsx
```jsx
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
```

### src/App.jsx
```jsx
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
```

### Estilos nuevos al final de src/App.css
```css
.tarjeta-grande {
  border: 2px solid #99a;
  border-radius: 10px;
  padding: 8px 16px 16px;
  margin: 16px 0;
}

.formulario {
  display: grid;
  gap: 8px;
  margin-top: 14px;
  padding: 12px;
  border: 1px dashed #99a;
  border-radius: 8px;
}

.error {
  color: #b00020;
  font-weight: 600;
}
```

> Conserva las clases ya existentes en `App.css` (`contenedor`, `lista`, `tarjeta`, `stock`, `agotado`, `aviso`, `vacio`).

## Qué cubre cada ejercicio
| Ejercicio | Dónde está |
|---|---|
| 1 Candidatos a componente | `LibroCard`, `AutorCard`, `LectorCard` |
| 2 Primer componente (usado dos veces) | `LibroCard` en `ListaLibros`, `LectorCard` en `ListaLectores` |
| 3 Props con valor por defecto + lista con `map`/`key` | `isbn = 'Sin ISBN'`, `email = 'Sin correo'`, `ListaLibros` |
| 4 Contenedor con `children` | `Tarjeta` |
| 5 Componente 1:N con componente anidado | `AutorCard` → `LibroItem` (convierte `copias_disponibles` → `copias`) |
| 6 `useState` + `onClick` | `LibroCard` (Reservar), `PrestamoItem` (Marcar devuelto) |
| 7 Búsqueda controlada | `ListaLibros`, `ListaLectores` |
| 8 Formulario controlado + validación | `ListaLibros` (año 1500–año actual, título no vacío), `ListaLectores` |
| 9–13 Parte 2 (investigación propia) | Editoriales, Lectores, `LibroPrestamos` → `PrestamoItem` |
| 14 README + GitHub | ver abajo |

## README.md
Crea/actualiza `README.md` con: descripción del proyecto, lista de componentes y qué hace cada uno (props que recibe), cómo ejecutar (`npm install`, `npm run dev`, `npm run lint`, `npm run build`) y la nota de que los datos están escritos a mano (se conectarán a la API en la Semana 12).

## Verificación esperada (ya comprobada con navegador)
- Clic en "Reservar" suma reservas, muestra "Reservas: n" solo si n > 0 y desactiva el botón al llegar a las copias.
- Buscar `PRINCIPITO` muestra 1 libro (no distingue mayúsculas); `zzz` muestra "Ningún libro coincide con la búsqueda".
- Enviar año 1300 muestra el error y no agrega; año 2001 agrega y limpia los campos.
- "Marcar devuelto" cambia el estado del préstamo; correo sin `@` muestra error.
- Consola del navegador sin advertencias.

## Experimentos manuales (NO dejar en el código final; solo para las capturas/explicaciones)
1. Renombrar temporalmente un componente a minúscula (`libroCard`) y ver el error/advertencia; explicar que React trata minúsculas como etiquetas HTML.
2. Intentar `props.copias = 0` dentro de un componente → `TypeError: Cannot assign to read only property` (las props son de solo lectura).
3. Reemplazar `useState` por `let` en el contador → el valor cambia pero la pantalla no se actualiza (no hay re-render).
4. Modificar un dato en `datos.js` (por ejemplo `copias_disponibles: 1`) y comprobar que aparece "¡Última copia!".

## Qué falta para guardar en Django (explicación para el Word)
El formulario solo cambia el estado en memoria: al recargar la página se pierde. Falta hacer un `fetch`/`axios` con `POST` a `/api/libros/` y manejar la respuesta y los errores del serializer (Semana 12).

## Entrega
Haz commit y push a un **repositorio nuevo** de GitHub (sin `node_modules` ni `dist`) y dame la URL.