// Import database connection or ORM (e.g., Sequelize, Mongoose)
import db from '../db/db.js';

// Get user by email
export const getUserByEmail = async (email) => {
  try {
    const user = await db('users').where({ email }).first();
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async ({ username, email, password }) => {
  try {
    const [newUser] = await db('users').insert({ username, email, password }).returning(['id', 'username', 'email']);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
