const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const SuperAdmin = require('../models/SuperAdmin');

class GuestController {

    static register = async (req, res) => {
        try {
            const {
                adminName,
                adminUserName,
                adminEmail,
                password,
                adminPhone,
                adminCity,
                adminState,
                adminCountry,
                adminPostalCode,
            } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await SuperAdmin.create({
                adminName: adminName,
                adminUserName: adminUserName,
                adminEmail: adminEmail,
                password: hashPassword,
                adminPhone: adminPhone,
                adminCity: adminCity,
                adminState: adminState,
                adminCountry: adminCountry,
                adminPostalCode: adminPostalCode,
            });

            res.status(201).json({
                status: 'success',
                message: 'Registration Successful!',
                user,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err.message });
        }
    };

    static login = async (req, res) => {
        try {
            const { email, password } = req.body;
            // console.log(req.body);

            if (email && password) {
                var user = await User.findOne({
                    where: { tutorEmail: email },
                });

                if (user) {
                const isPasswordMatched = await bcrypt.compare(password, user.password);

                    if (isPasswordMatched) {
                        if (user.isApproved != 0) {       
                            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
    
                            res.cookie('token', token);
    
                            res.status(201).json({
                                status: 'success',
                                message: 'Login Successfully with Web Token!',
                                token,
                                user,
                            });
                        } else {
                            res.status(401).json({ status: 'failed', message: 'Your Approval is Pending' });
                        }
                    } else {
                        res.status(401).json({ status: 'failed', message: 'Invalid password' });
                    }
                } else {
                    var user = await Student.findOne({
                        where: { studentEmail: email },
                    });

                    if (user) {
                        const isStudentPasswordMatched = await bcrypt.compare(password, user.password);
        
                        if (isStudentPasswordMatched) {
                            const studentToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
        
                            res.cookie('token', studentToken);
    
                            res.status(201).json({
                                status: 'success',
                                message: 'Login Successfully with Web Token!',
                                token: studentToken,
                                user,
                            });
                        } else {
                            res.status(401).json({ status: 'failed', message: 'Invalid password' });
                        }
                    } else {
                        var user = await SuperAdmin.findOne({
                            where: { adminEmail: email },
                        });
                        if (user) {
                            const isStudentPasswordMatched = await bcrypt.compare(password, user.password);
            
                            if (isStudentPasswordMatched) {
                                const superAdminToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);
            
                                res.cookie('token', superAdminToken);
        
                                res.status(201).json({
                                    status: 'success',
                                    message: 'Login Successfully with Web Token!',
                                    token: superAdminToken,
                                    user,
                                });
                            } else {
                                res.status(401).json({ status: 'failed', message: 'Invalid password' });
                            }
                        } else {
                            res.status(401).json({ status: 'failed', message: 'User not Found!' });
                        }
                    }
                }
            } else {
                res.status(401).json({ status: 'failed', message: 'All Fields are required!' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err.message });
        }
    };

    static logout = async (req, res) => {
        try {
            res.clearCookie('token');

            res.status(201).json({ success: true, message: 'Logged Out' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err.message });
        }
    }

}

module.exports = GuestController;