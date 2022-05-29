-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20220525.c1e393abce
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2022 at 10:32 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `group_id`, `user_id`) VALUES
(1, 1, 1),
(9, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `group_id`, `amount`, `description`) VALUES
(1, 1, '50', 'alelis'),
(2, 2, '30', 'tickets'),
(3, 3, '80', 'whiskey'),
(5, 2, '300', 'b*tches'),
(6, 1, '400', 'Trip to Barcelona'),
(24, 2, '800', 'Trip to Vienna'),
(26, 2, '455', 'Trip to Ingolstad'),
(27, 2, '3', 'ice cream'),
(28, 2, '147', 'Dinner'),
(29, 2, '155', 'Cigaretes'),
(30, 1, '227', 'Earphones');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'Trip to Spain'),
(2, 'Going to Alps'),
(3, 'Dinner in Belgium'),
(4, 'Trip to Finland'),
(5, 'New Years Party'),
(11, 'Kelione i Siaulius'),
(12, 'Kelione i Zakopane'),
(13, 'Dovana Albertui');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `reg_timestamp`) VALUES
(1, 'Dzimbo', 'labas@krabas.lt', '$2a$10$NVNdUsi4vLWP4W3jEilnHO8tBeiaNbQ7bXcoIOf3SMGVPqdJrNAoK', '2022-05-26 13:03:33'),
(2, 'Dzeus', 'labas@du.lt', '$2a$10$t72xodaSRzoq86yF/5Mwnuwy4xmbi5MWCtdpHr.sUSOuCKa4N.vUy', '2022-05-27 15:18:03'),
(3, 'Spygom', 'laikom@spygas.lt', '$2a$10$yD.05MFkyBAlhfG7DxW5dOnWgQXOt0d3W5MvvfNNbHHyLr.XDGPU2', '2022-05-27 15:32:26'),
(12, 'Kedas', 'kedas@kedas.lt', '$2a$10$u7Al3gUM1EcAe370/JqsBOrwV1pJf9IG.Bcj2akQHcnEg5lgfeAoW', '2022-05-28 07:57:08'),
(13, 'Lygintuvas', 'lygis@lygis.lt', '$2a$10$nXA.tW.JBRz6iafNa0Ekpu50jDvz3mGQ8RQRySLIrVFEpfTmXWMaa', '2022-05-28 07:59:25'),
(14, 'Agurkas', 'agurkas@agurkas.lt', '$2a$10$sgWVIh6.FpAOL2xzhAClRurIgMBGeL4ol20iTJmzq.oNNSf6AlcfO', '2022-05-28 08:02:08'),
(15, 'As Esu', 'mantas@mantas.lt', '$2a$10$jtJx0iraINMnmmlkhOMj8eYDFdYXtnnsiHQAuwMJWCemdZCt5v0lm', '2022-05-29 10:31:40'),
(16, 'Krepsinis', 'ball@ball.lt', '$2a$10$x0XUFzadi7m8e.yYzi7fRuYfskjRsRBCuLvtInQ1S/lTTHiMT8tOq', '2022-05-29 15:58:28'),
(17, 'Lygintuvas', 'steal@steal.lt', '$2a$10$kezckX5CqiTyGgPiLorpmebJbJyxLaH2KR1zCHnrGcAE9DoE0QJ1u', '2022-05-29 16:00:25'),
(18, 'Agurkas Eas', 'jesfdfs@bond.com', '$2a$10$sLbOo72DeIagR7rljZ3mK.e1q.MWsHDT7GYHCw9MR5Dqf8mTvGn36', '2022-05-29 20:22:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



