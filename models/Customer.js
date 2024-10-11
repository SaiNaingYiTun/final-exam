import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interests: { type: [String], required: true },
  memberNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;