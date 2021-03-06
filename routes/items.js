/**
 * @swagger
 * definition:
 *   item:
 *     properties:
 *       name:
 *         type: string
 *       Description:
 *         type: string
 *       minStockReq:
 *         type: integer
 *       optStock:
 *         type: integer
 *       extIDs:
 *         type: integer
 *       units:
 *         type: string
 *       unitsType:
 *         type: string
 *       category:
 *         type: string
 *       lossCost:
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

/** @swagger
 * /inventory/items/delete/{id}:
 *   delete:
 *     tags:
 *       - deleteitem
 *     description: Deletes Items
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
 **/
const express = require('express')
const router = express.Router()

function ItemsRoutes(ItemsLogic) {
  router.route('/items/:id')
    .get(({ params }, res, next) => {
      ItemsLogic.getItems(params)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/items')
    .get(({ query, user }, res, next) => {
      query.user = user._id
      ItemsLogic.getItems(query)
        .then(res.json.bind(res))
        .catch((err) => next(err))
    })

  router.route('/items')
    .post((req, res, next) => {
      let item = req.body
      item.user = req.user._id
      ItemsLogic.upsertItem(item)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })

  router.route('/items/delete/:id')
    .delete(({ query }, res, next) => {
      ItemsLogic.removeItem(query)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })
  return router
}

module.exports = ItemsRoutes
