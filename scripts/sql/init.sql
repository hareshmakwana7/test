CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: public."LockRule"

-- DROP TABLE public."LockRule";

CREATE TABLE IF NOT EXISTS  public."MerchantProfile"
(
    id SERIAL,
    idx uuid NOT NULL DEFAULT uuid_generate_v1() unique ,
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
    is_active boolean default  false,
    CONSTRAINT "MerchantProfile_pkey" PRIMARY KEY (id)
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."MerchantProfile"
    OWNER to postgres;



-- Table: public."Users"

-- DROP TABLE public."Users";

CREATE TABLE IF NOT EXISTS public."MerchantLicence"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    merchant_idx uuid,
    establishment_licence_no text COLLATE pg_catalog."default" NOT NULL,
    tax_code text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT MerchantLicence_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_merchant_id" FOREIGN KEY (merchant_idx)
        REFERENCES public."MerchantProfile" (idx) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."MerchantLicence"
    OWNER to postgres;



-- Table: public."Users"

-- DROP TABLE public."Users";
CREATE TABLE IF NOT EXISTS public."MerchantContact"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    merchant_idx uuid,
    company_website text,
    email text,
    phone_number  text COLLATE pg_catalog."default" NOT NULL,
    latitude text,
    longitude text,
    CONSTRAINT MerchantContact_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_merchant_id" FOREIGN KEY (merchant_idx)
        REFERENCES public."MerchantProfile" (idx) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."MerchantContact"
    OWNER to postgres;





-- DROP TABLE public."Role";

CREATE TABLE IF NOT EXISTS public."BankDetails"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    merchant_idx uuid,
    bank_code text,
    bank_swift_code text COLLATE pg_catalog."default" NOT NULL,
    bank_account_no  text COLLATE pg_catalog."default" NOT NULL,
    branch_code text COLLATE pg_catalog."default" NOT NULL,
    bank_address  text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT BankDetails_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_merchant_id" FOREIGN KEY (merchant_idx)
        REFERENCES public."MerchantProfile" (idx) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."BankDetails"
    OWNER to postgres;


-- Table: public."Permission"

-- DROP TABLE public."Permission";
CREATE TABLE IF NOT EXISTS public."BusinessContactDetails"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    merchant_idx uuid,
    business_contact_name text COLLATE pg_catalog."default" NOT NULL,
    business_contact_number  text COLLATE pg_catalog."default" NOT NULL,
    business_contact_email text COLLATE pg_catalog."default" NOT NULL,
    business_contact_ext text,
    CONSTRAINT BusinessContactDetails_pkey PRIMARY KEY (id),
    CONSTRAINT "fk_merchant_id" FOREIGN KEY (merchant_idx)
        REFERENCES public."MerchantProfile" (idx) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."BusinessContactDetails"
    OWNER to postgres;



-- Table: public."CompanyUser"

-- DROP TABLE public."CompanyUser";

CREATE TABLE IF NOT EXISTS public."TechnicalContactDetails"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    merchant_idx uuid,
    technical_contact_name text ,
    technical_contact_number  text,
    technical_contact_email text,
    technical_contact_ext text,
    CONSTRAINT "TechnicalContactDetails_pkey" PRIMARY KEY (id),
    CONSTRAINT "fk_merchant_id" FOREIGN KEY (merchant_idx)
        REFERENCES public."MerchantProfile" (idx) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."TechnicalContactDetails"
    OWNER to postgres;


-- Table: public."CompanyUser"

-- DROP TABLE public."CompanyUser";

CREATE TABLE IF NOT EXISTS public."AccountantContactDetails"
(
    id SERIAL,
    idx uuid DEFAULT uuid_generate_v1(),
    merchant_idx uuid,
    accountant_contact_name text ,
    accountant_contact_number  text,
    accountant_contact_email text,
    accountant_contact_ext text,
    CONSTRAINT "AccountantContactDetails_pkey" PRIMARY KEY (id),
    CONSTRAINT "fk_merchant_id" FOREIGN KEY (merchant_idx)
        REFERENCES public."MerchantProfile" (idx) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

ALTER TABLE public."AccountantContactDetails"
    OWNER to postgres;



