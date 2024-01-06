const Qualification = require("../models/Qualification");

class QualificationController{

    static storeQualification = async(req,res) => {
        try {
            const { qualificationName } = req.body;

            const data = await Qualification.create({
                qualificationName: qualificationName,
            });

            if (data) {
                res.status(201).json({ status: 'success', message: 'Qualification Saved Successfully' });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static fetchQualifications = async(req,res) => {
        try {
            const data = await Qualification.findAll({
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

    static fetchQualification = async (req, res) => {
        try {
            const data = await Qualification.findByPk(req.params.id);
    
            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static updateQualification = async (req, res) => {
        try {
            const { qualificationName } = req.body;
    
            await Qualification.update(
                {
                    qualificationName,
                },
                {
                    where: { id: req.params.id },
                }
            );
    
            res.status(201).json({ status: 'success', message: 'Qualification Updated Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static deleteQualification = async (req, res) => {
        try {
            await Qualification.update(
                {
                    isDeleted: 1,
                },
                {
                    where: { id: req.params.id },
                }
            );
        
            res.status(201).json({ status: 'success', message: 'Qualification Deleted Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

}
module.exports = QualificationController