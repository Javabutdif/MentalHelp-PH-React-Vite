-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2024 at 09:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mentalhelpph`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_email` varchar(50) NOT NULL,
  `admin_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(3, 'Anton James J. Genabio', 'jamesgenabio@yahoo.com', '$2a$10$8vQALRivTyMs7dAVdZxva.w1dpKVAeHFOUtB8IK8L7/bND8Ok1vmW'),
(4, 'Lala', 'ailah@gmail.com', '$2a$10$nidQH9Lny8LPG5XUvGfam.mhxTkTyUditph8PsH8DuS5YieD./kui'),
(5, 'Diones Louisi Nipayas', 'dione@gmail.com', '$2a$10$1D5ZksP2hK1HLtiydxCkPe0EboFsHmyJ4aOiQbfF7LBAr8XWZ3O1i');

-- --------------------------------------------------------

--
-- Table structure for table `matching`
--

CREATE TABLE `matching` (
  `match_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `match_date` date NOT NULL,
  `match_status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matching`
--

INSERT INTO `matching` (`match_id`, `patient_id`, `professional_id`, `match_date`, `match_status`) VALUES
(1, 12, 1, '2024-10-20', 'Pending'),
(3, 12, 1, '2024-10-20', 'Pending'),
(5, 12, 1, '2024-10-21', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `mental_health_professionals`
--

CREATE TABLE `mental_health_professionals` (
  `professional_id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `passwords` varchar(255) NOT NULL,
  `license` varchar(20) NOT NULL,
  `experience` int(11) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `bio` text NOT NULL,
  `comments` text NOT NULL,
  `ratings` int(11) NOT NULL,
  `documents` varchar(200) NOT NULL,
  `professional_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mental_health_professionals`
--

INSERT INTO `mental_health_professionals` (`professional_id`, `firstname`, `lastname`, `email`, `contact_number`, `type`, `passwords`, `license`, `experience`, `photo`, `bio`, `comments`, `ratings`, `documents`, `professional_status`) VALUES
(1, 'Anton James', 'Genabio', 'jamesgenabio31@gmail.com', '090830958900', 'Psychologist', '$2y$10$KL4H5mBihZsgSryOErH.RO9mAh0YT8q9FmMVZcS8mLJ0hr7clxNpq', '900900', 2, 'http://localhost:3000/profile/1729451256002.png', 'I love ice creams', '', 0, '', 'Accepted'),
(22, 'Ayla', 'Berds', 'jamesgenabio90@gmail.com', '09083095890', 'Psychiatrist', '$2a$10$InERmO1GAGi3EJJ4fod71eNRWz/ukBZ2Nb4d/B43MVlUjsFkTxmXS', '123', 3, '', '', '', 0, 'uploads\\1729152393101.pdf', 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `mental_health_professional_preference`
--

CREATE TABLE `mental_health_professional_preference` (
  `professional_id` int(11) NOT NULL,
  `start_age` int(11) NOT NULL,
  `end_age` int(11) NOT NULL,
  `mental_issue` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mental_health_professional_preference`
--

INSERT INTO `mental_health_professional_preference` (`professional_id`, `start_age`, `end_age`, `mental_issue`, `gender`) VALUES
(1, 22, 40, 'depression, anxiety', ''),
(22, 20, 25, 'depression, anxiety', '');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `passwords` varchar(255) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `bio` text NOT NULL,
  `photo` varchar(100) NOT NULL,
  `addresses` varchar(100) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `patient_status` varchar(100) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `account_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `email`, `passwords`, `firstname`, `lastname`, `bio`, `photo`, `addresses`, `gender`, `age`, `patient_status`, `contact_number`, `account_status`) VALUES
(12, 'jims@gmail.com', '$2a$10$tDXW2toIoMlHA64wLnDr/OsFIeXXZyoia5ZIEwfUDvf.07b3ebyLq', 'James', 'Genabio', '', 'http://localhost:3000/profile/1729451195051.jfif', 'Purok', 'Male', 24, 'Married', '09083095890', 'Active'),
(13, 'dione31@gmail.com', '$2a$10$nNPOzkbs3CUwxhkoZ3YILuBl3Z1BwdnSez02XcoqfPiuBbMwB5hvO', 'Dione', 'Louis', '', '', 'Purok Day Care', 'Male', 0, 'Married', '2312313', 'Delete'),
(17, 'ayla@gmail.com', '$2a$10$Y31dqqi.EBoMxSXKq72SqORzWsgGIWnzWv7kLEhypHEaD8KezVPbm', 'Ailah', 'Berdida', 'I lodfdfsdfsdf', '', 'Lapu - Lapu Cebu City', 'Female', 22, 'Single', '09083095890', 'Active'),
(18, 'ailah.berdida34@gmail.com', '$2a$10$rRo0cr0uA5XZzgkhzCWRzujmo3K3G6T4ZsWKsj.31v6emzRT/fUL.', 'ailah', 'berdidas', '', '', 'taga amo ra', 'gey', -1, 'Prefer not to say', '12345', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `patient_details`
--

CREATE TABLE `patient_details` (
  `patient_id` int(11) NOT NULL,
  `mental_issues` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_details`
--

INSERT INTO `patient_details` (`patient_id`, `mental_issues`, `age`, `gender`) VALUES
(12, 'depression, anxiety', 24, ''),
(12, 'depression, anxiety', 24, ''),
(12, 'depression, anxiety', 24, ''),
(12, 'depression, anxiety', 24, ''),
(12, 'depression, anxiety', 24, ''),
(12, 'depression, anxiety', 24, ''),
(12, 'depression, anxiety', 24, ''),
(12, 'depression, anxiety', 24, ''),
(12, 'depression', 24, ''),
(12, 'anxiety', 24, ''),
(12, 'depression', 24, ''),
(12, 'depression', 24, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `matching`
--
ALTER TABLE `matching`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `professional_id` (`professional_id`);

--
-- Indexes for table `mental_health_professionals`
--
ALTER TABLE `mental_health_professionals`
  ADD PRIMARY KEY (`professional_id`);

--
-- Indexes for table `mental_health_professional_preference`
--
ALTER TABLE `mental_health_professional_preference`
  ADD PRIMARY KEY (`professional_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `patient_details`
--
ALTER TABLE `patient_details`
  ADD KEY `patient_id` (`patient_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `matching`
--
ALTER TABLE `matching`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mental_health_professionals`
--
ALTER TABLE `mental_health_professionals`
  MODIFY `professional_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matching`
--
ALTER TABLE `matching`
  ADD CONSTRAINT `matching_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  ADD CONSTRAINT `matching_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`);

--
-- Constraints for table `mental_health_professional_preference`
--
ALTER TABLE `mental_health_professional_preference`
  ADD CONSTRAINT `mental_health_professional_preference_ibfk_1` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`);

--
-- Constraints for table `patient_details`
--
ALTER TABLE `patient_details`
  ADD CONSTRAINT `patient_details_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
