
# Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
# Click nbfs://nbhost/SystemFileSystem/Templates/Other/Dockerfile to edit this template

FROM alpine:latest
WORKDIR /jr
CMD ["/bin/sh"]
#FROM amazoncorretto:17-alpine-jdk                   
MAINTAINER JR                                       
COPY  target/jr-0.0.1-SNAPSHOT.jar  jr-0.0.1-SNAPSHOT.jar     
ENTRYPOINT ["java","-jar","/jr-0.0.1-SNAPSHOT.jar"]