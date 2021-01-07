const { v4: uuidv4 } = require('uuid');


module.exports = mongoose => {
    const Transaction = mongoose.model(
      "transaction",
      mongoose.Schema(
        {
          id: String,
          description: String,
          date: String,
          debit: Number,
          credit: Number,
          userId: String,
        },
        { timestamps: true }
      )
    );
  
    return Transaction;
  };