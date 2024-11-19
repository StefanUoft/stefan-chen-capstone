# Project Title
Job Application Tracker

## Overview

The Job Application Tracker is a personal dashboard designed for job seekers to manage and track their job applications efficiently. The tool organizes applications into different categories (e.g., To Be Applied, Applied, Interview Received, Rejected) and provides a centralized platform for managing the job search process.

### Problem Space

Job seekers often lose track of applications during their search. Current tools like spreadsheets or generic apps lack the personalization and features tailored to the job application journey. There’s a need for a streamlined solution that not only tracks applications but also motivates users with daily messages and provides an intuitive categorization system.

### User Profile

Job Seekers:
Actively applying for multiple roles across various companies
Needing a centralized dashboard to track application status
Seeking motivation or inspiration during the job search process

### Features

General User Features:
Homepage with a motivational or fortune message
Tabs for each application status: To Be Applied, Applied, Interview Received, Rejected
As a user:
I want to add new job applications to the "To Be Applied" list
I want to move applications between statuses (e.g., Applied → Interview Received)
I want to edit or delete job applications
I want to see detailed information for each job application
I want to filter and sort my job applications by date, status, or company name

## Implementation

### Tech Stack

Fronted: React. Javascript, SASS
Backend: Node.js, express， json/or mysql
Database: MySQL

Client Libraries:
react
react-router
axios

Server Libraries:
express

### APIs

Motivation message: http://api.viewbits.com/v1/fortunecookie?mode=today

### Sitemap

Home Page: Display motivational messages and quick links to tabs
To Be Applied: Jobs that the user intends to apply for
Applied: Jobs that have already been applied to
Interview Received: Applications that resulted in interviews
Rejected: Applications that were not successful
Detailed View: View and update details of each application

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

Users Table

Field	Type	Description
id	Integer	Unique user ID
email	String	User's email address
password	String	Hashed password
created_at	DateTime	When the account was created

Jobs Table

Field	Type	Description
id	Integer	Unique job application ID
user_id	Integer	Foreign key linking to the User
company_name	String	Name of the company
job_title	String	Job title
status	Enum	Status of the job (e.g., To Be Applied, Applied, etc.)
deadline	Date	Deadline for applying (if applicable)
notes	Text	Any additional information for this job
created_at	DateTime	When the job was added

Tables/Collections:

Users: Contains user account information.
Jobs: Tracks job applications for each user.

Relationships:
Each User can have multiple Jobs (one-to-many relationship).
Each Job belongs to exactly one User.

### Endpoints

GET /jobs

Fetch all job applications by status.

Parameters:

status: Status filter (e.g., "To Be Applied")
Response:

[  
  {  
    "id": 1,  
    "companyName": "TechCorp",  
    "jobTitle": "Software Engineer",  
    "status": "Applied",  
    "deadline": "2024-12-01",  
    "notes": "Followed up with HR"  
  },  
  ...  
]  
POST /jobs

Add a new job application.

Request:

{  
  "companyName": "TechCorp",  
  "jobTitle": "Software Engineer",  
  "status": "To Be Applied",  
  "deadline": "2024-12-01",  
  "notes": "Update resume for this application"  
}  
Response:

{  
  "message": "Job added successfully"  
}  
PUT /jobs/

Update job application details.

Request:

{  
  "status": "Applied"  
}  
Response:

{  
  "message": "Job updated successfully"  
}  
DELETE /jobs/

Delete a job application.

Response:

{  
  "message": "Job deleted successfully"  
}  

## Roadmap

Setup
Frontend: React with routes and boilerplate pages
Backend: Express with routing, with placeholder 200 responses

Core Features:
Add jobs to the "To Be Applied" list
Move jobs between statuses

Details and Editing:
View detailed application info
Edit and delete jobs



## Future Implementations


