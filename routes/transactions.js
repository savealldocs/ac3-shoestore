/**
 * @swagger
 * definition:
 *   transaction:
 *     properties:
 *       item:
 *         type: Object
 *       provider:
 *         type: integer
 *       Date:
 *         type: Date
 *       description:
 *         type: String,
 *       quantity:
 *         type: integer,
 *       unitPrice:
 *         type: integer,
 *       invoiceNumber:
 *         type: integer,
 *       user:
 *          type: Object
 **/
/** @swagger
 * /transactions:
 *   get:
 *     tags:
 *       - get transaction
 *     description: Returns transactions
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array
 *         schema:
 *           $ref: '#/definitions/transaction'
 *   post:
 *     tags:
 *       - add transaction
 *     description: Creates a new transaction
 *     produces:
 *       - application/json         
 *     responses:
 *       200:
 *         description: Successfully transaction created
 *         schema:
 *           $ref: '#/definitions/transaction'
 **/
/** @swagger
 * /transactions/delete/{id}:
 *   post:
 *     tags:
 *       - delete transaction
 *     description: Deletes transaction
 *     produces:
 *       - application/json         
 *     responses:
 *       200:
 *         description: Successfully transaction deleted
 *         schema:
 *           $ref: '#/definitions/transaction'
 **/
/** @swagger
 * /transactions/transform:
 *   post:
 *     tags:
 *       - transform transaction
 *     description: Transform transaction
 *     produces:
 *       - application/json         
 *     responses:
 *       200:
 *         description: Successfully transaction transformed
 *         schema:
 *           $ref: '#/definitions/transaction'
 **/
/** @swagger
 * /transactions/transferItem:
 *   post:
 *     tags:
 *       - transfer item transaction
 *     description: transaction of item transfer
 *     produces:
 *       - application/json         
 *     responses:
 *       200:
 *         description: Successfully transfer item transaction performed
 *         schema:
 *           $ref: '#/definitions/transaction'
 **/
'use strict'
const express = require('express')
const router = express.Router()
const parseQueryDateRange = require('../helpers/parametersParser')
  .parseQueryDateRange

function TransactionsRoutes(TransactionsLogic) {
  router.route('/transactions')
    .get(parseQueryDateRange, function ({ query, user }, res, next) {
      if (query.direction === 'incoming') query.quantity = { '$gte': 0 }
      else if (query.direction === 'outgoing') query.quantity = { '$lt': 0 }
      delete query.direction
      query.user = user._id
      TransactionsLogic.getTransactions(query)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/transactions')
    .post(function (req, res, next) {
      var transaction = req.body
      transaction.user = req.user._id
      TransactionsLogic.saveTransaction(transaction)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/transactions/delete/:id')
    .delete(function ({ query }, res, next) {
      TransactionsLogic.removeTransaction(query)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/transactions/transform')
    .post(function (req, res, next) {
      TransactionsLogic.transform(req.user._id, req.body)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/transactions/transferItem')
    .post(function (req, res, next) {
      let senderUserID = req.user._id
      var {
        itemID,
        quantity,
        recipientUserID
      } = req.body
      TransactionsLogic.transferStock(itemID, senderUserID, recipientUserID, quantity)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  return router
}

module.exports = TransactionsRoutes
