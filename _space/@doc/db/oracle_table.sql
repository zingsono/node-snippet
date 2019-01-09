
/*==============================================================*/
/* Table: ULTAB_SC_API_SCRIPT                                   */
/*==============================================================*/
create table ULTAB_SC_API_SCRIPT 
(
   ID                   VARCHAR2(10)         not null,
   VERSION              VARCHAR2(10)         not null,
   TITLE                VARCHAR2(100),
   REMARK               VARCHAR2(500),
   SCRIPT1              VARCHAR2(4000),
   SCRIPT2              VARCHAR2(4000),
   STATUS               VARCHAR2(10),
   PROJECT_NAME         VARCHAR2(50),
   CREATED_BY           VARCHAR2(50),
   CREATED_AT           CHAR(14),
   UPDATED_BY           VARCHAR2(50),
   UPDATED_AT           CHAR(14),
   constraint PK_ULTAB_SC_API_SCRIPT primary key (ID, VERSION)
);

comment on table ULTAB_SC_API_SCRIPT is
'接口脚本配置';



