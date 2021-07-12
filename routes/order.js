const express = require('express');
const router = express.Router();
const { Order, Product, User, PayMethod } = require('../models');
const { createNewOrder, updateOrderStatus, deleteOrderById } = require('../services/order');
const getUserIdFromToken = require('../services/auth');
const { validateAdminAuthorization } = require('../middlewares/user');


router.get('/', validateAdminAuthorization, async (req, res) => {
    const orders = await Order.findAll({
        include: [
            { model: Product },
            { model: User, attributes: ["username", "fullname", "email", "adress", "tel"] },
            { model: PayMethod, attributes: ["name"] },
        ]
    });
    if (orders.lenght !== 0) {
        res.status(200).json(orders);
    }
})

router.post('/', async (req, res) => {
    const payMethod = req.body.paymethod;
    const orderProducts = req.body.products;
    const userId = getUserIdFromToken(req);
    const { newOrder, orderHasProduct } = await createNewOrder(orderProducts, payMethod, userId);
    res.status(200).json(newOrder);
});

router.get('/:id', async (req, res) => {
    const order = await Order.findByPk(req.params.id, {
        include: [
            { model: Product },
            { model: User, attributes: ["username", "fullname", "email", "adress", "tel"] },
            { model: PayMethod, attributes: ["name"] },
        ]
    });
    if (!order) return res.status(404).json({ Message: 'Order not found' });
    res.status(200).json(order);
});

router.put('/:id', validateAdminAuthorization, updateOrderStatus);

router.delete('/:id', validateAdminAuthorization, deleteOrderById);

const orderBodyExample = {
    "paymethod": 1,
    "products": [
        {
            "id": 1,
            "amount": 3
        },
        {
            "id": 2,
            "amount": 1
        }
    ]
}


module.exports = router;
