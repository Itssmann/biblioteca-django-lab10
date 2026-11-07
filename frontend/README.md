# Biblioteca de barrio — Semana 10

Frontend React + Vite copiado de Semana 9 para el laboratorio de componentes, props, estado y eventos. Presenta libros, autores, editoriales, lectores y préstamos de una biblioteca.

Los datos de `src/datos.js` están escritos a mano y conservan la forma de las respuestas de la API de Semana 8, incluidos los decimales como texto. No se consume ninguna API; la conexión se realizará en Semana 12.

## Ejecución

Desde esta carpeta (`frontend`):

```sh
npm install
npm run dev
```

Validación y compilación:

```sh
npm run lint
npm run build
```

## Componentes

Cada componente está en su propio archivo de `src/components/`, tiene nombre con inicial mayúscula, props desestructuradas y `export default`.

| Componente | Props | Función |
| --- | --- | --- |
| `Tarjeta` | `titulo`, `children` | Contenedor reutilizable con título y contenido anidado. |
| `LibroCard` | `titulo`, `anio`, `isbn = 'Sin ISBN'`, `copias` | Muestra un libro y controla sus reservas con estado local; desactiva el botón cuando se agotan las copias. |
| `ListaLibros` | `libros` (renombrada a `librosIniciales`) | Mantiene la lista en estado local, busca por título sin distinguir mayúsculas y agrega libros con un formulario controlado. |
| `LibroItem` | `titulo`, `copias` | Muestra un libro dentro de la lista de un autor. |
| `AutorCard` | `nombre`, `nacionalidad`, `libros` | Representa la relación 1:N con `LibroItem` y calcula el total de copias del autor. |
| `LectorCard` | `nombre`, `email = 'Sin correo'` | Muestra los datos de un lector. |
| `ListaLectores` | `lectores` (renombrada a `lectoresIniciales`) | Mantiene lectores en estado local, filtra por nombre y agrega lectores con validación. |
| `PrestamoItem` | `lector`, `dias`, `costo`, `estado`, `devuelto` (renombrada a `devueltoInicial`) | Muestra el préstamo y permite marcarlo devuelto con su propio estado. |
| `LibroPrestamos` | `titulo`, `prestamos` | Representa la relación N:M mediante `PrestamoItem` y calcula el total facturado. |

`App.jsx` compone las secciones y pasa solamente datos y contenido. No se pasan funciones entre componentes. El estado y los eventos permanecen en el componente que los utiliza. Los arreglos se actualizan con una copia (`[...arreglo, nuevo]`) y cada elemento generado mediante `map` tiene una clave única.

## Validaciones y comprobación manual

- Reservar incrementa el contador de cada libro y desactiva su botón al alcanzar las copias disponibles.
- Buscar `PRINCIPITO` muestra un libro; buscar `zzz` muestra el mensaje de búsqueda sin resultados.
- El formulario de libros exige título no vacío, año entero entre 1500 y el año actual, y copias enteras mayores o iguales a cero. Un año 1300 muestra error; un año 2001 con los demás campos válidos agrega el libro y limpia el formulario.
- Los libros agregados sin ISBN muestran `Sin ISBN`.
- El formulario de lectores exige nombre no vacío y correo con `@`.
- Marcar un préstamo como devuelto actualiza su presentación y oculta el botón y el aviso de atraso.
- Los autores sin libros y los libros sin préstamos muestran sus mensajes correspondientes.

Los cambios se guardan solamente en la memoria del componente y se pierden al recargar la página. El total de copias del encabezado se calcula a partir de los datos iniciales. En Semana 12 faltará enviar un POST a `/api/libros/`, manejar la respuesta y los errores del serializer para guardar en Django.

La especificación del laboratorio está en `../spec-biblioteca-componentes.md`. Los experimentos temporales descritos allí no forman parte del código final.
