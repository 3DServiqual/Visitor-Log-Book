# Visitor Log Book - Application Documentation

## 1. Introduction

The Visitor Log Book is a web application designed to streamline the process of recording visitor information, managing server room access, and documenting IT interventions. It provides a user-friendly interface for logging visitor details, tracking server room entries, and maintaining records of IT support activities.

## 2. Features

### Visitor Log Management:

- Record visitor name, company, purpose of visit, and time in/out.
- Digital signature capture for visitor confirmation.
- Search and filter visitor logs.

### Server Room Access Tracking:

- Log entries and exits to the server room.
- Record personnel accessing the server room and reason for access.

### IT Intervention Documentation:

- Document IT support activities, including descriptions and resolutions.
- Maintain a history of IT interventions.

### User Interface:

- Responsive design for various screen sizes.
- Intuitive forms for data entry.
- Clear presentation of log data.

### Data Management:

- Secure data storage using SQLite.
- Data retention policies (configurable).

### Authentication:

- Session-based authentication for secure access.

### Reporting:

- Generate reports on visitor logs, server room access, and IT interventions.

## 3. System Architecture

The application employs a Model-View-Controller (MVC) architecture.

- **Frontend**: Handlebars templates with Bootstrap for a dynamic and responsive user interface.
- **Backend**: Express.js framework on Node.js for robust server-side logic.
- **Database**: SQLite for data persistence.
- **Logging**: Winston for application logging

### 3.1. Architecture Diagrams

Below are detailed diagrams for a visual representation of the system architecture.

#### Database Schema

![Database Schema](https://github.com/3DServiqual/Visitor-Log-Book/blob/main/documentation-images/mermaid-diagram-2025-05-16-100130.png)
The database schema diagram shows the VisitorLog table structure with its fields including:

- date (DATE)
- name (VARCHAR)
- company (VARCHAR)
- reasonForVisit (TEXT)
- visitorCardNumber (VARCHAR)
- timeIn (TIMESTAMP)
- timeOut (TIMESTAMP NULL)
- signature (BLOB)

#### Backend Layer

![Backend Layer](https://github.com/3DServiqual/Visitor-Log-Book/blob/main/documentation-images/mermaid-diagram-2025-05-16-095846.png)
The backend architecture follows a clear hierarchical structure:

- Express Server at the top level
- Routes Handler managing different route types
- Controllers for each module
- Models interfacing with the SQLite Database

#### Frontend Layer

![Frontend Layer](https://github.com/3DServiqual/Visitor-Log-Book/blob/main/documentation-images/mermaid-diagram-2025-05-16-095831.png)
The frontend layer shows the user interface components:

- Web Interface as the main entry point
- Three main forms: Visitor Form, Server Room Form, and IT Intervention Form
- Supporting components like Signature Pad, Time Input Fields, and specific form fields

#### Visitor Flow Process

![Visitor Flow](https://github.com/3DServiqual/Visitor-Log-Book/blob/main/documentation-images/mermaid-diagram-2025-05-16-094852.png)
The visitor flow process illustrates the complete journey:

1. Visitor Arrives
2. Reception Check-in
3. Fill Visitor Form
4. Digital Signature
5. Receive Visitor Card
6. Time In Recorded
7. Visit Period
8. Return Card at Reception
9. Time Out Recorded
10. Visit Data Stored

## 4. Technical Details

### 4.1. Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Handlebars, Bootstrap, Signature Pad
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **ORM**: Sequelize
- **Logging**: Winston
- **Authentication**: Session-based

### 4.2. Database Schema

The database consists of the following tables:

- **VisitorLog**: Stores visitor information (date, name, company, reason, visitor card number, time in, time out, signature).
- **ServerRoomLog**: Stores server room access information
- **ITInterventionLog**: Stores IT intervention records.

### 4.3. API Endpoints

The application provides a RESTful API. The base URL is http://localhost:3000.

#### 1. Visitor Log Endpoints

##### Add Visitor Log

- **Endpoint**: `POST /visitor-log/add`
- **Description**: Creates a new visitor log entry.
- **Request Body**:

```json
{
  "date": "YYYY-MM-DD",
  "name": "string",
  "company": "string",
  "reasonForVisit": "string",
  "visitorCardNumber": number,
  "timeIn": "HH:MM:SS",
  "timeOut": "HH:MM:SS",
  "signature": "string"
}
```

- **Success Response**: 201 Created with the created log entry.

##### Update Visitor Log

- **Endpoint**: `PUT /visitor-log/update/:id`
- **Description**: Updates an existing visitor log entry.
- **Parameters**:
  - id: ID of the log entry to update.
- **Request Body**: Same fields as POST, but all are optional.
- **Success Response**: 200 OK with the updated log entry.

##### Get All Visitor Logs

- **Endpoint**: `GET /`
- **Description**: Retrieves all visitor log entries.
- **Success Response**: Renders visitorLog.handlebars view with logs data.

##### Delete All Visitor Logs

- **Endpoint**: `DELETE /delete-all`
- **Description**: Deletes all visitor log entries.
- **Success Response**: 200 OK with a success message.

#### 2. Server Room Log Endpoints

##### Add Server Room Log

- **Endpoint**: `POST /server-room/add`
- **Description**: Creates a new server room visitor log entry.
- **Request Body**:

```json
{
  "date": "YYYY-MM-DD",
  "name": "string",
  "company": "string",
  "reasonForVisit": "string",
  "timeIn": "HH:MM:SS",
  "timeOut": "HH:MM:SS",
  "accompaniedBy": "string",
  "signature": "string"
}
```

- **Success Response**: 201 Created with the created log entry.

##### Update Server Room Log

- **Endpoint**: `PUT /server-room/update/:id`
- **Description**: Updates an existing server room log entry.
- **Parameters**:
  - id: ID of the log entry to update.
- **Request Body**: Same fields as POST, but all are optional.
- **Success Response**: 200 OK with the updated log entry.

##### Get All Server Room Logs

- **Endpoint**: `GET /server-room`
- **Description**: Retrieves all server room log entries.
- **Success Response**: Renders serverRoomLogBook.handlebars view with logs data.

#### 3. IT Intervention Endpoints

##### Add IT Intervention

- **Endpoint**: `POST /it-intervention/add`
- **Description**: Creates a new IT intervention record.
- **Request Body**:

```json
{
  "incidentId": "string",
  "date": "YYYY-MM-DD",
  "companyName": "string",
  "contactPerson": "string",
  "phoneOrFax": "string",
  "workStarted": "YYYY-MM-DD",
  "workCompleted": "YYYY-MM-DD",
  "billable": boolean,
  "warranty": boolean,
  "maintenance": boolean,
  "hardwareSoftwareName": "string",
  "natureOfIntervention": "string",
  "actionsTaken": "string",
  "delegatedStaffName": "string",
  "delegatedStaffTitle": "string",
  "delegatedStaffSignature": "string",
  "delegatedStaffDate": "YYYY-MM-DD",
  "providerName": "string",
  "providerTitle": "string",
  "providerSignature": "string",
  "providerDate": "YYYY-MM-DD"
}
```

- **Success Response**: 201 Created with the created intervention record.

##### Update IT Intervention

- **Endpoint**: `PUT /it-intervention/update/:id`
- **Description**: Updates an existing IT intervention record.
- **Parameters**:
  - id: ID of the intervention record to update.
- **Request Body**: Same fields as POST, but all are optional.
- **Success Response**: 200 OK with the updated intervention record.

##### Get All IT Interventions

- **Endpoint**: `GET /it-intervention`
- **Description**: Retrieves all IT intervention records.
- **Success Response**: Renders itInterventionForm.handlebars view with interventions data.

### 4.4. Installation Guide

1. Clone the repository:

```bash
git clone [repository_url]
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Start the production server:

```bash
npm start
```

### 4.5. Configuration

Key configuration files:

- **.env**: Environment variables (e.g., SESSION_SECRET, PORT).
- **config/database.js**: Database connection settings.
- **config/logger.js**: Logging configuration.

## 5. Usage

### 5.1. Visitor Log Management

- **Recording a Visitor**: Use the "Visitor Log" form to enter visitor details, including name, company, purpose of visit, and time in. Capture the visitor's signature using the digital signature pad.
- **Viewing Visitor Logs**: Access the "Visitor Logs" section to view a list of all recorded visitors. Use the search and filter options to find specific entries.
- **Editing/Deleting Logs**: Administrators can edit or delete visitor logs as needed.

### 5.2. Server Room Access

- **Logging Access**: Use the "Server Room Access" form to record entries and exits to the server room. Include the names of personnel accessing the room and the reason for access.
- **Viewing Access Logs**: The "Server Room Access Logs" section displays a history of server room access.

### 5.3. IT Interventions

- **Documenting Interventions**: Use the "IT Intervention" form to record details about IT support activities, including a description of the issue and the resolution.
- **Viewing Interventions**: The "IT Interventions" section provides a list of all documented IT support activities.

## 6. Data Storage and Processing

- Data is stored in an SQLite database.
- Sensitive data (e.g., signatures) may be encrypted.
- Data retention policies should be defined and implemented to comply with organizational requirements.

## 7. Security Considerations

- **Authentication**: The application uses session-based authentication to protect access to sensitive data and functionality.
- **Authorization**: Role-based access control should be implemented to restrict access to specific features based on user roles (e.g., administrator, receptionist, IT staff).
- **Data Validation**: Input validation is performed to prevent data integrity issues and security vulnerabilities (e.g., SQL injection).
- **Logging**: Application activity is logged to provide an audit trail and assist with troubleshooting.
- **Data Encryption**: Sensitive data should be encrypted both in transit (using HTTPS) and at rest (in the database).

## 8. Future Enhancements

- Implement user roles and permissions.
- Add reporting functionality.
- Integrate with Active Directory or other authentication systems.
- Implement a more robust database system (e.g., PostgreSQL, MySQL).
- Deploy to a cloud platform.
