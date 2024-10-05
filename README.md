# Nodejs - Ai with Docker Compose

The project demonstrates my work capabailites in Backend with Nodejs and Docker compose features ,
The Project also explains the Microservice architecture of the docker for large applications , where each component serves as a standalone service that interact with each other

## Project Details:

the backend is about an e-commerce app where basic CRUD operations can be done using node js , MongoDB and Express , also integrating an AI model which classify user comments to be toxic or not (the comment and the classification result is also added under this user account in the database for further analysis and work)

The Docker compose will make 3 containers up and running,

    1. Backend Container , this container handles api requests related to the CRUD operations of poducts , Brands and Categories.

    2. Ai Container , which holds the AI service of classifying the comments and orchestrating the result with the backend container to block the user if the comment is a toxic or bad one.

    3- MongoDB Container , where all the data is stored and requested.

## How to start :

you can think of each folder as the container itself , each container of these has its own `Dockerflie` to make this specific container up and running ,

The Docker compose yml is responsible for the orchestration of these containers , to run this project use `docker compose up` command , make sure that your terminal is at the root directory

In case you are interested in one part or one container then you can just access this container and use `docker build image_name:version_number .` then `docker run -p 8000:8000 image_name:version_number ` in case of the backend part , replace the port number 8000 to be `9000:9000` in case of the AI container

# Demo:

---

![MicroService Architecture](./assets/compose.png)
