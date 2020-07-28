FROM tomcat:8.5-jdk11-adoptopenjdk-openj9
ARG WAR_FILE=./target/*.war
WORKDIR /usr/local/tomcat/webapps
COPY ${WAR_FILE} ./ROOT.war

# docker build -t user-backend:0.0.1 .
# docker run --name user-backend -p 8080:8080 -d user-backend:0.0.1