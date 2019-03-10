/**
 * @swagger
 * definition:
 *   order:
 *     properties:
 *       transaction:
 *         type: Object
 *       orderCost:
 *         type: integer
 *       issueDate:
 *         type: Date
 *       effectiveDate:
 *         type: Date
 *       user:
 *         type: object
 **/

/** @swagger
 * /inventory/orders:
 *   get:
 *     tags:
 *       - getorder
 *     description: Returns order
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array
 *         schema:
 *           $ref: '#/definitions/order'
 *   post:
 *     tags:
 *       - addorder
 *     description: Creates a new order
 *     produces:
 *       - application/json         
 *     responses:
 *       200:
 *         description: Successfully item created
 *         schema:
 *           $ref: '#/definitions/order'
 **/
/** @swagger
 * /inventory/orders/delete/{id}:
 *   post:
 *     tags:
 *       - deleteorder
 *     description: Deletes order
 *     produces:
 *       - application/json         
 *     responses:
 *       200:
 *         description: Successfully order deleted
 *         schema:
 *           $ref: '#/definitions/order'
 **/
/** @swagger
 * /orders/{id}/makeEffective:
 *   post:
 *     tags:
 *       - Make Effective
 *     description: Makes effective order
 *     produces:
 *       - application/json         
 *     responses:
 *       200:
 *         description: Make order effective
 *         schema:
 *           $ref: '#/definitions/order'
 **/

'use strict'
const express = require('express')
const router = express.Router()
const parseQueryDateRange = require('../helpers/parametersParser')
  .parseQueryDateRange

function OrdersRoutes(OrdersLogic) {
  router.route('/orders')
    .get(function ({ query, user }, res, next) {
      query.user = user._id
      OrdersLogic.getOrders(query)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/orders')
    .post(function (req, res, next) {
      var order = req.body
      order.user = req.user._id
      OrdersLogic.saveOrder(order)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/orders/delete/:id')
    .delete(function ({ query }, res, next) {
      OrdersLogic.removeOrder(query)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/orders/:id/makeEffective')
    .post(function (req, res, next) {
      OrdersLogic.makeOrderEffective(req.user._id, req.params.id)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })
  return router
}

module.exports = OrdersRoutes
