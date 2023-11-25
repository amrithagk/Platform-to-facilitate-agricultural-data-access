-- .
CREATE TABLE `Crop` (
  `Scientific_Name` VARCHAR(255) NOT NULL,
  `Name` VARCHAR(255) NULL,
  `Type` VARCHAR(255) NULL,
  `Season` VARCHAR(255) NULL,
  `Soil_Type` TEXT NULL,
  `Water_requirement` VARCHAR(255) NULL,
  PRIMARY KEY (`Scientific_Name`)
);

-- .
CREATE TABLE `Dealer` (
  `dealer_id` int AUTO_INCREMENT,
  `dealer_name` VARCHAR(40) NULL,
  `region` VARCHAR(20) NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`dealer_id`),
  UNIQUE KEY `Dealer_email_key` (`Email`),
  UNIQUE KEY `Dealer_password_key` (`Password`)
);

-- 4.
CREATE TABLE `Dealer_Contact_Details` (
  `dealer_id` INT NOT NULL,
  `contact` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`dealer_id`, `contact`),
  FOREIGN KEY (`dealer_id`) REFERENCES `Dealer` (`dealer_id`)
);

-- 5.
CREATE TABLE `Farmer` (
  `Farmer_id` int AUTO_INCREMENT,
  `Farmer_name` VARCHAR(50) NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(20) NOT NULL,
  `Date_of_Birth` DATE NULL,
  `Id_Proof` VARCHAR(30) NULL,
  PRIMARY KEY (`Farmer_id`),
  UNIQUE KEY `Farmer_Email_key` (`Email`),
  UNIQUE KEY `Farmer_Id_Proof_key` (`Id_Proof`),
  UNIQUE KEY `Farmer_Password_key` (`Password`)
);

-- 6.
CREATE TABLE `Fertilizers` (
  `Fertilizer_Name` VARCHAR(255) NOT NULL,
  `Chemical_composition` TEXT NULL,
  `Use_case` TEXT NOT NULL,
  PRIMARY KEY (`Fertilizer_Name`)
);

-- 15.
CREATE TABLE `Warehouse` (
  `Warehouse_id` BIGINT AUTO_INCREMENT,
  `Warehouse_Name` VARCHAR(255) NOT NULL,
  `Address` TEXT NOT NULL,
  `Total_Capacity` BIGINT NULL,
  `Available_Capacity` BIGINT NULL,
  `State` TEXT NULL,
  PRIMARY KEY (`Warehouse_id`)
);

-- 8.
CREATE TABLE `Land` (
  `Farmer_ID` INT,
  `Location` varchar(20) NOT NULL,
  `Area_acres` DOUBLE NOT NULL,
  PRIMARY KEY (`Farmer_ID`, `Location`),
  FOREIGN KEY (`Farmer_ID`) REFERENCES `Farmer` (`Farmer_id`) ON UPDATE CASCADE ON DELETE CASCADE
);


-- 7.
CREATE TABLE `Incentive_Schemes` (
  `Subsidy_ID` BIGINT AUTO_INCREMENT,
  `Subsidy_Name` TEXT NOT NULL,
  `Amount_INR` TEXT NULL,
  PRIMARY KEY (`Subsidy_ID`)
);


CREATE TABLE `Applies` (
  `Farmer_ID` INT NOT NULL,
  `Subsidy_ID` BIGINT NOT NULL,
  `Approval_status` TEXT NOT NULL,
  `Date_applied` DATE NOT NULL,
  PRIMARY KEY (`Farmer_ID`, `Subsidy_ID`),
  FOREIGN KEY (`Farmer_ID`) REFERENCES `Farmer` (`Farmer_id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`Subsidy_ID`) REFERENCES `Incentive_Schemes` (`Subsidy_ID`) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- 9.
CREATE TABLE `Pesticide` (
  `Name` VARCHAR(255) NOT NULL,
  `Pests` VARCHAR(255) NULL,
  `Chemical_Composition` VARCHAR(255) NULL,
  PRIMARY KEY (`Name`)
);

-- 10.
CREATE TABLE `Produce` (
  `Produce_id` BIGINT AUTO_INCREMENT,
  `Season` TEXT NOT NULL,
  `Location` TEXT NOT NULL,
  `Quantity` DOUBLE NULL,
  `Year` BIGINT NULL,
  `Scientific_Name` VARCHAR(255) NULL,
  `Farmer_id` INT NULL,
  `Warehouse_id` BIGINT NULL,
  PRIMARY KEY (`Produce_id`),
  UNIQUE KEY `Produce_Produce_id_key` (`Produce_id`),
  FOREIGN KEY (`Farmer_id`) REFERENCES `Farmer` (`Farmer_id`),
  FOREIGN KEY (`Scientific_Name`) REFERENCES `Crop` (`Scientific_Name`),
  FOREIGN KEY (`Warehouse_id`) REFERENCES `Warehouse` (`Warehouse_id`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 11.
CREATE TABLE `Produce_Year` (
  `harvest_year` INT NOT NULL,
  PRIMARY KEY (`harvest_year`)
);

-- 12.
CREATE TABLE `Protection` (
  `Scientific_Name` VARCHAR(255) NOT NULL,
  `Pesticide_Name` VARCHAR(255) NOT NULL,
  `Dosage` TEXT NULL,
  PRIMARY KEY (`Scientific_Name`, `Pesticide_Name`),
  FOREIGN KEY (`Pesticide_Name`) REFERENCES `Pesticide` (`Name`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`Scientific_Name`) REFERENCES `Crop` (`Scientific_Name`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 13.
CREATE TABLE `Purchase_record` (
  `Dealer_ID` INT ,
  `Produce_ID` BIGINT NOT NULL,
  `Quantity` DOUBLE NOT NULL,
  `Unit_price` DOUBLE NOT NULL,
  `Date` DATE NOT NULL,
  `deal_status` varchar(10) NULL DEFAULT 'Pending',
  `purchase_id` INT AUTO_INCREMENT,
  PRIMARY KEY (`Dealer_ID`, `Produce_ID`, `purchase_id`),
  UNIQUE KEY `Purchase_record_purchase_id_key` (`purchase_id`),
  FOREIGN KEY (`Dealer_ID`) REFERENCES `Dealer` (`dealer_id`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`Produce_ID`) REFERENCES `Produce` (`Produce_id`) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- 14.
CREATE TABLE `Requires` (
  `Scientific_Name` VARCHAR(255) NOT NULL,
  `Fertilizer_Name` VARCHAR(255) NOT NULL,
  `Dosage` VARCHAR(255) NULL,
  PRIMARY KEY (`Scientific_Name`, `Fertilizer_Name`),
  FOREIGN KEY (`Fertilizer_Name`) REFERENCES `Fertilizers` (`Fertilizer_Name`) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`Scientific_Name`) REFERENCES `Crop` (`Scientific_Name`)
);


-- 16.
CREATE TABLE `notification_dealer` (
  `Produce_id` BIGINT NULL,
  `closed` BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (`Produce_id`) REFERENCES `Produce` (`Produce_id`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 17.
CREATE TABLE `notification_farmer` (
  `dealer_id` INT NOT NULL,
  `Farmer_id` INT NULL,
  `Produce_ID` bigint NOT NULL,
  `Quantity` INT NULL,
  `Unit_price` INT NULL,
  `purchase_id` INT NULL,
  `closed` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`Produce_ID`, `dealer_id`),
  FOREIGN KEY (`Farmer_id`) REFERENCES `Farmer` (`Farmer_id`) ON DELETE CASCADE,
  FOREIGN KEY (`Produce_ID`) REFERENCES `Produce` (`Produce_id`) ON DELETE CASCADE,
  FOREIGN KEY (`dealer_id`) REFERENCES `Dealer` (`dealer_id`) ON DELETE CASCADE,
  FOREIGN KEY (`purchase_id`) REFERENCES `Purchase_record` (`purchase_id`) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Triggers

-- 1.

CREATE TRIGGER `produce_insert_trigger`
AFTER INSERT ON `Produce` FOR EACH ROW
BEGIN
    INSERT INTO `notification_dealer` (`Produce_id`)
    VALUES (NEW.`Produce_id`);
END;

-- 2.
CREATE TRIGGER `trg_after_purchase_insert`
AFTER INSERT ON `Purchase_record` FOR EACH ROW
BEGIN
    DECLARE farm_id INT;
    SELECT `Farmer_id` INTO farm_id FROM `Produce` WHERE `Produce`.`Produce_id` = NEW.`Produce_ID`;
    INSERT INTO `notification_farmer` VALUES (NEW.`Dealer_ID`, farm_id, NEW.`Produce_ID`, NEW.`Quantity`, NEW.`Unit_price`, NEW.`purchase_id`);
END;

-- Functions


-- 1. Farmer notifications
DELIMITER //

CREATE PROCEDURE get_farmer_notifications(IN farmer_id INT)
BEGIN
  SELECT
    nf.purchase_id,
    nf.Produce_ID,
    nf.dealer_id,
    nf.Quantity_kg,
    nf.Unit_price_per_kg
  FROM
    notification_farmer nf
  WHERE
    nf.Produce_ID IN (
      SELECT
        pr.Produce_ID
      FROM
        Purchase_record pr
      WHERE
        pr.deal_status = 'Pending'
    )
    AND nf.Farmer_id = farmer_id;
END //

DELIMITER ;

-- 2. Get orders
DELIMITER //

CREATE PROCEDURE get_orders(IN email_param VARCHAR(255))
BEGIN
  SELECT
    Purchase_record.Produce_ID,
    Purchase_record.Quantity,
    Purchase_record.Unit_price,
    Purchase_record.Date,
    Purchase_record.deal_status
  FROM
    Purchase_record
  JOIN
    Dealer ON Purchase_record.Dealer_ID = Dealer.dealer_id
  WHERE
    Dealer.Email = email_param;
END //

DELIMITER ;

-- 3. Get Unique Pests
DELIMITER //

CREATE PROCEDURE get_unique_pests()
BEGIN
  SELECT DISTINCT
    UNNEST(string_to_array(unnest(string_to_array(Pests, ',')), '"')) AS pest
  FROM
    Pesticide;
END //

DELIMITER ;

-- 4. Get Produces which haven't been purchased
DELIMITER //

CREATE PROCEDURE get_produces()
BEGIN
  SELECT *
  FROM Produce
  WHERE Produce_id NOT IN (SELECT Produce_id FROM Purchase_record);
END //

DELIMITER ;

-- 5. Get totals
DELIMITER //

CREATE PROCEDURE get_totals(IN deal VARCHAR(255))
BEGIN
  SELECT
    COALESCE(SUM(Unit_price), 0) AS totpur,
    COUNT(*) AS totord
  FROM
    Purchase_record
  JOIN
    Dealer ON Purchase_record.Dealer_ID = Dealer.dealer_id
  WHERE
    deal_status = 'Accepted'
    AND Email = deal;
END //

DELIMITER ;


-- Views
-- 1. Chemical list
CREATE OR REPLACE VIEW `chemicals_list` AS
SELECT
  `Fertilizers`.`Chemical_composition`
FROM
  `Fertilizers`;

CREATE VIEW `warehouse_states` AS
SELECT
  DISTINCT `State`
FROM
  `Warehouse`
ORDER BY
  `State` ASC;

-- 2. Distinct Seasons
CREATE OR REPLACE VIEW `distinct_season` AS
SELECT
  DISTINCT `Crop`.`Season`
FROM
  `Crop`;

-- 3. Distinct Soil Types
CREATE OR REPLACE VIEW `distinct_soil_type` AS
SELECT
  DISTINCT `Crop`.`Soil_Type`
FROM
  `Crop`;

-- 4. Distinct Types
CREATE OR REPLACE VIEW `distinct_types` AS
SELECT
  DISTINCT `Crop`.`Type`
FROM
  `Crop`;

-- 5. Distinct Water requirement
CREATE OR REPLACE VIEW `distinct_water_req` AS
SELECT
  DISTINCT `Crop`.`Water_requirement`
FROM
  `Crop`;

-- 6. Distinct Warehouse States
CREATE OR REPLACE VIEW `warehouse_states` AS
SELECT
  DISTINCT `Warehouse`.`State`
FROM
  `Warehouse`
ORDER BY
  `Warehouse`.`State` ASC;
