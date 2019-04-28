const createUser = `CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    income integer DEFAULT 0,
    createdAt timestamp DEFAULT NOW()
    )`;

export default createUser;
