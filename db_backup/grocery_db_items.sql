-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: grocery_db
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `category_id` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` text,
  `quantity` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Apple',57.00,1,'Fresh and juicy green apple','https://example.com/apple.jpg',10),(2,'Orange',5.00,1,'Fresh and juicy orange','https://example.com/orange.jpg',60),(3,'Banana',10.00,1,'Fresh bananas','https://example.com/bananas.jpg',92),(4,'Fresh Milk (1L)',2.49,2,'Farm-fresh cow\'s milk','https://example.com/milk.jpg',50),(5,'Greek Yogurt (500g)',3.99,2,'Thick and creamy Greek yogurt','https://example.com/yogurt.jpg',36),(6,'Salted Butter (200g)',2.79,2,'Rich and creamy salted butter','https://example.com/butter.jpg',30),(7,'Cheddar Cheese (250g)',4.99,2,'Sharp and flavorful cheddar cheese','https://example.com/cheese.jpg',0),(8,'Eggs (Dozen)',2.99,2,'Farm-fresh eggs','https://example.com/eggs.jpg',70),(9,'Whipped Cream (200g)',1.99,2,'Light and fluffy whipped cream','https://example.com/whipped_cream.jpg',23),(10,'Cottage Cheese (500g)',3.49,2,'Smooth and creamy cottage cheese','https://example.com/cottage_cheese.jpg',45),(11,'Plain Yogurt (1kg)',3.25,2,'Plain and creamy yogurt','https://example.com/plain_yogurt.jpg',55),(12,'Vanilla Ice Cream (1L)',4.50,2,'Rich and creamy vanilla ice cream','https://example.com/ice_cream.jpg',65),(13,'Chocolate Milk (500ml)',1.75,2,'Delicious chocolate-flavored milk','https://example.com/chocolate_milk.jpg',75),(14,'Apple',51.00,1,'Fresh and juicy red apple','https://example.com/apple.jpg',10),(15,'Orange',5.00,1,'Fresh and juicy orange','https://example.com/orange.jpg',100),(16,'Banana',10.00,1,'Fresh bananas','https://example.com/bananas.jpg',120),(17,'Fresh Milk (1L)',2.49,2,'Farm-fresh cow\'s milk','https://example.com/milk.jpg',50),(18,'Greek Yogurt (500g)',3.99,2,'Thick and creamy Greek yogurt','https://example.com/yogurt.jpg',40),(19,'Salted Butter (200g)',2.79,2,'Rich and creamy salted butter','https://example.com/butter.jpg',30),(20,'Cheddar Cheese (250g)',4.99,2,'Sharp and flavorful cheddar cheese','https://example.com/cheese.jpg',60),(21,'Eggs (Dozen)',2.99,2,'Farm-fresh eggs','https://example.com/eggs.jpg',70),(22,'Whipped Cream (200g)',1.99,2,'Light and fluffy whipped cream','https://example.com/whipped_cream.jpg',35),(23,'Cottage Cheese (500g)',3.49,2,'Smooth and creamy cottage cheese','https://example.com/cottage_cheese.jpg',45),(24,'Plain Yogurt (1kg)',3.25,2,'Plain and creamy yogurt','https://example.com/plain_yogurt.jpg',55),(25,'Vanilla Ice Cream (1L)',4.50,2,'Rich and creamy vanilla ice cream','https://example.com/ice_cream.jpg',65),(26,'Chocolate Milk (500ml)',1.75,2,'Delicious chocolate-flavored milk','https://example.com/chocolate_milk.jpg',75),(27,'Pen',1.99,5,'Blue ballpoint pen','https://example.com/pen.jpg',50),(28,'Notebook',2.50,5,'A5 lined notebook','https://example.com/notebook.jpg',40),(29,'Pencil',0.99,5,'HB graphite pencil','https://example.com/pencil.jpg',30),(30,'Stapler',5.99,5,'Office stapler','https://example.com/stapler.jpg',60),(31,'Eraser',0.50,5,'Rubber eraser','https://example.com/eraser.jpg',70),(32,'Ruler',1.25,5,'30cm plastic ruler','https://example.com/ruler.jpg',35),(33,'Highlighter',1.99,5,'Yellow highlighter pen','https://example.com/highlighter.jpg',45),(34,'Scissors',3.99,5,'Stainless steel scissors','https://example.com/scissors.jpg',55),(35,'Glue Stick',2.49,5,'15g glue stick','https://example.com/glue_stick.jpg',65),(36,'Whiteboard Marker',1.75,5,'Black whiteboard marker','https://example.com/whiteboard_marker.jpg',75);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 16:54:00
