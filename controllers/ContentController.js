const Content = require('../models/Content')
const { axiosQuote,axiosTag } = require('../config/apis')
const { Storage } = require('@google-cloud/storage')

class ContentController {
    static findAll(req,res,next) {
        const { type, tag } = req.query
        let objParams = {}
        if (type === 'mypost') {
            objParams.userId = req.loggedUser._id
        } else if (tag) {
            objParams.tags = tag
        }
        Content.find(objParams)
            .populate('userId')
            .then(data=>{
                res.json(data)
            })
            .catch(next)
    }
    static create(req,res,next) {
        let userId = req.loggedUser._id
        let { file } = req.body
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
                    return  Content.create({ image: file ,quote:data.quotes[random].body, tags, userId })
                    .then(data=>{
                        res.status(201).json({ data,  message: 'Upload Success'})
                    })
                    .catch(next)
                })
            })
    }
    static comment(req,res,next) {
        let { id } = req.params
        let { msg } = req.body
        let author = req.loggedUser.name
        Content.updateOne({_id:id},{$push : { comments : {author,msg} }})
            .then(data=>{
                res.status(201).json({message: 'comment added'})
            })
            .catch(next)
    }
    static findOne(req,res,next) {
        let { id } = req.params

        Content.findById(id).populate('userId
            .then(data=>{
                res.json(data)
            })
            .catch(next)

    }
    static delete(req,res,next) {
        let { id } = req.params
        Content.findOneAndDelete({_id:id})
            .then(data=>{
                const bucket = process.env.BUCKET_NAME
                
                const storage = new Storage({
                    keyFilename: process.env.KEYFILE_PATH,
                    projectId: process.env.PROJECT_ID
                })
                let image = data.image
                let filename = image.replace(/(https:\/\/storage.googleapis.com\/qmage\/)/, '')
                console.log(filename,'filllllleeeeeeeeeeeee');
                console.log(bucket,'buckettttttt');
                
                storage.bucket(bucket).file(filename).delete()
                res.status(200).json({message:'delete success'})
            })
            .catch(next)
    }
}

module.exports = ContentController