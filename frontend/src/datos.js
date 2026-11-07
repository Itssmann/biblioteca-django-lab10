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
