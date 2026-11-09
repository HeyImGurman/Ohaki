import express from "express";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

export const protect = async (req, res) => {
    try {
        const token = req.cookies.token;

        if(!token){
            res.status(400).json({message : 'User not found'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.id]);

        if(user.rows.length === 0){
            res.status(400).json({message: "user not found"});
        }

        req.user = user.rows[0];
        next();
    }
    catch(error) {
        res.status(401).json({message: 'User not authorized'});
    }
}