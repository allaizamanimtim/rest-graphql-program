const express = require('express');
const router = express.Router();

// Shared in-memory data with fields: id, name, age, gender
let users = [
  { id: '1', name: 'Juan Dela Cruz', age: 25, gender: 'Male' },
  { id: '2', name: 'Maria Santos', age: 22, gender: 'Female' },
  { id: '3', name: 'Alex Cruz', age: 28, gender: 'Non-binary' }
];

let nextId = 4;

function generateId() {
  return String(nextId++);
}

// ==========================================
// REST API - 5 HTTP Methods
// ==========================================

// Method 1: GET (All users)
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// Method 2: GET (Single user by ID)
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.status(200).json({ success: true, data: user });
});

// Method 3: POST (Create user)
router.post('/', (req, res) => {
  const { name, age, gender } = req.body;
  if (!name || age === undefined || !gender) {
    return res.status(400).json({ success: false, message: 'Please provide name, age, and gender' });
  }
  const newUser = {
    id: generateId(),
    name,
    age: Number(age),
    gender
  };
  users.push(newUser);
  res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
});

// Method 4: PUT (Update user)
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const { name, age, gender } = req.body;
  users[index] = {
    id: req.params.id,
    name: name !== undefined ? name : users[index].name,
    age: age !== undefined ? Number(age) : users[index].age,
    gender: gender !== undefined ? gender : users[index].gender
  };
  res.status(200).json({ success: true, message: 'User updated successfully', data: users[index] });
});

// Method 5: DELETE (Delete user)
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const deletedUser = users.splice(index, 1)[0];
  res.status(200).json({ success: true, message: 'User deleted successfully', data: deletedUser });
});

module.exports = {
  router,
  users,
  generateId
};
