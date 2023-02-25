#FROM amazoncorretto:8-alpine-jdk                   
MAINTAINER JR                                       
COPY  target/jr-0.0.1-SNAPSHOT.jar  jr-0.0.1-SNAPSHOT.jar     
ENTRYPOINT ["java","-jar","/jr-0.0.1-SNAPSHOT.jar"]
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:resolve

COPY src ./src

CMD ["./mvnw", "spring-boot:run"]            