'use strict';






require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const Employee = require('../models/Employee');
const config = require('../config');

const DEPARTMENTS = [
  'Engineering', 'Marketing', 'Sales', 'Human Resources',
  'Finance', 'Operations', 'Design', 'Product',
];

const DESIGNATIONS = [
  'Software Engineer', 'Senior Software Engineer', 'Product Manager',
  'UI/UX Designer', 'Data Analyst', 'DevOps Engineer', 'QA Engineer',
  'HR Manager', 'Financial Analyst', 'Marketing Manager', 'Sales Executive',
];

const STATUSES = ['active', 'active', 'active', 'inactive', 'on-leave'];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const SAMPLE_NAMES = [
  'Arjun Sharma', 'Priya Patel', 'Rahul Verma', 'Sneha Gupta', 'Amit Kumar',
  'Divya Nair', 'Vikram Singh', 'Ananya Reddy', 'Karan Mehta', 'Pooja Joshi',
  'Rohan Kapoor', 'Meera Iyer', 'Suresh Pillai', 'Lalitha Menon', 'Aditya Bose',
  'Kavitha Rao', 'Nikhil Tiwari', 'Swati Desai', 'Harish Pandey', 'Deepa Nambiar',
  'Rajesh Malhotra', 'Sunita Agarwal', 'Vijay Krishnan', 'Nandita Saxena', 'Prasad Ghosh',
];

async function seed() {
  try {
    await mongoose.connect(config.mongo.uri);
    console.log('✅ Connected to MongoDB');

    
    await Promise.all([User.deleteMany({}), Employee.deleteMany({})]);
    console.log('🗑️  Cleared existing data');

    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@empmanage.com',
      password: 'Admin@123',
      role: 'admin',
    });
    console.log(`✅ Admin created: ${admin.email}`);

    
    await User.create({
      name: 'HR Manager',
      email: 'hr@empmanage.com',
      password: 'Hr@12345',
      role: 'hr',
    });
    console.log('✅ HR user created: hr@empmanage.com');

    
    const employees = SAMPLE_NAMES.map((name, i) => {
      const emailName = name.toLowerCase().replace(' ', '.').replace(/[^a-z.]/g, '');
      return {
        fullName: name,
        email: `${emailName}@company.com`,
        phone: `+91 ${Math.floor(7000000000 + Math.random() * 2999999999)}`,
        department: randomItem(DEPARTMENTS),
        designation: randomItem(DESIGNATIONS),
        salary: Math.floor(300000 + Math.random() * 1700000),
        status: randomItem(STATUSES),
        joiningDate: randomDate(new Date('2020-01-01'), new Date()),
        address: `${Math.floor(100 + Math.random() * 900)}, ${randomItem(['MG Road', 'Park Street', 'Brigade Road', 'Linking Road', 'Connaught Place'])}, India`,
        profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4`,
      };
    });

    await Employee.insertMany(employees);
    console.log(`✅ Created ${employees.length} sample employees`);

    console.log('\n🎉 Seeding complete!');
    console.log('─────────────────────────────────');
    console.log('Admin credentials:');
    console.log('  Email:    admin@empmanage.com');
    console.log('  Password: Admin@123');
    console.log('\nHR credentials:');
    console.log('  Email:    hr@empmanage.com');
    console.log('  Password: Hr@12345');
    console.log('─────────────────────────────────');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

seed();
