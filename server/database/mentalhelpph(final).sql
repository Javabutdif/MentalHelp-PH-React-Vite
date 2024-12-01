-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2024 at 09:08 PM
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
-- Table structure for table `diagnosis`
--

CREATE TABLE `diagnosis` (
  `diagnosis_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diagnosis`
--

INSERT INTO `diagnosis` (`diagnosis_id`, `patient_id`, `professional_id`, `schedule_id`, `description`, `date`) VALUES
(2, 12, 1, 11, 'Si dione pisot', '2024-12-02 01:21:38'),
(3, 12, 1, 11, 'dawddawd', '2024-12-02 01:41:49'),
(4, 12, 1, 11, 'pisot2 man', '2024-12-02 01:42:11'),
(5, 12, 1, 11, 'pisot2 man', '2024-12-02 01:42:15');

-- --------------------------------------------------------

--
-- Table structure for table `discussion`
--

CREATE TABLE `discussion` (
  `discussion_id` int(11) NOT NULL,
  `forum_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `isAnonymous` tinyint(1) NOT NULL,
  `msg_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discussion`
--

INSERT INTO `discussion` (`discussion_id`, `forum_id`, `patient_id`, `message`, `isAnonymous`, `msg_datetime`) VALUES
(28, 1, 12, 'Helloooo', 0, '2024-11-08 02:31:49'),
(33, 4, 12, 'fghjkl;', 1, '2024-11-15 12:52:02'),
(34, 4, 12, 'dadad', 0, '2024-11-15 12:52:09'),
(35, 5, 20, 'Huhuhuhuhu', 0, '2024-11-15 15:20:03');

-- --------------------------------------------------------

--
-- Table structure for table `experience_patient`
--

CREATE TABLE `experience_patient` (
  `experience_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `experience_patient`
--

INSERT INTO `experience_patient` (`experience_id`, `patient_id`, `rating`, `date`) VALUES
(1, 12, 5, '2024-11-15 01:23:28'),
(2, 22, 5, '2024-11-24 21:02:41'),
(3, 12, 5, '2024-11-26 23:10:10'),
(4, 12, 5, '2024-11-26 23:15:37'),
(5, 12, 5, '2024-11-27 01:38:46');

-- --------------------------------------------------------

--
-- Table structure for table `experience_professional`
--

CREATE TABLE `experience_professional` (
  `experience_id` int(11) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `experience_professional`
--

INSERT INTO `experience_professional` (`experience_id`, `professional_id`, `rating`, `date`) VALUES
(1, 1, 4, '2024-11-15 01:18:54'),
(2, 28, 5, '2024-11-24 21:03:46');

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `forum_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forum`
--

INSERT INTO `forum` (`forum_id`, `title`, `description`, `created_date`) VALUES
(1, 'Black Lives Matters', 'Where black lives matter', '2024-10-27 02:08:32'),
(4, 'sdfghjkl;', 'ghjkl', '2024-11-15 12:51:54'),
(5, 'Diyownsss', 'Break it down', '2024-11-15 15:19:55'),
(6, 'Black Lives Matter', 'adawd', '2024-11-15 16:15:15'),
(7, 'dawd', 'da', '2024-11-18 15:40:14');

-- --------------------------------------------------------

--
-- Table structure for table `matching`
--

CREATE TABLE `matching` (
  `match_id` int(11) NOT NULL,
  `patient_details_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `match_date` date NOT NULL,
  `match_status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matching`
--

INSERT INTO `matching` (`match_id`, `patient_details_id`, `patient_id`, `professional_id`, `match_date`, `match_status`) VALUES
(29, 19, 12, 22, '2024-11-24', 'Accept'),
(31, 21, 12, 26, '2024-11-24', 'Accept'),
(32, 22, 22, 22, '2024-11-24', 'Pending'),
(34, 24, 12, 1, '2024-11-27', 'Accept'),
(35, 25, 12, 1, '2024-11-28', 'Accept');

-- --------------------------------------------------------

--
-- Table structure for table `mental_health_professionals`
--

CREATE TABLE `mental_health_professionals` (
  `professional_id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `professional_address` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `specialization` varchar(20) NOT NULL,
  `passwords` varchar(255) NOT NULL,
  `license` varchar(20) NOT NULL,
  `experience` int(11) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `bio` text NOT NULL,
  `comments` text NOT NULL,
  `ratings` int(11) NOT NULL,
  `documents` varchar(200) NOT NULL,
  `professional_status` varchar(20) NOT NULL,
  `service_fee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mental_health_professionals`
--

INSERT INTO `mental_health_professionals` (`professional_id`, `firstname`, `lastname`, `professional_address`, `email`, `contact_number`, `type`, `specialization`, `passwords`, `license`, `experience`, `photo`, `bio`, `comments`, `ratings`, `documents`, `professional_status`, `service_fee`) VALUES
(1, 'Anton James', 'Genabio', '', 'jamesgenabio31@gmail.com', '090830958900', 'Psychologist', 'Social', '$2y$10$KL4H5mBihZsgSryOErH.RO9mAh0YT8q9FmMVZcS8mLJ0hr7clxNpq', '900900', 2, 'http://localhost:3000/profile/1729451256002.png', 'I love ', '', 0, '', 'Accepted', 3500),
(22, 'Ayla', 'Berds', '', 'jamesgenabio90@gmail.com', '09083095890', 'Psychologist', '', '$2a$10$InERmO1GAGi3EJJ4fod71eNRWz/ukBZ2Nb4d/B43MVlUjsFkTxmXS', '123', 3, 'http://localhost:3000/profile/1729452377862.jpg', 'dawdawdawda', '', 0, 'uploads\\1729152393101.pdf', 'Accepted', 900),
(24, 'Ayala', 'Berdida', '', 'ailah.berdida34@gmail.com', '123123', 'Psychiatrist', '', '$2a$10$elCOuwvIqk90G2LfBN4XFuBCpwvVmZ3drevZLtENzKQzs7h6LCZy.', '123123', 1, '', '', '', 0, 'uploads\\1729783389117.txt', 'Accepted', 1000),
(25, 'Dione', 'Nipaya', '', 'louisnipaya2@gmail.com', '12312312', 'Psychologist', '', '$2a$10$Z1WPjAAmMLFmlnTO3rQ7u.A7ADQx6aat5rRJsq8q4b21BC8L4q78S', '123123', 2, '', '', '', 0, 'uploads\\1729783715454.txt', 'Accepted', 2000),
(26, 'Dioneng', 'Nipayat', 'Balamban, Cebu City', 'mrdioneng@gmail.com', '09633821765', 'Psychologist', '', '$2a$10$DCtUdLT7hVCYBVag.9WX9OKEvWa50lw0dI2PV1MTiLSLN/XRtlR3C', '123123', 3, 'http://localhost:3000/profile/1731655973693.jpg', '', '', 0, 'uploads\\1731655741717.jpg', 'Accepted', 900),
(27, 'Rennel', 'Bird', 'AWDAWDAWD', 'rennel@gmail.com', '123123', 'Psychologist', '', '$2a$10$I.JIC28eYuKWd.qBZpYoEuxdUe8lPzRSupi3CLTcxtWqrlu7cuMhO', '231323123123', 4, '', '', '', 0, 'uploads\\1732441352678.jpg', 'Accepted', 1000),
(28, 'Dionesss', 'Nipayattt', '', 'dione13@gmail.com', '12312313', 'Psychologist', '', '$2a$10$3wyMPEIQLsZju/IAoT8IqeRZJpD4WkZQ1cAtXyYP/tpw6ff6gJjpW', '231312323', 2, 'http://localhost:3000/profile/1732452446036.jpg', 'I love 6 years old by dione', '', 0, '', 'Accepted', 2000),
(29, 'Dionesss', 'Nipayattt', 'dawda', 'jims1@gmail.com', '123', 'Psychiatrist', 'Child and adolescent', '$2a$10$f5WtT6J6HWaQshEQQNzBfOFC1p0bgI/eGJHTOfNzDds9zAKRhAal2', '123', 2, '', '', '', 0, '', 'Pending', 0),
(30, 'dawd', 'dawd', 'dawd', 'ada@gmail.com', '12313', 'Psychologist', 'Social', '$2a$10$mZmN9IC3NOR25avFsajYmeeu6LuMzkZrb1K0KxukNNJDo3T0ztGbO', '3123', 2, '', '', '', 0, 'uploads\\1733083499310.jpg', 'Pending', 0);

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
(1, 18, 25, 'depression, anxiety, stress', ''),
(22, 18, 25, 'depression, anxiety, stress', ''),
(26, 18, 25, 'depression, anxiety', ''),
(28, 18, 25, 'depression, anxiety, stress', '');

-- --------------------------------------------------------

--
-- Table structure for table `messaging`
--

CREATE TABLE `messaging` (
  `messaging_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `message_content` varchar(255) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `message_date` datetime NOT NULL,
  `sender` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messaging`
--

INSERT INTO `messaging` (`messaging_id`, `patient_id`, `professional_id`, `message_content`, `schedule_id`, `message_date`, `sender`) VALUES
(48, 12, 22, 'Hello wanaa start session?\n', 8, '2024-11-26 21:21:22', 22),
(49, 12, 22, 'dawd', 8, '2024-11-26 21:21:37', 22),
(50, 12, 22, 'Session Started!', 8, '2024-11-26 21:21:41', 22),
(51, 12, 22, 'Session Ended!', 8, '2024-11-26 21:21:44', 22),
(52, 12, 22, 'Session Ended!', 8, '2024-11-26 21:21:44', 22),
(53, 12, 22, 'Session Ended!', 8, '2024-11-26 21:23:00', 22),
(54, 12, 22, 'Session Started!', 8, '2024-11-26 21:23:54', 22),
(55, 12, 22, 'Session Ended!', 8, '2024-11-26 21:23:57', 22),
(56, 12, 22, 'Session Started!', 8, '2024-11-26 21:24:34', 22),
(57, 12, 22, 'Session Ended!', 8, '2024-11-26 21:24:36', 22),
(58, 12, 22, 'Session Started!', 8, '2024-11-26 21:25:38', 22),
(59, 12, 22, 'Session Ended!', 8, '2024-11-26 21:25:46', 22),
(60, 12, 22, 'Session Started!', 8, '2024-11-26 21:26:05', 22),
(61, 12, 22, 'Session Ended!', 8, '2024-11-26 21:26:09', 22),
(62, 12, 22, 'adadawd', 8, '2024-11-26 21:26:18', 22),
(63, 12, 22, '/transaction.jpg', 8, '2024-11-26 21:26:22', 22),
(64, 12, 22, 'The total cost will be ₱960', 8, '2024-11-26 21:26:22', 22),
(65, 12, 22, 'Session Started!', 8, '2024-11-26 21:26:43', 22),
(66, 12, 22, 'Session Ended!', 8, '2024-11-26 21:26:48', 22),
(67, 12, 22, 'Session Started!', 8, '2024-11-26 21:31:49', 22),
(68, 12, 22, 'Session Ended!', 8, '2024-11-26 21:31:53', 22),
(69, 12, 22, '/transaction.jpg', 8, '2024-11-26 22:33:37', 22),
(70, 12, 22, 'The total cost will be ₱960', 8, '2024-11-26 22:33:37', 22),
(71, 12, 22, 'Session Started!', 8, '2024-11-26 23:45:35', 22),
(72, 12, 22, 'Session Ended!', 8, '2024-11-26 23:45:38', 22),
(73, 12, 22, '/transaction.jpg', 8, '2024-11-27 01:27:57', 22),
(74, 12, 22, 'The total cost will be ₱960', 8, '2024-11-27 01:27:57', 22),
(75, 12, 22, 'Session Started!', 8, '2024-11-27 01:35:00', 22),
(76, 12, 22, 'Session Ended!', 8, '2024-11-27 01:35:04', 22),
(77, 12, 1, 'Hello', 10, '2024-11-27 01:56:08', 12),
(78, 12, 1, 'Hello\n', 10, '2024-11-27 01:57:00', 1),
(79, 12, 1, 'd', 10, '2024-11-27 01:57:37', 1),
(80, 12, 1, 'Session Started!', 10, '2024-11-27 01:58:26', 1),
(81, 12, 1, 'So it will be you chuchu\n', 10, '2024-11-27 01:58:37', 1),
(82, 12, 1, 'https://meet.google.com/adb-dhvj-jfa', 10, '2024-11-27 01:59:03', 1),
(83, 12, 1, '/transaction.jpg', 10, '2024-11-27 01:59:30', 1),
(84, 12, 1, 'The total cost will be ₱3560', 10, '2024-11-27 01:59:31', 1),
(85, 12, 1, '', 10, '2024-11-27 02:05:56', 12),
(86, 12, 1, '/transaction.jpg', 10, '2024-11-28 00:16:52', 1),
(87, 12, 1, 'The total cost will be ₱3560', 10, '2024-11-28 00:16:52', 1),
(88, 12, 1, 'Session Ended!', 10, '2024-11-28 00:16:56', 1),
(89, 12, 1, 'Session Started!', 11, '2024-11-28 01:00:17', 1),
(90, 12, 1, '/transaction.jpg', 11, '2024-11-28 01:09:22', 1),
(91, 12, 1, 'The total cost will be ₱3560', 11, '2024-11-28 01:09:23', 1),
(92, 12, 1, '', 11, '2024-12-02 00:17:21', 1),
(93, 12, 1, '', 11, '2024-12-02 00:19:56', 1),
(94, 12, 1, '', 11, '2024-12-02 00:27:51', 1),
(95, 12, 1, '', 11, '2024-12-02 00:28:41', 1),
(96, 12, 1, 'C:\\Users\\james\\OneDrive\\Desktop\\MentalHelpPh\\server\\routes\\prescription\\1733070656229-546738837-savory.jpg', 11, '2024-12-02 00:30:56', 1),
(97, 12, 1, 'C:\\Users\\james\\OneDrive\\Desktop\\MentalHelpPh\\server\\routes\\prescription\\1733071383794-61456980-jude.jpg', 11, '2024-12-02 00:43:03', 1),
(98, 12, 1, 'http://localhost:3000/prescription/1733071881171-685518214-jude.jpg', 11, '2024-12-02 00:51:21', 1),
(99, 12, 1, 'https://meet.google.com/zbw-czqf-shj', 11, '2024-12-02 00:55:09', 1),
(100, 12, 1, 'http://localhost:3000/prescription/1733072130573-513312674-savory.jpg', 11, '2024-12-02 00:55:30', 1),
(101, 12, 1, 'hello\r\n', 11, '2024-12-02 00:59:39', 12),
(102, 12, 1, '', 11, '2024-12-02 00:59:47', 12),
(103, 12, 1, '', 11, '2024-12-02 01:00:44', 12),
(104, 12, 1, 'http://localhost:3000/prescription/1733072485834-694475242-jude.jpg', 11, '2024-12-02 01:01:25', 12);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `notification_title` varchar(100) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `notification_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notification_id`, `notification_title`, `patient_id`, `message`, `notification_date`) VALUES
(24, 'Match Notice', 12, 'Request match successful', '2024-11-24 17:44:53'),
(25, 'Match Notice', 12, 'Request match successful', '2024-11-24 17:45:52'),
(26, 'Match Notice', 12, 'Request match successful', '2024-11-24 20:09:31'),
(27, 'Appointment Notice', 12, 'Dr. Ayla Berds has accepted your request. The scheduled time is 20:12 on 2024-11-24.', '2024-11-24 20:11:06'),
(28, 'Match Notice', 22, 'Request match successful', '2024-11-24 20:55:57'),
(29, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-24 20:57:38'),
(30, 'Match Notice', 12, 'Request match successful', '2024-11-25 03:04:03'),
(31, 'Request Cancelled', 12, 'dawda', '2024-11-25 03:16:04'),
(32, 'Appointment Notice', 12, 'Dr. Dioneng Nipayat has accepted your request. The scheduled time is 04:17 on 2024-11-26.', '2024-11-25 03:17:59'),
(33, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 00:41:16'),
(34, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 00:48:29'),
(35, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 00:55:27'),
(36, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 00:58:51'),
(37, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 09:41:43'),
(38, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 10:08:38'),
(39, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 10:19:28'),
(40, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 10:19:28'),
(41, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 10:21:00'),
(42, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 10:21:00'),
(43, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 10:27:04'),
(44, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 11:02:54'),
(45, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 20:17:08'),
(46, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 20:18:11'),
(47, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 20:20:30'),
(48, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 20:21:28'),
(49, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 20:41:04'),
(50, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 20:44:47'),
(51, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 20:46:06'),
(52, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 20:49:39'),
(53, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:11:15'),
(54, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:14:00'),
(55, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:14:00'),
(56, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:14:13'),
(57, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:14:13'),
(58, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:14:54'),
(59, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:14:54'),
(60, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:15:22'),
(61, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:15:23'),
(62, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:21:22'),
(63, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:21:37'),
(64, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:21:41'),
(65, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:21:44'),
(66, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:21:44'),
(67, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:23:00'),
(68, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:23:54'),
(69, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:23:57'),
(70, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:24:34'),
(71, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:24:36'),
(72, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:25:38'),
(73, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:25:46'),
(74, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:26:05'),
(75, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:26:09'),
(76, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:26:18'),
(77, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:26:22'),
(78, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:26:22'),
(79, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:26:43'),
(80, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:26:48'),
(81, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:31:49'),
(82, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 21:31:53'),
(83, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 22:33:37'),
(84, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 22:33:38'),
(85, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 23:45:35'),
(86, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-26 23:45:38'),
(87, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-27 01:27:57'),
(88, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-27 01:27:58'),
(89, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-27 01:35:00'),
(90, 'Message Notification', 12, 'Ayla Berds has messaged you', '2024-11-27 01:35:04'),
(91, 'Match Notice', 12, 'Request match successful', '2024-11-27 01:53:35'),
(92, 'Appointment Notice', 12, 'Dr. Anton James Genabio has accepted your request. The scheduled time is 01:55 on 2024-11-27.', '2024-11-27 01:54:24'),
(93, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-27 01:57:00'),
(94, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-27 01:57:37'),
(95, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-27 01:58:27'),
(96, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-27 01:58:37'),
(97, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-27 01:59:04'),
(98, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-27 01:59:30'),
(99, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-27 01:59:31'),
(100, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-28 00:16:52'),
(101, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-28 00:16:52'),
(102, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-28 00:16:56'),
(103, 'Match Notice', 12, 'Request match successful', '2024-11-28 00:45:10'),
(104, 'Appointment Notice', 12, 'Dr. Anton James Genabio has accepted your request. The scheduled time is 00:47 on 2024-11-28.', '2024-11-28 00:45:31'),
(105, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-28 01:00:17'),
(106, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-28 01:09:23'),
(107, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-28 01:09:23'),
(108, 'Report Professional', 12, 'Successfully reported the professional', '2024-12-01 14:27:20'),
(109, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-12-02 00:17:21'),
(110, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-12-02 00:19:56'),
(111, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-12-02 00:27:52'),
(112, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-12-02 00:28:41'),
(113, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-12-02 00:30:56'),
(114, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-12-02 00:43:03'),
(115, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-12-02 00:51:21'),
(116, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-12-02 00:55:09'),
(117, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-12-02 00:55:30'),
(118, 'Report Professional', 12, 'Successfully reported the professional', '2024-12-02 02:12:10');

-- --------------------------------------------------------

--
-- Table structure for table `notification_professional`
--

CREATE TABLE `notification_professional` (
  `notification_id` int(11) NOT NULL,
  `notification_title` varchar(100) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `notification_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notification_professional`
--

INSERT INTO `notification_professional` (`notification_id`, `notification_title`, `professional_id`, `message`, `notification_date`) VALUES
(19, 'Matching Alert', 22, 'A patient has submitted a request', '2024-11-24 17:44:53'),
(20, 'Matching Alert', 1, 'A patient has submitted a request', '2024-11-24 17:45:52'),
(21, 'Matching Alert', 26, 'A patient has submitted a request', '2024-11-24 20:09:31'),
(22, 'Message Notification', 22, 'James Genabio has messaged you', '2024-11-24 20:12:39'),
(23, 'Message Notification', 22, 'James Genabio has messaged you', '2024-11-24 20:13:55'),
(24, 'Matching Alert', 22, 'A patient has submitted a request', '2024-11-24 20:55:57'),
(25, 'Matching Alert', 1, 'A patient has submitted a request', '2024-11-25 03:04:03'),
(26, 'Matching Alert', 1, 'A patient has submitted a request', '2024-11-27 01:53:35'),
(27, 'Message Notification', 1, 'James Genabio has messaged you', '2024-11-27 01:56:08'),
(28, 'Message Notification', 1, 'James Genabio has messaged you', '2024-11-27 02:05:56'),
(29, 'Matching Alert', 1, 'A patient has submitted a request', '2024-11-28 00:45:10'),
(30, 'Message Notification', 1, 'James Genabio has messaged you', '2024-12-02 00:59:39'),
(31, 'Message Notification', 1, 'James Genabio has messaged you', '2024-12-02 00:59:47'),
(32, 'Message Notification', 1, 'James Genabio has messaged you', '2024-12-02 01:00:44'),
(33, 'Message Notification', 1, 'James Genabio has messaged you', '2024-12-02 01:01:25');

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
(12, 'jims@gmail.com', '$2a$10$tDXW2toIoMlHA64wLnDr/OsFIeXXZyoia5ZIEwfUDvf.07b3ebyLq', 'James', 'Genabio', 'ice cream', 'http://localhost:3000/profile/1729451195051.jfif', 'Purok', 'Male', 22, 'Married', '09083095890', 'Active'),
(13, 'dione31@gmail.com', '$2a$10$nNPOzkbs3CUwxhkoZ3YILuBl3Z1BwdnSez02XcoqfPiuBbMwB5hvO', 'Dione', 'Louis', '', '', 'Purok Day Care', 'Male', 13, 'Married', '2312313', 'Active'),
(17, 'ayla@gmail.com', '$2a$10$Y31dqqi.EBoMxSXKq72SqORzWsgGIWnzWv7kLEhypHEaD8KezVPbm', 'Ailah', 'Berdida', 'I lodfdfsdfsdf', '', 'Lapu - Lapu Cebu City', 'Female', 22, 'Single', '09083095890', 'Active'),
(20, 'louisnipaya2@gmail.com', '$2a$10$I.YNM65a2Jvtn5jqmMQKJOCk6l.r.aEwgBZcepPAqiBqBbJsd7Jsa', 'Diyown', 'Luwis', '', '', 'louisnipaya2@gmai.com', 'Male', 21, 'Single', '09633821765', 'Active'),
(21, 'dione09366@gmail.com', '$2a$10$h5s4GGNorHpDQEJ9mWDIMeQ1ZD7B8pPbFSkgOcuWivcYGdux.UQ.y', 'Zeyown', 'Nips', '', '', 'Cebu City', 'Male', 21, 'Single', '09633821765', 'Active'),
(22, 'dione1@gmail.com', '$2a$10$MfaMEay3/ODOZNCqMDRjVO9zxNfTDLmQ9794hcwpWbldJDiz97ZNy', 'Dionesss', 'Nipayat', 'i love rennel bayot by dione', 'http://localhost:3000/profile/1732452207734.jpg', 'Iskina emall', 'Female', 24, 'Single', '123123123123', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `patient_details`
--

CREATE TABLE `patient_details` (
  `patient_details_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `mental_issues` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_details`
--

INSERT INTO `patient_details` (`patient_details_id`, `patient_id`, `mental_issues`, `age`, `description`) VALUES
(11, 12, 'anxiety, stress', 24, 'I have ice cream decease '),
(13, 12, 'depression, anxiety', 24, ''),
(14, 20, 'depression, anxiety', 21, 'asd'),
(15, 21, 'depression, anxiety, stress', 21, 'Broken Hearted'),
(16, 21, 'anxiety, stress', 21, ''),
(19, 12, 'depression, anxiety, stress', 22, ''),
(21, 12, 'depression, stress', 22, ''),
(22, 22, 'depression, anxiety, stress', 24, 'si rennle bayot'),
(24, 12, 'anxiety, stress', 22, ''),
(25, 12, 'anxiety, stress', 22, '');

-- --------------------------------------------------------

--
-- Table structure for table `professional_activity`
--

CREATE TABLE `professional_activity` (
  `activity_id` int(11) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `time_in` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `professional_activity`
--

INSERT INTO `professional_activity` (`activity_id`, `professional_id`, `time_in`, `date`) VALUES
(1, 1, '2024-11-14 09:42:28', '2024-11-15 01:42:28'),
(2, 1, '2024-11-14 20:49:07', '2024-11-15 12:49:07'),
(3, 1, '2024-11-14 20:53:31', '2024-11-15 12:53:31'),
(4, 1, '2024-11-14 21:50:24', '2024-11-15 13:50:24'),
(5, 1, '2024-11-14 22:50:06', '2024-11-15 14:50:06'),
(6, 1, '2024-11-14 23:15:37', '2024-11-15 15:15:37'),
(7, 26, '2024-11-14 23:32:12', '2024-11-15 15:32:12'),
(8, 1, '2024-11-14 23:35:11', '2024-11-15 15:35:11'),
(9, 1, '2024-11-15 00:04:19', '2024-11-15 16:04:19'),
(10, 26, '2024-11-15 00:10:03', '2024-11-15 16:10:03'),
(11, 1, '2024-11-23 20:22:19', '2024-11-24 12:22:19'),
(12, 1, '2024-11-24 01:48:25', '2024-11-24 17:48:25'),
(13, 1, '2024-11-24 02:09:03', '2024-11-24 18:09:03'),
(14, 1, '2024-11-24 04:10:09', '2024-11-24 20:10:09'),
(15, 22, '2024-11-24 04:10:35', '2024-11-24 20:10:35'),
(16, 22, '2024-11-24 04:13:19', '2024-11-24 20:13:19'),
(17, 28, '2024-11-24 04:45:48', '2024-11-24 20:45:48'),
(18, 22, '2024-11-24 04:48:25', '2024-11-24 20:48:25'),
(19, 22, '2024-11-24 04:56:50', '2024-11-24 20:56:50'),
(20, 28, '2024-11-24 05:03:16', '2024-11-24 21:03:16'),
(21, 1, '2024-11-24 11:03:41', '2024-11-25 03:03:41'),
(22, 1, '2024-11-24 11:04:09', '2024-11-25 03:04:09'),
(23, 28, '2024-11-24 11:16:48', '2024-11-25 03:16:48'),
(24, 26, '2024-11-24 11:17:44', '2024-11-25 03:17:44'),
(25, 26, '2024-11-24 11:53:30', '2024-11-25 03:53:30'),
(26, 1, '2024-11-25 04:02:24', '2024-11-25 20:02:24'),
(27, 22, '2024-11-25 07:33:22', '2024-11-25 23:33:22'),
(28, 1, '2024-11-25 08:57:07', '2024-11-26 00:57:07'),
(29, 22, '2024-11-25 08:57:17', '2024-11-26 00:57:17'),
(30, 1, '2024-11-25 17:32:53', '2024-11-26 09:32:53'),
(31, 22, '2024-11-25 17:33:05', '2024-11-26 09:33:05'),
(32, 1, '2024-11-25 18:17:51', '2024-11-26 10:17:51'),
(33, 22, '2024-11-25 18:18:10', '2024-11-26 10:18:10'),
(34, 1, '2024-11-26 03:53:47', '2024-11-26 19:53:47'),
(35, 22, '2024-11-26 03:53:53', '2024-11-26 19:53:53'),
(36, 1, '2024-11-26 05:05:50', '2024-11-26 21:05:50'),
(37, 22, '2024-11-26 05:05:56', '2024-11-26 21:05:56'),
(38, 22, '2024-11-26 06:33:28', '2024-11-26 22:33:28'),
(39, 22, '2024-11-26 07:45:28', '2024-11-26 23:45:28'),
(40, 1, '2024-11-26 09:26:54', '2024-11-27 01:26:54'),
(41, 22, '2024-11-26 09:27:12', '2024-11-27 01:27:12'),
(42, 22, '2024-11-26 09:29:17', '2024-11-27 01:29:17'),
(43, 22, '2024-11-26 09:34:48', '2024-11-27 01:34:48'),
(44, 1, '2024-11-26 09:54:11', '2024-11-27 01:54:11'),
(45, 1, '2024-11-26 09:56:15', '2024-11-27 01:56:15'),
(46, 1, '2024-11-27 08:12:22', '2024-11-28 00:12:22'),
(47, 1, '2024-11-27 08:45:18', '2024-11-28 00:45:18'),
(48, 1, '2024-11-27 08:53:30', '2024-11-28 00:53:30'),
(49, 1, '2024-11-27 08:59:51', '2024-11-28 00:59:51'),
(50, 1, '2024-11-27 09:09:18', '2024-11-28 01:09:18'),
(51, 1, '2024-11-30 22:29:56', '2024-12-01 14:29:56'),
(52, 1, '2024-11-30 22:30:28', '2024-12-01 14:30:28'),
(53, 1, '2024-12-01 07:33:57', '2024-12-01 23:33:57'),
(54, 1, '2024-12-01 08:27:34', '2024-12-02 00:27:34'),
(55, 1, '2024-12-01 09:18:59', '2024-12-02 01:18:59'),
(56, 1, '2024-12-01 09:38:22', '2024-12-02 01:38:22'),
(57, 22, '2024-12-01 10:12:15', '2024-12-02 02:12:15'),
(58, 1, '2024-12-01 11:54:03', '2024-12-02 03:54:03');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`report_id`, `patient_id`, `professional_id`, `session_id`, `reason`, `date`, `status`) VALUES
(4, 12, 22, 18, 'Too aggressive', '2024-12-01 14:27:20', 'Pending'),
(5, 12, 1, 20, 'dawd', '2024-12-02 02:12:10', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `schedule_date` date NOT NULL,
  `schedule_time` time NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `patient_id`, `professional_id`, `schedule_date`, `schedule_time`, `status`) VALUES
(8, 12, 22, '2024-11-24', '20:12:00', 'Complete'),
(9, 12, 26, '2024-11-26', '04:17:00', 'Change'),
(10, 12, 1, '2024-11-27', '01:55:00', 'Complete'),
(11, 12, 1, '2024-11-28', '00:51:00', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `session_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `professional_id` int(11) NOT NULL,
  `session_notes` varchar(255) NOT NULL,
  `session_start` datetime NOT NULL,
  `session_end` datetime NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`session_id`, `schedule_id`, `patient_id`, `professional_id`, `session_notes`, `session_start`, `session_end`, `status`) VALUES
(18, 8, 12, 22, '', '2024-11-26 23:45:35', '2024-11-27 01:35:03', 'Completed'),
(19, 8, 12, 22, '', '2024-11-27 01:35:00', '2024-11-27 01:35:03', 'Completed'),
(20, 10, 12, 1, '', '2024-11-27 01:58:27', '2024-11-28 00:16:56', 'Completed'),
(21, 11, 12, 1, '', '2024-11-28 01:00:17', '0000-00-00 00:00:00', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `user_activity`
--

CREATE TABLE `user_activity` (
  `activity_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `time_in` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_activity`
--

INSERT INTO `user_activity` (`activity_id`, `patient_id`, `time_in`, `date`) VALUES
(1, 12, '2024-11-14 09:42:13', '2024-11-15 01:42:13'),
(2, 12, '2024-11-14 20:50:07', '2024-11-15 12:50:07'),
(3, 13, '2024-11-14 22:55:09', '2024-11-15 14:55:09'),
(4, 12, '2024-11-14 22:55:32', '2024-11-15 14:55:32'),
(10, 20, '2024-11-14 23:15:14', '2024-11-15 15:15:14'),
(11, 20, '2024-11-14 23:16:21', '2024-11-15 15:16:21'),
(12, 20, '2024-11-14 23:18:31', '2024-11-15 15:18:31'),
(13, 21, '2024-11-14 23:26:28', '2024-11-15 15:26:28'),
(14, 21, '2024-11-14 23:31:22', '2024-11-15 15:31:22'),
(15, 20, '2024-11-14 23:31:35', '2024-11-15 15:31:35'),
(16, 21, '2024-11-14 23:31:41', '2024-11-15 15:31:41'),
(17, 21, '2024-11-14 23:33:13', '2024-11-15 15:33:13'),
(18, 12, '2024-11-15 00:02:52', '2024-11-15 16:02:52'),
(19, 21, '2024-11-15 00:07:17', '2024-11-15 16:07:17'),
(20, 21, '2024-11-15 00:09:18', '2024-11-15 16:09:18'),
(21, 20, '2024-11-15 00:09:32', '2024-11-15 16:09:32'),
(22, 12, '2024-11-17 23:40:06', '2024-11-18 15:40:06'),
(23, 12, '2024-11-17 23:57:09', '2024-11-18 15:57:09'),
(24, 12, '2024-11-23 07:12:11', '2024-11-23 23:12:11'),
(25, 12, '2024-11-23 19:55:38', '2024-11-24 11:55:38'),
(26, 12, '2024-11-23 20:34:10', '2024-11-24 12:34:10'),
(27, 12, '2024-11-24 01:43:46', '2024-11-24 17:43:46'),
(28, 12, '2024-11-24 01:47:00', '2024-11-24 17:47:00'),
(29, 12, '2024-11-24 02:01:44', '2024-11-24 18:01:44'),
(30, 12, '2024-11-24 04:02:40', '2024-11-24 20:02:40'),
(31, 12, '2024-11-24 04:11:17', '2024-11-24 20:11:17'),
(32, 22, '2024-11-24 04:40:30', '2024-11-24 20:40:30'),
(33, 22, '2024-11-24 04:43:07', '2024-11-24 20:43:07'),
(34, 22, '2024-11-24 04:54:05', '2024-11-24 20:54:05'),
(35, 12, '2024-11-24 04:57:58', '2024-11-24 20:57:58'),
(36, 22, '2024-11-24 04:59:05', '2024-11-24 20:59:05'),
(37, 12, '2024-11-24 11:03:51', '2024-11-25 03:03:51'),
(38, 12, '2024-11-24 11:16:20', '2024-11-25 03:16:20'),
(39, 12, '2024-11-24 11:18:21', '2024-11-25 03:18:21'),
(40, 12, '2024-11-24 11:39:32', '2024-11-25 03:39:32'),
(41, 12, '2024-11-25 07:29:30', '2024-11-25 23:29:30'),
(42, 12, '2024-11-25 18:09:11', '2024-11-26 10:09:11'),
(43, 12, '2024-11-26 05:33:55', '2024-11-26 21:33:55'),
(44, 12, '2024-11-26 06:05:35', '2024-11-26 22:05:35'),
(45, 12, '2024-11-26 06:33:58', '2024-11-26 22:33:58'),
(46, 12, '2024-11-26 07:10:06', '2024-11-26 23:10:06'),
(47, 12, '2024-11-26 07:45:17', '2024-11-26 23:45:17'),
(48, 12, '2024-11-26 07:46:03', '2024-11-26 23:46:03'),
(49, 12, '2024-11-26 09:30:00', '2024-11-27 01:30:00'),
(50, 12, '2024-11-26 09:35:34', '2024-11-27 01:35:34'),
(51, 12, '2024-11-26 09:53:22', '2024-11-27 01:53:22'),
(52, 12, '2024-11-26 09:54:42', '2024-11-27 01:54:42'),
(53, 12, '2024-11-26 09:59:48', '2024-11-27 01:59:48'),
(54, 12, '2024-11-27 08:44:57', '2024-11-28 00:44:57'),
(55, 12, '2024-11-27 08:59:38', '2024-11-28 00:59:38'),
(56, 12, '2024-11-27 09:10:06', '2024-11-28 01:10:06'),
(57, 12, '2024-11-30 06:39:40', '2024-11-30 22:39:40'),
(58, 12, '2024-11-30 21:44:26', '2024-12-01 13:44:26'),
(59, 12, '2024-12-01 07:33:38', '2024-12-01 23:33:38'),
(60, 12, '2024-12-01 08:58:34', '2024-12-02 00:58:34'),
(61, 12, '2024-12-01 09:24:43', '2024-12-02 01:24:43'),
(62, 12, '2024-12-01 09:42:22', '2024-12-02 01:42:22'),
(63, 12, '2024-12-01 10:12:06', '2024-12-02 02:12:06'),
(64, 12, '2024-12-01 10:13:23', '2024-12-02 02:13:23'),
(65, 12, '2024-12-01 11:55:35', '2024-12-02 03:55:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `diagnosis`
--
ALTER TABLE `diagnosis`
  ADD PRIMARY KEY (`diagnosis_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `professional_id` (`professional_id`),
  ADD KEY `diagnosis_ibfk_3` (`schedule_id`);

--
-- Indexes for table `discussion`
--
ALTER TABLE `discussion`
  ADD PRIMARY KEY (`discussion_id`),
  ADD KEY `forum_id` (`forum_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `experience_patient`
--
ALTER TABLE `experience_patient`
  ADD PRIMARY KEY (`experience_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `experience_professional`
--
ALTER TABLE `experience_professional`
  ADD PRIMARY KEY (`experience_id`),
  ADD KEY `professional_id` (`professional_id`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`forum_id`);

--
-- Indexes for table `matching`
--
ALTER TABLE `matching`
  ADD PRIMARY KEY (`match_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `professional_id` (`professional_id`),
  ADD KEY `patient_details_id` (`patient_details_id`);

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
-- Indexes for table `messaging`
--
ALTER TABLE `messaging`
  ADD PRIMARY KEY (`messaging_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `professional_id` (`professional_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `notification_professional`
--
ALTER TABLE `notification_professional`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `professional_id` (`professional_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `patient_details`
--
ALTER TABLE `patient_details`
  ADD PRIMARY KEY (`patient_details_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `professional_activity`
--
ALTER TABLE `professional_activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `professional_id` (`professional_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `professional_id` (`professional_id`),
  ADD KEY `session_id` (`session_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `schedule_ibfk_1` (`patient_id`),
  ADD KEY `professional_id` (`professional_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `professional_id` (`professional_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indexes for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD PRIMARY KEY (`activity_id`),
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
-- AUTO_INCREMENT for table `diagnosis`
--
ALTER TABLE `diagnosis`
  MODIFY `diagnosis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `discussion`
--
ALTER TABLE `discussion`
  MODIFY `discussion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `experience_patient`
--
ALTER TABLE `experience_patient`
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `experience_professional`
--
ALTER TABLE `experience_professional`
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `forum_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `matching`
--
ALTER TABLE `matching`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `mental_health_professionals`
--
ALTER TABLE `mental_health_professionals`
  MODIFY `professional_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `messaging`
--
ALTER TABLE `messaging`
  MODIFY `messaging_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `notification_professional`
--
ALTER TABLE `notification_professional`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `patient_details`
--
ALTER TABLE `patient_details`
  MODIFY `patient_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `professional_activity`
--
ALTER TABLE `professional_activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_activity`
--
ALTER TABLE `user_activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `diagnosis`
--
ALTER TABLE `diagnosis`
  ADD CONSTRAINT `diagnosis_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  ADD CONSTRAINT `diagnosis_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`),
  ADD CONSTRAINT `diagnosis_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`);

--
-- Constraints for table `discussion`
--
ALTER TABLE `discussion`
  ADD CONSTRAINT `discussion_ibfk_1` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`forum_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `discussion_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `experience_patient`
--
ALTER TABLE `experience_patient`
  ADD CONSTRAINT `experience_patient_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `experience_professional`
--
ALTER TABLE `experience_professional`
  ADD CONSTRAINT `experience_professional_ibfk_1` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `matching`
--
ALTER TABLE `matching`
  ADD CONSTRAINT `matching_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  ADD CONSTRAINT `matching_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`),
  ADD CONSTRAINT `matching_ibfk_3` FOREIGN KEY (`patient_details_id`) REFERENCES `patient_details` (`patient_details_id`);

--
-- Constraints for table `mental_health_professional_preference`
--
ALTER TABLE `mental_health_professional_preference`
  ADD CONSTRAINT `mental_health_professional_preference_ibfk_1` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`);

--
-- Constraints for table `messaging`
--
ALTER TABLE `messaging`
  ADD CONSTRAINT `messaging_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messaging_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messaging_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`);

--
-- Constraints for table `notification_professional`
--
ALTER TABLE `notification_professional`
  ADD CONSTRAINT `notification_professional_ibfk_1` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`);

--
-- Constraints for table `patient_details`
--
ALTER TABLE `patient_details`
  ADD CONSTRAINT `patient_details_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`);

--
-- Constraints for table `professional_activity`
--
ALTER TABLE `professional_activity`
  ADD CONSTRAINT `professional_activity_ibfk_1` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `report_ibfk_3` FOREIGN KEY (`session_id`) REFERENCES `session` (`session_id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  ADD CONSTRAINT `session_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`),
  ADD CONSTRAINT `session_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`);

--
-- Constraints for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD CONSTRAINT `user_activity_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
