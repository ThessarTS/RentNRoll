const { Order, Vehicle, User } = require('../models/index')
class OrderController {
    static async findAllOrder(req, res, next) {
        try {
            let orders = await Order.findAll({
                where: {
                    UserId: req.user.id
                },
                include: [
                    {
                        model: Vehicle,
                        include: [User]
                    },
                    User
                ]
            })
            res.json(orders)
        } catch (error) {
            next(error)
        }
    }

    static async findOrderById(req, res, next) {
        try {
            let order = await Order.findOne({
                where: {
                    id: req.params.id
                },
                include: [{ model: Vehicle, include: [User] }, User]
            })
            res.json(order)
        } catch (error) {
            next(error)
        }
    }

    static async createOrder(req, res, next) {
        try {
            const { VehicleId, startDate, endDate } = req.body

            let vehicle = await Vehicle.findByPk(VehicleId)
            if (!vehicle) {
                throw { name: 'not_found' }
            }
            await Order.create({ VehicleId, startDate, endDate, UserId: req.user.id, ownerId: vehicle.UserId })
            res.status(201).json({ message: 'Success create new order' })
        } catch (error) {
            next(error)
        }
    }

    static async updateOrderStatus(req, res, next) {
        try {
            const id = req.params.id
            const { status } = req.body
            await Order.update({ status }, {
                where: { id }
            })
            res.json({ message: `Order status updated to ${status}` })
        } catch (error) {
            next(error)
        }
    }

    static async findAllOrderByVehicle(req, res, next) {
        try {
            let vehicle = await Vehicle.findByPk(VehicleId)

            if (!vehicle) {
                throw { name: 'not_found' }
            }

            let orders = await Order.findAll({
                where: {
                    VehicleId: req.params.vehicleid
                },
                include: [
                    {
                        model: Vehicle,
                        include: [User]
                    },
                    User
                ]
            })
            res.json(orders)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OrderController