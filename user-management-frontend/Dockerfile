FROM nginx:stable-alpine
ARG DIST_FILE=./dist/user-frontend-demo
COPY ${DIST_FILE} /usr/share/nginx/html

# docker build -t user-frontend:0.0.1 .
# docker run --name user-frontend -p 80:80 -d user-frontend:0.0.1