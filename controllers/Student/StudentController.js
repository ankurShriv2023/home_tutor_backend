const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const Claas = require('../../models/Claas');
const Student = require('../../models/Student');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'depjzfj9a',
  api_key: '489915939841262',
  api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
});

class StudentController {
    static storeStudentFirstStep = async (req, res) => {
        try {
            const { studentName, studentGender, studentPhone, studentCity, studentClass, role } = req.body;

            const data = await Student.create({
                studentName: studentName,
                studentGender: studentGender,
                studentPhone: studentPhone,
                studentCity: studentCity,
                student_class: studentClass,
                role: role
            });

            if (data) {
                res.status(201).json({ status: 'success', message: 'Student Saved Successfully', studentID: data?.id });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: `Error: ${err}` });
        }
    }

    static storeStudentSecondStep = async (req, res) => {
        try {
            // console.log(req.body);
            const { fatherName, motherName, email, password  } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const data = await Student.update(
                {
                    fatherName: fatherName,
                    motherName: motherName,
                    studentEmail: email,
                    password: hashPassword,
                },
                {
                    where: { id: req.params.id },
                }
            );

            if (data) {
                res.status(201).json({ status: 'success', message: 'Student Saved Successfully', studentID: req.params.id });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static storeStudentThirdStep = async (req, res) => {
        try {
            const file = req.files.studentImage;

            if (file.size >= 1500000) {
                res.status(401).json({ status: 'failed', message: 'File Size is too long, Select less than 15MB' });
            } else {
                const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'educationTutorImages',
                });

                const data = await Student.update(
                    {
                        studentImage: {
                            public_id: myCloud.public_id,
                            url: myCloud.secure_url,
                        },
                    },
                    {
                        where: { id: req.params.id },
                    }
                );
    
                if (data) {
                    res.status(201).json({ status: 'success', message: 'Student Saved Successfully' });
                } else {
                    res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
                }
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static fetchStudents = async (req, res) => {
        try {
            const data = await Student.findAll({
                where: { isDeleted: 0 },
                order: [['id', 'DESC']],
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

    static fetchStudent = async (req, res) => {
        try {
            const data = await Student.findByPk();

            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static changeStudentStatus = async (req, res) => {
        try {
            const studentData = await Student.findByPk(req.params.id);

            await Student.update(
                {
                    isApproved: studentData.isApproved == 0 ? 1 : 0,
                },
                {
                    where: { id: req.params.id },
                }
            );
            
            res.status(201).json({ status: 'success', message: 'Student Approval Status Changed Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static updateStudent = async (req, res) => {
        try {
            const { 
                studentName, 
                studentGender,
                studentPhone, 
                studentCity, 
                studentClass,
                fatherName,
                motherName,
                email,
                studentImage,
            } = req.body;

            if (req.files != null) {
                const userImg = await Student.findByPk(req.params.id);

                if (userImg.studentImage.public_id) {
                    const imageId = userImg.studentImage.public_id;
                    await cloudinary.uploader.destroy(imageId);
                }

                const file = req.files.studentImage;
                const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'educationTutorImages',
                });

                await Student.update(
                    {
                        studentName, 
                        studentGender,
                        studentPhone, 
                        studentCity, 
                        studentClass,
                        fatherName,
                        motherName,
                        email,
                        studentImage: {
                            public_id: myCloud.public_id,
                            url: myCloud.secure_url,
                        },
                    },
                    {
                        where: { id: req.params.id },
                    }
                );
            } else {
                    await Student.update(
                    {
                        studentName, 
                        studentGender,
                        studentPhone, 
                        studentCity, 
                        studentClass,
                        fatherName,
                        motherName,
                        email,
                    },
                    {
                        where: { id: req.params.id },
                    }
                );
            }

            res.status(201).json({ status: 'success', message: 'Student Updated Successfully' });
        } catch (err) {
        res.status(401).json({ status: 'failed', message: err });
        }
    }

    static deleteStudent = async (req, res) => {
        try {
            await Student.update(
                {
                    isDeleted: 1,
                },
                {
                    where: { id: req.params.id },
                }
            );

            res.status(201).json({ status: 'success', message: 'Student Deleted Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }
}

module.exports = StudentController;