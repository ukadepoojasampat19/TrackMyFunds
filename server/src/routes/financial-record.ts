import express, { Request, Response } from "express";
import financialRecordModel from "../schema/financial-record";

const router = express.Router();

//received data
router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId; // Extracts the userId parameter from the request URL.is a way to access route parameters in an Express.js application
        const records = await financialRecordModel.find({userId});

        console.log(userId)

        if (records.length === 0) {
            res.status(404).send("No record found for the user."); // 404 not found response
        }
        res.status(200).send(records);
        //200 succes response  
    } catch (err) {
        console.log("err is " ,err)
        res.status(500).send(err);
        //500 server error

    }
});



//send data
router.post("/", async (req: Request, res: Response) => {
    try {
        const newRecordBody = req.body;
        console.log(newRecordBody);
        
        const newRecord = new financialRecordModel(newRecordBody);

        const savedRecord = await newRecord.save();
       // console.log(req.body)
        res.status(200).send(savedRecord);
        //200 succes response  
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
        //500 server error

    }
});

//update data

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id  = req.params.id;
         console.log(id);
        const newRecordBody = req.body;
        console.log(newRecordBody);
        const record = await financialRecordModel.findByIdAndUpdate(id, newRecordBody, {new: true});
        console.log("record:",record);

        if(!record){
            res.status(404).send("Record not found");
        }
        res.status(200).send(record);
        //200 succes response  
    } catch (err) {
        res.status(500).send(err);
        //500 server error

    }
});

//delete data

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id  = req.params.id;
       // console.log(id);
        const record = await financialRecordModel.findByIdAndDelete(id);

        if(!record){
            res.status(404).send("Record not found");
        }
        res.status(200).send(record);
        //200 succes response  
    } catch (err) {
        res.status(500).send(err);
        //500 server error

    }
});

export default router;