const mysql = require('mysql2/promise');

async function connectToDatabase() {
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: '',
    };

    const connection = await mysql.createConnection(dbConfig);
  
    return connection;
}

async function createDatabase(connection) {
    const createDatabaseSQL = `
      CREATE DATABASE IF NOT EXISTS todo_app;
    `;

    await connection.query(createDatabaseSQL);
    await connection.query('USE todo_app');

    console.log('Database "todo_app" created successfully.');
}

async function createUserTable(connection) {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      );
    `;

    await connection.query(createTableSQL);
    
    console.log('User table created successfully.');
}

async function createTodoListTable(connection) {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS todo_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        task VARCHAR(255) NOT NULL,
        due_date DATE
      );
    `;

    await connection.query(createTableSQL);
    console.log('Todo List table created successfully.');
}

async function main() {
    const connection = await connectToDatabase();
    await createDatabase(connection);
    await createUserTable(connection);
    await createTodoListTable(connection);
    connection.end(); // Close the database connection
}

main().catch((error) => {
    console.error('Error:', error);
});