FROM amazoncorretto:11-alpine-jdk                   //de que imagen java partimos
MAINTAINER JR                                       // quien es el dueño de la imagen
COPY  target/jr-0.0.1-SNAPSHOT.jar  jr-app.jar      // copia de nuestro proyecto el empaquetado y lo sube a github
ENTRYPOINT ["java","-jar","/jr-app.jar"]            //es la instruccion que se va a ejecutar primero