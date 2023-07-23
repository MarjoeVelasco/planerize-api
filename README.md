
# Plannerize

Plannerize is an application designed to revolutionize your daily task management. With its intuitive user 
interface and powerful features, Plannerize offers a simplified planner experience that helps you stay 
organized and productive.

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


#### Workspaces

| HTTP | Endpoint     | Description                |
| :-------- | :------- | :---------------- |
| `POST` | `/v1/workspaces/:user_id` | create new workspace |

### Technologies Used
`MongoDB` `ExpressJS` `NodeJS`
`Mocha` `Chai`




