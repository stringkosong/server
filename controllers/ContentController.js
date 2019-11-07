const Content = require('../models/Content')


class ContentController {
    static findAll(req,res,next) {
        Content.find()
            .then(data=>{
                res.json(data)
            })
            .catch(next)
    }
    static create(req,res,next) {
        let { image,quote } = req.body
        Content.create({ image,quote })
            .then(data=>{
                res.status(201).json(data)
            })
            .catch(next)
    }
}

module.exports = ContentController