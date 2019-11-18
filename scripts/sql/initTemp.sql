CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS public."Controller"
(
    id SERIAL,
    idx uuid NOT NULL DEFAULT uuid_generate_v1() unique,
    merchant_id bigint,
    company_idx uuid ,
    status  boolean,
    is_submitted boolean,
    created_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Controller_pkey" PRIMARY KEY (id)
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."Controller"
    OWNER to postgres;




-- Table: public."LockRule"

-- DROP TABLE public."LockRule";

CREATE TABLE IF NOT EXISTS  public."MerchantProfileTemp"
(
    id SERIAL,
    idx uuid NOT NULL DEFAULT uuid_generate_v1() unique,
    mobile_number text COLLATE pg_catalog."default" NOT NULL,
    company_name text COLLATE pg_catalog."default" NOT NULL,
    issue_date date,
    merchant_code bigint,
    id_type bigint,
    id_expiry date,
    merchant_group bigint,
    nationality text COLLATE pg_catalog."default" NOT NULL,
    idpassport_no bigint,
    idcard_front text ,
    idcard_back text,
    establishment_image text,
    logo text,
    point_rate text,
    payment_type text,
    sweep_interval bigint,
    refund_allowed_days bigint,
    company_id bigint,
    CONSTRAINT "MerchantProfileTemp_pkey" PRIMARY KEY (id),
    CONSTRAINT "fk_controller_id" FOREIGN KEY (company_id)
        REFERENCES public."Controller" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."MerchantProfileTemp"
    OWNER to postgres;



-- Table: public."Users"

-- DROP TABLE public."Users";

CREATE TABLE IF NOT EXISTS public."MerchantLicenceTemp"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    company_id bigint,
    establishment_licence_no text COLLATE pg_catalog."default" NOT NULL,
    tax_code text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT MerchantLicenceTemp_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_controller_id" FOREIGN KEY (company_id)
        REFERENCES public."Controller" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."MerchantLicenceTemp"
    OWNER to postgres;



-- Table: public."Users"

-- DROP TABLE public."Users";
CREATE TABLE IF NOT EXISTS public."MerchantContactTemp"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    company_id bigint,
    company_website text,
    email text,
    phone_number  text COLLATE pg_catalog."default" NOT NULL,
    latitude text,
    longitude text,
    CONSTRAINT MerchantContactTemp_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_controller_id" FOREIGN KEY (company_id)
        REFERENCES public."Controller" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."MerchantContactTemp"
    OWNER to postgres;





-- DROP TABLE public."Role";

CREATE TABLE IF NOT EXISTS public."BankDetailsTemp"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    company_id bigint,
    bank_code text,
    bank_swift_code text COLLATE pg_catalog."default" NOT NULL,
    bank_account_no  text COLLATE pg_catalog."default" NOT NULL,
    branch_code text COLLATE pg_catalog."default" NOT NULL,
    bank_address  text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT BankDetailsTemp_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_controller_id" FOREIGN KEY (company_id)
        REFERENCES public."Controller" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."BankDetailsTemp"
    OWNER to postgres;


-- Table: public."Permission"

-- DROP TABLE public."Permission";
CREATE TABLE IF NOT EXISTS public."BusinessContactDetailsTemp"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    company_id bigint,
    business_contact_name text COLLATE pg_catalog."default" NOT NULL,
    business_contact_number  text COLLATE pg_catalog."default" NOT NULL,
    business_contact_email text COLLATE pg_catalog."default" NOT NULL,
    business_contact_ext text,
    CONSTRAINT BusinessContactDetailsTemp_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_controller_id" FOREIGN KEY (company_id)
        REFERENCES public."Controller" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."BusinessContactDetailsTemp"
    OWNER to postgres;



-- Table: public."CompanyUser"

-- DROP TABLE public."CompanyUser";

CREATE TABLE IF NOT EXISTS public."TechnicalContactDetailsTemp"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    company_id bigint,
    technical_contact_name text ,
    technical_contact_number  text,
    technical_contact_email text,
    technical_contact_ext text,
    CONSTRAINT "TechnicalContactDetailsTemp_pkey" PRIMARY KEY (id),
    CONSTRAINT "fk_controller_id" FOREIGN KEY (company_id)
        REFERENCES public."Controller" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."TechnicalContactDetailsTemp"
    OWNER to postgres;


-- Table: public."CompanyUser"

-- DROP TABLE public."CompanyUser";

CREATE TABLE IF NOT EXISTS public."AccountantContactDetailsTemp"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    company_id bigint,
    accountant_contact_name text ,
    accountant_contact_number  text,
    accountant_contact_email text,
    accountant_contact_ext text,
    CONSTRAINT "AccountantContactDetailsTemp_pkey" PRIMARY KEY (id),
    CONSTRAINT "fk_controller_id" FOREIGN KEY (company_id)
        REFERENCES public."Controller" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."AccountantContactDetailsTemp"
    OWNER to postgres;





