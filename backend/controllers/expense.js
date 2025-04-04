const ExpenseSchema = require('../models/ExpenseModel.js');


exports.addExpense = async(req,res) => {
    const {title,amount,category,description,date} = req.body;

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try{
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message:"All fields are required!"});
        }

        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number'});
        }

        await income.save();
        res.status(200).json({message: 'Expense Added Successfully'});
    }
    catch(err){
        res.status(500).json({message:'Server Error'});
    }
    console.log(income.date);
}


exports.getExpenses = async(req,res) => {
    try{
        const incomes = await ExpenseSchema.find().sort({createdAt: -1});
        res.status(200).json(incomes);
    }catch(err){
        res.status(500).json({message:'Server Error'});
    }   
}

exports.deleteExpense = async(req,res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: 'Expense Deleted'});
        })
        .catch((err) => {
            res.status(500).json({message:"Server error"})
        })
}