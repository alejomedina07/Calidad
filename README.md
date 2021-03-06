# Sistema de notificaciones

## Descripción

Esta Aplicación sirve realizar notificaciones cuando haya un motivo para citar a ciertos usuarios a un puesto de trabajo,
se realizó con el fin de poder alertar al personal sobre una incidencia y que dicha alerta llegue al celular o a un dispositivo
en el cual el usuario regularmente lleve con él, la idea es llevar un control sobre quienes asistieron a la llamada de alerta y en que tiempo,
pudiendo con estos datos realizar reportes de las acciones que lleven a una notificación, las causas y el tiempo de las respuestas que cada persona
tiene.


---




## Versiónes

[Express js ^4.16.1](https://expressjs.com/es/)
---
[Node js v12.16.1](https://nodejs.org/en/)
---
[Angular js ^1.7.9](https://code.angularjs.org/1.7.9/docs/api)
---

## Tecnologías
Este proyecto fue creado con:
* [Pug v2.0.0-beta11](https://pugjs.org/api/getting-started.html)  
  Pug (anteriormente conocido como Jade) es un motor de plantilla de Node.js. con el que seremos capaces de escribir código HTML de una sintaxis mucho más sencilla, clara y directa, tanto a la hora de escribir como de leer y modificar. No es necesario Instalación si ya se instalo Node js  
  [ver introducción](https://www.silocreativo.com/introduccion-primeros-pasos-pug/)
* Login realizado con: [Json Web Token v^8.5.1](https://www.jsonwebtoken.io/)  
  JSON Web Token (JWT) es un estándar abierto (RFC-7519) basado en JSON para crear un token que sirva para enviar datos entre aplicaciones o servicios y garantizar que sean válidos y seguros.  
  [ver introducción](https://platzi.com/blog/introduccion-json-web-tokens/)
* [Mysql v^2.18.1](https://github.com/mysqljs/mysql)
---

## Resumen

La Aplicación permitira alertar correctamente y de manera eficiente al personal en caso de ser necesario.


---

## Instalación de dependencias.

Para instalar todos las librerías que se requieren para el correcto funcionamiento de la Aplicación, es necesario que despues de descargar el repositorio en Git, en un terminal o CMD se ejecute el siguiente comando dentro de la carpeta contenedora del proyecto:

```
$ npm install
```

## API

## Los web services disponibles son:


### Usuarios


<dl>
  <dt>http://pcalidad.busscar.com.co:3000/usuarios</dt>
  <dd>Llevara a la vista que permite visualizar todos los usuarios creados.</dd>

  <dt>http://pcalidad.busscar.com.co:3000/usuarios/formulario</dt>
    <dd>Llevara a la vista que permite crear un nuevo usuario</dd>
</dl>


### Centros de trabajo


<dl>
  <dt>http://pcalidad.busscar.com.co:3000/centros</dt>
  <dd>Llevara a la vista que permite visualizar todos los centros de trabajo creados.</dd>

  <dt>http://pcalidad.busscar.com.co:3000/centros/formulario</dt>
    <dd>Llevara a la vista que permite crear un nuevo centro de trabajo</dd>
</dl>

### Notificaciones


<dl>
  <dt>http://pcalidad.busscar.com.co:3000/notificaciones</dt>
  <dd>Llevara a la vista que permite visualizar todas las notificaciones creadas.</dd>

  <dt>http://pcalidad.busscar.com.co:3000/notificaciones/formulario</dt>
    <dd>Llevara a la vista que permite crear una nueva notificación</dd>
</dl>
