const Employee = require('../models/Employee');

// Render the list of all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('index', { employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Render the form to create a new employee
exports.renderNewForm = (req, res) => {
  res.render('new');
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.redirect('/employees');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Render the details of a single employee
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.render('show', { employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Render the form to edit an employee
exports.renderEditForm = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.render('edit', { employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.redirect(`/employees/${employee._id}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.redirect('/employees');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};