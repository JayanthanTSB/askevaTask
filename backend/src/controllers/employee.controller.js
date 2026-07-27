'use strict';

const Employee = require('../models/Employee');




const buildFilter = (query) => {
  const filter = {};

  if (query.search) {
    filter.$or = [
      { fullName: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }

  if (query.department) filter.department = query.department;
  if (query.status) filter.status = query.status;
  if (query.designation) filter.designation = { $regex: query.designation, $options: 'i' };

  return filter;
};






const getEmployees = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit ?? '10', 10)));
    const skip = (page - 1) * limit;

    const sortField = req.query.sort ?? 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    const sort = { [sortField]: sortOrder };

    const filter = buildFilter(req.query);

    const [employees, total] = await Promise.all([
      Employee.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Employee.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: employees,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};






const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).lean();
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};






const createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Employee created successfully.',
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};






const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).lean();

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully.',
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};






const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }
    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully.',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
