const { Order, Product, User, PayMethod, OrderHasProduct } = require('../models/');


async function createNewOrder(orderProducts, payMethod, userId) {
    const products = await Promise.all(orderProducts.map(async (prod) => {
        const product = await Product.findByPk(prod.id);
        return {
            amount: prod.amount,
            price: product.price,
            id: prod.id
        };
    }));

    const totalPrice = products.reduce((acc, prod) => acc += (prod.price * prod.amount), 0);

    const newOrder = await Order.create({
        date: Date.now(),
        price: totalPrice,
        userId: userId,
        paymethodId: payMethod,
    });

    const orderHasProduct = await Promise.all(products.map(async (prod) => await OrderHasProduct.create({
        order_id: newOrder.id,
        product_id: prod.id,
        amount: prod.amount
    }, { fields: ["amount", "order_id", "product_id"] })
    ));

    return { newOrder, orderHasProduct };
}

async function updateOrderStatus(req,res){
    const orderId = req.params.id;
    try {
        const order = await Order.findByPk(orderId);
        if (!order) res.status(404).json({ message: 'Order not found' });
        const orderStatus = req.body.status;
        order.status = orderStatus;
        if (!orderStatus) res.status(400).json({ message: 'Could not update status.' });
        order.save();
        return res.status(200).json({ order });
    } catch (err) {
        res.status(500).json({ message: 'An unexpected error ocurred.' });
    }
}

async function deleteOrderById(req,res){
    const order = await Order.findByPk(req.params.id, {
        include: [
            { model: Product },
            { model: User, attributes: ["username", "fullname", "email", "adress", "tel"] },
            { model: PayMethod, attributes: ["name"] },
        ]
    });
    const orderHasProduct = await OrderHasProduct.findAll({ where: { order_id: order.id } });

    await Promise.all(orderHasProduct.map(async (o) => await o.destroy()));

    if (!order) return res.status(404).json({ Message: 'Order not found' });
    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
}


module.exports = {createNewOrder, updateOrderStatus ,deleteOrderById};