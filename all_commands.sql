-- Tables Creation

-- Dealer Table Creation
create table dealer(
  Dealer_id serial primary key,
  Dealer_name varchar(40),
  Region varchar(20)
);

-- Dealer Contact Table Creation
CREATE TABLE dealer_contact_details (
  dealer_id INT,
  contact VARCHAR(20),
  PRIMARY KEY (dealer_id, contact),
  FOREIGN KEY (dealer_id) REFERENCES Dealer(dealer_id)
);

-- Farmer Table creation
create table Farmer(
  Farmer_id int serial primary key,
  Name varchar(50),
  Email varchar(50),
  password varchar(20),
  Date_of_birth DATE,
  ID_Proof varchar(30)
);

-- Notification Farmer Table
create table notification_farmer(
  dealer_id int references "Dealer" on delete cascade,
  "Farmer_id" int references "Farmer" on delete cascade,
  "Produce_ID" int references "Produce" on delete cascade,
  "Quantity" int,
  "Unit_price" int
);


-- Views 

--1. Distinct Soils

create view distinct_soil_type as 
select distinct("Soil_Type") from "Crop";


-- 2.Distinct Water Requirement

create view distinct_water_req as 
select distinct("Water_requirement") from "Crop"; 

-- 3. Distinct Types

create view distinct_types as 
select distinct("Type") from "Crop";

-- 4. Distinct Seasons

create view distinct_season as 
select distinct("Season") from "Crop";

-- 5. 