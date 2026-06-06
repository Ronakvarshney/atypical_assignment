const { pool } = require("../../../core/db");

const createOrder = async (req, res) => {
  try {
    const { customer_name, product_name, status } = req.body;

    if (!customer_name || !product_name || !status) {
      return res.status(400).json({
        message: "Provide all credentials first.",
      });
    }

    await pool.query(
      `
      INSERT INTO Orders(
        customer_name,
        product_name,
        status
      )
      VALUES($1,$2,$3)
      `,
      [customer_name, product_name, status]
    );

    return res.status(201).json({
      message: "Order created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        message: "Order id and status are required",
      });
    }

    const result = await pool.query(
      `
      UPDATE Orders
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      order: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM Orders
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
      deletedOrder: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: error.message,
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
};