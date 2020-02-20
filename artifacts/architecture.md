# Program Organization
![High Level Architecture](pictures/KnightsPath_High_level_architecture_design.jpg "High Level Architecture")

# Major Classes
![Class Diagram](pictures/KnightsPath_Class_Diagram.jpg "Class Diagram")

# Data Design
![ERD](pictures/ERD.jpg "ERD Diagram")

# Business Rules

# User Interface Design
![User Interface](pictures/UIDiagram.jpg "User Interface Diagram")

# Resource Management

# Security

# Performance

# Scalability

# Interoperability

# Internationalization/Localization

# Input/Output

# Error Processing

# Fault Tolerance

# Architectural Feasibility

# Overengineering
The robustness of a program is its ability to cope with errors during execution. Architecture often leans towards a more robust system that includes overengineering, but our application is focused on doing the simplest thing that works. In order to implement this we have broken up the functionality of our program into concise parts. This allows for each aspect to be tested easily, which leads to a more reliable program overall.

# Build-vs-Buy Decisions
Our team has taken the build approach when creating our software. This is mainly because our application is created for academic and learning purposes, so the majority of our code is supposed to be our own work. Moreover, we do not have a budget to buy additional resources. However, we have utilized a lot of free open-source software throughout our application.

We have chosen a MEAN tech stack with typescript for this project. For our back end development we use Express to facilitate making an API, Node which is our runtime environment for javascript, MongoDB to implement our no SQL database, and bcrypt which allows us to hash passwords. For the front end we use Angular which aids us in expressing our application’s components clearly and succinctly. For testing we use the Jasmine testing framework.

# Reuse
This application does not call for the reuse of any preexisting software, test cases, data formats, or other materials. 

# Change Strategy
Our application is being created and developed using scaffolding, which means that we are starting with the very basics and then building up the features from there. Given this, our product will go through changes after each sprint which will allow our product to have new capabilities and functionality. We will manage these changes using git which lets us track changes as commits and facilitates version control.
