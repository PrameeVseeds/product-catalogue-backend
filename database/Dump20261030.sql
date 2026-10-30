-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: product_catalogue_system
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_admin_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Admin','admin@productcatalogue.local','$2b$12$Lk1XWsiK7VPO32uPYI6UnOkUZVB5CJ0O2WEoeRR7NAE1Gp7iYWsvG',1,'2026-08-07 16:46:46','2026-08-07 17:44:15');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(180) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flag_image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_brand_slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (3,'Bosch','bosch','China',NULL,NULL,NULL,NULL,NULL,0,1,'2026-09-22 10:08:04','2026-09-22 10:08:04');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(180) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_category_slug` (`slug`),
  KEY `idx_category_active_order` (`is_active`,`display_order`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (6,'Drill Bits','drill-bits',NULL,NULL,0,1,'2026-09-22 10:07:38','2026-09-22 11:20:16'),(7,'Re-Bar Cutter','re-bar-cutter',NULL,NULL,0,1,'2026-09-22 11:24:08','2026-09-22 11:24:08'),(8,'Chisel','chisel',NULL,NULL,0,1,'2026-09-22 12:27:56','2026-09-22 12:27:56'),(9,'Hole Saw','hole-saw',NULL,NULL,0,1,'2026-09-23 08:37:50','2026-09-23 08:37:50'),(10,'Saw Blades','saw-blades',NULL,NULL,0,1,'2026-09-23 10:14:03','2026-09-23 10:14:03'),(11,'Hacksaw Blade and Frames','hacksaw-blade-and-frames',NULL,'/uploads/categories/1790140902317-6fe8bd27ae4bd2091a4108fa.webp',0,1,'2026-09-23 10:51:43','2026-09-23 10:51:43'),(12,'Router Bit Set','router-bit-set',NULL,NULL,0,1,'2026-09-23 11:04:15','2026-09-23 11:04:15'),(13,'Planer Blade','planer-blade',NULL,NULL,0,1,'2026-09-23 11:14:32','2026-09-23 11:14:32'),(14,'Coated Abrasives','coated-abrasives',NULL,NULL,0,1,'2026-09-23 11:18:54','2026-09-23 11:18:54'),(15,'Impact Drill Bits','impact-drill-bits',NULL,NULL,0,1,'2026-09-24 09:13:01','2026-09-24 09:13:01'),(16,'Others','others',NULL,NULL,0,1,'2026-09-24 09:26:11','2026-09-24 09:26:11');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_brands`
--

DROP TABLE IF EXISTS `category_brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_brands` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `brand_id` bigint unsigned NOT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_category_brand` (`category_id`,`brand_id`),
  KEY `fk_category_brand_brand` (`brand_id`),
  CONSTRAINT `fk_category_brand_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_category_brand_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_brands`
--

LOCK TABLES `category_brands` WRITE;
/*!40000 ALTER TABLE `category_brands` DISABLE KEYS */;
INSERT INTO `category_brands` VALUES (3,6,3,0,1,'2026-09-22 10:08:09'),(4,7,3,0,1,'2026-09-22 11:24:27'),(5,8,3,0,1,'2026-09-22 12:28:06'),(6,9,3,0,1,'2026-09-23 08:38:06'),(7,10,3,0,1,'2026-09-23 10:14:11'),(8,11,3,0,1,'2026-09-23 10:51:49'),(9,12,3,0,1,'2026-09-23 11:05:53'),(10,13,3,0,1,'2026-09-23 11:15:00'),(11,14,3,0,1,'2026-09-23 11:21:11'),(12,15,3,0,1,'2026-09-24 09:13:05'),(13,16,3,0,1,'2026-09-24 09:26:20');
/*!40000 ALTER TABLE `category_brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_settings`
--

DROP TABLE IF EXISTS `contact_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `contact_heading` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Contact Us',
  `contact_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `phone_primary` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_secondary` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `working_hours` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map_embed_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `contact_background_image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_settings`
--

LOCK TABLES `contact_settings` WRITE;
/*!40000 ALTER TABLE `contact_settings` DISABLE KEYS */;
INSERT INTO `contact_settings` VALUES (1,'Contact Us',NULL,'SEEDS PVT LTD','Seeds Pvt Ltd,\nL1-61,\nReality Plaza,\nJa-ela','0741477269',NULL,NULL,'dithmiprameesha@gmail.com','Monday-Friday 8.30am-5.30pm','https://www.google.com/maps/embed?pb=%211m18%211m12%211m3%211d3959.4380133022205%212d79.88945567581838%213d7.075108616505857%212m3%211f0%212f0%213f0%213m2%211i1024%212i768%214f13.1%213m3%211m2%211s0x3ae2f0c9463cb0d7%3A0xe3137fdcc17700c6%212sRealty+Plaza%215e0%213m2%211sen%212slk%214v1786427823307%215m2%211sen%212slk&utm_source=chatgpt.com',NULL,'2026-09-21 13:03:21');
/*!40000 ALTER TABLE `contact_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiries`
--

DROP TABLE IF EXISTS `enquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned DEFAULT NULL,
  `model_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enquiry_type` enum('GENERAL','PRODUCT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GENERAL',
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('NEW','IN_PROGRESS','CONTACTED','CLOSED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NEW',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_enquiry_product` (`product_id`),
  KEY `idx_enquiry_status_created` (`status`,`created_at`),
  KEY `idx_enquiry_type_created` (`enquiry_type`,`created_at`),
  CONSTRAINT `fk_enquiry_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiries`
--

LOCK TABLES `enquiries` WRITE;
/*!40000 ALTER TABLE `enquiries` DISABLE KEYS */;
INSERT INTO `enquiries` VALUES (1,NULL,NULL,'GENERAL','Test customer','dithmiprameesha@gmail.com','0741477269','Test subject','test message','NEW','2026-08-10 09:37:05','2026-08-10 09:37:05'),(2,NULL,NULL,'PRODUCT','Dithmi Prameesha','dithmiprameesha@gmail.com','+94706550713','inqery','sss','NEW','2026-08-10 17:12:34','2026-08-10 17:12:34'),(3,NULL,NULL,'PRODUCT','dd','pmadhushanka544@gmail.com',NULL,NULL,'dd','NEW','2026-08-11 08:42:37','2026-09-21 10:53:45'),(4,NULL,NULL,'PRODUCT','ff','dithmiprameesha@gmail.com',NULL,'Product Enquiry','dd','NEW','2026-08-11 11:15:18','2026-08-11 11:15:18');
/*!40000 ALTER TABLE `enquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_settings`
--

DROP TABLE IF EXISTS `enquiry_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiry_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `call_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `call_button_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Call Now',
  `call_phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `whatsapp_button_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'WhatsApp',
  `whatsapp_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp_default_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `email_enabled` tinyint(1) NOT NULL DEFAULT '1',
  `email_button_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Email Us',
  `enquiry_email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default_email_subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_settings`
--

LOCK TABLES `enquiry_settings` WRITE;
/*!40000 ALTER TABLE `enquiry_settings` DISABLE KEYS */;
INSERT INTO `enquiry_settings` VALUES (1,1,'Call Now','0706550713',1,'WhatsApp','0741477269','Hello, I would like more information about this product. Please send me the price and availability.',1,'Email Us','dithmiprameesha@gmail.com','Product Enquiry','2026-09-21 13:21:43');
/*!40000 ALTER TABLE `enquiry_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_settings`
--

DROP TABLE IF EXISTS `hero_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `background_image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foreground_image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_button_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_button_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_button_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_button_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text_alignment` enum('LEFT','CENTER','RIGHT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'LEFT',
  `overlay_opacity` decimal(3,2) NOT NULL DEFAULT '0.40',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_settings`
--

LOCK TABLES `hero_settings` WRITE;
/*!40000 ALTER TABLE `hero_settings` DISABLE KEYS */;
INSERT INTO `hero_settings` VALUES (1,'Industrial, Testing & Safety Solutions You Can Trust','Reliable products. Practical solutions. Professional support.','SEEDS PVT LTD supplies industrial, electrical, testing, and workplace safety solutions for businesses across Sri Lanka. We focus on dependable products, responsive service, and long-term customer support.','/uploads/hero/1786420270003-a82c8b431f55c40a9297555f.jpg',NULL,'Explore Products','/products','Contact Us','/contact','LEFT',0.35,1,'2026-08-11 09:24:35');
/*!40000 ALTER TABLE `hero_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_section_items`
--

DROP TABLE IF EXISTS `home_section_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_section_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `section_id` bigint unsigned NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `icon_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_home_section_item_section` (`section_id`),
  CONSTRAINT `fk_home_section_item_section` FOREIGN KEY (`section_id`) REFERENCES `home_sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_section_items`
--

LOCK TABLES `home_section_items` WRITE;
/*!40000 ALTER TABLE `home_section_items` DISABLE KEYS */;
INSERT INTO `home_section_items` VALUES (1,1,'Technical Support','Expert Guidance When You Need It','Our technical team helps customers select, understand and use the right equipment for their applications, with practical support before and after purchase.','/uploads/sections/1786430191755-2f369e7663b29f555dd5c921.jpg','Wrench',NULL,NULL,0,1,'2026-08-11 09:29:05','2026-08-11 12:06:33'),(2,1,'After-Sales Service','Support Beyond the Sale','Our relationship with customers continues after delivery. We provide responsive assistance, product guidance and ongoing support to help customers get the best from their equipment.',NULL,'BadgeCheck',NULL,NULL,2,1,'2026-08-11 09:29:56','2026-08-11 09:53:49'),(3,1,'Customer Commitment','Reliable Service, Long-Term Relationships','We focus on building lasting customer relationships through dependable service, clear communication and solutions that match real business needs.',NULL,'UserCheck',NULL,NULL,3,1,'2026-08-11 09:30:23','2026-08-11 09:54:07');
/*!40000 ALTER TABLE `home_section_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_sections`
--

DROP TABLE IF EXISTS `home_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_sections` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `section_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `background_image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_text` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `button_link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `section_type` enum('CONTENT','CARDS','CATEGORIES','FEATURED_PRODUCTS','BRANDS','CTA') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CONTENT',
  `display_order` int NOT NULL DEFAULT '0',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_home_section_key` (`section_key`),
  KEY `idx_home_section_order` (`display_order`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_sections`
--

LOCK TABLES `home_sections` WRITE;
/*!40000 ALTER TABLE `home_sections` DISABLE KEYS */;
INSERT INTO `home_sections` VALUES (1,'why_choose_us','Why Choose SEEDS','More Than Just Products','We support our customers with dependable products, practical technical guidance and responsive after-sales service.','/uploads/sections/1786421977856-c178712a0b961d4fd48758a6.jpg',NULL,NULL,NULL,'CARDS',1,1,'2026-08-11 09:28:28','2026-08-11 13:02:13'),(2,'product_categories','Explore Our Product Divisions','Solutions for Industry, Testing and Safety','Browse our main product divisions to find reliable equipment and technical solutions for your application.',NULL,NULL,NULL,NULL,'CATEGORIES',3,1,'2026-08-11 10:01:20','2026-08-11 13:02:37'),(3,'featured_products','Our Products',NULL,NULL,NULL,NULL,NULL,NULL,'FEATURED_PRODUCTS',2,0,'2026-08-11 12:59:42','2026-08-11 13:56:31');
/*!40000 ALTER TABLE `home_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_features`
--

DROP TABLE IF EXISTS `product_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_features` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `feature_text` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_feature_product` (`product_id`),
  CONSTRAINT `fk_product_feature_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_features`
--

LOCK TABLES `product_features` WRITE;
/*!40000 ALTER TABLE `product_features` DISABLE KEYS */;
INSERT INTO `product_features` VALUES (12,5,'SDS plus-1 Drill Bit is optimised for drilling in concrete',0,'2026-09-22 10:55:33'),(13,5,'2-cutter Tungsten Carbide plate makes the bit extra tough',0,'2026-09-22 10:55:49'),(14,5,'2-flute U-shape flute design provides effective dust removal and standard lifetime',0,'2026-09-22 10:56:06'),(15,5,'Fits all SDS plus rotary hammers',0,'2026-09-22 10:56:22'),(16,16,'Portable and lightweight design',0,'2026-09-23 09:50:49'),(17,16,'Digital LCD display',1,'2026-09-23 09:50:49'),(18,16,'Automatic test measurement',2,'2026-09-23 09:50:49'),(19,16,'Over-voltage protection',3,'2026-09-23 09:50:49'),(20,16,'Short-circuit protection',4,'2026-09-23 09:50:49'),(21,16,'Suitable for workshop and service applications',5,'2026-09-23 09:50:49');
/*!40000 ALTER TABLE `product_features` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_image_product` (`product_id`),
  KEY `idx_product_image_order` (`product_id`,`display_order`),
  CONSTRAINT `fk_product_image_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specifications`
--

DROP TABLE IF EXISTS `product_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_specifications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `specification_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `specification_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_specification_product` (`product_id`),
  CONSTRAINT `fk_product_specification_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specifications`
--

LOCK TABLES `product_specifications` WRITE;
/*!40000 ALTER TABLE `product_specifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned DEFAULT NULL,
  `brand_id` bigint unsigned DEFAULT NULL,
  `subcategory_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(280) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_number` longtext COLLATE utf8mb4_unicode_ci,
  `short_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `main_image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datasheet_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datasheet_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `datasheet_file_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `specification_file_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `display_order` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_product_slug` (`slug`),
  KEY `idx_product_subcategory` (`subcategory_id`),
  KEY `idx_product_featured_active` (`is_featured`,`is_active`),
  KEY `idx_product_category` (`category_id`),
  KEY `idx_product_brand` (`brand_id`),
  CONSTRAINT `fk_product_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_product_subcategory` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (5,6,3,9,'SDS Plus Hammer Drill Bits','sds-plus-hammer-drill-bits','6 x 50 x 110\n6 x 100 x 160\n7 x 100 x 160\n8 x 100 x 160\n8 x 150 x 210\n12 x 100 x 160\n12 x 150 x 210\n14 x 200 x 260\n16 x 150 x 210\n16 x 250 x 310\n18 x 200 x 260\n20 x 200 x 260\n22 x 400 x 460\n16 x 400 x 460 SDS Plus - 5\nSDS-Plus 3; 10 x 200\nSDS-Plus 3; 16 x 150\n25 x 400 x 460',NULL,NULL,'/uploads/products/1790054677636-5561f0d285577f3ef4d5425a.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 10:19:19','2026-09-23 09:32:36'),(6,6,3,10,'SDS Plus 5X-Hammer Drill Bits','sds-plus-5x-hammer-drill-bits','5 X 50 X 110\n6 X 50 X 110\n6 X 100 X 160\n8 X 100 X 160\n8 x 200 x 260\n10 x 150 x 210\n10 x 200 x 260\n12 x 150 x 210\n12 x 200 x 260\n14 x 150 x 210\n14 x 200 x 260\n16 x 150 x 210\n16 x 250 x 310\n18 x 150 x 210\n18 x 250 x 310\n20 x 150 x 210\n20 x 250 x 310\n22 x 200 x 260\n24 x 200 x 260\nRotary hammer bit; 14X550X615\n26 x 200 x 260',NULL,NULL,'/uploads/products/1790056304691-1b46691aef868432f72d1253.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 11:05:15','2026-09-23 09:32:36'),(7,7,3,11,'Re-Bar Cutter','re-bar-cutter','16mm x 120mm\n20mm x 120mm\n25mm x 120mm\n32mm x 120mm',NULL,NULL,'/uploads/products/1790056566087-580e798d1b8d1a0efbd8b0ed.png',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 11:26:08','2026-09-23 09:32:36'),(8,6,3,12,'SDS MAX 4-Speed Drill Bits','sds-max-4-speed-drill-bits','16 X 200 X 340\n16 X 400 X 540\n18 X 200 X 340\n18 X 400 X 540\n20 X 200 X 320\n20 X 400 X 540\n22 X 200 X 320\n22 X 400 X 540',NULL,NULL,'/uploads/products/1790057050597-0d6f7ddb18fc58cfd2636d4e.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 11:34:12','2026-09-23 09:32:36'),(9,6,3,12,'SDS MAX 7-Speed X Drill Bits','sds-max-7-speed-x-drill-bits','12 x 200 x 340\n12 x 400 x 540\n14 x 400 x 540\n15 x 200 x 540\n15 x 400 x 540\n16 x 200 x 340\n16 x 400 x 540\n18 x 200 x 340\n18 x 400 x 540\n20 x 200 x 320\n20 x 400 x 520\n22 x 400 x 520',NULL,NULL,'/uploads/products/1790057462133-6818caa7fffc2604549e7247.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 11:41:04','2026-09-23 09:32:36'),(10,6,3,12,'SDS Max 8x Drill Bits','sds-max-8x-drill-bits','12 X 200 X 340\n12 X 400 X 540\n12 X 600 X 740\n12 X 800 X 940\n14 X 200 X 340\n14 X 400 X 540\n14 X 600 X 740\n14 X 800 X 940\n16 X 200 X 340\n16 X 400 X 540\n16 X 600 X 740\n16 X 800 X 940\n18 X 200 X 340\n18 X 400 X 540\n18 X 600 X 740\n18 X 800 X 940\n20 X 200 X 320\n20 X 400 X 520\n20 X 600 X 720\n20 X 800 X 920\n22 X 200 X 320\n22 X 400 X 520\n22 X 600 X 720\n22 X 800 X 920\n24 X 200 X 320\n24 X 400 X 520\n25 X 200 X 320\n25 X 400 X 520\n25 X 600 X 720\n25 X 800 X 920\n26 X 200 X 320\n26 X 400 X 520\n28 X 200 X 320\n28 X 400 X 520\n28 X 600 X 720\n28 X 800 X 920\n30 X 200 X 250\n30 X 400 X 520\n32 X 200 X 320\n32 X 400 X 520 (2608900255)\n32 X 600 X 720\n32 X 800 X 920',NULL,NULL,'/uploads/products/1790059393309-433da1c6da6a15750da033ed.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 12:13:16','2026-09-23 09:32:36'),(11,NULL,NULL,NULL,'SDS Plus-Chisel','sds-plus-chisel','250 x 20mm Flat Chisel (10 Set)\n250 mm Pointed (10 Set)\nSDS Plus Flat Chisel-20 X 250mm\nSDS Pointed Chisel 250mm',NULL,NULL,'/uploads/products/1790071918157-f2d0e1ed554dd08d09a5e125.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 13:59:08','2026-09-22 15:42:00'),(12,NULL,NULL,NULL,'30mm Hex Chisel for GSH 16','30mm-hex-chisel-for-gsh-16','HEX 30mm autosharp; 400mm-Pointed chisel\nHex-17 450mm Pointed (5pcs)\nHex-17 450mm Flat  (5pcs)\nHEX 30mm; 400 x 35mm-Flat chisel',NULL,NULL,'/uploads/products/1790071997656-d62dc4c655fc885af54c566c.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 15:43:21','2026-09-22 15:43:54'),(13,NULL,NULL,NULL,'SDS MAX Chisels','sds-max-chisels','400x25mm- (Set 10) flat chisel RTec\nAutosh 400mm-Pointed chisel Rtec\nSDS-Max;400mm-Set 10 pointed chisel RTec\nSDS-Max; 600 mm-Pointed chisel\nSDS-Max autosh;400x25mm-Flat chisel RTec\nSDS MaxFlat 600 mm X 25mm\nSDS-Max; 400 mm-Set 10 pointed chisels',NULL,NULL,'/uploads/products/1790072106208-793c74c541c2433007df7c1d.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 15:45:08','2026-09-22 15:46:25'),(14,NULL,NULL,NULL,'28MM-HEX for GSH 27 VC','28mm-hex-for-gsh-27-vc','Pointed chisel HEX 28mm; 520 mm\nFlat chisel-520mm x 36mm\nWide Chisel :400mm for GSH27\nHEX 28mm autosharp; 400mm-Pointed chisel\nHEX 28mm; 400 x 35 mm-Flat chisel',NULL,NULL,'/uploads/products/1790072304597-d9215f699317d4f6ba93e996.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-22 15:48:26','2026-09-22 15:49:00'),(15,NULL,NULL,NULL,'SDS Max -Hex Shank','sds-max-hex-shank','Pointed Chisels with 17mm Hex shank-Suitable GSH 500\nFlat Chisels with 17mm Hex shank-Suitable GSH 500',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 08:36:49','2026-09-23 08:37:04'),(16,9,3,NULL,'Hole Saw','hole-saw','BiM - Standard HS Ecoline 14mm\nBiM - Standard HS Ecoline 16\nBiM - Standard HS Ecoline 17\nBiM - Standard HS Ecoline 19\nBiM - Standard HS Ecoline 20\nBiM - Standard HS Ecoline 21\nBiM - Standard HS Ecoline 22\nBiM - Standard HS Ecoline 24\nBiM - Standard HS Ecoline 25\nBiM - Standard HS Ecoline 27\nBiM - Standard HS Ecoline 29\nBiM - Standard HS Ecoline 30\nBiM - Standard HS Ecoline 32\nBiM - Standard HS Ecoline 33\nBiM - Standard HS Ecoline 35\nBiM - Standard HS Ecoline 37\nBiM - Standard HS Ecoline 38\nBiM - Standard HS Ecoline 40\nBiM - Standard HS Ecoline 41\nBiM - Standard HS Ecoline 43\nBiM - Standard HS Ecoline 44\nBiM - Standard HS Ecoline 46\nBiM - Standard HS Ecoline 48\nBiM - Standard HS Ecoline 51\nBiM - Standard HS Ecoline 52\nBiM - Standard HS Ecoline 54\nBiM - Standard HS Ecoline 56\nBiM - Standard HS Ecoline 57\nBiM - Standard HS Ecoline 59\nBiM - Standard HS Ecoline 60\nBiM - Standard HS Ecoline 64\nBiM - Standard HS Ecoline 65\nBiM - Standard HS Ecoline 67\nBiM - Standard HS Ecoline 68\nBiM - Standard HS Ecoline 70\nBiM - Standard HS Ecoline 73\nBiM - Standard HS Ecoline 76\nBiM - Standard HS Ecoline 79\nBiM - Standard HS Ecoline 83\nBiM - Standard HS Ecoline 86\nBiM - Standard HS Ecoline 89\nBiM - Standard HS Ecoline 92\nBiM - Standard HS Ecoline 95\nBiM - Standard HS Ecoline 98\nBiM - Standard HS Ecoline 102\nBiM - Standard HS Ecoline 105\nBiM - Standard HS Ecoline 108\nBiM - Standard HS Ecoline 111\nBiM - Standard HS Ecoline 114\nBiM - Standard HS Ecoline 121\nBiM - Standard HS Ecoline 127\nBiM - Standard HS Ecoline 140\nBiM - Standard HS Ecoline 152\nBiM - HS adapter for dia. 32-210mm\n11mm hex shank\nBiM - HS adapter for dia. 14-30mm\n9.5mm hex shank\nHole saw Set-10Ppcs\nHole Saw Set BiM Std. HS\n7 piece set Hole Saw\n9 PCE ELECTRICIANS',NULL,NULL,'/uploads/products/1790136387222-a5e624e7a2e93c1267c6dc0a.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 08:38:31','2026-09-23 09:59:51'),(17,9,3,NULL,'HSS Bi-Metal Holesaws For Standard Adapters','hss-bi-metal-holesaws-for-standard-adapters','16 MM BI-METAL HOLES SAW\n19 MM BI-METAL HOLES SAW\n20 MM BI-METAL HOLES SAW\n25 MM BI-METAL HOLE SAW\n27 MM BI-METAL HOLES SAW\n30MM BI-METAL HOLE SAW\n32 MM BI-METAL HOLE SAW\n35 MM BI-METAL HOLE SAW\n38 MM BI-METAL HOLE SAW\n40 MM BI-METAL HOLE SAW\n51 MM BI-METAL HOLE SAW\n60 MM BI-METAL HOLE SAW\n64 MM BI-METAL HOLE SAW\n76 MM BI-METAL HOLE SAW',NULL,NULL,'/uploads/products/1790138305394-9d5adbc5d24dd23e78663fb1.png',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 10:08:27','2026-09-23 10:12:24'),(18,10,3,NULL,'Reciprocating Saw Blades','reciprocating-saw-blades','RB -  5ER S  922 BF for metal\nRB -  5ER S  644 D for wood\nRB -  5ER S 1122 BF for metal\nRB -  5ER S 3456 XF for wood with metal',NULL,NULL,'/uploads/products/1790138679461-6582711fbdf206841f1c7f5a.png',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 10:14:41','2026-09-23 10:15:03'),(19,10,3,NULL,'JIG Saw Blades','jig-saw-blades','GSG 300 Professional Saw blades (70mm)\nGSG 300 Professional Saw blades (130mm)\nGSG FUEHRUNG 70 70MM BLADE GUIDE. GSG300 1575\nGSG FUEHRUNG130 130MM BLADE GUIDE. GSG300 1575\nRB -  5ER T  144 D Speed for Wood\nRB -  5ER T  244 D Speed for wood\nRB -  3ER T  344 D Speed for wood\nRB -  5ER T  118 A-Basic for metal\nRB -  3ER T  118 EHM-INOX Steel\nRB -100ERV T  111 C\nSaw Blade Set T144D HCS Speed\nSaw Blade Set T244D HCS Speed for\nSaw Blade Set 118A HCS Basic\nSAW BLADE SET CH  RB -100ERV T  127 D\nSaw Blade Set T227D HCS Special\nSaw Blade Set T119BO\nBLADE SET 200 MM.\n200MM BLADE GUIDE.\nCOLLET 8MM',NULL,NULL,'/uploads/products/1790138784159-12a8e4522d7da8c60a870645.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 10:16:42','2026-09-23 10:21:18'),(20,10,3,NULL,'Circular Saw Blades','circular-saw-blades','Reducing Ring H 30x25 4-1(Used with 12\" C/B \"2608640440)\nReducing Ring H 30x25 4-1 2(Used with 10\" & 12\"C/B \"2608640434/435/440\")\nOP WO B 254x2.0x1.4x30-24\nOP WO B 254x2x1.4x30-40\nWO B 305x2.5/1.8x30-40\nEC WO H 110x20-30\nEC WO H 125x20-30\nEC WO H 110x20-40\nEC WO H 125x20-40\nEC WO H 180x25 4-40\nEC WO H 180x25 4-60\nEC WO H 184x25.4-24\nEC WO H 230x30-40\nEC WO CB 9-1/4\" x 60T TCT\nEC WO B 250x25.4-40\nEC WO B 250x25.4-60\nEC WO B 250x25.4-80\nEC WO B 300x30-60\nEC WO B 300x30-80\nOP WO H 100x20-40-optiline\nOP WO H 110x20-20\nSE WO H 184x20-40\nEX WO H 110x20-40\nEX WO H 184x25 4-24\nEX WO H 184x25 4-40\nEX WO H 235x30-40\nEX WO H 235x30-60\nEX WO B 254x30-40\nEX WO B 305x25\n4-40\nEX WO B 305x30-40',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 10:27:06','2026-09-23 10:35:37'),(21,10,3,NULL,'Circular Saw Blade:Aluminium & multimaterilas cutting','circular-saw-blade-aluminium-multimaterilas-cutting','254x2.2/1.6x30/25.4 T24\nEC AL B 250x25 4-96\nEC AL B 300x20-120\nEC AL B 250x25.4-112\nMM MU H 235x25-80\nMM MU B 254x30-100\nMM MU B 254x30-120\nMM MU B 305x25\n4-100\nMM MU B 305x25\n4-120\nMM MU B 305x30-120T\nMM MU B 355x30-100\nMM MU B 355x30-120\nPARALLEL GUIDE W. FINE ADJUST',NULL,NULL,'/uploads/products/1790140253749-739b6526f39fb92c7dfe85ad.png',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 10:40:55','2026-09-23 10:46:56'),(22,11,3,NULL,'Hacksaw Frame','hacksaw-frame',NULL,NULL,NULL,'/uploads/products/1790141386146-a52f0ab23c7848a209f1d0ab.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 10:59:55','2026-09-23 10:59:55'),(23,11,3,NULL,'Hacksaw Blade','hacksaw-blade','18T-Blister Pack-2 Nos-18TPI\n24T-Blister Pack-2 Nos-24TPI\n32T-Blister Pack-2 Nos-32TPI',NULL,NULL,'/uploads/products/1790141425364-00c4b1c48f14d7e46a9278fb.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 11:00:33','2026-09-23 11:01:05'),(24,12,3,NULL,'Router bit set','router-bit-set','6 pcs Straight 1/4\"\n6 pcs Trim&Edging 1/\n15 pcs Mixed 1/4\" sh\n30 pcs Mixed 1/4\" sh',NULL,NULL,'/uploads/products/1790141939466-5a2bd2b44007a1ed8d1f244d.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 11:09:00','2026-09-23 11:10:18'),(25,13,3,NULL,'Planer Blade','planer-blade','2P-82 4x1 1x5 5\nPlanning Blade Straight-TCT-35* (10 Nos)\nSet of Blade-GHO 6500\nTC planer knife and adaptor Set',NULL,NULL,'/uploads/products/1790142322473-b473fa2ce8ec6bc451ef42b2.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 11:15:28','2026-09-23 11:16:11'),(26,14,3,NULL,'Rubber Packing Pad','rubber-packing-pad','Polishing Cap 180mm1x\nPolishing Cap 125mm1x\nRubber Packing Pads 115mm x 14m\nRubber Packing Pads 100mm x 10m\nBacking Pad 180mm 1x CH  84661038\nBacking Pad 150mm MH DE  39269097\nRUBBER BACKING PAD\nGex Pad 125mm (Velcro Type)\nHook & Loop Type for Angle Grinder  M14',NULL,NULL,'/uploads/products/1790142856277-955ab8e412a3f373413e9f0e.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 11:21:32','2026-09-23 11:27:31'),(27,14,3,NULL,'Flap Disc-100mm (Standard for Metal X433, 10 pcs pack)','flap-disc-100mm-standard-for-metal-x433-10-pcs-pack','Flap Disc 100mm (60#)\nFlap Disc  X430 Eco 100mm-60\nFlap Disc  X430 Eco 100mm-80\nFlap Disc X430 Eco 100mm-120\nFlap Disc 100mm (80#)\nFlap Disc 100mm (120#)\nFlap Disc 115mm (60#)\nFlap Disc 115mm (80#)\nFlap Disc 115mm (120#)\nFlap Disc X430 Eco 100mm-36',NULL,NULL,'/uploads/products/1790143830100-f341fe2e1a78f5af9a04400e.webp',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 11:40:32','2026-09-23 11:42:03'),(28,14,3,NULL,'Bosch Strip Disc N377 (10pcs pack)','bosch-strip-disc-n377-10pcs-pack','4 inch Clean & Strip Disc',NULL,NULL,'/uploads/products/1790144008894-b9ff83c75d0946c76fbdc2ed.png',NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 11:43:13','2026-09-23 11:43:43'),(29,14,3,NULL,'M480 Bosch Net , Best for Wood + Paint','m480-bosch-net-best-for-wood-paint','Net Sanding disc for GEX 125mm G80 5X\nNet Sanding disc for GEX 125mm G100 5X\nNet Sanding disc for GEX 125mm G120 5X\nNet Sanding disc for GEX 125mm G150 5X\nNet Sanding disc for GEX 125mm G180 5X\nNet Sanding disc for GEX 125mm G220 5X\nNet Sanding disc for GEX 125mm G240 5X\nNet Sanding disc for GEX 125mm G320 5X\nNet Sanding disc for GEX 125mm G400 5X',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 11:52:47','2026-09-23 11:56:20'),(30,14,NULL,NULL,'150MM Sheets','150mm-sheets','Net Sanding disc for GEX 150mm G80 5X\nNet Sanding disc for GEX 150mm G100 5X\nNet Sanding disc for GEX 150mm G120 5X\nNet Sanding disc for GEX 150mm G150 5X\nNet Sanding disc for GEX 150mm G180 5X\nNet Sanding disc for GEX 150mm G220 5X\nNet Sanding disc for GEX 150mm G240 5X\nNet Sanding disc for GEX 150mm G320 5X\nNet Sanding disc for GEX 150mm G400 5X',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 11:56:35','2026-09-23 14:39:36'),(31,NULL,NULL,NULL,'Bosch Foam-S471 Foam Abrasives Standard Block (bulk pack)','bosch-foam-s471-foam-abrasives-standard-block-bulk-pack','Bosch Foam Standard Block Medium Orange 250X\nBosch Foam Standard Block\nFine  Yellow 250X\nBosch Foam Standard Block Super Fine Green 250X',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 14:40:05','2026-09-23 14:40:45'),(32,NULL,NULL,NULL,'S473 Foam Abrasives Standard Pad (bulk pack)','s473-foam-abrasives-standard-pad-bulk-pack','Foam Standard Pad Medium Orange 250X\nFoam Standard Pad Fine  Yellow 250X\nFoam Standard Pad Super Fine Green 250X\nFoam Block 3 Pieces Set (Medium 1XFine 1x Super Fine 1X )\nFoam Pad 3 Pieces Set (Medium 1XFine 1x Super Fine 1X )',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 14:40:58','2026-09-23 14:42:21'),(33,NULL,NULL,NULL,'Diamond Blades & Bits','diamond-blades-bits','4”  1.2 mm cutting Wheel-metal\n4” Tile Diamond Wheel\n105mm diamond cutting disc (Eco)\nDCD 105 expert universal\nDCD standard for Concrete 105 mm\nDCD 180 standard universal\nDCD 230 standard universal\nDCW expert universal-cup\nDiamond Cup Wheel   EFC High Speed\n110 mm Tile Cutting Blade\nDCD 115mm Universal\nDCD180mm Universal\nDCD230mm Universal\nDCD 300mm Universal\nDCD 350MM Universal\nDCD 400MM Universal\nAsphalt LPP 350x20/25.4mm\nAsphalt LPP 450 x 25.4mm\nStandard for Asphalt 400x20/25.4mm (16\")\nDCD for Tile-Ceramic (4\'\'-105) STD',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 15:38:46','2026-09-23 15:42:13'),(34,NULL,NULL,NULL,'Diamond Core-Cutter','diamond-core-cutter','Diamond Core Cutter ø28x300mm G 1/2\"\nDiamond Core Cutter ø32x300mm G 1/2\"\nDiamond Core Cutter ø42x400mm G 1/2\"\nDiamond Core Cutter ø52x450mm 1 1/4\"\nDiamond Core Cutter ø62x450mm 1 1/4\"\nDiamond Core Cutter ø72x450mm 1 1/4\"\nDiamond Core Cutter ø82x450mm 1 1/4\"\nDiamond Core Cutter ø102x450mm 1 1/4\"\nDiamond Core Cutter ø122x450mm 1 1/4\"\nDiamond Core Cutter ø132x450mm 1 1/4\"\nDiamond Core Cutter ø152x450mm 1 1/4\"\nDiamond Core Cutter ø202x450mm 1 1/4\"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-23 15:42:41','2026-09-23 15:44:51'),(35,NULL,NULL,NULL,'Cut-Off Wheels','cut-off-wheels','100x2.5x16mm\n100x2.0x16mm\n100x1.2x16mm\n105x1.2x16mm\n105x1.2x16mm\n100 x 1.2 x 16mm\n115x1.6x22.23mm\n115x2.5x22.23mm\n115x2.5x22.23mm\n115mm Cutting disc with depressed centre\n(NEW) 4\'\' Cutting Disc 1.2 mm Green\n(NEW) 5 inch cutting wheel -1 mm inox\nInox 100x1x16mm\n125x2.8x22.23mm\n180x3.3x22.23\n180x3.3x22.23\n230x3.3x22.23mm\n355x3.1x25.4mm\n355x2.8x25.4mm\n355mm metal cutting\n355mm metal cutting Disc',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 08:38:06','2026-09-24 08:40:31'),(36,NULL,NULL,NULL,'Grinding Wheels','grinding-wheels','Grinding Wheel Expert for Metal\nGrinding Wheel 100x6.0x16mm\n100x6.0x16mm\n115 x 6 x 22.23mm grinding wheel\n115x6x22.23mm\n115x6x22.23mm\n180x6.6x22.23mm\n230x6.6x22.23mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 08:40:45','2026-09-24 08:41:41'),(37,NULL,NULL,NULL,'Grinding Wheels:-INOX','grinding-wheels-inox','100x5.8x16mm\n115x6x22.23mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 08:41:53','2026-09-24 08:42:05'),(38,NULL,NULL,NULL,'Cut-Off Wheels-INOX','cut-off-wheels-inox','105x1.1x16mm\n105x1.1x16mm\n115 x 1 x 22.23 -10pcs pack-TIN\n115x1x22.23mm\n115x1.6x22.23mm\nBosch Cutting Disc 1  115x1x22.23mm\n115x1.6x22.23mm\n115x2x22.23mm\n180mm x 1.6 x 22.23',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 08:42:15','2026-09-24 08:43:57'),(39,NULL,NULL,NULL,'Bench Grinding wheels','bench-grinding-wheels','150mm-24 grit Coarse 150x20x20mm\n150mm-60 Grit Fine150x20x20mm\n200mm-36 grit medium 200x25x32mm\n200mm-60 grit fine 200x25x32mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 08:44:10','2026-09-24 08:45:46'),(40,NULL,NULL,NULL,'Screw Driving Sets','screw-driving-sets','6.35x45mm grey PH2 double-ended; 10pcs pack\n6.35x65mm grey PH2 double-ended; 10pcs pack\n6.35x110mm grey PH2 double-ended; 10pcs pack\n6.35x45mm gold PH2 double-ended; 10pcs pack\n6.35x65mm gold PH2 double-ended;10pcs pack\n6.35x110mm gold PH2 double-ended;10pcs pack\n6.35x65mm black oxide PH2 double-ended; 10pcs pack\n6.35x110mm black oxide PH2 double-ended; 10pcs pack\n6.35x150mm black oxide PH2 double-ended; 5pcs pack\n6.35x65mm black oxide PH2 double-ended; 2pcs pack\n6.35x110mm black oxide PH2 double-ended; 2pcs pack\n6.35x150mm black oxide PH2 double-ended; 2pcs pack\nNutsetter SW8 65mm 1/4\" E6.3 Shank\nmagnetic (1)\nNutsetter SW10 65mm 1/4\" E6.3 Shank magnetic (1)\nNutsetter SW 8.0 50mm 1/4\" Shank magnetic (1)\nFree Hand Router Bit-4 piece',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 08:46:46','2026-09-24 08:53:31'),(41,NULL,NULL,NULL,'Metal Drill Bits','metal-drill-bits','Twist Drill  1.0 mm HSS-G (10pack)\nTwist Drill  1.5 mm HSS-G (10pack)\nTwist Drill  2.0 mm HSS-G (10pack)\nTwist Drill  2.5 mm HSS-G (10pack)\nTwist Drill  3.0 mm HSS-G (10pack)\nTwist Drill  3.5 mm HSS-G (10pack)\nTwist Drill  4.0 mm HSS-G (10pack)\nTwist Drill  4.5 mm HSS-G (10pack)\nTwist Drill  5.0 mm HSS-G (10pack)\nTwist Drill  5.5 mm HSS-G (10pack)\nTwist Drill  6.0 mm HSS-G (10pack)\nTwist Drill  6.5 mm HSS-G (10pack)\nTwist Drill  7.0 mm HSS-G 135 (10pack)\nTwist Drill  7.5 mm HSS-G 135 (10pack)\nTwist Drill  8.0 mm HSS-G 135 (5pack)\nTwist Drill  8.5 mm HSS-G 135 (5pack)\nTwist Drill  9.0 mm HSS-G 135 (5pack)\nTwist Drill  9.5 mm HSS-G 135 (5pack)\nTwist Drill  10.0 mm HSS-G 135 (5pack)\nTwist Drill  10.5 mm HSS-G 135 (5pack)\nTwist Drill  11.0 mm HSS-G 135 (5pack)\nTwist Drill  11.5 mm HSS-G 135 (5pack)\nTwist Drill  12.0 mm HSS-G 135 (5pack)\nTwist Drill  12.5 mm HSS-G 135 (5pack)\nTwist Drill  13.0 mm HSS-G 135 (5pack)\nHSS-G Drill bit set 1-13mm\nHSS-G 1-13MM 25pc Metal Drill Bits Set;G 1-13 mm 25 Pc\nTWIST DRILL    3/64\" mm HSS-G 135\nTWIST DRILL 1/16\" mm HSS-G 135\nTWIST DRILL    5/64\" mm HSS-G 135\nTWIST DRILL    1/8\" mm HSS-G 135\nTWIST DRILL    9/64\" mm HSS-G 135\nTWIST DRILL    5/32\" mm HSS-G 135\nTWIST DRILL    3/16\" mm HSS-G 135\nTWIST DRILL    7/32\" mm HSS-G 135\nTWIST DRILL    1/4\" mm HSS-G 135\nTWIST DRILL    5/16\" mm HSS-G 135\nTWIST DRILL    3/8\" mm HSS-G 135\nTWIST DRILL    7/16\" mm HSS-G 135\nTWIST DRILL    1/2\" mm HSS-G 135',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 08:55:13','2026-09-24 09:03:25'),(42,NULL,NULL,NULL,'Stainless Steel Drill bits-HSS Cobalt','stainless-steel-drill-bits-hss-cobalt','Drill bit   2 0mm HSS-Co (1pack)\nDrill bit   3 2mm HSS-Co (1pack)\nMetal Drill Bit HSS-Co 3.0x61mm 10pcs\nMetal Drill Bit HSS-Co 4.0x75mm 10pcs\nMetal Drill Bit HSS-Co 5.0x86mm 10pcs\nMetal Drill Bit HSS-Co 6.0x93mm 10pcs\nMetal Drill Bit HSS-Co 8.0x117mm 5pcs\nMetal Drill Bit HSS-Co 10.0x133mm 5pcs\nHSS-TiN 10pcs Set 1-10 x1mm\nHSS-G 10pcs Set 1-10 x1mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:04:54','2026-09-24 09:11:38'),(43,NULL,NULL,NULL,'Annular Cutter (Metal Core cutter)','annular-cutter-metal-core-cutter','18mm/50mm cutter\n20mm/50mm cutter\n22mm/50mm cutter\n24mm/50mm cutter\n26mm/50mm cutter\n28mm/50mm cutter\n30mm/50mm cutter\n32mm/50mm cutter\n35mm/50mm cutter\n40mm/50mm cutter\nPL8050-8MM Dia/106 mm length Pin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:11:48','2026-09-24 09:12:49'),(44,15,NULL,NULL,'Ceramic Bits-CYL 9-(TILE BITS)','ceramic-bits-cyl-9-tile-bits','CYL-9 Tile Drill Bit; 4 x 65 mm\nCYL-9 Tile Drill Bit; 5 x 65 mm\nCYL 9 Tile Drill Bit 6x65mm\nCYL 9 Tile Drill Bit 7x65mm\nCYL -9; Tile drill bit  8 x 70 mm\nCYL 9 ; Tile Drill Bit 10 x 80mm\nCYL-9 Tile Drill Bit; 12 x 90 mm\nCYL-9 Tile Drill Bit; 14 x 100 mm\nCYL-9 Tile Drill Bit; 16 x 1200 mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:13:16','2026-09-24 09:14:16'),(45,15,NULL,NULL,'Masonary Drill Bits','masonary-drill-bits','CYL-1; Masonary Drill Bit;4 x 40 x 75 mm\nCYL-1; Masonary Drill Bit;5 x 50 x 85 mm\nCYL-1 ;Masonary Drill Bit; 6 x 60 x100mm\nCYL-1\nMasonary Drill Bit; 7 x 60 x 100mm\nCYL-1; Masonary Drill Bit; 8 x 80 x 120 mm\nCYL-1; Masonary Drill Bit;10 x 80 x 120 mm\nCYL-1\nMasonary Drill Bit; 12 x 90 x 150mm\nCYL-1;Masonary Drill Bit; 14 x 90 x 150 mm\nCYL-1\nMasonary Drill Bit; 15 x 90 x 150mm\nCYL-1;Masonary Drill Bit; 16 x 90 x 150mm\nCYL-1,Masonary Drill Bit; 18 x 100 x 160mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:14:29','2026-09-24 09:15:27'),(46,15,NULL,NULL,'Multi Construction Bits CYL 9 - (Wood-Tile-Masonory)','multi-construction-bits-cyl-9-wood-tile-masonory','CYL 9 Multiconstrcution Drill Bit 5x60x100mm\nCYL 9 Multiconstrcution Drill Bit 6x60x100mm\nCYL 9 Multiconstrcution Drill Bit 7x60x100mm\nCYL 9 Multiconstrcution Drill Bit 8x80x100mm\nCYL 9 Multiconstrcution Drill Bit 10x80x120mm\nCYL 9 Multiconstrcution Drill Bit 12x90x150mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:15:39','2026-09-24 09:16:14'),(47,NULL,NULL,NULL,'CYL-2 Concrete','cyl-2-concrete','CYL2 3X60\nCYL2 4x75\nCYL2 5x85\nCYL2 5.5X85\nCYL2 6x100\nCYL2 6.5x100\nCYL2 8x120\nCYL2 9x120\nCYL2 10x120\nCYL2 12x150\nCYL2 14x150\nCYL2 16x150\nCYL2  3Set\nCYL2  5Set\nCYL2  8Set',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:16:22','2026-09-24 09:19:19'),(48,NULL,NULL,NULL,'CYL-4 Multi-propose','cyl-4-multi-propose','3x70\n4X75\n5.5x85\n6X100\n6.5x100\n7x100\n8X120\n10x120\n12x150',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:19:28','2026-09-24 09:20:19'),(49,6,3,NULL,'Wood Drill Bits','wood-drill-bits','Selfcut speed 6x152mm\nSelfcut speed 8x152mm\nSelfcut speed 10x152mm\nSelfcut speed 12x152mm\nSelfcut speed 13x152mm\nSelfcut speed 14x152mm\nSelfcut speed 16x152mm\nSelfcut speed 17x152mm\nSelfcut speed 18x152mm\nSelfcut speed19x152mm\nSelfcut speed 20x152mm\nSelfcut speed 22x152mm\nSelfcut speed 24x152mm\nSelfcut speed 25x152mm\nSelfcut speed 26x152mm\nSelfcut speed 28x152mm\nSelfcut speed 30x152mm\nS644D HCS Top for Wood 25Pack\n5 pc wood Bit set',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:20:37','2026-09-24 09:23:14'),(50,NULL,NULL,NULL,'Nozzle','nozzle','50MM WIDE HOT AIR GUN NOZZLE\nGLASS PROTECTOR NOZZLE  50MM\nREDUCER NOZZLE FOR HOT AIR GUN\nWELDING SHOE - *SOME PHGS&GHGS\nSLOT NOZZLE FOR HOT AIR GUN\nREDUCING NOZZLE - HOT AIR GUNS\nReduction Nozzle\nANGLE NOZZLE FOR HOT AIR GUN\nWIDE HOT AIR GUN NOZZLE 75MM\nBosch Protection Nozzle For Hot Air Gun\nREFLECTOR NOZZLE FOR SOLDERING\nCREVICE NOZZLE  35 MM.\nCOARSE DIRT NOZZLE  35 MM.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:23:32','2026-09-24 09:24:45'),(51,16,3,NULL,'Drill Accessories','drill-accessories','13mm Chuck with Key\nKey Chuck 1/2 13mm DE  84661038\n3/8 inch  CHUCK 10MM DE  84661038\nSDS-Plus Chuck Adaptor\nChuck Wrench        CSB BF.SCHL.13\nKey Chuck           CSB BF13 R/L1/2\nKey chuck 1/2\"-20 UNF 13mm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:26:31','2026-09-24 09:28:59'),(52,16,3,NULL,'Vaccum Cleaner Accessories','vaccum-cleaner-accessories','Air Hose       Ø35 x 3000mm FOR PAS11-21\nDust Bag for PAS 11-21 (5 pack)\nDust Bags 5PK GAS25\nHose for suction Bracket\nDust Extraction Guard\nGBA 36V 2 0Ah H-B\nWater collection ring\nGAL 1880 CV EU\nGAL 1115 CV EU\n3 in 1 Nozzle\nWater Filter\nVario Fan Jet Nozzle',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:27:27','2026-09-24 09:28:48'),(53,16,3,NULL,'Handheld Tracker','handheld-tracker','Hand held Tacker HT 8\nHand held Tacker HT 14\n4mm Length-1000 Nos\n6mm Length-1000 Nos (Type-53)\n8mm Length-1000 Nos-Type-53\n10mm Length-1000 Nos-Type 53\n12mm Length-1000 Nos-Type 53\n14mm Length-1000 Nos-Type 53\n14mm Length-1000 Nos-Type 41',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:29:06','2026-09-24 09:29:55'),(54,16,3,NULL,'Promo Lines','promo-lines','108pcs Tool Kit\nSales-Campaign Set 30pcs\n38 Pc Promoline Mixed Set\nSales-Campaign Set Mixed 46 Pc\n66 pcs Multi-function mixed set for AP\n12pcs Multi-function household tool kit for AP\n11pcs screwdriver bits set for CN and AP\n12pcs Multi-function mixed set  with ratcheting screwdriver\n14pcs Multi-function mixed set with ratcheting screwdriver\n15pcs Multi-function mixed set for CN and AP\n34pc X-Line set\n33-piece Bosch X-Line set\n25-piece Bosch Mini-X-Line screwdriver bit set\n15-piece Bosch Mini-X-Line set\n83-piece Bosch V-Line titanium set\n41-piece Bosch V-Line set\n25-piece Bosch “Big Bit” screwdriver bit set\n10-piece Bosch “Pocket” screwdriver bit set\nBosch 75Mm Knotted Wire Cup Brush (M14)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,'2026-09-24 09:30:08','2026-09-24 09:32:13');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `favicon_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `footer_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `copyright_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_maintenance_mode` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES (1,'SEEDS PVT LTD','/uploads/general/1786420017977-a6674c7d5a1f057def6328b1.png','/uploads/general/1786420022540-c58a254f7463e00493b6f6ab.png','SEEDS PVT LTD','SEEDS PVT LTD provides reliable industrial, electrical, testing, and safety solutions for businesses across Sri Lanka.','Your trusted partner for industrial equipment, testing solutions, and professional technical support.','SEEDS PVT LTD. All rights reserved.',1,'2026-08-11 09:17:09');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_media_links`
--

DROP TABLE IF EXISTS `social_media_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_media_links` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `platform` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_social_platform` (`platform`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_media_links`
--

LOCK TABLES `social_media_links` WRITE;
/*!40000 ALTER TABLE `social_media_links` DISABLE KEYS */;
INSERT INTO `social_media_links` VALUES (1,'facebook','Facebook','https://chrome.google.com/webstore?hl=en','facebook',1,1,'2026-08-10 13:57:30','2026-08-11 11:38:13'),(2,'instagram','Instagram','https://chrome.google.com/webstore?hl=en','instagram',0,1,'2026-08-11 11:38:43','2026-08-11 11:38:43'),(3,'tiktok','TikTok','https://chrome.google.com/webstore?hl=en','tiktok',0,1,'2026-08-11 11:38:54','2026-08-11 11:38:54');
/*!40000 ALTER TABLE `social_media_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `category_brand_id` bigint unsigned DEFAULT NULL,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(180) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_subcategory_slug` (`slug`),
  KEY `idx_subcategory_category_brand` (`category_brand_id`),
  KEY `idx_subcategory_category` (`category_id`),
  CONSTRAINT `fk_subcategory_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_subcategory_category_brand` FOREIGN KEY (`category_brand_id`) REFERENCES `category_brands` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (9,6,3,'S3','s3',NULL,NULL,0,1,'2026-09-22 10:18:31','2026-09-22 10:18:31'),(10,6,3,'5X','5x',NULL,NULL,0,1,'2026-09-22 11:02:09','2026-09-22 11:02:09'),(11,7,4,'SDS Plus','sds-plus',NULL,NULL,0,1,'2026-09-22 11:23:41','2026-09-22 13:46:44'),(12,6,3,'SDS MAX','sds-max',NULL,NULL,0,1,'2026-09-22 11:27:55','2026-09-22 11:27:55');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theme_settings`
--

DROP TABLE IF EXISTS `theme_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theme_settings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `primary_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#1677ff',
  `secondary_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#0f172a',
  `background_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ffffff',
  `surface_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#f8fafc',
  `text_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#1f2937',
  `muted_text_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#64748b',
  `button_background_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#1677ff',
  `button_text_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ffffff',
  `header_background_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ffffff',
  `footer_background_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#111827',
  `footer_text_color` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#ffffff',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theme_settings`
--

LOCK TABLES `theme_settings` WRITE;
/*!40000 ALTER TABLE `theme_settings` DISABLE KEYS */;
INSERT INTO `theme_settings` VALUES (1,'#FFC107','#0B1F3A','#F7F9FC','#FFFFFF','#14213D','#64748B','#FFC107','#0B1F3A','#062B5C','#071A33','#E8EEF7','2026-08-11 14:49:13');
/*!40000 ALTER TABLE `theme_settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-30  9:49:12
