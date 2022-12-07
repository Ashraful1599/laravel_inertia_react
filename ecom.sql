-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table larareactecom.attributes
CREATE TABLE IF NOT EXISTS `attributes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `des` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.attributes: ~2 rows (approximately)
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
INSERT INTO `attributes` (`id`, `name`, `slug`, `des`, `created_at`, `updated_at`) VALUES
	(1, 'Size', 'size', NULL, '2022-11-02 18:27:07', '2022-11-02 18:27:07'),
	(2, 'Color', 'color', NULL, '2022-11-02 18:27:13', '2022-11-02 18:27:13'),
	(3, 'Weight', 'weight', NULL, '2022-11-13 02:35:04', '2022-11-13 02:58:25');
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;

-- Dumping structure for table larareactecom.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_des` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.categories: ~6 rows (approximately)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `cat_name`, `cat_slug`, `cat_des`, `file_id`, `created_at`, `updated_at`) VALUES
	(1, 'Dress', 'dress', NULL, 140, '2022-11-05 14:05:50', '2022-11-05 14:28:14'),
	(2, 'Watches', 'watches', NULL, 135, '2022-11-05 14:07:37', '2022-11-05 14:07:37'),
	(3, 'Machine', 'machine', NULL, 136, '2022-11-05 14:07:51', '2022-11-05 14:07:51'),
	(4, 'Sofa', 'sofa', NULL, 137, '2022-11-05 14:08:08', '2022-11-05 14:08:08'),
	(5, 'Headphone', 'headphone', NULL, 138, '2022-11-05 14:08:23', '2022-11-05 14:08:23'),
	(6, 'Sports', 'sports', NULL, 139, '2022-11-05 14:08:39', '2022-11-05 14:08:39');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Dumping structure for table larareactecom.customer_details
CREATE TABLE IF NOT EXISTS `customer_details` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_postcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_details_user_id_foreign` (`user_id`),
  CONSTRAINT `customer_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.customer_details: ~0 rows (approximately)
/*!40000 ALTER TABLE `customer_details` DISABLE KEYS */;
INSERT INTO `customer_details` (`id`, `user_id`, `company_name`, `country`, `address1`, `address2`, `city`, `state`, `postcode`, `phone`, `ship_first_name`, `ship_last_name`, `ship_company_name`, `ship_country`, `ship_address1`, `ship_address2`, `ship_city`, `ship_state`, `ship_postcode`, `ship_phone`, `created_at`, `updated_at`) VALUES
	(1, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-11-23 17:13:08', '2022-11-23 17:13:08'),
	(2, 23, 'Expertisme', 'BD', '660, Sirajganj Sadar', 'khaddo', 'Sirajganj', '59', '6700', '0610858397', 'test', 'test', 'expertisme', 'IN', '660, Sirajganj Sadar', 'Khaddo borya', 'Sirajganj', 'KA', '6700', '01719360500', '2022-11-27 03:12:32', '2022-11-27 07:17:20');
/*!40000 ALTER TABLE `customer_details` ENABLE KEYS */;

-- Dumping structure for table larareactecom.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.failed_jobs: ~0 rows (approximately)
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;

-- Dumping structure for table larareactecom.files
CREATE TABLE IF NOT EXISTS `files` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.files: ~28 rows (approximately)
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	(109, 'COVID-19 certificate 1', 'covid-19-certificate-1-1667047445.jpg', '2022-10-29 08:38:06', '2022-10-29 12:44:05'),
	(110, 'Ashrafulb', 'ashrafulb-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(111, 'baba nid back', 'baba-nid-back-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(112, 'baba nid front', 'baba-nid-front-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(113, 'COVID-19 certificate 1', 'covid-19-certificate-1-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(114, 'COVID-19 certificate 2', 'covid-19-certificate-2-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(115, 'Date of birth certificate', 'date-of-birth-certificate-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(116, 'IMG_20211213_172844', 'img-20211213-172844-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(117, 'IMG_20220830_090908', 'img-20220830-090908-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(118, 'ma nid back', 'ma-nid-back-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(119, 'ma nid front', 'ma-nid-front-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(120, 'ma', 'ma-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(121, 'NID', 'nid-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(122, 'NID-soto apa', 'nid-soto-apa-1667032686.jpeg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(123, 'readmi note7 imei number', 'readmi-note7-imei-number-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(124, 'rumana-nid', 'rumana-nid-1667032686.png', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(125, 'warishianer certificate', 'warishianer-certificate-1667032686.jpg', '2022-10-29 08:38:06', '2022-10-29 08:38:06'),
	(126, 'Ashraful_original', 'ashraful-original-1667034700.JPG', '2022-10-29 09:11:40', '2022-10-29 09:11:40'),
	(127, 'Ashraful_originacropedl', 'ashraful-originacropedl-1667034779.jpg', '2022-10-29 09:12:59', '2022-10-29 09:12:59'),
	(128, 'Ashraful_original', 'ashraful-original-1667034779.JPG', '2022-10-29 09:12:59', '2022-10-29 09:12:59'),
	(129, 'Ashraful', 'ashraful-1667034826.jpg', '2022-10-29 09:13:46', '2022-10-29 09:13:46'),
	(130, 'Ashraful_originacropedl', 'ashraful-originacropedl-1667034826.jpg', '2022-10-29 09:13:46', '2022-10-29 09:13:46'),
	(131, 'baba nid back', 'baba-nid-back-1667047117.jpg', '2022-10-29 12:38:37', '2022-10-29 12:38:37'),
	(132, 'ashraful bank statement', 'ashraful-bank-statement-1667047138.jpg', '2022-10-29 12:38:58', '2022-10-29 12:38:58'),
	(133, 'category-1', 'category-1-1667657055.jpg', '2022-11-05 14:04:15', '2022-11-05 14:04:15'),
	(134, 'category-1', 'category-1-1667657150.jpg', '2022-11-05 14:05:50', '2022-11-05 14:05:50'),
	(135, 'category-2', 'category-2-1667657257.jpg', '2022-11-05 14:07:37', '2022-11-05 14:07:37'),
	(136, 'category-3', 'category-3-1667657271.jpg', '2022-11-05 14:07:51', '2022-11-05 14:07:51'),
	(137, 'category-4', 'category-4-1667657288.jpg', '2022-11-05 14:08:08', '2022-11-05 14:08:08'),
	(138, 'category-6', 'category-6-1667657303.jpg', '2022-11-05 14:08:23', '2022-11-05 14:08:23'),
	(139, 'category-5', 'category-5-1667657319.jpg', '2022-11-05 14:08:39', '2022-11-05 14:08:39'),
	(140, 'category-1', 'category-1-1667658494.jpg', '2022-11-05 14:28:14', '2022-11-05 14:28:14');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;

-- Dumping structure for table larareactecom.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.migrations: ~25 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_resets_table', 1),
	(3, '2019_08_19_000000_create_failed_jobs_table', 1),
	(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
	(5, '2022_10_17_072603_add_image_to_users_table', 1),
	(6, '2022_10_17_135816_add_role_to_users_table', 1),
	(10, '2022_10_24_075900_create_files_table', 5),
	(11, '2018_08_08_100000_create_telescope_entries_table', 6),
	(16, '2022_11_02_122929_create_attributes_table', 7),
	(17, '2022_11_02_141256_create_terms_table', 8),
	(18, '2022_11_03_072440_create_reviews_table', 9),
	(30, '2022_10_21_040724_create_categories_table', 12),
	(31, '2022_10_22_075532_create_tags_table', 13),
	(42, '2022_11_04_184004_create_variables_table', 14),
	(43, '2022_11_07_153540_create_skus_table', 14),
	(44, '2022_11_08_084418_create_variants_table', 14),
	(45, '2022_11_08_084528_create_variant_options_table', 14),
	(46, '2022_11_09_153628_create_sku_values_table', 14),
	(48, '2022_11_14_145118_create_product_tags_table', 15),
	(49, '2022_10_22_151746_create_products_table', 16),
	(50, '2022_11_23_113144_create_customer_details_table', 17),
	(51, '2022_11_29_170430_create_payments_table', 18),
	(52, '2022_11_29_170431_create_order_shippings_table', 18),
	(56, '2022_11_29_170529_create_order_products_table', 19),
	(60, '2022_11_29_170435_create_orders_table', 20),
	(61, '2018_12_23_120000_create_shoppingcart_table', 21);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Dumping structure for table larareactecom.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `payment_id` bigint(20) unsigned NOT NULL,
  `order_shipping_id` bigint(20) unsigned NOT NULL,
  `shipping` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_qty` int(11) DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT NULL,
  `subtotal` decimal(12,2) DEFAULT NULL,
  `tax` decimal(12,2) DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  KEY `orders_payment_id_foreign` (`payment_id`),
  KEY `orders_order_shipping_id_foreign` (`order_shipping_id`),
  CONSTRAINT `orders_order_shipping_id_foreign` FOREIGN KEY (`order_shipping_id`) REFERENCES `order_shippings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_payment_id_foreign` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.orders: ~8 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `user_id`, `payment_id`, `order_shipping_id`, `shipping`, `order_note`, `total_qty`, `total_price`, `subtotal`, `tax`, `status`, `created_at`, `updated_at`) VALUES
	(23, 23, 104, 103, 'Local pickup', NULL, 1, 660.00, 550.00, 110.00, 'Pending', '2022-12-04 17:48:46', '2022-12-04 17:48:46'),
	(24, 1, 105, 104, 'Local pickup', NULL, 14, 7620.00, 6350.00, 1270.00, 'Pending', '2022-12-06 13:48:15', '2022-12-06 13:48:15'),
	(25, 1, 106, 105, 'Local pickup', NULL, 1, 660.00, 550.00, 110.00, 'Pending', '2022-12-06 13:59:55', '2022-12-06 13:59:55'),
	(26, 1, 107, 106, 'Local pickup', NULL, 1, 660.00, 550.00, 110.00, 'Pending', '2022-12-06 14:05:31', '2022-12-06 14:05:31'),
	(27, 1, 108, 107, 'Local pickup', NULL, 1, 660.00, 550.00, 110.00, 'Pending', '2022-12-06 14:06:58', '2022-12-06 14:06:58'),
	(28, 1, 109, 108, 'Local pickup', NULL, 1, 660.00, 550.00, 110.00, 'Pending', '2022-12-06 14:08:09', '2022-12-06 14:08:09'),
	(29, 1, 110, 109, 'Local pickup', NULL, 1, 660.00, 550.00, 110.00, 'Pending', '2022-12-06 14:08:50', '2022-12-06 14:08:50'),
	(30, 1, 111, 110, 'Local pickup', NULL, 3, 1800.00, 1500.00, 300.00, 'Pending', '2022-12-06 17:59:01', '2022-12-06 17:59:01');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table larareactecom.order_products
CREATE TABLE IF NOT EXISTS `order_products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `order_id` bigint(20) unsigned NOT NULL,
  `qty` int(11) NOT NULL,
  `attribute` json NOT NULL,
  `price` double(8,2) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_products_product_id_foreign` (`product_id`),
  KEY `order_products_order_id_foreign` (`order_id`),
  CONSTRAINT `order_products_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.order_products: ~13 rows (approximately)
/*!40000 ALTER TABLE `order_products` DISABLE KEYS */;
INSERT INTO `order_products` (`id`, `product_id`, `order_id`, `qty`, `attribute`, `price`, `product_name`, `created_at`, `updated_at`) VALUES
	(76, 5, 23, 1, 'null', 550.00, 'Another new product', '2022-12-04 17:48:46', '2022-12-04 17:48:46'),
	(77, 11, 24, 2, 'null', 550.00, 'Another new product', '2022-12-06 13:48:15', '2022-12-06 13:48:15'),
	(78, 3, 24, 9, 'null', 400.00, 'Men Black Sports Shoes', '2022-12-06 13:48:15', '2022-12-06 13:48:15'),
	(79, 30, 24, 1, 'null', 550.00, 'Another new product', '2022-12-06 13:48:15', '2022-12-06 13:48:15'),
	(80, 19, 24, 1, 'null', 550.00, 'Another new product', '2022-12-06 13:48:15', '2022-12-06 13:48:15'),
	(81, 28, 24, 1, 'null', 550.00, 'Another new product', '2022-12-06 13:48:15', '2022-12-06 13:48:15'),
	(82, 5, 25, 1, 'null', 550.00, 'Another new product', '2022-12-06 13:59:55', '2022-12-06 13:59:55'),
	(83, 6, 26, 1, 'null', 550.00, 'Another new product', '2022-12-06 14:05:31', '2022-12-06 14:05:31'),
	(84, 5, 27, 1, 'null', 550.00, 'Another new product', '2022-12-06 14:06:58', '2022-12-06 14:06:58'),
	(85, 5, 28, 1, 'null', 550.00, 'Another new product', '2022-12-06 14:08:09', '2022-12-06 14:08:09'),
	(86, 5, 29, 1, 'null', 550.00, 'Another new product', '2022-12-06 14:08:50', '2022-12-06 14:08:50'),
	(87, 5, 30, 2, 'null', 550.00, 'Wireless bluethooth earphone', '2022-12-06 17:59:01', '2022-12-06 17:59:01'),
	(88, 3, 30, 1, 'null', 400.00, 'Women Black Sports Shoes', '2022-12-06 17:59:01', '2022-12-06 17:59:01');
/*!40000 ALTER TABLE `order_products` ENABLE KEYS */;

-- Dumping structure for table larareactecom.order_shippings
CREATE TABLE IF NOT EXISTS `order_shippings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ship_first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_address1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_address2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_postcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ship_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.order_shippings: ~8 rows (approximately)
/*!40000 ALTER TABLE `order_shippings` DISABLE KEYS */;
INSERT INTO `order_shippings` (`id`, `ship_first_name`, `ship_last_name`, `ship_company_name`, `ship_country`, `ship_address1`, `ship_address2`, `ship_city`, `ship_state`, `ship_postcode`, `ship_phone`, `created_at`, `updated_at`) VALUES
	(103, NULL, NULL, 'Expertisme', 'BD', '660, Sirajganj Sadar', 'khaddo', 'Sirajganj', '59', '6700', '0610858397', '2022-12-04 17:48:46', '2022-12-04 17:48:46'),
	(104, NULL, NULL, 'Expert of tech', NULL, '660, Sirajganj Sadar', NULL, 'Sirajganj', NULL, '6700', '+8801719360500', '2022-12-06 13:48:15', '2022-12-06 13:48:15'),
	(105, NULL, NULL, 'Expert of tech', NULL, 'Rajshahi BD', NULL, 'Sirajganj', NULL, '6700', '+8801719360500', '2022-12-06 13:59:55', '2022-12-06 13:59:55'),
	(106, NULL, NULL, 'Expert of tech', NULL, '660, Sirajganj Sadar', NULL, 'Sirajganj', NULL, '6700', '+8801719360500', '2022-12-06 14:05:31', '2022-12-06 14:05:31'),
	(107, NULL, NULL, 'Expert of tech', NULL, '660, Sirajganj Sadar', NULL, 'Sirajganj', NULL, '6700', '+8801719360500', '2022-12-06 14:06:58', '2022-12-06 14:06:58'),
	(108, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-06 14:08:09', '2022-12-06 14:08:09'),
	(109, NULL, NULL, 'Expert of tech', NULL, '660, Sirajganj Sadar', NULL, 'Sirajganj', NULL, '6700', '+8801719360500', '2022-12-06 14:08:50', '2022-12-06 14:08:50'),
	(110, NULL, NULL, 'Expert of tech', NULL, '660, Sirajganj Sadar', NULL, 'Sirajganj', NULL, '6700', '+8801719360500', '2022-12-06 17:59:01', '2022-12-06 17:59:01');
/*!40000 ALTER TABLE `order_shippings` ENABLE KEYS */;

-- Dumping structure for table larareactecom.password_resets
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.password_resets: ~0 rows (approximately)
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;

-- Dumping structure for table larareactecom.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.payments: ~102 rows (approximately)
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` (`id`, `payment_method`, `created_at`, `updated_at`) VALUES
	(1, 'cash_on_delivery', '2022-11-30 07:43:20', '2022-11-30 07:43:20'),
	(2, 'cash_on_delivery', '2022-11-30 07:44:53', '2022-11-30 07:44:53'),
	(3, 'cash_on_delivery', '2022-11-30 07:46:32', '2022-11-30 07:46:32'),
	(4, 'cash_on_delivery', '2022-11-30 07:47:01', '2022-11-30 07:47:01'),
	(5, 'cash_on_delivery', '2022-11-30 09:32:58', '2022-11-30 09:32:58'),
	(6, 'cash_on_delivery', '2022-11-30 09:35:57', '2022-11-30 09:35:57'),
	(7, 'cash_on_delivery', '2022-11-30 09:59:19', '2022-11-30 09:59:19'),
	(8, 'cash_on_delivery', '2022-11-30 10:00:51', '2022-11-30 10:00:51'),
	(9, 'cash_on_delivery', '2022-11-30 10:17:11', '2022-11-30 10:17:11'),
	(10, 'cash_on_delivery', '2022-11-30 10:17:48', '2022-11-30 10:17:48'),
	(11, 'cash_on_delivery', '2022-11-30 10:47:39', '2022-11-30 10:47:39'),
	(12, 'cash_on_delivery', '2022-11-30 10:48:22', '2022-11-30 10:48:22'),
	(13, 'cash_on_delivery', '2022-11-30 10:48:38', '2022-11-30 10:48:38'),
	(14, 'cash_on_delivery', '2022-11-30 10:50:55', '2022-11-30 10:50:55'),
	(15, 'cash_on_delivery', '2022-11-30 10:51:10', '2022-11-30 10:51:10'),
	(16, 'cash_on_delivery', '2022-11-30 10:51:36', '2022-11-30 10:51:36'),
	(17, 'cash_on_delivery', '2022-11-30 10:54:33', '2022-11-30 10:54:33'),
	(18, 'cash_on_delivery', '2022-11-30 10:55:05', '2022-11-30 10:55:05'),
	(19, 'cash_on_delivery', '2022-11-30 10:57:18', '2022-11-30 10:57:18'),
	(20, 'cash_on_delivery', '2022-11-30 11:13:17', '2022-11-30 11:13:17'),
	(21, 'cash_on_delivery', '2022-11-30 11:24:15', '2022-11-30 11:24:15'),
	(22, 'cash_on_delivery', '2022-11-30 11:27:16', '2022-11-30 11:27:16'),
	(23, 'cash_on_delivery', '2022-11-30 11:27:34', '2022-11-30 11:27:34'),
	(24, 'cash_on_delivery', '2022-11-30 11:46:10', '2022-11-30 11:46:10'),
	(25, 'cash_on_delivery', '2022-11-30 11:47:49', '2022-11-30 11:47:49'),
	(26, 'cash_on_delivery', '2022-11-30 11:48:38', '2022-11-30 11:48:38'),
	(27, 'cash_on_delivery', '2022-11-30 12:05:38', '2022-11-30 12:05:38'),
	(28, 'cash_on_delivery', '2022-11-30 12:08:06', '2022-11-30 12:08:06'),
	(29, 'cash_on_delivery', '2022-11-30 12:15:15', '2022-11-30 12:15:15'),
	(30, 'cash_on_delivery', '2022-11-30 12:16:31', '2022-11-30 12:16:31'),
	(31, 'cash_on_delivery', '2022-11-30 12:26:18', '2022-11-30 12:26:18'),
	(32, 'cash_on_delivery', '2022-11-30 12:31:29', '2022-11-30 12:31:29'),
	(33, 'cash_on_delivery', '2022-11-30 12:33:22', '2022-11-30 12:33:22'),
	(34, 'cash_on_delivery', '2022-11-30 12:35:04', '2022-11-30 12:35:04'),
	(35, 'cash_on_delivery', '2022-11-30 12:37:32', '2022-11-30 12:37:32'),
	(36, 'cash_on_delivery', '2022-11-30 12:44:45', '2022-11-30 12:44:45'),
	(37, 'cash_on_delivery', '2022-11-30 12:45:19', '2022-11-30 12:45:19'),
	(38, 'cash_on_delivery', '2022-11-30 13:07:27', '2022-11-30 13:07:27'),
	(39, 'cash_on_delivery', '2022-11-30 13:07:33', '2022-11-30 13:07:33'),
	(40, 'cash_on_delivery', '2022-11-30 13:09:00', '2022-11-30 13:09:00'),
	(41, 'cash_on_delivery', '2022-11-30 13:09:23', '2022-11-30 13:09:23'),
	(42, 'cash_on_delivery', '2022-11-30 13:10:54', '2022-11-30 13:10:54'),
	(43, 'cash_on_delivery', '2022-11-30 13:11:06', '2022-11-30 13:11:06'),
	(44, 'cash_on_delivery', '2022-11-30 13:11:21', '2022-11-30 13:11:21'),
	(45, 'cash_on_delivery', '2022-11-30 13:11:30', '2022-11-30 13:11:30'),
	(46, 'cash_on_delivery', '2022-11-30 13:11:46', '2022-11-30 13:11:46'),
	(47, 'cash_on_delivery', '2022-11-30 14:45:53', '2022-11-30 14:45:53'),
	(48, 'cash_on_delivery', '2022-11-30 16:15:58', '2022-11-30 16:15:58'),
	(49, 'cash_on_delivery', '2022-11-30 16:18:33', '2022-11-30 16:18:33'),
	(50, 'cash_on_delivery', '2022-11-30 16:22:42', '2022-11-30 16:22:42'),
	(51, 'cash_on_delivery', '2022-11-30 16:26:41', '2022-11-30 16:26:41'),
	(52, 'cash_on_delivery', '2022-11-30 16:34:00', '2022-11-30 16:34:00'),
	(53, 'cash_on_delivery', '2022-11-30 16:35:02', '2022-11-30 16:35:02'),
	(54, 'cash_on_delivery', '2022-11-30 16:37:20', '2022-11-30 16:37:20'),
	(55, 'cash_on_delivery', '2022-11-30 16:37:52', '2022-11-30 16:37:52'),
	(56, 'cash_on_delivery', '2022-11-30 16:42:46', '2022-11-30 16:42:46'),
	(57, 'cash_on_delivery', '2022-11-30 16:43:53', '2022-11-30 16:43:53'),
	(58, 'cash_on_delivery', '2022-11-30 16:45:20', '2022-11-30 16:45:20'),
	(59, 'cash_on_delivery', '2022-11-30 16:46:32', '2022-11-30 16:46:32'),
	(60, 'cash_on_delivery', '2022-11-30 16:50:34', '2022-11-30 16:50:34'),
	(61, 'cash_on_delivery', '2022-11-30 16:51:34', '2022-11-30 16:51:34'),
	(62, 'cash_on_delivery', '2022-11-30 16:54:33', '2022-11-30 16:54:33'),
	(63, 'cash_on_delivery', '2022-11-30 16:54:55', '2022-11-30 16:54:55'),
	(64, 'cash_on_delivery', '2022-11-30 16:56:51', '2022-11-30 16:56:51'),
	(65, 'cash_on_delivery', '2022-11-30 16:58:59', '2022-11-30 16:58:59'),
	(66, 'Cash on delivery', '2022-11-30 17:00:07', '2022-11-30 17:00:07'),
	(67, 'Cash on delivery', '2022-11-30 17:01:10', '2022-11-30 17:01:10'),
	(68, 'Cash on delivery', '2022-11-30 17:01:56', '2022-11-30 17:01:56'),
	(69, 'Cash on delivery', '2022-11-30 17:02:27', '2022-11-30 17:02:27'),
	(70, 'Cash on delivery', '2022-11-30 17:02:58', '2022-11-30 17:02:58'),
	(71, 'Cash on delivery', '2022-11-30 17:04:40', '2022-11-30 17:04:40'),
	(72, 'Cash on delivery', '2022-11-30 17:04:58', '2022-11-30 17:04:58'),
	(73, 'Cash on delivery', '2022-11-30 17:09:35', '2022-11-30 17:09:35'),
	(74, 'Cash on delivery', '2022-11-30 17:14:33', '2022-11-30 17:14:33'),
	(75, 'Cash on delivery', '2022-11-30 17:15:34', '2022-11-30 17:15:34'),
	(76, 'Cash on delivery', '2022-11-30 17:17:00', '2022-11-30 17:17:00'),
	(77, 'Cash on delivery', '2022-11-30 17:17:16', '2022-11-30 17:17:16'),
	(78, 'Cash on delivery', '2022-11-30 17:20:41', '2022-11-30 17:20:41'),
	(79, 'Cash on delivery', '2022-11-30 17:20:59', '2022-11-30 17:20:59'),
	(80, 'Cash on delivery', '2022-11-30 17:24:54', '2022-11-30 17:24:54'),
	(81, 'Cash on delivery', '2022-11-30 17:30:55', '2022-11-30 17:30:55'),
	(82, 'Cash on delivery', '2022-11-30 17:31:56', '2022-11-30 17:31:56'),
	(83, 'Cash on delivery', '2022-11-30 17:33:14', '2022-11-30 17:33:14'),
	(84, 'Cash on delivery', '2022-11-30 17:35:37', '2022-11-30 17:35:37'),
	(85, 'Cash on delivery', '2022-11-30 17:41:22', '2022-11-30 17:41:22'),
	(86, 'Cash on delivery', '2022-12-02 06:01:05', '2022-12-02 06:01:05'),
	(87, 'Cash on delivery', '2022-12-02 19:11:57', '2022-12-02 19:11:57'),
	(88, 'Cash on delivery', '2022-12-02 19:16:45', '2022-12-02 19:16:45'),
	(89, 'Cash on delivery', '2022-12-02 19:17:30', '2022-12-02 19:17:30'),
	(90, 'Cash on delivery', '2022-12-02 19:17:45', '2022-12-02 19:17:45'),
	(91, 'Cash on delivery', '2022-12-02 19:54:31', '2022-12-02 19:54:31'),
	(92, 'Cash on delivery', '2022-12-02 19:57:55', '2022-12-02 19:57:55'),
	(93, 'Cash on delivery', '2022-12-02 20:01:37', '2022-12-02 20:01:37'),
	(94, 'Cash on delivery', '2022-12-02 20:02:29', '2022-12-02 20:02:29'),
	(95, 'Cash on delivery', '2022-12-02 20:05:03', '2022-12-02 20:05:03'),
	(96, 'Cash on delivery', '2022-12-02 20:11:40', '2022-12-02 20:11:40'),
	(97, 'stripe', '2022-12-03 05:02:47', '2022-12-03 05:02:47'),
	(98, 'stripe', '2022-12-03 08:07:59', '2022-12-03 08:07:59'),
	(99, 'paypal', '2022-12-04 17:17:09', '2022-12-04 17:17:09'),
	(100, 'paypal', '2022-12-04 17:19:06', '2022-12-04 17:19:06'),
	(101, 'stripe', '2022-12-04 17:31:06', '2022-12-04 17:31:06'),
	(102, 'cash_on_delivery', '2022-12-04 17:40:52', '2022-12-04 17:40:52'),
	(103, 'cash_on_delivery', '2022-12-04 17:42:20', '2022-12-04 17:42:20'),
	(104, 'cash_on_delivery', '2022-12-04 17:48:46', '2022-12-04 17:48:46'),
	(105, 'cash_on_delivery', '2022-12-06 13:48:15', '2022-12-06 13:48:15'),
	(106, 'cash_on_delivery', '2022-12-06 13:59:55', '2022-12-06 13:59:55'),
	(107, 'stripe', '2022-12-06 14:05:31', '2022-12-06 14:05:31'),
	(108, 'cash_on_delivery', '2022-12-06 14:06:58', '2022-12-06 14:06:58'),
	(109, 'paypal', '2022-12-06 14:08:09', '2022-12-06 14:08:09'),
	(110, 'stripe', '2022-12-06 14:08:50', '2022-12-06 14:08:50'),
	(111, 'cash_on_delivery', '2022-12-06 17:59:01', '2022-12-06 17:59:01');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;

-- Dumping structure for table larareactecom.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.personal_access_tokens: ~1 rows (approximately)
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;

-- Dumping structure for table larareactecom.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cat_id` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gallery` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `promo1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `promo2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax_class` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ' ',
  `regular_price` double(8,2) NOT NULL DEFAULT '0.00',
  `offer_price` double(8,2) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `fetured` int(11) NOT NULL,
  `variable` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.products: ~29 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `name`, `slug`, `cat_id`, `description`, `image`, `image2`, `gallery`, `promo1`, `promo2`, `sku`, `tax_class`, `product_type`, `regular_price`, `offer_price`, `status`, `fetured`, `variable`, `created_at`, `updated_at`) VALUES
	(2, 'Men white Shoes', 'men-black-sports-shoes-2', 4, '<p>fgdfsd</p>', 'product-4-big-1668836462.jpg', '', '[]', 'Hot', 'sell', '100', 'no_tax', 'simple', 500.00, 400.00, 1, 0, 'null', '2022-11-19 05:43:47', '2022-11-19 05:43:47'),
	(3, 'Women Black Sports Shoes', 'men-black-sports-shoes-ash', 4, '<p>fgdfsd</p>', 'product-4-big-1668836462.jpg', '', '[]', 'Hot', 'sell', '100', 'no_tax', 'simple', 500.00, 400.00, 1, 0, 'null', '2022-11-19 05:44:16', '2022-11-19 05:56:02'),
	(4, 'Men Black Sports Shoes', 'men-black-sports-shoes-shuma', 4, '<p>fgdfsd</p>', 'product-4-big-1668836462.jpg', '', '[]', 'Hot', 'sell', '100', 'no_tax', 'variable', 500.00, 400.00, 1, 0, '[{"sku": "4-0", "size": 1, "color": 3, "price": "100"}, {"sku": "4-1", "size": 1, "color": 4, "price": "200"}, {"sku": "4-2", "size": 2, "color": 3, "price": "300"}, {"sku": "4-3", "size": 2, "color": 4, "price": "400"}]', '2022-11-19 05:56:42', '2022-11-21 13:56:20'),
	(5, 'Wireless bluethooth earphone', 'another-new-product', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-11-21 13:57:31', '2022-11-21 13:57:31'),
	(6, '5g modem', 'another-new-product-2', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 05:59:48', '2022-12-06 05:59:48'),
	(7, '3g network booster', 'another-new-product-3', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 05:59:53', '2022-12-06 05:59:53'),
	(8, 'RFL pressure cooker', 'another-new-product-4', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 05:59:56', '2022-12-06 05:59:56'),
	(9, 'Kiam rice cooker', 'another-new-product-5', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 05:59:59', '2022-12-06 05:59:59'),
	(10, 'Singer freez', 'another-new-product-6', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:01', '2022-12-06 06:00:01'),
	(11, 'Walton AC', 'another-new-product-7', 6, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:03', '2022-12-06 06:01:52'),
	(12, 'Walton high speed fan', 'another-new-product-8', 3, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:05', '2022-12-06 06:02:56'),
	(13, 'Android TV', 'another-new-product-9', 5, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:07', '2022-12-06 06:01:39'),
	(14, 'Give a donation', 'another-new-product-10', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:08', '2022-12-06 06:00:08'),
	(15, 'T-shirt for women', 'another-new-product-11', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:10', '2022-12-06 06:00:10'),
	(16, 'T-shirt for men', 'another-new-product-12', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:12', '2022-12-06 06:00:12'),
	(17, 'Custom size banner', 'another-new-product-13', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:14', '2022-12-06 06:00:14'),
	(18, '3D painting', 'another-new-product-14', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:15', '2022-12-06 06:00:15'),
	(19, 'Smart watch original', 'another-new-product-15', 4, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:17', '2022-12-06 06:01:28'),
	(20, 'Readmi note 11', 'another-new-product-16', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:18', '2022-12-06 06:00:18'),
	(21, 'Google smart TV', 'another-new-product-17', 1, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:20', '2022-12-06 06:02:36'),
	(22, 'Wireless headphone', 'another-new-product-18', 3, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:21', '2022-12-06 06:01:12'),
	(23, 'Dell 21 inch monitor', 'another-new-product-19', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:23', '2022-12-06 06:00:23'),
	(24, 'Network booster 5g', 'another-new-product-20', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:24', '2022-12-06 06:00:24'),
	(25, 'HP laptop 3110', 'another-new-product-21', 2, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:25', '2022-12-06 06:00:25'),
	(26, 'Iphone 10', 'another-new-product-22', 5, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:27', '2022-12-06 06:02:25'),
	(27, 'Smart watch walves', 'another-new-product-23', 6, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:28', '2022-12-06 06:02:14'),
	(28, 'Sport jacket', 'another-new-product-24', 1, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:29', '2022-12-06 06:00:59'),
	(29, 'Winter jacket', 'another-new-product-25', 1, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:32', '2022-12-06 06:00:53'),
	(30, 'Product name demo', 'another-new-product-26', 1, '<p>fsdfdsf</p>', 'category-3-1669039051.jpg', '', '["category-5-1669039051.jpg","category-3-1669039051.jpg"]', 'Hot', 'sell', '500', 'no_tax', 'simple', 600.00, 550.00, 1, 1, 'null', '2022-12-06 06:00:34', '2022-12-06 06:00:46');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Dumping structure for table larareactecom.product_tags
CREATE TABLE IF NOT EXISTS `product_tags` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `tag_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_tags_product_id_foreign` (`product_id`),
  KEY `product_tags_tag_id_foreign` (`tag_id`),
  CONSTRAINT `product_tags_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.product_tags: ~58 rows (approximately)
/*!40000 ALTER TABLE `product_tags` DISABLE KEYS */;
INSERT INTO `product_tags` (`id`, `product_id`, `tag_id`, `created_at`, `updated_at`) VALUES
	(91, 2, 3, '2022-11-19 09:23:38', '2022-11-19 09:23:38'),
	(92, 2, 1, '2022-11-19 09:23:38', '2022-11-19 09:23:38'),
	(93, 4, 2, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(94, 4, 7, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(95, 3, 2, '2022-11-21 13:56:27', '2022-11-21 13:56:27'),
	(96, 3, 4, '2022-11-21 13:56:27', '2022-11-21 13:56:27'),
	(97, 5, 5, '2022-11-21 13:57:31', '2022-11-21 13:57:31'),
	(98, 5, 4, '2022-11-21 13:57:31', '2022-11-21 13:57:31'),
	(99, 6, 5, '2022-12-06 05:59:48', '2022-12-06 05:59:48'),
	(100, 6, 4, '2022-12-06 05:59:48', '2022-12-06 05:59:48'),
	(101, 7, 5, '2022-12-06 05:59:53', '2022-12-06 05:59:53'),
	(102, 7, 4, '2022-12-06 05:59:53', '2022-12-06 05:59:53'),
	(103, 8, 5, '2022-12-06 05:59:56', '2022-12-06 05:59:56'),
	(104, 8, 4, '2022-12-06 05:59:56', '2022-12-06 05:59:56'),
	(105, 9, 5, '2022-12-06 05:59:59', '2022-12-06 05:59:59'),
	(106, 9, 4, '2022-12-06 05:59:59', '2022-12-06 05:59:59'),
	(107, 10, 5, '2022-12-06 06:00:01', '2022-12-06 06:00:01'),
	(108, 10, 4, '2022-12-06 06:00:01', '2022-12-06 06:00:01'),
	(115, 14, 5, '2022-12-06 06:00:08', '2022-12-06 06:00:08'),
	(116, 14, 4, '2022-12-06 06:00:08', '2022-12-06 06:00:08'),
	(117, 15, 5, '2022-12-06 06:00:10', '2022-12-06 06:00:10'),
	(118, 15, 4, '2022-12-06 06:00:10', '2022-12-06 06:00:10'),
	(119, 16, 5, '2022-12-06 06:00:12', '2022-12-06 06:00:12'),
	(120, 16, 4, '2022-12-06 06:00:12', '2022-12-06 06:00:12'),
	(121, 17, 5, '2022-12-06 06:00:14', '2022-12-06 06:00:14'),
	(122, 17, 4, '2022-12-06 06:00:14', '2022-12-06 06:00:14'),
	(123, 18, 5, '2022-12-06 06:00:15', '2022-12-06 06:00:15'),
	(124, 18, 4, '2022-12-06 06:00:15', '2022-12-06 06:00:15'),
	(127, 20, 5, '2022-12-06 06:00:18', '2022-12-06 06:00:18'),
	(128, 20, 4, '2022-12-06 06:00:18', '2022-12-06 06:00:18'),
	(133, 23, 5, '2022-12-06 06:00:23', '2022-12-06 06:00:23'),
	(134, 23, 4, '2022-12-06 06:00:23', '2022-12-06 06:00:23'),
	(135, 24, 5, '2022-12-06 06:00:24', '2022-12-06 06:00:24'),
	(136, 24, 4, '2022-12-06 06:00:24', '2022-12-06 06:00:24'),
	(137, 25, 5, '2022-12-06 06:00:25', '2022-12-06 06:00:25'),
	(138, 25, 4, '2022-12-06 06:00:25', '2022-12-06 06:00:25'),
	(149, 30, 5, '2022-12-06 06:00:46', '2022-12-06 06:00:46'),
	(150, 30, 4, '2022-12-06 06:00:46', '2022-12-06 06:00:46'),
	(151, 29, 5, '2022-12-06 06:00:53', '2022-12-06 06:00:53'),
	(152, 29, 4, '2022-12-06 06:00:53', '2022-12-06 06:00:53'),
	(153, 28, 5, '2022-12-06 06:00:59', '2022-12-06 06:00:59'),
	(154, 28, 4, '2022-12-06 06:00:59', '2022-12-06 06:00:59'),
	(155, 22, 5, '2022-12-06 06:01:12', '2022-12-06 06:01:12'),
	(156, 22, 4, '2022-12-06 06:01:12', '2022-12-06 06:01:12'),
	(157, 19, 5, '2022-12-06 06:01:28', '2022-12-06 06:01:28'),
	(158, 19, 4, '2022-12-06 06:01:28', '2022-12-06 06:01:28'),
	(159, 13, 5, '2022-12-06 06:01:39', '2022-12-06 06:01:39'),
	(160, 13, 4, '2022-12-06 06:01:39', '2022-12-06 06:01:39'),
	(161, 11, 5, '2022-12-06 06:01:53', '2022-12-06 06:01:53'),
	(162, 11, 4, '2022-12-06 06:01:53', '2022-12-06 06:01:53'),
	(163, 27, 5, '2022-12-06 06:02:14', '2022-12-06 06:02:14'),
	(164, 27, 4, '2022-12-06 06:02:14', '2022-12-06 06:02:14'),
	(165, 26, 5, '2022-12-06 06:02:25', '2022-12-06 06:02:25'),
	(166, 26, 4, '2022-12-06 06:02:25', '2022-12-06 06:02:25'),
	(167, 21, 5, '2022-12-06 06:02:36', '2022-12-06 06:02:36'),
	(168, 21, 4, '2022-12-06 06:02:36', '2022-12-06 06:02:36'),
	(169, 12, 5, '2022-12-06 06:02:56', '2022-12-06 06:02:56'),
	(170, 12, 4, '2022-12-06 06:02:56', '2022-12-06 06:02:56');
/*!40000 ALTER TABLE `product_tags` ENABLE KEYS */;

-- Dumping structure for table larareactecom.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `review` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int(11) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_user_id_foreign` (`user_id`),
  KEY `reviews_product_id_foreign` (`product_id`),
  CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.reviews: ~0 rows (approximately)
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;

-- Dumping structure for table larareactecom.shoppingcart
CREATE TABLE IF NOT EXISTS `shoppingcart` (
  `identifier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instance` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`identifier`,`instance`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.shoppingcart: ~0 rows (approximately)
/*!40000 ALTER TABLE `shoppingcart` DISABLE KEYS */;
/*!40000 ALTER TABLE `shoppingcart` ENABLE KEYS */;

-- Dumping structure for table larareactecom.skus
CREATE TABLE IF NOT EXISTS `skus` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `skus_product_id_foreign` (`product_id`),
  CONSTRAINT `skus_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.skus: ~4 rows (approximately)
/*!40000 ALTER TABLE `skus` DISABLE KEYS */;
INSERT INTO `skus` (`id`, `product_id`, `sku`, `price`, `qty`, `created_at`, `updated_at`) VALUES
	(105, 4, '4-0', '100', 1, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(106, 4, '4-1', '200', 1, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(107, 4, '4-2', '300', 1, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(108, 4, '4-3', '400', 1, '2022-11-21 13:56:20', '2022-11-21 13:56:20');
/*!40000 ALTER TABLE `skus` ENABLE KEYS */;

-- Dumping structure for table larareactecom.sku_values
CREATE TABLE IF NOT EXISTS `sku_values` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `variant_id` bigint(20) unsigned NOT NULL,
  `variant_option_id` bigint(20) unsigned NOT NULL,
  `sku_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sku_values_product_id_foreign` (`product_id`),
  KEY `sku_values_variant_id_foreign` (`variant_id`),
  KEY `sku_values_variant_option_id_foreign` (`variant_option_id`),
  KEY `sku_values_sku_id_foreign` (`sku_id`),
  CONSTRAINT `sku_values_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sku_values_sku_id_foreign` FOREIGN KEY (`sku_id`) REFERENCES `skus` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sku_values_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sku_values_variant_option_id_foreign` FOREIGN KEY (`variant_option_id`) REFERENCES `variant_options` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=285 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.sku_values: ~8 rows (approximately)
/*!40000 ALTER TABLE `sku_values` DISABLE KEYS */;
INSERT INTO `sku_values` (`id`, `product_id`, `variant_id`, `variant_option_id`, `sku_id`, `created_at`, `updated_at`) VALUES
	(277, 4, 46, 90, 105, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(278, 4, 47, 91, 105, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(279, 4, 46, 90, 106, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(280, 4, 47, 92, 106, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(281, 4, 46, 93, 107, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(282, 4, 47, 91, 107, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(283, 4, 46, 93, 108, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(284, 4, 47, 92, 108, '2022-11-21 13:56:20', '2022-11-21 13:56:20');
/*!40000 ALTER TABLE `sku_values` ENABLE KEYS */;

-- Dumping structure for table larareactecom.tags
CREATE TABLE IF NOT EXISTS `tags` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag_slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tag_des` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.tags: ~6 rows (approximately)
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` (`id`, `tag_name`, `tag_slug`, `tag_des`, `created_at`, `updated_at`) VALUES
	(1, 'Cloth', 'cloth', NULL, '2022-11-05 14:52:41', '2022-11-05 14:52:41'),
	(2, 'Sweater', 'sweater', NULL, '2022-11-05 14:52:49', '2022-11-05 14:52:49'),
	(3, 'Winter jacket', 'winter-jacket', NULL, '2022-11-05 14:53:34', '2022-11-05 14:53:34'),
	(4, 'Bag', 'bag', NULL, '2022-11-05 14:53:43', '2022-11-05 14:53:51'),
	(5, 'Mobile', 'mobile', NULL, '2022-11-05 14:54:08', '2022-11-05 14:54:08'),
	(6, 'Laptop', 'laptop', NULL, '2022-11-05 14:54:17', '2022-11-05 14:54:17'),
	(7, 'Machine', 'machine', NULL, '2022-11-05 14:54:42', '2022-11-05 14:54:42');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;

-- Dumping structure for table larareactecom.telescope_entries_tags
CREATE TABLE IF NOT EXISTS `telescope_entries_tags` (
  `entry_uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  KEY `telescope_entries_tags_entry_uuid_tag_index` (`entry_uuid`,`tag`),
  KEY `telescope_entries_tags_tag_index` (`tag`),
  CONSTRAINT `telescope_entries_tags_entry_uuid_foreign` FOREIGN KEY (`entry_uuid`) REFERENCES `telescope_entries` (`uuid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.telescope_entries_tags: ~0 rows (approximately)
/*!40000 ALTER TABLE `telescope_entries_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `telescope_entries_tags` ENABLE KEYS */;

-- Dumping structure for table larareactecom.telescope_monitoring
CREATE TABLE IF NOT EXISTS `telescope_monitoring` (
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.telescope_monitoring: ~0 rows (approximately)
/*!40000 ALTER TABLE `telescope_monitoring` DISABLE KEYS */;
/*!40000 ALTER TABLE `telescope_monitoring` ENABLE KEYS */;

-- Dumping structure for table larareactecom.terms
CREATE TABLE IF NOT EXISTS `terms` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `attribute_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `des` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `terms_attribute_id_foreign` (`attribute_id`),
  CONSTRAINT `terms_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.terms: ~6 rows (approximately)
/*!40000 ALTER TABLE `terms` DISABLE KEYS */;
INSERT INTO `terms` (`id`, `attribute_id`, `name`, `slug`, `des`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Small', 'small', NULL, '2022-11-02 18:27:26', '2022-11-10 11:09:59'),
	(2, 1, 'Medium', 'medium', NULL, '2022-11-02 18:27:31', '2022-11-10 11:10:09'),
	(3, 2, 'White', 'white', NULL, '2022-11-02 18:27:38', '2022-11-02 18:27:38'),
	(4, 2, 'Blue', 'blue', NULL, '2022-11-02 18:27:44', '2022-11-02 18:27:44'),
	(5, 3, '1kg', '1kg', NULL, '2022-11-13 02:35:20', '2022-11-13 02:35:20'),
	(6, 3, '2Kg', '2kg', NULL, '2022-11-13 02:35:27', '2022-11-13 02:35:27');
/*!40000 ALTER TABLE `terms` ENABLE KEYS */;

-- Dumping structure for table larareactecom.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.users: ~12 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `lname`, `image`, `role`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Ashraful', 'Islam', '1667015040.jpg', '1', 'smashrafulcse@gmail.com', NULL, '$2y$10$Ut.2EOrIa7XNzY.PN4iTdeJZTfya2268837AfhnTTVjR9ZW9mtUyy', NULL, '2022-10-18 06:14:00', '2022-10-29 03:44:00'),
	(6, 'Anika', 'Afroz', NULL, '1', 'anikislamash@gmail.com', NULL, '$2y$10$vP7ofj1gXENX0WucGqa89.EKJJUZiP40.5bBnPWbCodQRuO8Rf6UG', NULL, '2022-10-20 17:18:08', '2022-10-20 17:21:04'),
	(12, 'Expert', 'tech', NULL, '0', 'expertoftech24@gmail.com', NULL, '$2y$10$TRQPj64r.n.6LEcikjxpYOGQ73BLEz1RUmeZrsSNHD6/vMVWQtZGi', NULL, '2022-10-20 19:48:11', '2022-10-20 19:48:11'),
	(14, 'Ashraful', 'smashrafulcse@gmail.com', NULL, '0', 'smashrafulcse2@gmail.com', NULL, '$2y$10$hMHEdPPYqcn.7NVRk6EmI.m4eTbyphQmOO1Zxed83tnsAO7Qx2akO', NULL, '2022-11-23 15:20:33', '2022-11-23 15:20:33'),
	(15, 'Expert', 'tech', NULL, '0', 'expertoftech244@gmail.com', NULL, '$2y$10$fVvvgoAZQkf5.O282.2JXONrwV0NgACD/lsWUZqT6Fr52nimPvuGi', NULL, '2022-11-23 15:24:49', '2022-11-23 15:24:49'),
	(16, 'Expert', 'tech', NULL, '0', 'expertoftech247@gmail.com', NULL, '$2y$10$1Z2tHTkLzii7X3IG0NA4n./vjdghR2RjsWXDugSUFklHSKsjfL/Mu', NULL, '2022-11-23 15:26:20', '2022-11-23 15:26:20'),
	(17, 'Ashraful', 'Islam', NULL, '0', 'smashrafulcsefdf@gmail.com', NULL, '$2y$10$OqMB4zS.A/TlCvJeWfKtDeJLGVmgrIRg2itOn4lBLYHr.GA/jnDi2', NULL, '2022-11-23 15:26:50', '2022-11-23 15:26:50'),
	(18, 'Ashraful', 'Islam', NULL, '0', 'smashrafulcse10@gmail.com', NULL, '$2y$10$Niz.6RvbJuwg/hB6ZbVl/OWmWSShm5NkC7vWAZvxF8a0yFDUZuMnC', 'mu7dSGjraEoRWjjeTvyKCyfYZiv6yK5MZWYeLjfcazyWK9DIGGhPlLPXZpYe', '2022-11-23 15:47:33', '2022-11-23 20:01:36'),
	(19, 'Ashraful', 'Islam', NULL, '0', 'smashrafulcse20@gmail.com', NULL, '$2y$10$g0dVpSB4R74kY7FZG2gnPuiFmnP27oSIZUrR3tnP0qRWVDQQrB9sy', NULL, '2022-11-23 17:05:52', '2022-11-23 17:05:52'),
	(20, 'Ashraful', 'Islam', NULL, '0', 'smashrafulcse200@gmail.com', NULL, '$2y$10$yDOTHOKG4rac4r0Ta69xtu.E/dzqVQP/bIZxyWrm5W0TCITJB9Ige', NULL, '2022-11-23 17:07:38', '2022-11-23 17:07:38'),
	(21, 'Ashraful', 'Islam', NULL, '0', 'sfmashrafulcse200@gmail.com', NULL, '$2y$10$etDbZdjhzPu8NPWEh2KM.OshtGkUdI9gIDbcVMiGL.oKoFoyPEGfO', NULL, '2022-11-23 17:08:38', '2022-11-23 17:08:38'),
	(22, 'Ashraful', 'Islam', NULL, '0', 'sfmashrafulc9se200@gmail.com', NULL, '$2y$10$h0mJEuFmTT61PJuBJNKL1O9ss/JuDiscD/tBTy.wYIDbR86eGffFu', NULL, '2022-11-23 17:13:08', '2022-11-23 17:13:08'),
	(23, 'Ashraful', 'Islam', NULL, '0', 'smashrafulcsee@gmail.com', NULL, '$2y$10$5dZ/1J9keY7So3Taop4POO54/TOpPFSdUwIA.e7iOCAKrD5oppP3e', 'L3LrOoAbVUalbKWH5aJTaOwijlLFdOobUupx4hQ5YadHARfvxP1WqMnqYoC1', '2022-11-27 03:12:32', '2022-11-27 03:12:32'),
	(24, 'Ashraful', 'Islam', NULL, '0', 'smashrafulcs236e@gmail.com', NULL, '$2y$10$ux3A2WgZHN4gIQWnPIWc7OTIR5HpOeaEpN0ybdJQqViG0OdQePUZ6', NULL, '2022-11-30 09:32:57', '2022-11-30 09:32:57'),
	(25, 'Ashraful', 'Islam', NULL, '0', 'smashrafuldscs236e@gmail.com', NULL, '$2y$10$dWKLInIdQQ8atnbOfRp0vOq6z8V81T90TV5JSq31PJJ2uVMbxgVT.', NULL, '2022-11-30 09:35:57', '2022-11-30 09:35:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table larareactecom.variables
CREATE TABLE IF NOT EXISTS `variables` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.variables: ~0 rows (approximately)
/*!40000 ALTER TABLE `variables` DISABLE KEYS */;
/*!40000 ALTER TABLE `variables` ENABLE KEYS */;

-- Dumping structure for table larareactecom.variants
CREATE TABLE IF NOT EXISTS `variants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `attribute_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `variants_product_id_foreign` (`product_id`),
  KEY `variants_attribute_id_foreign` (`attribute_id`),
  CONSTRAINT `variants_attribute_id_foreign` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.variants: ~2 rows (approximately)
/*!40000 ALTER TABLE `variants` DISABLE KEYS */;
INSERT INTO `variants` (`id`, `product_id`, `attribute_id`, `created_at`, `updated_at`) VALUES
	(46, 4, 1, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(47, 4, 2, '2022-11-21 13:56:20', '2022-11-21 13:56:20');
/*!40000 ALTER TABLE `variants` ENABLE KEYS */;

-- Dumping structure for table larareactecom.variant_options
CREATE TABLE IF NOT EXISTS `variant_options` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `variant_id` bigint(20) unsigned NOT NULL,
  `term_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `variant_options_product_id_foreign` (`product_id`),
  KEY `variant_options_variant_id_foreign` (`variant_id`),
  KEY `variant_options_term_id_foreign` (`term_id`),
  CONSTRAINT `variant_options_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `variant_options_term_id_foreign` FOREIGN KEY (`term_id`) REFERENCES `terms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `variant_options_variant_id_foreign` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table larareactecom.variant_options: ~4 rows (approximately)
/*!40000 ALTER TABLE `variant_options` DISABLE KEYS */;
INSERT INTO `variant_options` (`id`, `product_id`, `variant_id`, `term_id`, `created_at`, `updated_at`) VALUES
	(90, 4, 46, 1, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(91, 4, 47, 3, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(92, 4, 47, 4, '2022-11-21 13:56:20', '2022-11-21 13:56:20'),
	(93, 4, 46, 2, '2022-11-21 13:56:20', '2022-11-21 13:56:20');
/*!40000 ALTER TABLE `variant_options` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
