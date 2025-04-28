<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Gateway Service

Servicio API Gateway para microservicios (NestJS + gRPC)

---

## Despliegue y pruebas

### Docker Compose (recomendado)

Este gateway está preparado para funcionar en un entorno Docker Compose. Todas las URLs de servicios gRPC se configuran por variables de entorno:

- `AGENCIES_SERVICE_URL=agencias-service:5002`
- `PROJECTS_SERVICE_URL=proyectos-service:5001`
- `AGENCY_PROJECTS_SERVICE_URL=agencies-users-management-service:5003`

### Docker individual (flujo recomendado)

1. Inicia la base de datos y el servicio de migraciones Prisma:
   ```bash
   docker-compose up db dbprisma-service
   ```
2. Cuando las migraciones hayan terminado, inicia el gateway:
   ```bash
   docker-compose up gateway-service
   ```

Esto asegura que la base de datos y el esquema estén listos antes de iniciar el gateway y que pueda comunicarse correctamente con los microservicios.

### Local puro

Puedes correr el gateway localmente con pnpm/npx y variables de entorno.

## Descripción
Este proyecto es el punto de entrada para el ecosistema de microservicios. Expone endpoints HTTP y se comunica vía gRPC con los servicios de agencias y proyectos.

**Características principales:**
- Enrutamiento y agregación de datos desde microservicios.
- Endpoint enriquecido para relaciones agencia-proyecto.
- Filtros flexibles por agencia y proyecto.
- Documentación Swagger lista para pruebas y exploración.

Incluye automatización para el manejo de archivos `.proto` (necesarios para gRPC) durante el desarrollo y la producción.

---

## Prerrequisitos
- Node.js >= 18
- pnpm >= 8
- Git

---

## Instalación
```bash
pnpm install
```

---

## Endpoints principales

### Obtener relaciones agencia-proyecto enriquecidas

`GET /agency-projects/full`

#### Parámetros de query (opcionales):
- `agenciaId`: Filtra por el ID de la agencia.
- `proyectoId`: Filtra por el ID del proyecto.

#### Ejemplos de uso
- Obtener todas las relaciones:
  ```
  GET /agency-projects/full
  ```
- Obtener todas las relaciones para una agencia:
  ```
  GET /agency-projects/full?agenciaId=UUID_AGENCIA
  ```
- Obtener todas las relaciones para un proyecto:
  ```
  GET /agency-projects/full?proyectoId=UUID_PROYECTO
  ```
- Obtener la relación específica entre agencia y proyecto:
  ```
  GET /agency-projects/full?agenciaId=UUID_AGENCIA&proyectoId=UUID_PROYECTO
  ```

#### Respuesta de ejemplo
```json
[
  {
    "id": "relacion-uuid",
    "created_at": "2025-04-23T17:00:00.000Z",
    "agencia": { "id": "...", "name": "...", ... },
    "proyecto": { "id": "...", "name": "...", ... }
  }
]
```

---

## Scripts principales

### Desarrollo (recomendado)
Ejecuta ambos procesos (NestJS y watcher de protos) en una sola terminal:
```bash
pnpm run dev:full
```
Esto:
- Arranca el gateway en modo watch (`nest start --watch`)
- Mantiene actualizados los `.proto` en `dist/proto` aunque Nest borre la carpeta (gracias a `watch-proto.js`)

### Otros scripts útiles
- **Watcher de protos solo:**
  ```bash
  pnpm run watch:proto
  ```
- **Servidor solo:**
  ```bash
  pnpm run dev
  ```
- **Producción:**
  ```bash
  pnpm run start:prod
  ```

---

## Estructura relevante
- `src/proto/` → aquí van tus archivos `.proto` fuente
- `dist/proto/` → aquí se copian automáticamente para que el gateway los use
- `watch-proto.js` → watcher multiplataforma para desarrollo

---

## Recomendaciones para colaborar
- **No edites directamente en `main`**. Crea una rama para cada cambio:
  ```bash
  git checkout -b feature/nombre-cambio
  ```
- Haz PRs pequeños y claros.
- Si modificas o agregas `.proto`, asegúrate de que el watcher los copie correctamente.

---

## Notas técnicas
- El watcher de protos usa [`chokidar`](https://www.npmjs.com/package/chokidar) para máxima compatibilidad Windows/Linux/Mac.
- Si tienes problemas con los `.proto` en desarrollo, asegúrate de estar usando `pnpm run dev:full` y que no haya errores en consola.

---

## Contacto y soporte
- Para dudas técnicas, abre un issue o contacta al responsable del repositorio.

---
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
