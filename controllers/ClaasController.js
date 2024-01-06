const Claas = require("../models/Claas");

class ClaasController{

    static storeClass = async(req,res) => {
        try {
            const { className } = req.body;

            const data = await Claas.create({
                className: className,
            });

            if (data) {
                res.status(201).json({ status: 'success', message: 'Class Saved Successfully' });
            } else {
                res.status(401).json({ status: 'failed', message: 'Internal Server Error' });
            }
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static fetchClasses = async(req,res) => {
        try {
            const data = await Claas.findAll({
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

    static fetchClass = async (req, res) => {
        try {
            const data = await Claas.findByPk(req.params.id);
    
            res.status(201).json({
                success: true,
                data,
            });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static updateClass = async (req, res) => {
        try {
            const { className } = req.body;
    
            await Claas.update(
                {
                    className,
                },
                {
                    where: { id: req.params.id },
                }
            );
    
            res.status(201).json({ status: 'success', message: 'Class Updated Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

    static deleteClass = async (req, res) => {
        try {
            await Claas.update(
                {
                    isDeleted: 1,
                },
                {
                    where: { id: req.params.id },
                }
            );
        
            res.status(201).json({ status: 'success', message: 'Class Deleted Successfully' });
        } catch (err) {
            res.status(401).json({ status: 'failed', message: err });
        }
    }

}
module.exports = ClaasController