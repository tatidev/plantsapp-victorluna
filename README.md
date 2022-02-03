# Plantsapp

[![Netlify Status](https://api.netlify.com/api/v1/badges/3205d49e-25a2-4dfd-8a37-3005e6ffa3b9/deploy-status)](https://app.netlify.com/sites/peaceful-elion-8e295f/deploys)

## Sobre el proyecto
* La aplicación es un e-commerce de plantas.
* No es obligatorio hacer el Login para realizar una orden, en caso haber hecho el login se le facilita la carga del formulario de orden y se le habilita el listado histórico de ordenes generadas
* Se encuentra deployada en Netlify. El link de acceso es https://peaceful-elion-8e295f.netlify.app/

## Secciones de la aplicación
### Home
* Se listan todas las plantas diosponibles en la base de datos.
* Se puede filtrar por categoría.
* Cada producto se puede marcar como favorito o enviar al carrito desde esta página.
* Al ingresar en cada item se ve el detalle del producto y se puede agregar al carrito la cantidad deseada del producto con validación de no superar el stock disponible.
### Favoritos
* Se listan todos los productos marcados como favoritos en el Home.
* Tiene la opción de vaciar la lista o borra de a un item.
* Esta lista es temporal, no se almacena en la base.
### Carro
* Se listan todos los items enviados al carrito
* Tiene la opción de vaciar la lista o borra de a un item.
* Al realizar la orden si el usuario hizo el login se le cargan todos los datos solicitados. En caso contrario el usuario debe cargar a mano los campos.
* El cálculo de las fechas de envío a domicilio esta calculado entre 3 y 5 días de la fecha de orden
* El precio de envío se encuentra definido en el context de la orden
* Al confirmar la orden la misma le almacena en Firebase
### Ordenes
* Esta opción se ve si el usuario se encuentra logeado
* Lista el histórico de ordenes realizado por el usuario
### Perfil / Nuevo Usuario
* Esta opción se ve si el usuario se encuentra logeado
* Tiene la opción de ver, crear o modificar los datos del perfil.
* La imagen de perfil se almacena en Firebase storage.
* La password se almacena en MD5
    

## Tecnología / Arquitectura
* React
* Hook reducer. Se utiliza reducer y context para la siguiente información:
    * Carrito
    * Favoritos
    * Datos de usuario logueado
* Boostrap sass
* Librerias utilizadas
    * react-router-dom
    * react-toastify
    * react-bootstrap
    * md5
    * validator
* Base de datos Firebase
    * En la carpeta Firebase se encuentra el lote de datos y los scripts utilizados para hacer el upload a Firebase.
* Firebase Storage: almacenado de imagenes de avatar de usuarios .
* Se usa variables de entorno para almacenar las credenciales de Firebase
* La carpeta Util contiene funciones reutilizables

## Mapa de componentes de la aplicación
![components map](https://raw.githubusercontent.com/tatidev/plantsapp-victorluna/master/public/components_map.png)

## Setup del proyecto 
npm install

