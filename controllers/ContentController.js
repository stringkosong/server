const Content = require('../models/Content')
const { axiosQuote,axiosTag } = require('../config/apis')

class ContentController {
    static findAll(req,res,next) {
        Content.find()
            .then(data=>{
                res.json(data)
            })
            .catch(next)
    }
    static create(req,res,next) {
        let { file, author } = req.body
        let tags = []
        axiosTag({
            method: 'get',
            url: `/?image_url=${file}`
        })
            .then(({data})=>{
                let tagsTemp = data.result.tags
                for(let i = 0; i< 5; i++) {
                    tags.push(tagsTemp[i].tag.en)
                }
                let tag = data.result.tags[0].tag.en
                return  axiosQuote({
                    method: 'get',
                    url: `/quotes/?filter=${tag}`
                })
                .then(({data})=>{   
                    let random = Math.floor(Math.random()*data.quotes.length)
                    return  Content.create({ image: file ,quote:data.quotes[random].body, author, tags })
                    .then(data=>{
                        res.status(201).json(data)
                    })
                    .catch(next)
                })
            })
    }
}

module.exports = ContentController