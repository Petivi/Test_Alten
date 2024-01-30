const Product = require('./../models/product')


module.exports = (app) => {

    app.get('/products', (req, res) => {
        Product.find({})
        .then(products => {
        res.status(200).send(products);
        })
    })

    app.get('/products/:id', (req, res) => {
        Product.findOne({ _id: req.params.id })
        .then(product => {
            res.status(200).send({ response: product });
        });
    });


    app.post('/products', (req, res) => {
        let product = new Product(req.body.data);
        product.save().then(result => {
            res.status(201).send({ response: 'PRODUCT_CREATED' });
        }).catch(err => {
            res.status(500).send({ error: 'ERR_ERROR_OCCURED'});
        });
    });


    app.patch('/products/:id', (req, res) => {
        let product_id = req.params.id
        let product_data = req.body.data
        Product.findOne({ _id: product_id })
        .then(el => {
            if(el){
                Product.findOneAndUpdate({ _id: product_id}, product_data).then(product => {
                    res.status(200).send({ response: "PRODUCT_UPDATED" });
                });
            }else{
                res.status(404).send({ error: "ERR_INCORRECT_PARAMETERS" });
            }
        })
      });


    app.delete('/products/:id', (req, res) => {
        Product.findOneAndDelete({ _id: req.params.id})
        .then(() => res.status(200).send({ response: "PRODUCT_DELETED" }))
    })

}