import mongoose  from "mongoose";



interface FinancialRecord {  //structure of the document in mongodb
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethods: string;
}
const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userId: { type: String, required: true},
    date: { type: Date, required: true},
    description: { type: String, required: true},
    amount: { type: Number, required: true},
    category: { type: String, required: true},
    paymentMethods: { type: String, required: true},


});
 
const financialRecordModel = mongoose.model<FinancialRecord>("FinancialRecord", financialRecordSchema);
// FinancialRecord is the name of the collection in the database
export default financialRecordModel;