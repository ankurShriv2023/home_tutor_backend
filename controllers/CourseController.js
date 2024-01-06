const Course = require("../models/Course");

class CourseController{

    static storeCourse = async(req,res) => {
        try {
            const { courseName } = req.body;

            const data = await Course.create({
                courseName: courseName,
            });

            if (data) {
                res.status(201).json({ status: 'success', message: 'Course Saved Successfully' });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static fetchCourses = async(req,res) => {
        try {
            const data = await Course.findAll({
                where: { isDeleted: 0 },
                order: [['id', 'DESC']],
            });
      
            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static fetchCourse = async (req, res) => {
        try {
            const data = await Course.findByPk(req.params.id);
    
            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static updateCourse = async (req, res) => {
        try {
            const { courseName } = req.body;
    
            await Course.update(
                {
                    courseName,
                },
                {
                    where: { id: req.params.id },
                }
            );
    
            res.status(201).json({ status: 'success', message: 'Course Updated Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static deleteCourse = async (req, res) => {
        try {
            await Course.update(
                {
                    isDeleted: 1,
                },
                {
                    where: { id: req.params.id },
                }
            );
        
            res.status(201).json({ status: 'success', message: 'Course Deleted Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

}
module.exports = CourseController