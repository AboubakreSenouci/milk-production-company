const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbFilePath = path.join(__dirname, '..', '..', 'db', 'db.json');

let { examinations } = JSON.parse(fs.readFileSync(dbFilePath));

exports.getExams = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: examinations.length,
        data: examinations 
    });
};

exports.addExams = (req, res) => {
    try {
        const { examinationdate, disease } = req.body;

        const newExam = {
            id: uuidv4(),
            examinationdate,
            disease
        };

        examinations.push(newExam);
        saveCowsToFile(); 

        res.status(201).json({
            status: 'success',
            data: {
                examinations: newExam,
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



exports.deleteCow = (req, res) => {
    const { id } = req.params;

    const index = examinations.findIndex((exam) => exam.id === id);

    if (index !== -1) {
        examinations.splice(index, 1);
        saveCowsToFile(); 

        res.status(200).json({
            status: 'success',
            message: 'Cow deleted successfully',
            data: {
                examinations: null,
            },
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Cow not found',
        });
    }
};

exports.editCow = (req, res) => {
    const { id } = req.params;
    const { examinationdate, disease } = req.body;

    const index = examinations.findIndex((exam) => exam.id === id);

    if (examinations[index]) {
        examinations[index].examinationdate = examinationdate;
        examinations[index].disease = disease;
        saveCowsToFile(); 

        res.status(200).json({
            status: 'success',
            message: 'Cow updated successfully',
            data: {
                exam: examinations[index],
            },
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Cow not found',
        });
    }
};

function saveCowsToFile() {
    const data = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    data.examinations = examinations;
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}