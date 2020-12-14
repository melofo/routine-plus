## Repository directory

| Directory | Description |
| --- | --- |
| docs/ | Project landing page, communications plan, APIs, requirements, design, architecture, test plan, team organization PDFs |
| routine-plus/ | Main codebase of the project |

## Welcome to Routine+ !
Routine+ is an online platform for individuals or teams to organize daily/weekly/monthly routines by creating task boards with different columns and dragging and dropping the tasks between them. It features a beautiful drag-and-drop UI to allow a user to seamlessly manage their Tasks.

The application is a full-stack service that is built using the MERN stack and external libraries such as axios, mongoose, and react-beautiful-rnd.

## [Deployed Routine+ website](https://routine-plus.herokuapp.com/)
## [Project landing page](https://pages.github.ccs.neu.edu/2020FACS5500SV/project-routine-plus/)
  
## Methodology:
* Agile

## Project team
* Junfeng Zhou(zjf) - 001372433
* Vy Thai(thaivy) 
* Yuan Yao(melofo) (primary representative) - 001080783
* Wei Nien Chen(wtg30303) (alternate  representative) - 001166046

## Features
* Sign up: create a new user
* Log in: log in an account
* Log out: log out an account
* Create: create a routine inside "to do" block
* Drag and Drop: move routines from "Sprint" to "Backlog" to mark it done for this round or move it to "Archive" to mark that we would not take the routine for now
* Edit: edit an exist routine
* Delete: delete a routine

## File Organization
Repo  
* files(.gitignore etc.)     
* backend  
  * files(server.js etc.)  
  * middleware
    * auth files  
  * models  
    * model files  
  * routes  
    * route files  
* src  
  * files(App.js, App.css etc.)  
  * components  
    * component files  
* public  
  * index.html
  
## Set up
You’ll need to have Node 8.16.0 or Node 10.16.0 or later version on your local development machine (but it’s not required on the server). You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects.

## How to run
1. Clone project locally
2. Make sure you're in the root of the project (`routine-plus/`) where package.json is
3. `npm install`
4. `npm start`
5. `cd backend/`
6. `npx nodemon server` **OR** `nodemon server`
7. Navigate to http://localhost:3000/ to view the project

### For more information, please refer to the [Wiki page](https://github.ccs.neu.edu/2020FACS5500SV/project-routine-plus/wiki).
