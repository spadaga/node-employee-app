const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// CRUD routes for Employees
router.get('/', employeeController.getAllEmployees); // List all employees
router.get('/new', employeeController.renderNewForm); // Render form to create a new employee
router.post('/', employeeController.createEmployee); // Create a new employee
router.get('/:id', employeeController.getEmployeeById); // Show details of a single employee
router.get('/:id/edit', employeeController.renderEditForm); // Render form to edit an employee
router.put('/:id', employeeController.updateEmployee); // Update an employee
router.delete('/:id', employeeController.deleteEmployee); // Delete an employee

module.exports = router;