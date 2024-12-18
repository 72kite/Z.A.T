# Z.A.T
Basic Shift Scheduler Created By Zangetsu 
Developed by Zion D. Kinniebrew-Jenkins

Overview

The Shift Scheduler Application is a mobile-friendly app designed to simplify shift scheduling tasks. The application allows users to:

Input and manage shift data (start and end times, lunch breaks, and additional breaks).

Dynamically calculate break times based on shift details.

Export the schedule data as a CSV file for external use.

This app is implemented using React Native to provide cross-platform compatibility for both Android and iOS devices.

Features

1. Dynamic Shift Management

Select shift start and end times using intuitive dropdown menus.

Automatically calculate the following based on input:

Lunch Break: 4 hours after the shift start.

First Break: 2 hours after the shift start.

Second Break: 1 hour before the shift ends.

Dispensing Shift: Starts 1 hour after lunch, but no earlier than 7:00 AM.

2. User-Friendly Interface

Clean, minimalistic design with responsive controls.

Uses RNPickerSelect for dropdown menus and FlatList for displaying data in a table-like format.

3. CSV Export Functionality

Saves shift schedules as a CSV file in the device's downloads directory.

Uses the react-native-fs library to handle file creation and storage.

Installation and Setup

Prerequisites

Ensure you have Node.js and npm/yarn installed.

Install the React Native CLI:

npm install -g react-native-cli

Set up your development environment for React Native based on your operating system by following the official React Native guide.

Installation Steps

Clone the repository:

git clone <repository-url>
cd ShiftSchedulerApp

Install dependencies:

npm install

Start the Metro server:

npx react-native start

Run the app:

For Android:

npx react-native run-android

For iOS:

npx react-native run-ios

Usage

Adding Shift Data

Select a date for the schedule.

Enter the user’s name (optional).

Choose the shift start and end times from the dropdown menus.

Click the Add User button to calculate and add the user's shift details to the list.

Exporting Data

After entering shift details, click the Download CSV button.

The schedule will be saved as a shift_schedule.csv file in the device's downloads directory.

Technologies Used

React Native: For building the mobile app.

react-native-fs: For file system operations.

react-native-picker-select: For dropdown menus.

FlatList: For rendering tabular data.


Developed by Zion D. Kinniebrew-Jenkins
