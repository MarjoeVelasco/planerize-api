
# Plannerize

Plannerize is an application designed to revolutionize your daily task management. With its intuitive user 
interface and powerful features, Plannerize offers a simplified planner experience that helps you stay 
organized and productive.

## Features

- **Interactive Checklist** – allows users to create tasks checklists effortlessly. Easily add, edit, and manage your tasks with just a few clicks. Mark completed tasks, set due dates, and prioritize your to-dos for enhanced productivity.

- **Tags and Label** - Assign relevant tags and labels to your tasks, enabling you to categorize, filter, and search for specific tasks with ease.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_CONNECTION`
`DB_USERNAME`
`DB_PASSWORD`
`DB_NAME`
`DB_HYPEN`
`PORT`

## API Reference

#### Authentication

| HTTP | Endpoint     | Description                |
| :-------- | :------- | :---------------- |
| `POST` | `/v1/auth/register` | to register |
| `POST` | `/v1/auth/login` | to login |

#### Categories

| HTTP | Endpoint     | Description                |
| :-------- | :------- | :---------------- |
| `GET` | `/v1/tags/:id` | get tag based on ID |
| `GET` | `/v1/tags/` | get all active tags |
| `POST` | `/v1/tags/` | insert new tag |
| `PUT` | `/v1/tags/:id` | update tag |
| `PUT` | `/v1/tags/:id/archive` | move to archive |

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




