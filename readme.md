# Pokedex

## Instrucciones

Tienen 2 carpetas,
* una aplicación cliente, que por ahora es un html sin javascript, con un servidor minimo
* una aplicación servidor, hecha en Astro, que está funcionando sin usar js en el cliente

Ambas pueden iniciarse corriendo el comando `npm run dev` en cada carpeta, luego de haber instalado las dependencias en cada una usando `npm install`.

Queremos agregarle funcionalidad a la aplicación cliente, de manera que tenga las mismas funciones que la aplicación servidor actual, pero usando javascript en el cliente.

Para esto tendran que encontrar la manera de que los servicios del servidor sean accesibles desde la aplicación cliente, y llamar al servidor desde el javascript de la pagina web.

Tengan en cuenta que son 2 aplicaciones separadas, corriendo en puertos distintos.

## Tareas
* Leer y entender como funciona la aplicación servidor
* Añadir alguna manera a la aplicación servidor para que pueda comunicarse con una aplicación cliente usando json
* Añadir la funcionalidad necesaria a la aplicación cliente para que pueda comunicarse con el servidor y ser interactiva
* Mandar un pull request con los cambios realizados

## Fecha de entrega
* Lunes 1 de abril a las 23:59