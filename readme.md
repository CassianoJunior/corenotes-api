<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/cassianojunior/corenotes-api">
    <img src="docs/images/logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">CoreNotes</h3>
  <p align="center">
    Project for a job opening at Corelab that consists a note management system
    <br />
    <a href="https://github.com/cassianojunior/corenotes-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/cassianojunior/corenotes-api">View Demo</a>
    ·
    <a href="https://github.com/cassianojunior/corenotes-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/cassianojunior/corenotes-api/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About the Project

![CoreNotes Screenshot][swagger-screenshot]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Nest][nest]][nest-url]
* [![Prisma][prisma]][prisma-url]
* [![Swagger][swagger]][swagger-url]
* [![Json Web Token][json-web-token]][jwt-url]
* [![Zod][zod]][zod-url]
* [![Vitest][vitest]][vitest-url]
* [![Docker][docker]][docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

* Docker
  
  You can install Docker from [here](https://docs.docker.com/get-docker/)

  You also need to install Docker Compose from [here](https://docs.docker.com/compose/install/)

  > If you not want to use Docker, you can install PostgreSQL for your OS and change the database connection in the `.env` file

* Node

  You can install Node from [here](https://nodejs.org/en/download/)

### Installation

1. Clone the repo or download the zip file
  
    ```sh
    git clone https://github.com/cassianojunior/corenotes-api.git
    ```

2. Enter the project folder
  
    ```sh
    cd corenotes-api
    ```

3. Install NPM packages
  
    ```sh
    npm install
    ```

4. Create a `.env` file based on `.env.example` file
  
    ```sh
    cp .env.example .env
    ```

5. Compose the Docker containers
  
    ```sh
    docker-compose up -d
    ```

6. Run the migrations
  
    ```sh
    npx prisma migrate deploy
    ```

7. Run the project
  
    ```sh
      npm run start:dev
    ```

    Open [http://localhost:3333/docs](http://localhost:3333/docs) with your browser to see the docs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

* [x] Requested features
  * [x] Users should be able to create, read, update, and delete to-do items using the API.
  * [x]  Users should be able to mark an item as a favorite.
  * [x] Users should be able to set a color for each to-do item.
  * [x] The React frontend should display the user's to-do list in a responsive and visually appealing manner, with the ability to filter by favorite items and color.
  * [x] The favorited items should be displayed at the top of the list.
* [x] Additional features
  * [x] Authentication with JWT.
  * [x] Swagger documentation.
  * [x] Unit and E2E tests.
  * [x] Domain-driven design techniques.

See the [open issues](https://github.com/cassianojunior/corenotes-api/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Cassiano Junior - [@dev_cassianojr](https://twitter.com/dev_cassianojr) - [cassianojuniorww@gmail.com](mailto:cassianojuniorww@gmail.com)

Project Link: [https://github.com/cassianojunior/corenotes-api](https://github.com/cassianojunior/corenotes-api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/cassianojunior/corenotes-api
[contributors-url]: https://github.com/cassianojunior/corenotes-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/cassianojunior/corenotes-api
[forks-url]: https://github.com/cassianojunior/corenotes-api/network/members
[stars-shield]: https://img.shields.io/github/stars/cassianojunior/corenotes-api
[stars-url]: https://github.com/cassianojunior/corenotes-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/cassianojunior/corenotes-api
[issues-url]: https://github.com/cassianojunior/corenotes-api/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/cassianojunior
[swagger-screenshot]: docs/images/swagger-min.png
[nest]: https://img.shields.io/badge/NestJS-232525?logo=nestjs&logoColor=E0234E
[nest-url]: https://nestjs.com/
[prisma]: https://img.shields.io/badge/PrismaORM-2d3748?logo=prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[swagger]: https://img.shields.io/badge/Swagger-262626?logo=swagger&logoColor=85EA2D
[swagger-url]: https://swagger.io/
[json-web-token]: https://img.shields.io/badge/Json%20Web%20Token-000000?logo=jsonwebtokens&logoColor=ce31f0
[jwt-url]: https://jwt.io/
[zod]: https://img.shields.io/badge/Zod-283339?logo=zod&logoColor=3E67B1
[zod-url]:https://zod.dev
[vitest]: https://img.shields.io/badge/Vitest-141414?logo=vitest&logoColor=6E9F18
[vitest-url]: https://vitest.netlify.app/
[docker]: https://img.shields.io/badge/Docker-white?logo=docker&logoColor=2496ED
[docker-url]: https://www.docker.com/
