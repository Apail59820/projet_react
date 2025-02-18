import User from "../models/user.js";
import jwt from "jsonwebtoken";
import {config} from "dotenv";


export const register = async (req, res) => {
    try {
        const {pseudo, email, password, avatar, description} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "Cet email est déjà utilisé."});

        const newUser = new User({pseudo, email, password, avatar, description});
        await newUser.save();

        res.status(201).json({message: "Utilisateur créé avec succès !"});
    } catch (error) {
        res.status(500).json({message: "Erreur serveur", error});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Identifiants invalides"});

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({message: "Identifiants invalides"});

        const token = jwt.sign({id: user._id}, config.jwtSecret, {expiresIn: "7d"});

        res.cookie("token", token, {httpOnly: true, secure: false, sameSite: "Strict"});

        res.status(200).json({message: "Connexion réussie", token});
    } catch (error) {
        res.status(500).json({message: "Erreur serveur", error});
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {expires: new Date(0)});
    res.status(200).json({message: "Déconnexion réussie"});
};
