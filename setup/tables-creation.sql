CREATE SCHEMA delilahrest;

DROP TABLE paymethod;
DROP TABLE product;
DROP TABLE user;
DROP TABLE `order`;
DROP TABLE order_has_product;

CREATE TABLE IF NOT EXISTS `delilahresto`.`User` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(60) NOT NULL,
  `fullname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `tel` VARCHAR(32) NOT NULL,
  `adress` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `role` TINYINT(1) NOT NULL DEFAULT 0,
  `deleted` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
  );

CREATE TABLE IF NOT EXISTS `delilahresto`.`Product` (
  `id` INT(11) NOT NULL  AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `price` INT(11) NOT NULL,
  `image` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`)
  );

  CREATE TABLE IF NOT EXISTS `delilahresto`.`paymethod` (
  `id` INT(11) NOT NULL  AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `isactive` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
  );

CREATE TABLE IF NOT EXISTS `delilahresto`.`Order` (
  `id` INT(11) NOT NULL  AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `status` ENUM("canceled", "delivering", "preparing", "accepted", "placed","delivered") NOT NULL COMMENT 'delivered\"\n        - \"canceled\"\n        - \"delivering\"\n        - \"preparing\"\n        - \"accepted\"\n        - \"placed\"',
  `price` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `paymethod_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Order_User_idx` (`user_id` ASC) ,
  INDEX `fk_Order_paymethod1_idx` (`paymethod_id` ASC),
  CONSTRAINT `fk_Order_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `delilahresto`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_paymethod1`
    FOREIGN KEY (`paymethod_id`)
    REFERENCES `delilahresto`.`paymethod` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );



CREATE TABLE IF NOT EXISTS `delilahresto`.`Order_has_Product` (
  `Order_id` INT(11) NOT NULL,
  `Product_id` INT(11) NOT NULL,
  `amount` INT(11) NOT NULL,
  PRIMARY KEY (`Order_id`, `Product_id`),
  INDEX `fk_Order_has_Product_Product1_idx` (`Product_id` ASC) ,
  INDEX `fk_Order_has_Product_Order1_idx` (`Order_id` ASC) ,
  CONSTRAINT `fk_Order_has_Product_Order1`
    FOREIGN KEY (`Order_id`)
    REFERENCES `delilahresto`.`Order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Order_has_Product_Product1`
    FOREIGN KEY (`Product_id`)
    REFERENCES `delilahresto`.`Product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );


