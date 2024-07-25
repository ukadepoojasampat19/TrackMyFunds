//in this all the states or the function that alter the state exits

import { useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState } from "react";

//now context should acces anywhere in app and also function that are used to alter the records
//by using useContext can easily garb the records.

export interface FinancialRecord {
    _id?: string;  //from database when user is created
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethods: string;
}

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void; //to update the sepecific data
    deleteRecord: (id: string) => void; //to delete the specific data
}



export const FinancialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined);

export const FinancialRecordsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [records, setRecords] = useState<FinancialRecord[]>([]);


    const { user } = useUser();
    // fetch record from database
    const fetchRecords = async () => {
        try {
            if(!user) return;
           
            
            let response = await fetch(
                `https://trackmyfunds.onrender.com/financial-record/getAllByUserId/${user.id}`
            );

            console.log(response)

            if (response.ok) {
                //grabed the records from the database
                // console.log("Response:", response)
                const records = await response.json();
                console.log("Records:",records);
                setRecords(records);
            }
            else{
                console.log("record failed to fetched from database;");
            }
        } catch (err) {
            console.log("record failed to fetched");
        }
       
    };
    
    useEffect( () =>
    {
        //function will call i=on render
        fetchRecords();
    },[user]);  // [] to run its once 

    //add records
    const addRecord = async (record: FinancialRecord) => {
        if(!user) return;
        const response = await fetch(`https://trackmyfunds.onrender.com/financial-record/`, {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        });
      //  console.log("mmm")

        try {
            
            //prev is the previous state (an array of records). The spread operator (...prev) creates a new array that includes all the previous records, followed by the newRecord.
            setRecords( (prev)=>{
                return [...prev , record]
            })
            const newRecord = await response.json();
            
        } catch (err) {
            console.error("Failed to add new record", err);
        }

    };
    
    //update record
    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
        const response = await fetch(`https://trackmyfunds.onrender.com/financial-record/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            if (response.ok) {
                const newRecord = await response.json();
                //prev is the previous state (an array of records). The spread operator (...prev) creates a new array that includes all the previous records, followed by the newRecord.
                setRecords((prev) => [...prev, newRecord]);
            } else {
                throw new Error("Failed to update record");
            }
        } catch (err) {
            console.error("Failed to update record", err);
        }

    };
    //delete record
   const deleteRecord = async (id: string) => {
        const response = await fetch(`https://trackmyfunds.onrender.com/financial-record/${id}`, {
            method: "DELETE",
        });

        try {
            if (response.ok) {
                const deletedRecord = await response.json();
                //prev is the previous state (an array of records). The spread operator (...prev) creates a new array that includes all the previous records, followed by the newRecord.
                setRecords((prev) => 
                prev.filter((record) => record._id !== deletedRecord._id));
            } else {
                throw new Error("Failed to delete record");
            }
        } catch (err) {
            console.error("Failed to delete  in  record", err);
        }

    };


 
    return (
        <FinancialRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord}}>
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(FinancialRecordsContext);
    if (!context) {
        throw new Error(
            "useFinancialRecords must be used within a FinancialRecordsProvider"
        );
    }
    return context;

};