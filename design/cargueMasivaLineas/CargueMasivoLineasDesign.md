# Diseño técnico Cargue Masivo Lineas.


## Tareas en diseño a elaborar:

- definir la plantilla de cargue masivo de lineas. (dentro del proceso validar borrar el archivo despues de procesarlo). NOTA: validar alguna gestion del archivo despues de procesarlo.
- indicar el modelo de datos para el cargue masivo de lineas.
- definir y diseñar las validaciones respectivas para el cargue de lineas.
- Definir el modelo de estados para la gestion de lineas. (Pendiente se puede eliminar).
- definir las reglas de negocio cuando se realiza re-cargues de las lineas a activar.


##  Entregables

+ Modelo Entidad Relacion
+ Diagrama de clases
+ Catalogo de servicios


## Requisitos Impactados

* RF-027
* RF-030
* RF-031 
* RF-033


## Tener en cuenta

NOTA 1: Definir detalle de las lineas cargadas.
nota 2: si hay una linea con fallo, no se debe permitir la persistencia de la lineas.


## XXXXX (Sistema) / XXXXXXX (Subsistema	Descripción)


### Casos de uso(opcional)
    
    <Describa los pasos o las actividades que deberán realizarse para solución a los requisitos especificados. Los casos de uso no son obligatorios, estos se realizan cuando se considere necesario dar claridad sobre las acciones a ejecutar en el sistema>

* Nombre:	
* Complejidad:
* Alta
* Descripción:
* Actores:
* Sistema	Documentos asociados:
* Precondiciones:
* Post-condiciones:
* Reglas de Negocio
* Flujo básico:
* Flujos alternos:
* Manejos de situaciones anormales:
* Trazabilidad con requisitos


### Diagrama de componentes

    <Si hay cambios en la aplicación existente, presentar los componentes del sistema y el impacto sobre estos por la implementación del requerimiento. Se debe dar una descripción completa de este impacto.>

### Diagrama de paquetes

    < Si hay cambios en la aplicación existente, Diagrama de paquetes, es preferible que en el diagrama de clases se identifique los paquetes, si se hace en el diagrama de clases no es necesario hacer este diagrama>

### Diagrama de clases

    < Si hay cambios en la aplicación existente, descripción de las clases impactadas por la implementación del requerimiento. Queda abierta la decisión del nivel del detalle de acuerdo a las necesidades del requerimiento y su nivel de madurez, mínimamente se espera el nombre de la clase y sus relaciones.>

### Descripción detallada del cambio a nivel de bases de datos

   < Descripción del impacto a nivel de bases de datos por la implementación de este requerimiento. >

### Diagrama E-R

   < Si hay cambios en la aplicación existente, presentar las tablas y vistas impactados por la implementación del requerimiento. Se debe dar una descripción completa de este impacto.>

### Otros componentes (Índices / Procedimientos / Funciones / Paquetes)
   
   <Enumerar y dar una explicación detallada del impacto en otra clase de componentes de base de datos, tales como índices, procedimientos almacenados, funciones, paquetes, etc.>

### Descripción detallada del cambio a nivel de integraciones

   < Si hay cambios en la aplicación existente, Descripción del impacto a nivel de integraciones por la implementación de este requerimiento>

### Diagrama de integraciones

   < Si hay cambios en la aplicación existente, Descripción del impacto a nivel de integraciones presentando en un diagrama las relaciones, protocolos y sincronía entre los diferentes componentes de la solución>

### Integraciones por servicios

   < Si hay cambios en la aplicación existente, Descripción del impacto a nivel de integraciones entre servicios, tales como: WS-SOAP, WS-REST, EJBs, CORBA, DCOM, etc.>

### Integraciones por ETLs

   < Si hay cambios en la aplicación existente, Descripción del impacto a nivel de integraciones realizadas por soluciones con ETLs creadas por scripts, SQLLDRs, SSIS, etc.>

### Detalle a nivel de red (Solo para nuevas aplicaciones)

   <  Descripción del impacto a nivel de red por la implementación de este requerimiento, diagramando y enumerando los componentes impactados tales como switches, routers, IPs, VLANs, etc.>

### Detalle a nivel de infraestructura (Solo para nuevas aplicaciones)

   <  Descripción del impacto a nivel de infraestructura por la implementación de este requerimiento, diagramando y enumerando los componentes impactados tales como CPU, memorias, storage, etc.>

### Descripción detallada del cambio a nivel de configuraciones / parametrizaciones
   
   <  Descripción del impacto a nivel de configuraciones / parametrizaciones por la implementación de este requerimiento, listando y detallando los archivos de configuración, tablas paramétricas, variables de script, etc., que sirvan para configurar la solución tecnológica.>

### Descripción Detallada del Cambio a Nivel de Seguridad

   <  En este espacio se espera el diseño del tratamiento de riesgos y amenazas para ser mitigados en la solución.
   (P6, P8, P10) vinculo a los Anexos entregado por seguridad.>

### Modelo de Amenazas
   
   < El diagrama debe quedar actualizado en Confluence y aca el vínculo al documento.>

