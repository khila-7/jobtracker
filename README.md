# Job Tracker Application

A full-stack Job Tracker application to manage job applications efficiently. Users can add, update, delete, search, and filter job applications with real-time backend integration.

## 🛠 Tech Stack

**Frontend**  
- React  
- Axios  
- Vite  

**Backend**  
- Spring Boot  
- Spring Data JPA  
- REST APIs  
- Swagger (OpenAPI)  

**Database**  
- H2 (can be switched to MySQL)  

## ✨ Features

- Add new job applications  
- Update job details (company, role, status)  
- Delete job applications  
- Search and filter jobs by company and status  
- Pagination support  
- RESTful APIs with DTO pattern  
- Input validation and global exception handling  
- Swagger API documentation  

## 📸 Screenshots

*(Add screenshots here later, example below)*

![Job List](frontend/screenshots/job-list.png)  
![Add Job](frontend/screenshots/add-job.png)  
![Search & Filter](frontend/screenshots/search-filter.png)  

## 🚀 How to Run the Project

### Backend
```bash
cd jobtracker-backend
mvn spring-boot:run
