const { Op } = require('sequelize');
const sequelize = require('../../db/sequelizeDB');
const Classs = require('../../models/Classs');
const Subject = require('../../models/Subject');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const Claas = require('../../models/Claas');
const Course = require('../../models/Course');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'depjzfj9a',
  api_key: '489915939841262',
  api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
});

class TutorController {
    static storeTutorFirstStep = async (req, res) => {
        try {
            const { tutorName, tutorEmail, password, tutorPhone, tutorCity, tutorYearOfExperience, role } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const data = await User.create({
                tutorName: tutorName,
                tutorEmail: tutorEmail,
                password: hashPassword,
                tutorPhone: tutorPhone,
                tutorCity: tutorCity,
                tutorYearOfExperience: tutorYearOfExperience,
                role: role
            });

            if (data) {
                res.status(201).json({ status: 'success', message: 'Project Saved Successfully', userID: data?.id });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static storeTutorSecondStep = async (req, res) => {
        try {
            // console.log(req.body);
            const { tutorClass, tutorSubject, tutorQualification, courses  } = req.body;

            const parsedTutorClass = JSON.parse(tutorClass);
            const parsedTutorSubject = JSON.parse(tutorSubject);
            const parsedTutorQualification = JSON.parse(tutorQualification);
            const parsedCourses = JSON.parse(courses);


            const data = await User.update(
                {
                    tutorClass: parsedTutorClass,
                    tutorSubject: parsedTutorSubject,
                    tutorQualification: parsedTutorQualification,
                    courses: parsedCourses,
                },
                {
                    where: { id: req.params.id },
                }
            );

            if (data) {
                res.status(201).json({ status: 'success', message: 'Project Saved Successfully', userID: req.params.id });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static storeTutorThirdStep = async (req, res) => {
        try {
            const { classSchedule, feesForClasses  } = req.body;
            console.log(req.body);

            const parsedClassSchedule = JSON.parse(classSchedule);
            const parsedFeesForClasses = JSON.parse(feesForClasses);

            const data = await User.update(
                {
                    feesForClasses: parsedFeesForClasses,
                    classSchedule: parsedClassSchedule,
                },
                {
                    where: { id: req.params.id },
                }
            );

            if (data) {
                res.status(201).json({ status: 'success', message: 'Project Saved Successfully', userID: req.params.id });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static storeTutorFourthStep = async (req, res) => {
        try {
            const { profileDescription } = req.body
            const file = req.files.profileImage;

            if (file.size >= 1500000) {
                res.status(401).json({ status: 'failed', message: 'File Size is too long, Select less than 15MB' });
            } else {
                const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'educationTutorImages',
                });

                const data = await User.update(
                    {
                        profileDescription: profileDescription,
                        profileImage: {
                            public_id: myCloud.public_id,
                            url: myCloud.secure_url,
                        },
                    },
                    {
                        where: { id: req.params.id },
                    }
                );
    
                if (data) {
                    res.status(201).json({ status: 'success', message: 'Project Saved Successfully' });
                } else {
                    res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
                }
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static fetchTutors = async (req, res) => {
        try {
            const data = await User.findAll({
                where: { role: 'tutor', isDeleted: 0 },
                order: [['id', 'DESC']],
                include: [
                    {
                        model: Subject,
                        as: 'subject',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
                    },
                    {
                        model: Claas,
                        as: 'claas',
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
    
    static fetchFilteredTutors = async (req, res) => {
        try {
            const { city, claas, subject, course } = req.body;
    
            const intClassValue = claas != '' ? parseInt(claas, 10) : ''
            const intSubjectValue = subject != '' ? parseInt(subject, 10) : ''
            const intCourseValue = course != '' ? parseInt(course, 10) : ''

            const data = await sequelize.query(`
                SELECT *
                FROM users
                WHERE role = 'tutor'
                    AND isDeleted = 0
                    ${city ? `AND tutorCity = '${city}'` : ''}
                    ${claas ? `AND JSON_CONTAINS(tutorClass, '{"id": ${intClassValue}}')` : ''}
                    ${subject ? `AND JSON_CONTAINS(tutorSubject, '{"id": ${intSubjectValue}}')` : ''}
                    ${course ? `AND JSON_CONTAINS(courses, '{"id": ${intCourseValue}}')` : ''}
                ORDER BY id DESC;
            `, { type: sequelize.QueryTypes.SELECT });
    
            // console.log(data);
    
            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            console.error(err);
            res.status(401).json({ success: false, message: err.message });
        }
    }

    static fetchTutorsCityWise = async (req, res) => {
        try {
            const data = await User.findAll({
                where: { city: req.body.city, role: 'tutor', isDeleted: 0 },
                order: [['id', 'DESC']],
                include: [
                    {
                        model: Subject,
                        as: 'subject',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
                    },
                    {
                        model: Classs,
                        as: 'classs',
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

    static fetchTutor = async (req, res) => {
        try {
            const data = await User.findByPk(req.params.id, {
                include: [
                    { model: Claas, as: 'claas' },
                    { model: Subject, as: 'subject' },
                    { model: Course, as: 'course' },
                ],
            });

            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static changeTutorStatus = async (req, res) => {
        try {
            const tutorData = await User.findByPk(req.params.id);

            await User.update(
                {
                    isApproved: tutorData.isApproved == 0 ? 1 : 0,
                },
                {
                    where: { id: req.params.id },
                }
            );
            
            res.status(201).json({ status: 'success', message: 'Tutor Approval Status Changed Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static updateTutor = async (req, res) => {
        try {
            const { 
                tutorName, 
                tutorEmail,
                tutorPhone, 
                tutorCity, 
                tutorYearOfExperience,
                tutorClass,
                tutorSubject,
                tutorQualification,
                classSchedule,
                courses,
                feesForClasses,
                profileDescription, 
            } = req.body;

            if (req.files != null) {
                const userImg = await User.findByPk(req.params.id);

                if (userImg.profileImage.public_id) {
                    const imageId = userImg.profileImage.public_id;
                    await cloudinary.uploader.destroy(imageId);
                }

                const file = req.files.profileImage;
                const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'educationTutorImages',
                });

                await User.update(
                    {
                        tutorName, 
                        tutorEmail,
                        tutorPhone, 
                        tutorCity, 
                        tutorYearOfExperience,
                        tutorClass,
                        tutorSubject,
                        tutorQualification,
                        classSchedule,
                        courses,
                        feesForClasses,
                        profileDescription,
                        profileImage: {
                            public_id: myCloud.public_id,
                            url: myCloud.secure_url,
                        },
                    },
                    {
                        where: { id: req.params.id },
                    }
                );
            } else {
                    await User.update(
                    {
                        tutorName, 
                        tutorEmail,
                        tutorPhone, 
                        tutorCity, 
                        tutorYearOfExperience,
                        tutorClass,
                        tutorSubject,
                        tutorQualification,
                        classSchedule,
                        courses,
                        feesForClasses,
                        profileDescription,
                    },
                    {
                        where: { id: req.params.id },
                    }
                );
            }

            res.status(201).json({ status: 'success', message: 'User Updated Successfully' });
        } catch (err) {
        res.status(401).json({ status: 'failed', message: err });
        }
    }

    static deleteTutor = async (req, res) => {
        try {
            await User.update(
                {
                isDeleted: 1,
                },
                {
                where: { id: req.params.id },
                }
            );

            res.status(201).json({ status: 'success', message: 'User Deleted Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }
}

module.exports = TutorController;