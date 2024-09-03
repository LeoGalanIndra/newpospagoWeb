# Diseño técnico Parametrización. 


## Tareas en diseño a elaborar:

- Evaluar el funcionamiento de CRM Properties vs Base de Datos
- Elaboracion del MER para la gestion de la parametrizacion. 
- Definir la estrategia de configuracion de atributos
- Definir el diagrama de clases.

##  Entregables

+ Modelo Entidad Relacion 
+ Diagrama de clases 

## Requisitos Impactados 

* RF-001
* RF-003
* RF-004
* RF-005
* RF-006
* RF-007
* RF-008
* RF-009
* RF-010
* RF-011

## Nuevo Pospago B2B / Parametrización

Se hara uso del proyecto APP-PropiedadesCrm el cual contiene la estructura para gestionar las propiedades del sistema. 

El proyecto se encuentra en la ruta: 

http://gitlab2.tigoune.com:9004/Accenture-T2/CRMSostenibilidad/APP-PropiedadesCrm.git

La documentación del proyecto se encuentra en: 

https://tigoco.atlassian.net/wiki/spaces/DI/pages/697991445/PropiedadesCRM-EJB

Dentro de la documentación se indica como se debe incluir el proyecto como dependencia. A continuación se cita dicha información: 

### PropiedadesCRM-EJB.jar: 

Para hacer uso del jar se debe incluir la siguiente dependencia en el proyecto maven con un scope provided. Esto para compilar proyectos en tiempo de ejecución se despliega componente en los EAP Back de Sostenibilidad

<b>groupId:</b>co.com.tigo.crm.PropiedadesCRM<br/>
<b>artifactId:</b>PropiedadesCRM-EJB<br/>
<b>version:</b>1.0.0<br/>
<b>scope:</b>provided<br/>


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

#### DDL

No se realizaran cambios a nivel de definición de estructuras. 

#### DML 

Para la configuración de las parametrizaciones se consideraran 2 tablas del schema CRM_PORTAL

CRM_APPLICATIONS: Se creará un ID de la aplicación del Nuevo Pospago B2B

INSERT INTO CRM_APPLICATIONS
(ID,NAME,CREATION_DATE,DESCRIPTION)
VALUES
('26','NUEVO POSPAGO B2B',SYSDATE,'NUEVO PRODUCTO EMPRESARIAL POSPAGO');

CRM_PROPERTIES: Se crearan registros para modelar el comportamientos de las parametricas definidas. A su vez, cada parametrica se encuentra asociada a un requisito.


* RF-001

INSERT INTO CRM_PROPERTIES (
ID,
ID_DEVELOPER,
ID_ARCHITECT,
ID_APPLICATION,
NAME,
VALUE,
DESCRIPTION,
CREATION_DATE,
VERSION
) VALUES (
SEQUENCE_NAME.NEXTVAL, -- Asegúrate de reemplazar SEQUENCE_NAME por el nombre de tu secuencia
1, -- ID_DEVELOPER
1, -- ID_ARCHITECT
26, -- ID_APPLICATION
'TIPOS_CONTRATO', -- NAME
'"Contrato Estándar"="B2B_CESTANDAR"; "Contrato Negociado"="B2B_CNEGOCIADO"', -- VALUE
'tipos de contrato definidos', -- DESCRIPTION
SYSDATE, -- CREATION_DATE
'1' -- VERSION
);


* RF-003

INSERT INTO CRM_PROPERTIES (
  ID,
  ID_DEVELOPER,
  ID_ARCHITECT,
  ID_APPLICATION,
  NAME,
  VALUE,
  DESCRIPTION,
  CREATION_DATE,
  VERSION
  ) VALUES (
  SEQUENCE_NAME.NEXTVAL, -- Asegúrate de reemplazar SEQUENCE_NAME por el nombre de tu secuencia
  1, -- ID_DEVELOPER
  1, -- ID_ARCHITECT
  26, -- ID_APPLICATION
  'Planes', -- NAME
  '"Postpago Empresarial"="B2B_POSP_EMP"', -- VALUE
  'Planes Empresariales', -- DESCRIPTION
  SYSDATE, -- CREATION_DATE
  '1' -- VERSION
  );

* RF-004

INSERT INTO CRM_PROPERTIES (
ID,
ID_DEVELOPER,
ID_ARCHITECT,
ID_APPLICATION,
NAME,
VALUE,
DESCRIPTION,
CREATION_DATE,
VERSION
) VALUES (
SEQUENCE_NAME.NEXTVAL, -- Asegúrate de reemplazar SEQUENCE_NAME por el nombre de tu secuencia
1, -- ID_DEVELOPER
1, -- ID_ARCHITECT
26, -- ID_APPLICATION
'Línea de producto', -- NAME
'ESTÁNDAR=B2B_LPESTANDAR; AVANZADO=B2B_LPAVANZADO', -- VALUE
'Línea de producto', -- DESCRIPTION
SYSDATE, -- CREATION_DATE
'1' -- VERSION
);


* RF-005

INSERT INTO CRM_PROPERTIES (
ID,
ID_DEVELOPER,
ID_ARCHITECT,
ID_APPLICATION,
NAME,
VALUE,
DESCRIPTION,
CREATION_DATE,
VERSION
) VALUES (
SEQUENCE_NAME.NEXTVAL, -- Asegúrate de reemplazar SEQUENCE_NAME por el nombre de tu secuencia
1, -- ID_DEVELOPER
1, -- ID_ARCHITECT
26, -- ID_APPLICATION
'TIPO_FAMILIA', -- NAME
'MÓVIL=B2B_TFMOVIL; IoT=B2B_TFIOT', -- VALUE
'Tipos de familia', -- DESCRIPTION
SYSDATE, -- CREATION_DATE
'1' -- VERSION
);

* RF-006

INSERT INTO CRM_PROPERTIES (
ID,
ID_DEVELOPER,
ID_ARCHITECT,
ID_APPLICATION,
NAME,
VALUE,
DESCRIPTION,
CREATION_DATE,
VERSION
) VALUES (
SEQUENCE_NAME.NEXTVAL, -- Asegúrate de reemplazar SEQUENCE_NAME por el nombre de tu secuencia
1, -- ID_DEVELOPER
1, -- ID_ARCHITECT
26, -- ID_APPLICATION
'TIPO_PRODUCTO', -- NAME
'B2B_TFMOVIL=[NUEVO PRODUCTO POSTPAGO=B2B_TPNUEVOPOSTPAGO]', -- VALUE
'TIPOS DE PRODUCTO', -- DESCRIPTION
SYSDATE, -- CREATION_DATE
'1' -- VERSION
);

* RF-008

INSERT INTO CRM_PROPERTIES (
ID,
ID_DEVELOPER,
ID_ARCHITECT,
ID_APPLICATION,
NAME,
VALUE,
DESCRIPTION,
CREATION_DATE,
VERSION
) VALUES (
SEQUENCE_NAME.NEXTVAL, -- Asegúrate de reemplazar SEQUENCE_NAME por el nombre de tu secuencia
1, -- ID_DEVELOPER
1, -- ID_ARCHITECT
26, -- ID_APPLICATION
'TIPOS_ENVIO', -- NAME
'OPERADOR LOGÍSTICO=B2B_TELOGISTICO; ENTREGA POR COMERCIAL=B2B_TECOMERCIAL', -- VALUE
'TIPOS DE ENVÍO', -- DESCRIPTION
SYSDATE, -- CREATION_DATE
'1' -- VERSION
);



* RF-011

INSERT INTO CRM_PROPERTIES (
ID,
ID_DEVELOPER,
ID_ARCHITECT,
ID_APPLICATION,
NAME,
VALUE,
DESCRIPTION,
CREATION_DATE,
VERSION
) VALUES (
SEQUENCE_NAME.NEXTVAL, -- Asegúrate de reemplazar SEQUENCE_NAME por el nombre de tu secuencia
1, -- ID_DEVELOPER
1, -- ID_ARCHITECT
26, -- ID_APPLICATION
'LINEAS MAXIMAS', -- NAME
'20', -- VALUE
'TOTAL MAXIMO DE LINEAS A MOSTRAR', -- DESCRIPTION
SYSDATE, -- CREATION_DATE
'1' -- VERSION
);




* RF-009
* RF-010



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

