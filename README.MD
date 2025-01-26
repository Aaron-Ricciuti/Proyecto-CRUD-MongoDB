#  Final UTN - Diplomatura Web Full Stack

Este es el proyecto final de la diplomatura Web Full Stack de la UTN. Consiste en una API REST que permite administrar las operaciones CRUD de tres modelos principales:

- **User**
- **Product**
- **Category**

El objetivo es gestionar eficientemente datos relacionados con usuarios, productos y categorías mediante endpoints específicos.

---

## 🛠️ Tecnologías Empleadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework minimalista para crear aplicaciones web.
- **MongoDB**: Base de datos no relacional para almacenar la información.
- **Jsonwebtoken**: Manejo de autenticación mediante tokens JWT.
- **Bcrypt**: Encriptación de contraseñas.
- **Dotenv**: Gestión de variables de entorno.

---

## 🚀 Cómo Empezar

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/Aaron-Ricciuti/Proyecto-CRUD-MongoDB.git
   ```

2. **Instalar Dependencias**
   ```bash
   cd Proyecto-CRUD-MongoDB
   npm install
   ```

3. **Configurar la Base de Datos**
   - Conecta tu base de datos utilizando **MongoDB Compass**.
   - Verifica que la configuración en el archivo .env coincida con la conexión de MongoDB.

4. **Ejecutar el Proyecto**
   ```bash
   npm run dev
   ```

---

## 📌 Endpoints Disponibles

### 📂 User
- **GET** `/api/user/get`: Obtiene todos los usuarios.
- **POST** `/api/user/create`: Crea un nuevo usuario.
- **POST** `/api/user/login`: Inicia sesión.
- **DELETE** `/api/user/delete/:id`: Elimina un usuario por ID.
- **PUT** `/api/user/update/:id`: Actualiza un usuario por ID.

### 📂 Category
- **GET** `/api/category/get`: Obtiene todas las categorías.
- **POST** `/api/category/create`: Crea una nueva categoría.
- **DELETE** `/api/category/delete`: Elimina una categoría.

### 📂 Product
- **GET** `/api/product/get`: Obtiene todos los productos.
- **POST** `/api/product/create`: Crea un nuevo producto.
- **GET** `/api/product/get-by-id/:id`: Obtiene un producto por ID.
- **POST** `/api/product/get-by-name`: Busca un producto por nombre.
- **PUT** `/api/product/update/:id`: Actualiza un producto por ID.
- **DELETE** `/api/product/delete/:id`: Elimina un producto por ID.

---

## 🧪 Mock Data

###  User
```json
{
  "name": "Michael",
  "lastName": "Scofield",
  "age": 52,
  "email": "michael@gmail.com",
  "password": "Iforgot55",
  "role": "CUSTOMER"
}
```

### Category
```json
{
  "name": "Cajones",
  "description": "Personalizados de 10, 12 y 15"
}
```

### Product
```json
{
  "name": "Cajón de 15 slot",
  "description": "Largo: 78cm, alto: 42cm, profundidad: 36cm",
  "price": 75000,
  "stock": 6,
  "category": "id de categoría",
  "status": "AVAILABLE"
}