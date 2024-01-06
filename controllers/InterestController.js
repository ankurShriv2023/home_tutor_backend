const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const sequelize = require('../db/sequelizeDB');
const Student = require('../models/Student');
const User = require('../models/User');
const Interest = require('../models/Interest');

class InterestController {

    static store = async (req, res) => {
        try {
            const { tutorId, studentId } = req.body;

            const interests = await Interest.findAll({
                where: {
                    studentId: studentId,
                    tutorId: tutorId
                }
            });

            if (interests.length > 0) {
                // res.status(201).json({ status: 'success', message: 'Interest Already Sent' });
                var data = await Interest.update(
                    {
                        isDeleted: interests[0]?.dataValues?.isDeleted == 1 ? 0 : 1,
                        isApproved: 0,
                    },
                    {
                        where: {
                            tutorId: tutorId,
                            studentId: studentId,
                        },
                    }
                );
            } else {        
                var data = await Interest.create({
                    tutorId: tutorId,
                    studentId: studentId,
                });
    
            }
            if (data) {
                res.status(201).json({ status: 'success', message: 'Interest Sent Successfully' });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static fetchAllInterest = async (req, res) => {
        try {
            const data = await Interest.findAll({
                order: [['id', 'DESC']],
                include: [
                    {
                        model: Student,
                        as: 'student',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
                    },
                ],
            });

            // console.log(data);

            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static fetchInterestedTutor = async (req, res) => {
        try {
            const data = await sequelize.query(
                `
                SELECT
                *
                FROM
                    interests
                    JOIN students ON interests.studentId = students.id
                    JOIN users ON interests.tutorId = users.id
                WHERE
                    interests.studentId = :studentId
                    AND interests.isDeleted = 0
                ORDER BY
                    interests.id DESC
                `,
                {
                    type: QueryTypes.SELECT,
                    replacements: { studentId: req.params.id },
                }
            );
    
            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: `Error: ${err}` });
        }
    };
    
    static fetchInterestedStudent = async (req, res) => {
        try {
            const data = await sequelize.query(
                `
                SELECT
                    interests.id AS interestId,
                    interests.isApproved,
                    students.id AS studentId,
                    users.id AS tutorId,
                    students.studentName,
                    students.studentPhone,
                    students.studentCity,
                    students.studentImage,
                    students.studentGender
                FROM
                    interests
                JOIN students ON interests.studentId = students.id
                JOIN users ON interests.tutorId = users.id
                WHERE
                    interests.tutorId = :tutorId
                    AND interests.isDeleted = 0
                ORDER BY
                    interests.id DESC
                `,
                {
                    type: QueryTypes.SELECT,
                    replacements: { tutorId: req.params.id },
                }
            );
    
            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static changeInterestStatus = async (req, res) => {
        try {
            const interestData = await Interest.findByPk(req.params.id);

            await Interest.update(
                {
                isApproved: interestData?.dataValues?.isApproved == 1 ? 0 : 1,
                },
                {
                where: { id: req.params.id },
                }
            );

            res.status(201).json({ status: 'success', message: 'Interest Status Changed successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static deleteInterest = async (req, res) => {
        try {
            await Interest.update(
                {
                isDeleted: 1,
                },
                {
                where: { id: req.params.id },
                }
            );

            res.status(201).json({ status: 'success', message: 'Interest Deleted Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }
}

module.exports = InterestController;