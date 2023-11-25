-- Creating tables
-- 1.
create table public."Applies" (
  "Farmer_ID" integer not null,
  "Subsidy_ID" bigint not null,
  "Approval_status" text not null,
  "Date_applied" date not null,
  constraint Applies_pkey primary key ("Farmer_ID", "Subsidy_ID"),
  constraint Applies_Farmer_ID_fkey foreign key ("Farmer_ID") references "Farmer" ("Farmer_id") on update cascade on delete cascade,
  constraint Applies_Subsidy_ID_fkey foreign key ("Subsidy_ID") references "Incentive_Schemes" ("Subsidy_ID") on update cascade on delete restrict
) tablespace pg_default;


-- 2.
create table public."Crop" (
  "Scientific_Name" character varying not null,
  "Name" character varying null,
  "Type" character varying null,
  "Season" character varying null,
  "Soil_Type" text null,
  "Water_requirement" character varying null,
  constraint Crop_pkey primary key ("Scientific_Name")
) tablespace pg_default;

-- 3.

create table public."Dealer" (
  dealer_id serial,
  dealer_name character varying(40) null,
  region character varying(20) null,
  "Email" character varying not null,
  "Password" character varying not null,
  constraint dealer_pkey primary key (dealer_id),
  constraint Dealer_email_key unique ("Email"),
  constraint Dealer_password_key unique ("Password")
) tablespace pg_default;

-- 4.
create table public."Dealer_Contact_Details" (
  dealer_id integer not null,
  contact character varying(20) not null,
  constraint Dealer_Contact_Details_pkey primary key (dealer_id, contact),
  constraint Dealer_Contact_Details_dealer_id_fkey foreign key (dealer_id) references "Dealer" (dealer_id)
) tablespace pg_default;

-- 5.
create table public."Farmer" (
  "Farmer_id" serial,
  "Farmer_name" character varying(50) null,
  "Email" character varying(50) not null,
  "Password" character varying(20) not null,
  "Date_of_Birth" date null,
  "Id_Proof" character varying(30) null,
  constraint farmer_pkey primary key ("Farmer_id"),
  constraint Farmer_Email_key unique ("Email"),
  constraint Farmer_Id_Proof_key unique ("Id_Proof"),
  constraint Farmer_Password_key unique ("Password")
) tablespace pg_default;

-- 6.
create table public."Fertilizers" (
  "Fertilizer_Name" character varying not null,
  "Chemical_composition" text null,
  "Use_case" text not null,
  constraint Fertilizers_pkey primary key ("Fertilizer_Name")
) tablespace pg_default;

-- 7.
create table public."Incentive_Schemes" (
  "Subsidy_ID" bigint generated by default as identity,
  "Subsidy_Name" text not null,
  "Amount(INR)" text null,
  constraint Incentive_Schemes_pkey primary key ("Subsidy_ID")
) tablespace pg_default;

-- 8.
create table public."Land" (
  "Farmer_ID" integer generated by default as identity,
  "Location" text not null,
  "Area(acres)" double precision not null,
  constraint Land_pkey primary key ("Farmer_ID", "Location"),
  constraint Land_Farmer_ID_fkey foreign key ("Farmer_ID") references "Farmer" ("Farmer_id") on update cascade on delete cascade
) tablespace pg_default;

-- 9.
create table public."Pesticide" (
  "Name" character varying not null,
  "Pests" character varying null,
  "Chemical_Composition" character varying null,
  constraint Pesticide_pkey primary key ("Name")
) tablespace pg_default;

-- 10.

create table public."Produce" (
  "Produce_id" bigint generated by default as identity,
  "Season" text not null,
  "Location" text not null,
  "Quantity" double precision null,
  "Year" bigint null,
  "Scientific_Name" character varying null,
  "Farmer_id" integer null,
  "Warehouse_id" bigint null,
  constraint Produce_pkey primary key ("Produce_id"),
  constraint Produce_Produce_id_key unique ("Produce_id"),
  constraint Produce_Farmer_id_fkey foreign key ("Farmer_id") references "Farmer" ("Farmer_id"),
  constraint Produce_Scientific_Name_fkey foreign key ("Scientific_Name") references "Crop" ("Scientific_Name"),
  constraint Produce_Warehouse_id_fkey foreign key ("Warehouse_id") references "Warehouse" ("Warehouse_id") on update cascade on delete cascade
) tablespace pg_default;

-- 11.
create table public."Produce_Year" (
  harvest_year integer not null,
  constraint Produce_Year_pkey primary key (harvest_year)
) tablespace pg_default;

-- 12.
create table public."Protection" (
  "Scientific_Name" character varying not null,
  "Pesticide_Name" character varying not null,
  "Dosage" text null,
  constraint Protection_pkey primary key ("Scientific_Name", "Pesticide_Name"),
  constraint Protection_Pesticide_Name_fkey foreign key ("Pesticide_Name") references "Pesticide" ("Name") on update cascade on delete cascade,
  constraint Protection_Scientific_Name_fkey foreign key ("Scientific_Name") references "Crop" ("Scientific_Name") on update cascade on delete cascade
) tablespace pg_default;

-- 13.
create table public."Purchase_record" (
  "Dealer_ID" integer generated by default as identity,
  "Produce_ID" bigint not null,
  "Quantity" double precision not null,
  "Unit_price" double precision not null,
  "Date" date not null,
  deal_status text null default 'Pending' :: text,
  purchase_id integer generated by default as identity,
  constraint Purchase_record_pkey primary key ("Dealer_ID", "Produce_ID", purchase_id),
  constraint Purchase_record_purchase_id_key unique (purchase_id),
  constraint Purchase_record_Dealer_ID_fkey foreign key ("Dealer_ID") references "Dealer" (dealer_id) on update cascade on delete cascade,
  constraint Purchase_record_Produce_ID_fkey foreign key ("Produce_ID") references "Produce" ("Produce_id") on update cascade on delete restrict
) tablespace pg_default;

-- 14.
create table public."Requires" (
  "Scientific_Name" character varying not null,
  "Fertilizer_Name" character varying not null,
  "Dosage" character varying null,
  constraint Requires_pkey primary key ("Scientific_Name", "Fertilizer_Name"),
  constraint Requires_Fertilizer_Name_fkey foreign key ("Fertilizer_Name") references "Fertilizers" ("Fertilizer_Name") on update cascade on delete cascade,
  constraint Requires_Scientific_Name_fkey foreign key ("Scientific_Name") references "Crop" ("Scientific_Name")
) tablespace pg_default;

-- 15.
create table public."Warehouse" (
  "Warehouse_id" bigint generated by default as identity,
  "Warehouse_Name" character varying not null,
  "Address" text not null,
  "Total_Capacity" bigint null,
  "Available_Capacity" bigint null,
  "State" text null,
  constraint Warehouse_pkey primary key ("Warehouse_id")
) tablespace pg_default;

-- 16.
create table public.notification_dealer (
  "Produce_id" bigint null,
  closed boolean not null default false,
  constraint notification_dealer_Produce_id_fkey foreign key ("Produce_id") references "Produce" ("Produce_id") on update cascade on delete cascade
) tablespace pg_default;

-- 17.
create table public.notification_farmer (
  dealer_id integer not null,
  "Farmer_id" integer null,
  "Produce_ID" integer not null,
  "Quantity" integer null,
  "Unit_price" integer null,
  purchase_id integer null,
  closed boolean not null default false,
  constraint notification_farmer_pkey primary key ("Produce_ID", dealer_id),
  constraint notification_farmer_Farmer_id_fkey foreign key ("Farmer_id") references "Farmer" ("Farmer_id") on delete cascade,
  constraint notification_farmer_Produce_ID_fkey foreign key ("Produce_ID") references "Produce" ("Produce_id") on delete cascade,
  constraint notification_farmer_dealer_id_fkey foreign key (dealer_id) references "Dealer" (dealer_id) on delete cascade,
  constraint notification_farmer_purchase_id_fkey foreign key (purchase_id) references "Purchase_record" (purchase_id) on update cascade on delete cascade
) tablespace pg_default;



-- Triggers

-- 1.
create trigger produce_insert_trigger
after
insert
  on "Produce" for each row execute function notify_produce_insert ();

create or replace function notify_produce_insert()
returns trigger as $$
begin
    insert into notification("Produce_id", "Farmer_ID", role)
    values (NEW.Produce_id, NEW.Farmer_ID, 'farmer');
    return NEW;
end;
$$ language plpgsql;

-- 2.
create trigger trg_after_purchase_insert
after
insert
  on "Purchase_record" for each row execute function trg_after_purchase_insert ();

CREATE OR REPLACE FUNCTION trg_after_purchase_insert()
RETURNS TRIGGER AS $$
DECLARE
    farm_id INT;
BEGIN
    -- Insert into Notification table
    SELECT "Farmer_id" INTO farm_id FROM "Produce" WHERE "Produce"."Produce_id" = NEW."Produce_ID";
    INSERT INTO notification_farmer 
    VALUES (NEW."Dealer_ID", farm_id, NEW."Produce_ID", NEW."Quantity", NEW."Unit_price", NEW."purchase_id");
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Functions

-- 1. Farmer notifications
CREATE
OR REPLACE FUNCTION get_farmer_notifications(farmer_id integer) RETURNS TABLE (
  purchase_id INTEGER,
  Produce_ID INTEGER,
  dealer_id INTEGER,
  Quantity_kg INTEGER,
  Unit_price_per_kg INTEGER
) AS $ $ BEGIN RETURN QUERY
SELECT
  "nf"."purchase_id",
  "nf"."Produce_ID",
  "nf"."dealer_id",
  "nf"."Quantity_kg",
  "nf"."Unit_price_per_kg"
FROM
  "notification_farmer" nf
WHERE
  "Produce_ID" IN (
    SELECT
      "Produce_ID"
    FROM
      "Purchase_record" pr
    WHERE
      "pr"."deal_status" = 'Pending'
  )
  AND "nf"."Farmer_id" = farmer_id;

END;

$ $ LANGUAGE plpgsql;


-- 2.Get orders
CREATE OR REPLACE FUNCTION get_orders(email_param VARCHAR)
RETURNS TABLE (
    Produce_ID bigint,
    Quantity float,
    Unit_price float,
    Date DATE,
    Deal_Status text
) AS $$
BEGIN
    RETURN QUERY
    SELECT "Purchase_record"."Produce_ID",
           "Purchase_record"."Quantity",
           "Purchase_record"."Unit_price",
           "Purchase_record"."Date",
           "Purchase_record".deal_status
    FROM "Purchase_record"
    JOIN "Dealer" ON "Purchase_record"."Dealer_ID" = "Dealer"."dealer_id"
    WHERE "Dealer"."Email" = email_param;
END;
$$ LANGUAGE plpgsql;

-- 3. Get Unique Pests
CREATE OR REPLACE FUNCTION get_unique_pests()
RETURNS TABLE (pest text)
AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT UNNEST(string_to_array(unnest(string_to_array("Pests", ',')), '"')) AS pest
  FROM "Pesticide";
END;
$$ LANGUAGE plpgsql;


-- 4.  Get Produces which havent been purchased

CREATE OR REPLACE FUNCTION get_produces()
  RETURNS TABLE (
    whole_table "Produce"
  ) AS $$
BEGIN  
  RETURN QUERY
  SELECT *
  FROM "Produce"
  WHERE "Produce_id" NOT IN (SELECT "Produce_id" FROM "Purchase_record");
END;
$$ LANGUAGE plpgsql;

-- 5. Get totals
create function get_totals (deal varchar) returns table (totpur numeric, totord int) as $$
  SELECT
    COALESCE(SUM("Unit_price"), 0) AS totpur,
    COUNT(*) AS totord
  FROM
    "Purchase_record"
    join
    "Dealer"
    ON "Purchase_record"."Dealer_ID" = "Dealer".dealer_id
    WHERE
    deal_status = 'Accepted'
    AND "Email" = deal;
$$ language sql;





-- Views
-- 1. Chemical list
CREATE
OR REPLACE VIEW chemicals_list AS
SELECT
  "Fertilizers"."Chemical_composition"
from
  "Fertilizers";

CREATE view warehouse_states as
select
  distinct "State"
from
  "Warehouse"
order by
  "State" ASC;

Select
  *
from
  fertilizers
where
  exists (
    select
      scientific_name
    from
      requires
    where
      scientific_name in (
        select
          scientific_name
        from
          crop
        where
          crop.name = name
      )
  );

-- 2. Distinct Seasons

create view public.distinct_season as
select
  distinct "Crop"."Season"
from
  "Crop";

-- 3. Distinct Soil Types

create view public.distinct_soil_type as
select
  distinct "Crop"."Soil_Type"
from
  "Crop";

-- 4. Distinct Types

create view public.distinct_types as
select
  distinct "Crop"."Type"
from
  "Crop";

-- 5. Distinct Water requirement

create view public.distinct_water_req as
select
  distinct "Crop"."Water_requirement"
from
  "Crop";

-- 6.Distinct Warehouse States

create view public.warehouse_states as
select
  distinct "Warehouse"."State"
from
  "Warehouse"
order by
  "Warehouse"."State";