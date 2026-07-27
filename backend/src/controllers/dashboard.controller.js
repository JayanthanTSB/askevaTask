'use strict';

const Employee = require('../models/Employee');






const getDashboardStats = async (_req, res, next) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    
    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      newThisMonth,
      departmentDistribution,
      statusDistribution,
      monthlyJoiningTrend,
    ] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ status: 'active' }),
      Employee.countDocuments({ status: 'inactive' }),
      Employee.countDocuments({ createdAt: { $gte: startOfMonth } }),

      
      Employee.aggregate([
        { $group: { _id: '$department', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      
      Employee.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),

      
      Employee.aggregate([
        {
          $match: {
            joiningDate: {
              $gte: new Date(now.getFullYear() - 1, now.getMonth(), 1),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$joiningDate' },
              month: { $month: '$joiningDate' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        {
          $project: {
            _id: 0,
            month: {
              $concat: [
                { $toString: '$_id.year' },
                '-',
                {
                  $cond: [
                    { $lt: ['$_id.month', 10] },
                    { $concat: ['0', { $toString: '$_id.month' }] },
                    { $toString: '$_id.month' },
                  ],
                },
              ],
            },
            count: 1,
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        newThisMonth,
        departmentDistribution,
        statusDistribution,
        monthlyJoiningTrend,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboardStats };
