const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbFilePath = path.join(__dirname, '..', '..', 'db', 'db.json');

let { births } = JSON.parse(fs.readFileSync(dbFilePath));

exports.getBriths = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: births.length,
        data: births
    });
};

exports.addBirth = (req, res) => {
    try {
        const { gender, datebirth, strain } = req.body;

        const newItem = {
            id: uuidv4(),
            datebirth,
            gender,
            strain
        };

        births.push(newItem);
        saveData();

        res.status(201).json({
            status: 'success',
            data: {
                births: newItem,
            }
        });
    } catch (error) {
        console.error('Error adding cow:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add cow',
        });
    }
};



exports.deleteBirth = (req, res) => {
    const { id } = req.params;

    const index = births.findIndex((item) => item.id === id);

    if (index !== -1) {
        births.splice(index, 1);
        saveData(); 

        res.status(200).json({
            status: 'success',
            message: 'Cow deleted successfully',
            data: {
                milk: null,
            },
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Cow not found',
        });
    }
};

exports.editBirth = (req, res) => {
    const { id } = req.params;
    const { datebirth,gender,strain } = req.body;

    const index = births.findIndex((item) => item.id === id);

    if (births[index]) {
        births[index].strain = strain;
        births[index].datebirth = datebirth;
        births[index].gender = gender;
        saveData();

        res.status(200).json({
            status: 'success',
            message: 'Cow updated successfully',
            data: {
                births: births[index],
            },
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Cow not found',
        });
    }
};

function saveData() {
    const data = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    data.births = births;
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}