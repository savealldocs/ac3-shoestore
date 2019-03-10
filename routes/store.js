/**
 * @swagger
 * definition:
 *   store:
 *     properties:
 *       storename:
 *         type: string
 *       long:
 *         type: string
 *       lat:
 *         type: integer
 *       user:
 *         type: object
 **/

/** @swagger
 * /inventory/items/{id}:
 *   get:
 *     tags:
 *       - getitems
 *     description: Returns Items
 *     parameters:
 *       - name: id
 *         description: item id
 *         in: body
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array
 *         schema:
 *           $ref: '#/definitions/item'
 *   post:
 *     tags:
 *       - additems
 *     description: Creates a new item
 *     produces:
 *       - application/json         
 *     responses:
 *       200:
 *         description: Successfully item created
 *         schema:
 *           $ref: '#/definitions/item'
 **/
const express = require('express')
const router = express.Router()

function StoreRoutes (StoreLogic) {
  router.route('/store/:id')
    .get(({ params }, res, next) => {
      StoreLogic.getItems(params)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/store')
    .get(({ query, user }, res, next) => {
      query.user = user._id
      StoreLogic.getItems(query)
        .then(res.json.bind(res))
        .catch((err) => next(err))
    })

  router.route('/store')
    .post((req, res, next) => {
      let item = req.body
      item.user = req.user._id
      StoreLogic.upsertItem(item)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/store/delete/:id')
    .delete(({ query }, res, next) => {
      StoreLogic.removeItem(query)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })
  return router
}

module.exports = StoreRoutes
