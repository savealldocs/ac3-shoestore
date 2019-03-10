
/** @swagger
 * /inventory/messagequeue/{id}:
 *   get:
 *     tags:
 *       - getmessage
 *     description: Returns messages stored in queue
 *     parameters:
 *       - name: id
 *         description: store id
 *         in: body
 *         required: false
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array
 **/
const express = require('express')
const router = express.Router()

function MessageRoutes (MessageLogic) {
  router.route('/messagequeue')
    .get(({ query, user }, res, next) => {
      query.user = user._id
      MessageLogic.getItems(query)
        .then(res.json.bind(res))
        .catch((err) => next(err))
    })

  router.route('/messagequeue/:id')
    .post((req, res, next) => {
      let item = req.body
      item.user = req.user._id
      MessageLogic.upsertItem(item)
        .then((result) => res.json(result))
        .catch((err) => next(err))
    })
  return router
}

module.exports = MessageRoutes
