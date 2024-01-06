const Subject = require("../models/Subject");

class SubjectController{

    static storeSubject = async(req,res) => {
        try {
            const { subjectName } = req.body;

            const data = await Subject.create({
                subjectName: subjectName,
            });

            if (data) {
                res.status(201).json({ status: 'success', message: 'Subject Saved Successfully' });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static fetchSubjects = async(req,res) => {
        try {
            const data = await Subject.findAll({
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

    static fetchSubject = async (req, res) => {
        try {
            const data = await Subject.findByPk(req.params.id);
    
            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static updateSubject = async (req, res) => {
        try {
            const { subjectName } = req.body;
    
            await Subject.update(
                {
                    subjectName,
                },
                {
                    where: { id: req.params.id },
                }
            );
    
            res.status(201).json({ status: 'success', message: 'Subject Updated Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static deleteSubject = async (req, res) => {
        try {
            await Subject.update(
                {
                    isDeleted: 1,
                },
                {
                    where: { id: req.params.id },
                }
            );
        
            res.status(201).json({ status: 'success', message: 'Subject Deleted Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

}
module.exports = SubjectController