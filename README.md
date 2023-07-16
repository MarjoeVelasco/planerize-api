
# Plannerize

Plannerize is an application designed to revolutionize your daily task management. With its intuitive user 
interface and powerful features, Plannerize offers a simplified planner experience that helps you stay 
organized and productive.

## Features

- **Interactive Checklist** – allows users to create tasks checklists effortlessly. Easily add, edit, and manage your tasks with just a few clicks. Mark completed tasks, set due dates, and prioritize your to-dos for enhanced productivity.

- **Tags and Label** - Assign relevant tags and labels to your tasks, enabling you to categorize, filter, and search for specific tasks with ease.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRETKEY`
`PORT`
`DB_CONNECTION`
`DB_HOST`
`DB_PORT`
`DB_DATABASE`

## API Reference

#### Authentication

| HTTP | Endpoint     | Description                |
| :-------- | :------- | :---------------- |
| `POST` | `/auth/register` | to register |
| `POST` | `/auth/login` | to login |
| `POST` | `/auth/logout` | to log out |

#### Categories

| HTTP | Endpoint     | Description                |
| :-------- | :------- | :---------------- |
| `GET` | `/tags/:id` | get tag based on ID |
| `GET` | `/tags/` | get all active tags |
| `POST` | `/tags/` | insert new tag |
| `PUT` | `/tags/:id` | update tag |
| `PUT` | `/tags/:id/archive` | move to archive |

#### Tasks

| HTTP | Endpoint     | Description                |
| :-------- | :------- | :---------------- |
| `GET` | `/tasks` | get all tasks |
| `GET` | `/tasks/:id` | get task based on ID |
| `POST` | `/tasks/` | insert new task |
| `PUT` | `/tasks/:id` | update task |
| `PUT` | `/tasks/:id/:status` | update task |
| `DELETE` | `/tasks/:id` | delete task |

### Technologies Used

- MongoDB
- ExpressJS
- ReactJS
- NodeJS




