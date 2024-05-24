"use strict"

const Purchase = require("../models/purchase")
const Product = require("../models/product")

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "List Purchases"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Purchase, {}, [
            { path: "userId", select: "username email" },
            { path: "firmId", select: "name image" },
            "brandId",
            { path: "productId", select: "name", populate: { path: "categoryId" } }
        ])

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Purchase, {}, [
                { path: "userId", select: "username email" },
                { path: "firmId", select: "name image" },
                "brandId",
                { path: "productId", select: "name", populate: { path: "categoryId" } }
            ]),
            data
        })
    },
    
    create: async (req, res) => {
        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Create Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    userId: "65343222b67e9681f937f201",
                    firmId: "65343222b67e9681f937d542",
                    brandId: "65343222b67e9681f937y155",
                    productId: "65343222b67e9681f937z598",
                    price: 10,
                    quantity: 10,
                    amount: 100
                }
            }
        */

        //* userId verisini req.user'dan al
        req.body.userId = req.user._id

        // Create:
        const data = await Purchase.create(req.body)

        //? Satın alma sonrası güncel stok adedini arttır
        // const updateProduct = await Product.updateOne({ _id: req.body.productId }, { $inc: { quantity: req.body.quantity } })
        await Product.updateOne({ _id: data.productId }, { $inc: { quantity: +data.quantity } })

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Get Single Purchase"
        */

        const data = await Purchase.findOne({ _id: req.params.id }).populate([
            { path: "userId", select: "username email" },
            { path: "firmId", select: "name image" },
            "brandId",
            { path: "productId", select: "name", populate: { path: "categoryId" } }
        ])

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Update Purchase"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    userId: "65343222b67e9681f937f201",
                    firmId: "65343222b67e9681f937d542",
                    brandId: "65343222b67e9681f937y155",
                    productId: "65343222b67e9681f937z598",
                    price: 10,
                    quantity: 10,
                    amount: 100
                }
            }
        */

        if(req.body?.quantity) {
            // mevcut adet bilgisi al
            const currentPurchase = await Purchase.findOne({ _id: req.params.id })
            // farkı bul
            const difference = req.body.quantity - currentPurchase.quantity
            // farkı product'a kaydet
            await Product.updateOne({ _id: currentPurchase.productId }, { $inc: { quantity: +difference } })
        }

        const data = await Purchase.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Purchase.findOne({ _id: req.params.id }).populate([
                { path: "userId", select: "username email" },
                { path: "firmId", select: "name image" },
                "brandId",
                { path: "productId", select: "name", populate: { path: "categoryId" } }
            ])
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Purchases"]
            #swagger.summary = "Delete Purchase"
        */

        // mevcut adet bilgisi al
        const currentPurchase = await Purchase.findOne({ _id: req.params.id })

        // Delete
        const data = await Purchase.deleteOne({ _id: req.params.id })

        // Adeti product'a düş
        await Product.updateOne({ _id: currentPurchase.productId }, { $inc: { quantity: -currentPurchase.quantity } })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}