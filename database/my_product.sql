-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2022 at 07:35 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_product`
--

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `gender_id` int(11) NOT NULL,
  `gender_name` enum('Men','Women') NOT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` (`gender_id`, `gender_name`, `id`) VALUES
(1, 'Men', 1),
(2, 'Men', 2),
(3, 'Men', 3),
(4, 'Men', 4),
(5, 'Men', 5),
(6, 'Women', 6),
(7, 'Women', 7),
(8, 'Women', 8),
(9, 'Women', 9),
(10, 'Women', 10),
(11, 'Men', 11),
(12, 'Men', 12),
(13, 'Men', 13),
(14, 'Men', 14),
(15, 'Men', 15),
(16, 'Women', 16),
(17, 'Women', 17),
(18, 'Women', 18),
(19, 'Women', 19),
(20, 'Women', 20),
(21, 'Men', 21),
(22, 'Men', 22),
(23, 'Men', 23),
(24, 'Men', 24),
(25, 'Men', 25),
(26, 'Women', 26),
(27, 'Women', 27),
(28, 'Women', 28),
(29, 'Women', 29),
(30, 'Women', 30);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `price` decimal(18,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `price`) VALUES
(1, '400.000'),
(2, '400.000'),
(3, '420.000'),
(4, '430.000'),
(5, '450.000'),
(6, '290.000'),
(7, '290.000'),
(8, '290.000'),
(9, '320.000'),
(10, '320.000'),
(11, '450.000'),
(12, '450.000'),
(13, '480.000'),
(14, '500.000'),
(15, '500.000'),
(16, '400.000'),
(17, '400.000'),
(18, '420.000'),
(19, '450.000'),
(20, '450.000'),
(21, '500.000'),
(22, '500.000'),
(23, '550.000'),
(24, '600.000'),
(25, '600.000'),
(26, '500.000'),
(27, '500.000'),
(28, '550.000'),
(29, '600.000'),
(30, '600.000');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order`
--

CREATE TABLE `purchase_order` (
  `OrderID` int(11) NOT NULL,
  `products_id` varchar(2000) NOT NULL,
  `status` varchar(255) NOT NULL,
  `sum` decimal(18,3) NOT NULL,
  `address` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `purchase_order`
--

INSERT INTO `purchase_order` (`OrderID`, `products_id`, `status`, `sum`, `address`) VALUES
(1, '5,8', 'pending', '740.000', 'abcd'),
(2, '5', 'pending', '450.000', 'aaaa'),
(3, '5,19', 'pending', '900.000', 'abcd'),
(4, '4,29', 'pending', '1030.000', 'gogowa '),
(5, '6,18', 'pending', '710.000', 'aaaa'),
(6, '6,29', 'pending', '890.000', 'abcd'),
(7, '26,23', 'pending', '1050.000', 'abc'),
(8, '7,9', 'pending', '610.000', 'abcd'),
(9, '6,7', 'pending', '580.000', 'abcd'),
(10, '6,9', 'pending', '610.000', 'aaa'),
(11, '1,27', 'pending', '900.000', 'aaaa');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `size_id` int(11) NOT NULL,
  `size_name` enum('XS','S','M','L','XL') NOT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`size_id`, `size_name`, `id`) VALUES
(1, 'XS', 1),
(2, 'S', 2),
(3, 'M', 3),
(4, 'L', 4),
(5, 'XL', 5),
(6, 'XS', 6),
(7, 'S', 7),
(8, 'M', 8),
(9, 'L', 9),
(10, 'XL', 10),
(11, 'XS', 11),
(12, 'S', 12),
(13, 'M', 13),
(14, 'L', 14),
(15, 'XL', 15),
(16, 'XS', 16),
(17, 'S', 17),
(18, 'M', 18),
(19, 'L', 19),
(20, 'XL', 20),
(21, 'XS', 21),
(22, 'S', 22),
(23, 'M', 23),
(24, 'L', 24),
(25, 'XL', 25),
(26, 'XS', 26),
(27, 'S', 27),
(28, 'M', 28),
(29, 'L', 29),
(30, 'XL', 30);

-- --------------------------------------------------------

--
-- Table structure for table `style`
--

CREATE TABLE `style` (
  `style_id` int(11) NOT NULL,
  `style_name` varchar(255) NOT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `style`
--

INSERT INTO `style` (`style_id`, `style_name`, `id`) VALUES
(1, 'Plain color', 1),
(2, 'Plain color', 2),
(3, 'Plain color', 3),
(4, 'Plain color', 4),
(5, 'Plain color', 5),
(6, 'Plain color', 6),
(7, 'Plain color', 7),
(8, 'Plain color', 8),
(9, 'Plain color', 9),
(10, 'Plain color', 10),
(11, 'Pattern', 11),
(12, 'Pattern', 12),
(13, 'Pattern', 13),
(14, 'Pattern', 14),
(15, 'Pattern', 15),
(16, 'Pattern', 16),
(17, 'Pattern', 17),
(18, 'Pattern', 18),
(19, 'Pattern', 19),
(20, 'Pattern', 20),
(21, 'Figure', 21),
(22, 'Figure', 22),
(23, 'Figure', 23),
(24, 'Figure', 24),
(25, 'Figure', 25),
(26, 'Figure', 26),
(27, 'Figure', 27),
(28, 'Figure', 28),
(29, 'Figure', 29),
(30, 'Figure', 30);

-- --------------------------------------------------------

--
-- Table structure for table `substyle`
--

CREATE TABLE `substyle` (
  `sub_id` int(11) NOT NULL,
  `sub_name` varchar(255) NOT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `substyle`
--

INSERT INTO `substyle` (`sub_id`, `sub_name`, `id`) VALUES
(1, 'Black', 1),
(2, 'Black', 2),
(3, 'Black', 3),
(4, 'Black', 4),
(5, 'Black', 5),
(6, 'White', 6),
(7, 'White', 7),
(8, 'White', 8),
(9, 'White', 9),
(10, 'White', 10),
(11, 'Gingham', 11),
(12, 'Gingham', 12),
(13, 'Gingham', 13),
(14, 'Gingham', 14),
(15, 'Gingham', 15),
(16, 'Floral', 16),
(17, 'Floral', 17),
(18, 'Floral', 18),
(19, 'Floral', 19),
(20, 'Floral', 20),
(21, 'Batman', 21),
(22, 'Batman', 22),
(23, 'Batman', 23),
(24, 'Batman', 24),
(25, 'Batman', 25),
(26, 'Gogowa', 26),
(27, 'Gogowa', 27),
(28, 'Gogowa', 28),
(29, 'Gogowa', 29),
(30, 'Gogowa', 30);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`gender_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD PRIMARY KEY (`OrderID`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `style`
--
ALTER TABLE `style`
  ADD PRIMARY KEY (`style_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `substyle`
--
ALTER TABLE `substyle`
  ADD PRIMARY KEY (`sub_id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `purchase_order`
--
ALTER TABLE `purchase_order`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `substyle`
--
ALTER TABLE `substyle`
  MODIFY `sub_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gender`
--
ALTER TABLE `gender`
  ADD CONSTRAINT `gender_ibfk_1` FOREIGN KEY (`id`) REFERENCES `product` (`id`);

--
-- Constraints for table `size`
--
ALTER TABLE `size`
  ADD CONSTRAINT `size_ibfk_1` FOREIGN KEY (`id`) REFERENCES `product` (`id`);

--
-- Constraints for table `style`
--
ALTER TABLE `style`
  ADD CONSTRAINT `style_ibfk_1` FOREIGN KEY (`id`) REFERENCES `product` (`id`);

--
-- Constraints for table `substyle`
--
ALTER TABLE `substyle`
  ADD CONSTRAINT `substyle_ibfk_1` FOREIGN KEY (`id`) REFERENCES `style` (`style_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
