import { sql } from "../config/db.js";

export async function getTransactionByUserId(req, res) {
  try {
    const { userId } = req.params;
    const transactions = await sql`
              SELECT * FROM transactions 
              WHERE user_id = ${userId}
              ORDER BY created_at DESC
            `;
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
}

export async function deleteTransactionById(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(id) || !Number.isInteger(Number(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const deletedTransaction = await sql`
              DELETE FROM transactions 
              WHERE id = ${id}
              RETURNING *
            `;

    if (deletedTransaction.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      deletedTransaction: deletedTransaction[0],
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Error deleting transaction" });
  }
}

export async function getTransactionSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;
    const balanceResult = await sql`
              SELECT COALESCE(SUM(amount),0) AS balance FROM transactions WHERE user_id = ${userId}
            `;
    const incomeResult = await sql`
              SELECT COALESCE(SUM(amount),0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0
            `;
    const expenseResult = await sql`
              SELECT COALESCE(SUM(amount),0) AS expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
            `;
    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expenseResult[0].expenses,
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Error fetching summary" });
  }
}

export async function createTransaction(req, res) {
  try {
    const { user_id, title, amount, category } = req.body;
    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const transaction =
      await sql`INSERT INTO transactions (user_id, title, amount, category) 
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
            `;
    console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating transaction" });
  }
}
