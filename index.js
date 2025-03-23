import inquirer from 'inquirer';
import pool from './db/config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queriesPath = path.join(__dirname, 'db', 'queries.sql');
const queries = fs.readFileSync(queriesPath, 'utf-8')
    .split(';')
    .map(query => query.trim())
    .filter(query => query.length > 0);

const getQuery = (name) => {
    const queryMap = {
        viewDepartments: queries[0],
        viewRoles: queries[1],
        viewEmployees: queries[2],
        addDepartment: queries[3],
        addRole: queries[4],
        addEmployee: queries[5],
        updateEmployeeRole: queries[6],
        updateEmployeeManager: queries[7],
        viewEmployeesByManager: queries[8],
        viewEmployeesByDepartment: queries[9],
        viewDepartmentBudget: queries[10],
        deleteDepartment: queries[11],
        deleteRole: queries[12],
        deleteEmployee: queries[13]
    };
    return queryMap[name];
};

async function mainMenu() {
    const questions = [
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by manager',
                'View employees by department',
                'View the total utilized budget of a department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'Exit'
            ]
        }
    ];

    const { action } = await inquirer.prompt(questions);

    switch (action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'Update an employee manager':
            await updateEmployeeManager();
            break;
        case 'Update an employee salary':
            await updateEmployeeSalary();
            break;
        case 'View employees by manager':
            await viewEmployeesByManager();
            break;
        case 'View employees by department':
            await viewEmployeesByDepartment();
            break;
        case 'View the total utilized budget of a department':
            await viewDepartmentBudget();
            break;
        case 'Delete a department':
            await deleteDepartment();
            break;
        case 'Delete a role':
            await deleteRole();
            break;
        case 'Delete an employee':
            await deleteEmployee();
            break;
        case 'Exit':
            pool.end();
            process.exit();
    }
}

async function viewDepartments() {
    const queryText = getQuery('viewDepartments');
    const res = await pool.query(queryText);
    console.table(res.rows);
    await mainMenu();
}

async function viewRoles() {
    const queryText = getQuery('viewRoles');
    const res = await pool.query(queryText);
    console.table(res.rows);
    await mainMenu();
}

async function viewEmployees() {
    const queryText = getQuery('viewEmployees');
    const res = await pool.query(queryText);
    console.table(res.rows);
    await mainMenu();
}
mainMenu();