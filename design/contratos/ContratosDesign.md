# Diseño técnico Contratos.


## Tareas en diseño a elaborar:

- Consultar la capacidad que consulta la informacion de las empresas. Se definio que la BD será DATACREDIT (servicio de consulta)

identificar Request
identificar response 
identificar errores y mensajes  
     
- Indicar el modelo de datos propuesto. 
- Diseñar el servicio de creacion de contrato en el Front-End.
- Diseñar el servicio de creacion de contrato en el Back-End. 	
- Diseñar el servicio para las operaciones de Creacion, consulta, y Edicion. 
- Indicar las validaciones definidas en la matriz de requisitos. 

##  Entregables

+ Modelo Entidad Relacion
+ Diagrama de clases
+ Catalogo de servicios 



## Requisitos Impactados

* RF-012
* RF-013


### Solucion Tareas:

- Consultar la capacidad que consulta la informacion de las empresas. Se definio que la BD será DATACREDIT (servicio de consulta)

identificar Request
identificar response
identificar errores y mensajes

El servicio de consulta de clientes se encuentra en: 

http://10.69.60.136:8080/DataCreditoEAR-DataCreditoEJB/DataCredito?wsdl

El proyecto se encuentra publicado en el repositorio: 

https://gitlab2.tigoune.com/Accenture-T2/CRM-Portal/APP-Datacredito

Capacidad

      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dat="http://datacre.colombiamovil.com.co/">
      <soapenv:Header/>
      <soapenv:Body>
         <dat:doProcess>
            <!--Optional:-->
            <arg0>getInfoReconocer</arg0>
            <arg1>clientId=189570512</arg1>
            <arg1>docType=1</arg1>
            <arg1>control=false</arg1>
            <arg1>serializationType=JSON</arg1>
         </dat:doProcess>
      </soapenv:Body>
      </soapenv:Envelope>


- Indicar el modelo de datos propuesto.
- Diseñar el servicio de creacion de contrato en el Front-End.

- Diseñar el servicio de creacion de contrato en el Back-End.
- 
- Diseñar el servicio para las operaciones de Creacion, consulta, y Edicion.
- Indicar las validaciones definidas en la matriz de requisitos.


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

