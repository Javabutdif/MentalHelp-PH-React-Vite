-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2024 at 11:43 PM
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
(29, 3, 12, 'test', 1, '2024-11-13 22:20:13'),
(30, 3, 12, 'ham', 0, '2024-11-13 22:21:05'),
(31, 3, 12, 'anony', 1, '2024-11-13 22:21:19');

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
(1, 12, 5, '2024-11-15 01:23:28');

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
(1, 1, 4, '2024-11-15 01:18:54');

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
(1, 'Black Lives Mattersss', 'Where black lives matter', '2024-10-27 02:08:32'),
(3, 'Admin Create', 'dawdawd', '2024-11-08 02:33:44');

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
(21, 11, 12, 1, '2024-11-03', 'Accept'),
(23, 13, 12, 22, '2024-11-11', 'Accept');

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

INSERT INTO `mental_health_professionals` (`professional_id`, `firstname`, `lastname`, `professional_address`, `email`, `contact_number`, `type`, `passwords`, `license`, `experience`, `photo`, `bio`, `comments`, `ratings`, `documents`, `professional_status`, `service_fee`) VALUES
(1, 'Anton James', 'Genabio', 'Purok', 'jamesgenabio31@gmail.com', '090830958900', 'Psychologist', '$2y$10$KL4H5mBihZsgSryOErH.RO9mAh0YT8q9FmMVZcS8mLJ0hr7clxNpq', '900900', 2, 'http://localhost:3000/profile/1729451256002.png', 'I love ice creams', '', 0, '', 'Accepted', 3500),
(22, 'Ayla', 'Berds', '', 'jamesgenabio90@gmail.com', '09083095890', 'Psychologist', '$2a$10$InERmO1GAGi3EJJ4fod71eNRWz/ukBZ2Nb4d/B43MVlUjsFkTxmXS', '123', 3, 'http://localhost:3000/profile/1729452377862.jpg', '', '', 0, 'uploads\\1729152393101.pdf', 'Accepted', 900),
(24, 'Ayala', 'Berdida', '', 'ailah.berdida34@gmail.com', '123123', 'Psychiatrist', '$2a$10$elCOuwvIqk90G2LfBN4XFuBCpwvVmZ3drevZLtENzKQzs7h6LCZy.', '123123', 1, '', '', '', 0, 'uploads\\1729783389117.txt', 'Accepted', 0),
(25, 'Dione', 'Nipaya', '', 'louisnipaya2@gmail.com', '12312312', 'Psychologist', '$2a$10$Z1WPjAAmMLFmlnTO3rQ7u.A7ADQx6aat5rRJsq8q4b21BC8L4q78S', '123123', 2, '', '', '', 0, 'uploads\\1729783715454.txt', 'Accepted', 0);

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
(22, 18, 25, 'depression, anxiety, stress', '');

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
(7, 12, 22, 'Hellooo', 5, '2024-11-14 11:56:11', 22),
(8, 12, 22, 'helooo', 5, '2024-11-14 11:56:56', 12),
(9, 12, 1, 'Helooooo', 4, '2024-11-14 12:39:12', 12),
(10, 12, 1, 'Helloooo too', 4, '2024-11-14 12:47:45', 1),
(11, 12, 1, 'otin\r\n', 4, '2024-11-14 12:48:49', 12),
(12, 12, 1, 'Owww 10\r\n', 4, '2024-11-14 12:49:44', 1);

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
(1, 'Match Notice', 12, 'Request match successful ', '0000-00-00 00:00:00'),
(2, 'Match Notice', 12, 'Request match successful ', '2024-10-24 22:45:15'),
(3, 'Match Notice', 12, 'Request match successful ', '2024-10-24 23:07:12'),
(4, 'Match Notice', 12, 'Request match successful', '2024-10-26 23:08:06'),
(5, 'Match Notice', 12, 'Request match successful', '2024-10-26 23:10:34'),
(6, 'Match Notice', 12, 'Request match successful', '2024-10-27 00:16:44'),
(7, 'Match Notice', 12, 'Request match successful', '2024-11-03 22:44:51'),
(8, 'Match Notice', 12, 'Request match successful', '2024-11-03 22:49:39'),
(9, 'Appointment Notice', 12, 'Anton James Genabio has accepted your request. The scheduled time is 20:38 on 2024-11-14.', '2024-11-09 20:32:56'),
(10, 'Match Notice', 12, 'Request match successful', '2024-11-11 00:19:34'),
(11, 'Match Notice', 12, 'Request match successful', '2024-11-11 00:22:47'),
(12, 'Appointment Notice', 12, 'Dr. Ayla Berds has accepted your request. The scheduled time is 00:28 on 2024-11-11.', '2024-11-11 00:25:54'),
(13, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-14 12:47:46'),
(14, 'Message Notification', 12, 'Anton James Genabio has messaged you', '2024-11-14 12:49:44');

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
(1, 'Matching Alert', 1, 'A patient has submitted a request', '2024-10-24 22:24:06'),
(2, 'Matching Alert', 22, 'A patient has submitted a request', '2024-10-24 22:45:15'),
(3, 'Matching Alert', 22, 'A patient has submitted a request', '2024-10-24 23:07:12'),
(4, 'Matching Alert', 1, 'A patient has submitted a request', '2024-10-26 23:08:06'),
(5, 'Matching Alert', 22, 'A patient has submitted a request', '2024-10-26 23:10:34'),
(6, 'Matching Alert', 22, 'A patient has submitted a request', '2024-10-27 00:16:44'),
(7, 'Matching Alert', 22, 'A patient has submitted a request', '2024-11-03 22:44:51'),
(8, 'Matching Alert', 1, 'A patient has submitted a request', '2024-11-03 22:49:39'),
(9, 'Matching Alert', 22, 'A patient has submitted a request', '2024-11-11 00:19:34'),
(10, 'Matching Alert', 22, 'A patient has submitted a request', '2024-11-11 00:22:47'),
(11, 'Message Notification', 1, 'James Genabio has messaged you', '2024-11-14 12:39:12'),
(12, 'Message Notification', 1, 'James Genabio has messaged you', '2024-11-14 12:48:49');

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
(13, 'dione31@gmail.com', '$2a$10$nNPOzkbs3CUwxhkoZ3YILuBl3Z1BwdnSez02XcoqfPiuBbMwB5hvO', 'Dione', 'Louis', '', '', 'Purok Day Care', 'Male', 0, 'Married', '2312313', 'Active'),
(17, 'ayla@gmail.com', '$2a$10$Y31dqqi.EBoMxSXKq72SqORzWsgGIWnzWv7kLEhypHEaD8KezVPbm', 'Ailah', 'Berdida', 'I lodfdfsdfsdf', '', 'Lapu - Lapu Cebu City', 'Female', 22, 'Single', '09083095890', 'Active');

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
(13, 12, 'depression, anxiety', 24, '');

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
(1, 1, '2024-11-14 09:42:28', '2024-11-15 01:42:28');

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
(4, 12, 1, '2024-11-10', '17:40:00', 'Active'),
(5, 12, 22, '2024-11-11', '04:00:00', 'Active');

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
(1, 12, '2024-11-14 09:42:13', '2024-11-15 01:42:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

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
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `schedule_ibfk_1` (`patient_id`),
  ADD KEY `professional_id` (`professional_id`);

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
-- AUTO_INCREMENT for table `discussion`
--
ALTER TABLE `discussion`
  MODIFY `discussion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `experience_patient`
--
ALTER TABLE `experience_patient`
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `experience_professional`
--
ALTER TABLE `experience_professional`
  MODIFY `experience_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `forum_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `matching`
--
ALTER TABLE `matching`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `mental_health_professionals`
--
ALTER TABLE `mental_health_professionals`
  MODIFY `professional_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `messaging`
--
ALTER TABLE `messaging`
  MODIFY `messaging_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `notification_professional`
--
ALTER TABLE `notification_professional`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `patient_details`
--
ALTER TABLE `patient_details`
  MODIFY `patient_details_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `professional_activity`
--
ALTER TABLE `professional_activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_activity`
--
ALTER TABLE `user_activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

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
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`professional_id`) REFERENCES `mental_health_professionals` (`professional_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD CONSTRAINT `user_activity_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
