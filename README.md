mean-starter
============

MEAN-Starter es un base para iniciar el desarrollo de aplicaciones web con MongoDB, Express, AngularJS, Node + Grunt, Bootstrap, Boilerplate, Passport ...

Esta versión esta basada en parte en meanjs y meanio.

¡ESTA VERSION SE ENCUENTRA AÚN EN DESARROLLO!

Requerimientos
--------------

Se deben tener instalado:
- MongoDB
- Node
- NPM


Instalación
-----------

- Clonar el repositorio y moverse dentro de la carpeta creada.
- Ejecutar los siguientes comandos para instalar los componentes y dependencias. 
    - npm install
    - bower install
- Para DEVELOPMENT, ejecutar: 
    - grunt development (ejecuta las tareas de development como copiar archivos, compilar jade)
    - grunt server 


Estructura del proyecto
-----------------------
- mean-starter/
    - app/                -> aplicación servidor
        - controllers/
        - helpers/
        - models/
        - routes/
        - views/
        - tests/
    - client/             -> aplicación cliente
        - app/            -> modulos de AngularJS
            - [module]/ 	-> carperta por cada módulo que contiene archivos como my_module.controller.js, my_module.services.js, my_module.directives,js)
            - views/          
        - less/
    - config/             -> configuración de la aplicación servidor
        - env/
    - public/
        - app/
        - css/        
        - fonts/
        - img/
        - js/
        - vendor/     -> componentes de terceros como jquery, bootstrap, angular (cliente)
    - node_modules/
    - bower_components/


Crear un projecto desde cero
----------------------------

Requerimientos

- express-generator
- bower

Tareas
- Ejecutar >express mi-aplicacion -c less, para crear la estructura de la applicación. 
- Adaptar la estructura de archivos generada a la nueva estructura de archivos, moviendo las carpetas y creando las que falten.
- Modificar todas las referencias. 
- Renombrar app.js por server.js.
- Crear el archivo gruntfile.js.
- Ejecutar >bower init para crear el archivo bower.
- Instalar/desinstalar las siguientes dependencias:
    - bower install jquery --save
    - bower install bootstrap --save
    - bower install angularjs --save
    - bower install angular-resource --save
    - bower install angular-preloaded --save    -> para variables desde el servidor a angular
    - bower install angular-route --save
    - npm install mongoose --save
    - npm install passport --save
    - npm install passport-local --save
    - npm install express-session --save
    - npm install connect-flash --save
    - npm install bcrypt-nodejs --save
    - npm install underscore --save
    - npm install helmet --save     -> ayuda a controlar los request en caso ataques
    - npm install connect-roles --save      -> para el control de authorization
    - npm uninstall less-middleware
    - npm uninstall serve-favicon 
    - npm install grunt --save-dev
    - npm install grunt-bower --save-dev
    - npm install grunt-contrib-watch --save-dev
    - npm install grunt-contrib-jade --save-dev
    - npm install grunt-contrib-less --save-dev
    - npm install grunt-contrib-connect --save-dev
    - npm install grunt-contrib-copy --save-dev
    - npm install grunt-contrib-uglify --save-dev
    - npm install grunt-contrib-cssmin --save-dev
    - npm install grunt-contrib-jshint --save-dev
    - npm install grunt-nodemon --save-dev
    - npm install grunt-concurrent --save-dev    
- Implementar la tareas de grunt.
- Descargar boierplate e integrarlo a la aplicación.

A tener en cuenta:
- Las rutas definidas en la propiedad files en las tareas de grunt 'watch' y 'nodemon' no deben solaparse entre si, sino tendremos un error del tipo '...port 35729 is already in use by another process...'.



