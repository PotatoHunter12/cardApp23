import mongoose from 'mongoose';

// Define a schema for the elements
const elementSchema = new mongoose.Schema({
    items: [
      {
        name: {
          type: String,
          required: true
        },
        value: {
          type: Number,
          default: 0
        }
      }
    ]
});
  

// Create a model based on the schema
const Element = mongoose.model('Element', elementSchema);

export default Element;
