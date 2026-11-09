const express = require("express");
import Jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import pool from "../config/db.js"
import CookiParser from "cookie-parser";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
}

const generateToken = (id) => {
    return Jwt.sign({id}, process.env.JWT_SECRET, {expires_in: '30d'});
}

router.post('/register', async (req, res) => {
    const {username , email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: 'Please provide all required fields'});
    }

    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if(userExists.rowCount.length > 0){
        return res.status(400).json({message : 'User already exists'});
    }

    const hashedPassword = await bcrypt(password, 10);

    const newUser = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, %3) RETURNING id, name, email', [username, email, hashedPassword]);

    const token = generateToken(newUser.rows[0].id);

    res.cookie('token', token, cookieOptions);

    return res.status(201).json({ user: newUser.rows[0] });
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message: 'Please fill all required fields'});
    }

    const userData = user.rows[0];

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if(user.rows.length === 0){
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if(!isMatch){
        return res.status(400).json({message: 'Inavlid credentials'});
    }

    const token = generateToken(userData.id);

    res.cookie('token', token, cookieOptions);

    res.json({id: userData.id, email: userData.email, name: userData.name});
})

router.get('/me', protect,async (req, res) =>{
    res.json(req.user);
})

router.post('/logout', (req, res) => {
    res.cookie('token', "", {...cookieOptions, maxAge: 1});
    res.json({message: "Logout Successful"});
})

export default router;