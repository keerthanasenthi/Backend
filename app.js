//const {json}=require("body-parser")
var express=require("express");
const mongoose=require("mongoose")
const {v4:uuidv4}=require("uuid");
const app=express();
app.use(express.json())//middleware
mongoose.connect("mongodb+srv://keerthana:keerthu-0401@cluster0.qeaumxm.mongodb.net/expense").then(()=>{
    console.log("Connected to database");
})
const expenseScehma=new mongoose.Schema({//create 
    id:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true}
});
const Expenses=mongoose.model("Expenses",expenseScehma);//model
//get function
app.get("/api/expenses", async(req,res)=>{
    try{
    const expenses=await Expenses.find();
    res.status(200).json(expenses)
    }catch(err){
        res.status(500).json({message:"Failed to fetch expenses"});
    }
})
app.get("/api/expenses/:id", async(req,res)=>{
    try{
        const{id}=req.params;
        const expense=await Expenses.findOne({id})
        if(!expense){
            return res.status(404).json({message:"Expense not found"})
        }
        res.status(200).json(expense)
    }catch(err){
        res.status(404).json({message:"Error in fetching expenses"});
    }
})

//post function
app.post("/api/expenses", async(req,res)=>{
    console.log(req.body)
    const {title,amount}=req.body;
    try{
    const newExpenses=new Expenses({
        id:uuidv4(),
        title:title,
        amount:amount
    });
    const savedExpense=await newExpenses.save()
    res.status(200).json(savedExpense)
}catch(err){
    res.status(500).json({message:"Error in creating expensens"});
}
})
//put function
app.put("/api/expenses/:id",async(req,res)=>{
    const {id}=req.params;
    const{title,amount}=req.body;
    try{
        const updateExpenses=await Expenses.findOneAndUpdate(
        {id},
        {title,amount},
)
if(!updateExpenses){
    return res.status(404).json({message:"Expense not found"})
}
res.status(200).json({message:"Updated successfully"});
    }
    catch(error)
    {
   res.status(500).json({ message: "Error in updating data"});
    }
});
// delete function
app.delete("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExpense = await Expenses.findOneAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully", deletedExpense });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in deleting expense" });
    }
});
/**const students=[
   // {
        //name:"keerthana",
        //age:20,
        //roll:1
   // },{
       // name:"madhu",
        //age:19,
        //roll:2
    //},{
        //name:"hari",
        //age:18,
        //roll:3
    //}
//]
//app.get("/api/sayhello",(req,res)=>{
   // res.send("Hello CCE");
    //res.end();
//});
//app.get("/api/students",(req,res)=>{
    //res.status(200).json(students);
//});
//app.get("/api/students/:rollno",(req,res)=>{
    const{rollno}=req.params;
    const student=students.find((student)=>student.roll==rollno);
    if(!student){
        res.status(404).json({message:"Student not found"});
    }else{
        res.status(200).json(student);
    }
});**/
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
});