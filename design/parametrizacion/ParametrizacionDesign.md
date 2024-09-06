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

## Decisiones de Arquitectura

#### Evaluar la parametrizacion del Nuevo Pospago B2B usando CRM Properties vs Base de Datos?

Es importante identificar las responsabilidad de cada modelo. El modelo CRM Properties esta encargado de gestionar las propiedades de un proyecto. Configurar unos valores que puede tomar un atributo seria complicado como propiedad. 
Así, La solución planteada para la parametrización de atributos del Nuevo Postpago B2B se realizará con base a las capacidades del CRM Properties y un modelo en base de datos para nos permita configurar los valores de un atributo. 

1. Properties CRM 

> Será el encargado de gestionar las propiedades del Nuevo Pospago B2B. El componente gestiona las propiedades del portal CRM. Cada propiedad es accedida a traves de una clave y un Id. La solución se encuentra desplegada en el entorno de Sostenibilidad.

2. Modelo de Parametros Nuevo en Base de datos.  

> Será el encargado de gestionar de las clasificaciones. El componente es nuevo. Se implementaria una solucion en base de datos, en la cual se configura los valores que puede tener un parametro. 


## Nuevo Pospago B2B / Parametrización

### Properties CRM

Se hara uso del proyecto APP-PropiedadesCrm el cual contiene la estructura para gestionar las propiedades del sistema. 

El proyecto se encuentra en la ruta: 

http://gitlab2.tigoune.com:9004/Accenture-T2/CRMSostenibilidad/APP-PropiedadesCrm.git

La documentación del proyecto se encuentra en: 

https://tigoco.atlassian.net/wiki/spaces/DI/pages/697991445/PropiedadesCRM-EJB

Dentro de la documentación se indica como se debe incluir el proyecto como dependencia. A continuación se cita dicha información: 

#### PropiedadesCRM-EJB.jar: 

Para hacer uso del jar se debe incluir la siguiente dependencia en el proyecto maven con un scope provided. Esto para compilar proyectos en tiempo de ejecución se despliega componente en los EAP Back de Sostenibilidad

> <b>groupId:</b>co.com.tigo.crm.PropiedadesCRM<br/>
<b>artifactId:</b>PropiedadesCRM-EJB<br/>
<b>version:</b>1.0.0<br/>
<b>scope:</b>provided<br/>

### Modelo de Clasificaciones 

Se implementará el modelo de CLASIFICADORES para parametrizar los valores de un parametro. 

## Casos de uso(opcional)
    
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


## Diagrama de componentes

![Componentes.JPG](Componentes.JPG)

## Diagrama de paquetes

![Paquetes.jpg](Paquetes.jpg)

## Diagrama de clases

> ![B2BPortabilidad-DiagramaClases-Parametrizacion.jpg](B2BPortabilidad-DiagramaClases-Parametrizacion.jpg)


## Descripción detallada del cambio a nivel de bases de datos

### DDL

> - Las propiedades quedaran registradas en la tabla CRM_PROPERTIES
> - Las clasificaciones de un parametro o propiedad quedaran registradas en la tabla B2B_CLASSIFICATION

-- Crear la tabla
> -- Crear la tabla B2B_CLASSIFICATION
CREATE TABLE B2B_CLASSIFICATION (
ID NUMBER NOT NULL PRIMARY KEY,  -- Usar NUMBER para la clave primaria
ID_PARENT NUMBER NOT NULL,  -- Usar NUMBER también para claves foráneas o referencias
VALUE VARCHAR2(255),  -- Especificar tamaño para el campo VALUE
DESCRIPTION VARCHAR2(500) NOT NULL  -- Especificar tamaño para DESCRIPTION
);


### DML 

Para la configuración de las parametrizaciones se consideraran 3 tablas del schema CRM_PORTAL

<b>CRM_APPLICATIONS</b>: Se creará un ID de la aplicación del Nuevo Pospago B2B

> INSERT INTO CRM_APPLICATIONS
(ID,NAME,CREATION_DATE,DESCRIPTION)
VALUES
('26','NUEVO POSPAGO B2B',SYSDATE,'NUEVO PRODUCTO EMPRESARIAL POSPAGO');

<b>CRM_PROPERTIES</b>: Se crearan registros para modelar el comportamientos de las parametricas definidas. A su vez, cada parametrica se encuentra asociada a un requisito.

> INSERT INTO CRM_PROPERTIES (
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
***** SEQUENCE_NAME *********,
1, -- ID_DEVELOPER
1, -- ID_ARCHITECT
26, -- ID_APPLICATION
'PLANES', -- NAME
'Postpago Empresarial=B2B_POSP_EMP', -- VALUE
'Planes Empresariales', -- DESCRIPTION
SYSDATE, -- CREATION_DATE
'1' -- VERSION
);

> INSERT INTO CRM_PROPERTIES (
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
***** SEQUENCE_NAME *********,
1, -- ID_DEVELOPER
1, -- ID_ARCHITECT
26, -- ID_APPLICATION
'LINEAS_MAXIMAS', -- NAME
'20', -- VALUE
'TOTAL MAXIMO DE LINEAS A MOSTRAR', -- DESCRIPTION
SYSDATE, -- CREATION_DATE
'1' -- VERSION
);



<b>B2B_CLASSIFICATION</b>: Tabla para parametrizar las clasificaciones por tipo

-- Inserts para la tabla B2B_CLASSIFICATION
> INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (1, NULL, 'TIPOS CONTRATO', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (2, 1, 'ESTANDAR', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (3, 1, 'NEGOCIADO', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (4, NULL, 'PLANES', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (5, 4, 'POSTPAGO EMPRESARIAL', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (6, NULL, 'LINEA PRODUCTO', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (7, 6, 'ESTÁNDAR', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (8, 6, 'AVANZADO', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (9, NULL, 'TIPO FAMILIA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (10, 9, 'MÓVIL', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (11, 9, 'IOT', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (12, NULL, 'TIPO PRODUCTO', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (13, 11, 'NUEVO PRODUCTO POSTPAGO', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (14, NULL, 'TIPOS ENVIO', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (15, 13, 'OPERADOR LOGÍSTICO', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (16, 13, 'ENTREGA POR COMERCIAL', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (17, NULL, 'GRUPOS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (18, 17, 'GRUPO 1', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (19, 17, 'GRUPO 2', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (20, 17, 'GRUPO 3', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (21, 17, 'GRUPO 4', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (22, 17, 'ADMINITRACION', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (23, 17, 'ADMINITRADORES DE VENTAS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (24, 17, 'ANALISTAS DE VENTAS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (25, 17, 'ASESORES', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (26, 17, 'ASESORES COMERCIALES', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (27, 17, 'AUDITORIA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (28, 17, 'COMPRAS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (29, 17, 'CONTAC CENTER', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (30, 17, 'COORDINADORES', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (31, 17, 'COORDINADORES DE VENTAS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (32, 17, 'DIRECTORES', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (33, 17, 'DIRECTORES DE VENTAS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (34, 17, 'EJECUTIVOS DE VENTAS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (35, 17, 'FINANZAS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (36, 17, 'GERENTES', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (37, 17, 'INFORMATICA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (38, 17, 'LIDERES', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (39, 17, 'LOGISTICA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (40, 17, 'MARKETING', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (41, 17, 'MENSAJEROS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (42, 17, 'MERCADEO', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (43, 17, 'OPERACIONES', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (44, 17, 'OPERARIOS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (45, 17, 'PRESIDENCIA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (46, 17, 'PRODUCCIÓN', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (47, 17, 'PUNTOS DE VENTA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (48, 17, 'RECEPCION', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (49, 17, 'RECURSOS HUMANOS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (50, 17, 'SECRETARIA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (51, 17, 'SERVICIOS AL CLIENTE', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (52, 17, 'SUBGERENTES VENTAS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (53, 17, 'TECNOLOGIA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (54, 17, 'TESORERIA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (55, 17, 'VENTAS', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (56, 17, 'VICEPRESIDENTES', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (57, NULL, 'ESTADOS DE LINEA', NULL);
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (58, 57, 'PENDIENTE', 'La configuración de la oferta se encuentra en proceso de registro');
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (59, 57, 'EN EJECUCIÓN', 'Se envió la oferta completa al proceso de aprovisionamiento y aún se encuentran líneas pendientes por activar.');
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (60, 57, 'PROCESADA', 'Cuando todas las líneas de la oferta se encuentran activas.');
INSERT INTO B2B_CLASSIFICATION (ID, ID_PARENT, VALUE, DESCRIPTION) VALUES (61, 57, 'FALLIDO', 'Se muestra este


### Diagrama E-R

+ MODELO EXISTENTE

>![CRM_APPLICATION.jpg](CRM_APPLICATION.jpg)


>![CRMPROPERTIES.jpg](CRMPROPERTIES.jpg)


+ MODELO NUEVO ADICIONAL 

> ![b2bClassification.JPG](b2bClassification.JPG)
  

### Otros componentes (Índices / Procedimientos / Funciones / Paquetes)

-- Comentarios para la tabla B2B_CLASSIFICATION
> COMMENT ON TABLE B2B_CLASSIFICATION IS 'Tabla que contiene la clasificación jerárquica de elementos.';

-- Comentarios para las columnas
> COMMENT ON COLUMN B2B_CLASSIFICATION.ID IS 'Identificador único de la clasificación.';
COMMENT ON COLUMN B2B_CLASSIFICATION.ID_PARENT IS 'Identificador de la clasificación padre (jerarquía).';
COMMENT ON COLUMN B2B_CLASSIFICATION.VALUE IS 'Valor asociado a la clasificación.';
COMMENT ON COLUMN B2B_CLASSIFICATION.DESCRIPTION IS 'Descripción de la clasificación.';

-- Crear el índice
> CREATE INDEX B2B_INDX_CLASS_1 ON B2B_CLASSIFICATION (ID_PARENT, VALUE);

-- ID_PARENT está relacionado con ID de la misma tabla, se añade clave foránea:
> ALTER TABLE B2B_CLASSIFICATION
ADD CONSTRAINT fk_b2b_classification_parent
FOREIGN KEY (ID_PARENT) REFERENCES B2B_CLASSIFICATION(ID);

### Por validar: DATASOURCE en los servidores
> Se configurará un nuevo datasource en los servidores de JBOSS de Sostenibilidad. 

> <datasource jta="false" 
            jndi-name="java:/crmportal_DS" 
            pool-name="crmportal_DS" 
            enabled="true" 
            use-ccm="false" 
            statistics-enabled="false">
> <connection-url>XXXXX</connection-url>
> <driver-class>XXXXXX</driver-class>
> <driver>XXXXX</driver>
> </datasource>

### Persistence Context 

> Se definio que la contexto de integracion con la base de datos sera por JPA. 
Para esto, es necesario realizar una definicion del persistence contexto que contiene el mappeo de cada una de las entidades. 
A continuación, se plantea un ejemplo de como se debe parametrizar este archivo
<persistence version="1.0" xmlns="http://java.sun.com/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_1_0.xsd">
	<persistence-unit name="PropiedadesCRM-PU" transaction-type="JTA">
	<jta-data-source>java:/crmportal_DS</jta-data-source>
		<class>co.com.colombiamovil.crm.entity.ItCompany</class>
		<class>co.com.colombiamovil.crm.entity.Property</class>
		<class>co.com.colombiamovil.crm.entity.ItPerson</class>
	</persistence-unit></persistence>

![PersistContext.JPG](PersistContext.JPG)

### Descripción detallada del cambio a nivel de integraciones <b>NO APLICA</b>

### Diagrama de integraciones

> La integración entre B2BMovil y Properties CRM se realizará usando Beans Remotos

### Integraciones por servicios

> Para acceder a los servicios del Properties CRM se realizará a traves de lookup. 

![LookUp.jpg](LookUp.jpg)

Se anexa el código respectivo. 

> public String getProperty(String propertyName) {
String propValue = null;
try {
if (this.props == null)
init();
propValue = this.props.getProperty(propertyName);
if (propValue == null) {
this
.propiedadesCRM = (PropertiesBeanRemote)RemoteEJBClient.getInstance().lookupJBoss6InCLuster("PropiedadesCRM-EJB/PropertiesBean!co.com.colombiamovil.crm.ejb.PropertiesBeanRemote");
String prop = this.propiedadesCRM.getPropertyValue(
Integer.valueOf(Integer.parseInt("6")), propertyName);
if (prop != null)
propValue = prop;
}
logger.info("[PropertiesLoader.getProperty] " + propertyName + " = " + propValue);
} catch (Exception ex) {
try {
if (this.props != null)
logger.error("[PropertiesLoader.getProperty] Error al obtener la propiedad " + propertyName);
} catch (Exception exx) {
logger.error("[PropertiesLoader.getProperty] Error inicializando variable estatica.");
}
throw new RuntimeException(ex);
}
return propValue;
}

### Integraciones por ETLs: <b>NO APLICA</b>


### Detalle a nivel de red (Solo para nuevas aplicaciones): <b>NO APLICA</b>



### Detalle a nivel de infraestructura (Solo para nuevas aplicaciones): <b>NO APLICA</b>


### Descripción detallada del cambio a nivel de configuraciones / parametrizaciones: <b>NO APLICA</b>
   

### Descripción Detallada del Cambio a Nivel de Seguridad: <b>NO APLICA</b>



### Modelo de Amenazas: <b>NO APLICA</b>
   
