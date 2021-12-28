# Ms_Intermediario_Redis

Este API se encarga de actuar como intermediario entre redis y los procesos de midas.

## Capacidades :books:

- Gestión de Partidas candidatas.


## Repositorio 🚀

_En caso de necesitar realizar cambios en el código, solicitar acceso a la siguiente ubicación del repositorio en GIT_

https://github.com/MontePiedadMx/MS_Intermediario_Redis.git

Ver la sección **Despliegue** para conocer cómo desplegar el proyecto.

### Pre-requisitos :bookmark_tabs:

_Es necesario tener las siguientes herramientas_

- node versión 12.18.3 o superior
- node package manager versión 6.14.6 o superior

verificar con los siguientes comandos:

```
node --version
```

Y también

```
npm --version
```

### Variables de entorno :clipboard:

Para los diferentes ambientes es necesario especificar las urls a redireccionar

```
NODE_ENV: Ambiente en donde se despliega la aplicación [ LOCAL ,DEV , TEST, PROD ]
CONTEXT_NAME: Contexto del API [api]/[partidas]
CONTEXT_VERSION: Versión del API
URL_OAUTH_VALIDATOR: URL del servidor para la validación de token
```

Para análisis de pruebas Sonar

```
SONAR_HOST_URL: URL del Sonarqube
SONAR_PROJECT_NAME=Project name del proyecto
SONAR_PROJECT_KEY: Project key del proyecto
SONAR_PROJECT_LOGIN: Login generado para este proyecto
```

Para configuración new relic

```
ENV_NEW_RELIC_LICENSE_KEY: Key de licencia para la comunicación con New Relic y realizar el análisis del comportamiento del microservicio.

```

### Instalación :wrench:

_Instalación de los paquetes necesarios para despliegue y pruebas_

```
npm install
```

## Ejecutando las pruebas ⚙️

_Para la ejecución de las pruebas, no es nesaria la instalacción de otras herramientas diferentes a las instaladas en la **Instalación**,para ello ejecutar_

```
npm run test

```
## Pruebas de estrés
|Número peticiones | Operación/Recurso |Destino | intentos x petición |Tiempo Minimo | Tiempo Maximo|Tiempo Medio
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |----------- |
| 1000 |POST /api/partidas/v1/infoprenda | redis | 1 |470 ms | 4.6 s| 2s |
| 1000 |GET /api/partidas/v1/infoprenda | redis | 3 |387 ms | 5.4 s | 2.1s |

### Análisis del código :nut_and_bolt:

_Para la ejecución del análisis del código, no es nesaria la instalacción de otras herramienta diferentes a las instaladas en la **Instalación**, para ello ejecutar_

```
npm run sonar
```

## Despliegue :package:

_Para el despliegue, basta con ejecutar la sentencia_

```
npm start
```

_ver el despliegue correcto en (https://[HOSTNAME]:[PORT])_

_hacer un healthCheck (https://[HOSTNAME]:[PORT]//api/partidas/v1/)_

## Documentación para consumo :book:

Para el consumo de servicios sobre el manejo de los catálogos ver [Redis-Partidas Candidatas.](https://msclientredis.docs.apiary.io/).

## CD/CI

Para CD/CI se hace mediante Bluemix y realizar pasos de: [Manual de Instalacion](*)

## Autores :black_nib:

Desarrollado para Nacional Monte de Piedad por

* [**S & P Solutions**](<(https://www.spsolutions.com.mx/)>) - [**Juan Carlos García López**](https://github.com/JuanCarlosGarciaLopez)

## Bitácora :heavy_check_mark:
- Versión Inicial
