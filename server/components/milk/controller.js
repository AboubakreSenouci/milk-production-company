const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbFilePath = path.join(__dirname, '..', '..', 'db', 'db.json');

let { milk } = JSON.parse(fs.readFileSync(dbFilePath));

exports.getMilk = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: milk.length,
        data: milk 
    });
};

exports.addMilk = (req, res) => {
    try {
        const { milkquantity, date } = req.body;

        const newItem = {
            id: uuidv4(),
            milkquantity,
            date
        };

        milk.push(newItem);
        saveData(); 

        res.status(201).json({
            status: 'success',
            data: {
                milk: newItem,
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



exports.deleteMilk = (req, res) => {
    const { id } = req.params;

    const index = milk.findIndex((item) => item.id === id);

    if (index !== -1) {
        milk.splice(index, 1);
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

exports.editMilk = (req, res) => {
    const { id } = req.params;
    const { milkquantity, date } = req.body;

    const index = milk.findIndex((item) => item.id === id);

    if (milk[index]) {
        milk[index].milkquantity = milkquantity;
        milk[index].date = date;
        saveData();

        res.status(200).json({
            status: 'success',
            message: 'Cow updated successfully',
            data: {
                milk: milk[index],
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
    data.milk = milk;
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}