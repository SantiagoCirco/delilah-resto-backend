# delilah-resto-backend
Rest API de una app de pedidos de comida

_Delilah-resto-backend_ es el tercer proyecto requerido para validar los conocimientos adquiridos durante la cursada en el curso de [Acámica](https://www.acamica.com/ "Acámica") de _Desarrollo Web Full Stack_. 
Este proyecto plantea la creación de un sistema de pedidos online para un restaurante. Se trata de una REST API que permita realizar altas, bajas, modificaciones y obtención de información sobre una estructura de datos que podría consumir un cliente.

## Introducción
Esta es una guía que describe paso a paso como configurar nuestro entorno local para poner en funcionamiento el sistema, indicando las herramientas necesarias para levantar el servidor, sus pasos de instalación y configuración, la creación de la base de datos y su población, y por último, la correcta integración entre ambas partes para poder utilizar la API de forma local o subido a un servidor online.

***



## Tecnologías y Recursos utilizados 

* Entorno  [Node Js](https://nodejs.org/en/ "Node js") .
* Framework [Express](https://expressjs.com/ "Express") .
* Gestor de Base de datos [MYSQL](https://www.mysql.com/ "MYSQL") y MYSQL Workbench para la creacion de tablas y poblar con datos de prueba .
* Servidor utilizado [XAMPP](https://www.apachefriends.org/index.html "XAMPP") .
* ORM [sequelize](https://sequelize.org/ "Sequelize") .
* Authenticación bajo el estándar [JWT](https://jwt.io/ "JWT") con la librería [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken "jsonwebtoken") .
* Encriptación de contraseñas con la librería [bcrypt](https://www.npmjs.com/package/bcrypt "bcrypy") .
* Algunos paquetes adicionales para seguridad y manejo de cors como : [Helmet](https://www.npmjs.com/package/helmet "Helmet"), [Compression](https://www.npmjs.com/package/helmet "Compression") y [Cors](https://www.npmjs.com/package/cors "Cors") .
* Para pruebas y generación de estructuras de peticiones [Postman](https://www.postman.com/ "Postman") .
* Toda la documentación bajo el estandar OpenApi v3, fue hecho usando el editor de [Swagger](https://swagger.io/ "Swagger") .


## Instalar e inicializar proyecto  

1. ### Clonar el proyecto del repositorio
El primer paso es crear una carpeta en un directorio local e incializar git con el comando ` git init ` desde esa ubicación en la terminal, para luego poder clonar el proyecto con todo su contenido escribiendo el comando :

```
git clone https://github.com/SantiagoCirco/delilah-resto-backend.git 
```

2. ### Instalar dependencias
En la raíz del proyecto, deberías ver un archivo _package.json_ que contiene, entre otras cosas, todas las dependencias utilizadas. Para instalarlas en nuestro proyecto local, debemos escribir el comando :

```
npm install
```

Luego de un rato de descarga, deberías obtener una carpeta _node\_modules_ con todas las dependencias dentro. Esto significa que tu proyecto ya cuenta con todas las librerías requeridas para su correcto funcionamiento, tales como _express_ ,_jwt_ ,_sequelize_ ,etc.

3. ### Levantar base de datos
  * Abrir [XAMPP](https://www.apachefriends.org/download.html "XAMPP") y asegurarse de que la base de datos MySql se esté ejecutando en el puerto 3306.
  * Abrir MySQL workbench y establecer la conexión con la base de datos.
  * En la carpeta del proyecto ` ./setup ` encontrarás los archivos de consultas necesarias para crear y poblar la base de datos.
  * Abrir el panel de control de nuestra base de datos y primero ejecutar ` ./setup/tables-creation.sql ` como script, y luego ` ./setup/tables-seeding.sql `.
 
4. ### Configurar las variables de entorno
  Deberás crear un archivo ` .env ` en la carpeta raíz del proyecto, el cual tendrás que poblar con los datos propios de tu entorno. El único dato requerido para el correcto funcionamiento en estado de desarrollo es el ` SECRET_TOKEN ` que debe contener una calve secreta compuesta de caracteres, números y símbolos especiales que el servidor utilizará para generar el token de cada usuario logueado. Los demás datos, están setteados por defecto en el programa para utilizar la configuración mencionada en esta guía.
  
5. ### Levantar el servidor.
  Para levantar el servidor en modo de desarrollo, podés ejecutar el siguiente comando en consola :
  
  ```
  npm run dev
  ```
  
  el cuál básicamente inicializa el archivo ` ./app.js ` con nodemon. En caso de no contar con tal dependencia, puedes ejecutar el comando 
  
  ```
  node ./app.js
  ```
  
  que también levanta el servidor.

6. ### La API ha sido levantada exitosamente
Ya podés comenzar a probar el servicio. Para eso, podés abrir el archivo ` ./setup/delilah-resto.postman_collection.json ` provisto en el repositorio e importarlo en [Postman](https://www.postman.com/ "Postman") .Allí tendrás todos los ejemplos de uso de cada endpoint disponible, como también los modelos Json de cada petición. 
  No olvides que para probar cada endpoint, vas a necesitar loguearte con un usuario provisto y usar el token devuelto por el servidor en el header de cada petición.
  
  Para más información sobre la API-Rest, podés ingresar a [Swagger](https://editor.swagger.io/ "Swagger") y arrastrar o importar el archivo ` ./setup/doc-generation.yaml ` que contiene todo lo necesario sobre cada endpoint.
  
 Autor : Santiago Circo
 