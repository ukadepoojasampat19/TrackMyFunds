import React, { useState} from "react";
import { useUser} from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import "./financial-record.css"


export const FinancialRecordForm = () => {
    const [description, setDescription] = useState<string>("");
    const [amount, setamount] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [paymentMethods, setPaymentMethods] = useState<string>("");
    const { addRecord } = useFinancialRecords();

    const { user } = useUser();

    const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //format od sttoring values in database
        const newRecord = {
            userId: user?.id ?? "",
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethods: paymentMethods,
        };

        try {
            addRecord(newRecord);
            //After succesfully sending data to database the field ahould be empty
       
            setDescription("");
            setamount("");
            setCategory("");
            setPaymentMethods("");
        } catch (error) {
            console.error("Error adding record:", error);
        }
        

       


    };
        
    return (
        <div className="form-container">
            <form onSubmit={handelSubmit}>
                <div className="form-field">
                    <label>description:</label>
                    <input type="text" required className="input" value={description} onChange={(e) =>setDescription(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Amount:</label>
                    <input type="number" required className="input"  value={amount} onChange={(e) =>setamount(e.target.value)}/>
                </div>
                <div className="form-field">
                    <label>Category:</label>
                    <select required className="input" value={category} onChange={(e) =>setCategory(e.target.value)}>
                        <option value="">select a category</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities</option>
                        <option value="entertainment">entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Payment method:</label>
                    <select required className="input" value={paymentMethods} onChange={(e) =>setPaymentMethods(e.target.value)}>
                        <option value="">Select a payment Method</option>
                        <option value="Credit Card">Credit card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">bank Transfer</option>
                    </select>
                </div>
                <button type="submit" className="button"> Add Record</button>
            </form>
        </div>
    )
}