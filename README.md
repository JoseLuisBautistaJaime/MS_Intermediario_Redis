# Ms_Intermediario_Redis

Este API se encarga de actuar como intermediario entre redis y los procesos de midas.

## Capacidades :books:

- Gesti贸n de Partidas candidatas.


## Repositorio 馃殌

_En caso de necesitar realizar cambios en el c贸digo, solicitar acceso a la siguiente ubicaci贸n del repositorio en GIT_

https://github.com/MontePiedadMx/MS_Intermediario_Redis.git

Ver la secci贸n **Despliegue** para conocer c贸mo desplegar el proyecto.

### Pre-requisitos :bookmark_tabs:

_Es necesario tener las siguientes herramientas_

- node versi贸n 12.18.3 o superior
- node package manager versi贸n 6.14.6 o superior

verificar con los siguientes comandos:

```
node --version
```

Y tambi茅n

```
npm --version
```

### Variables de entorno :clipboard:

Para los diferentes ambientes es necesario especificar las urls a redireccionar

```
NODE_ENV: Ambiente en donde se despliega la aplicaci贸n [ LOCAL ,DEV , TEST, PROD ]
CONTEXT_NAME: Contexto del API [api]/[partidas]
CONTEXT_VERSION: Versi贸n del API
URL_OAUTH_VALIDATOR: URL del servidor para la validaci贸n de token
```

Para an谩lisis de pruebas Sonar

```
SONAR_HOST_URL: URL del Sonarqube
SONAR_PROJECT_NAME=Project name del proyecto
SONAR_PROJECT_KEY: Project key del proyecto
SONAR_PROJECT_LOGIN: Login generado para este proyecto
```

Para configuraci贸n new relic

```
ENV_NEW_RELIC_LICENSE_KEY: Key de licencia para la comunicaci贸n con New Relic y realizar el an谩lisis del comportamiento del microservicio.

```

### Instalaci贸n :wrench:

_Instalaci贸n de los paquetes necesarios para despliegue y pruebas_

```
npm install
```

## Ejecutando las pruebas 鈿欙笍

_Para la ejecuci贸n de las pruebas, no es nesaria la instalacci贸n de otras herramientas diferentes a las instaladas en la **Instalaci贸n**,para ello ejecutar_

```
npm run test

```
## Pruebas de estr茅s
|N煤mero peticiones | Operaci贸n/Recurso |Destino | intentos x petici贸n |Tiempo Minimo | Tiempo Maximo|Tiempo Medio
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |----------- |
| 1000 |POST /api/partidas/v1/infoprenda | redis | 1 |470 ms | 4.6 s| 2s |
| 1000 |GET /api/partidas/v1/infoprenda | redis | 3 |387 ms | 5.4 s | 2.1s |

### An谩lisis del c贸digo :nut_and_bolt:

_Para la ejecuci贸n del an谩lisis del c贸digo, no es nesaria la instalacci贸n de otras herramienta diferentes a las instaladas en la **Instalaci贸n**, para ello ejecutar_

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

## Documentaci贸n para consumo :book:

Para el consumo de servicios sobre el manejo de los cat谩logos ver [Redis-Partidas Candidatas.](https://msclientredis.docs.apiary.io/).

## CD/CI

Para CD/CI se hace mediante Bluemix y realizar pasos de: [Manual de Instalacion](*)

## Autores :black_nib:

Desarrollado para Nacional Monte de Piedad por

* [**S & P Solutions**](<(https://www.spsolutions.com.mx/)>) - [**Juan Carlos Garc铆a L贸pez**](https://github.com/JuanCarlosGarciaLopez)

## Bit谩cora :heavy_check_mark:
- Versi贸n Inicial
