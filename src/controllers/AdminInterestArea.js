const Interest_Area = require('../models/embedded/interest_area');

module.exports = {

    //adding interest areas for users
    async add_interest_area(req, res) {
        const interest = new Interest_Area(req.body)

        try {
            await interest.save()
            Swal.fire(
                'Good job!',
                'Item Added Successfully',
                'success'
            )

            res.redirect('/admin-interest-areas')
        } catch (error) {
            console.log(error.message)
            req.flash('danger', 'The Interest-Area was not added')
        }
    },

    //get interest
    async get_interest_area(req, res) {
        try {
            const utility = await Interest_Area.find()
            res.render('utility', {
                title: 'KodeHauz Training Portal',
                utility_addLlink: '/admin/add-interest-area',
                utility_link: '/admin-interest-areas',
                utility_name: 'Interest Area',
                utility_edit: '/admin/interest-area/edit',
                utility
            });
        } catch (e) {
            res.status(400).send(e.message)
        }
    },

    //edit interest_area
    async update_interest_area(req, res) {

        //checking if the sent keys is equilvalent to the stored schema
        const updates = Object.keys(req.body)
        const eligibleEdit = ['name']
        const isValid = updates.every((update) => eligibleEdit.includes(update))

        if (!isValid) {
            res.status(404).send('Error: Invalid Interest-Area Key')
        }

        //querying the db,to get the picked id
        const _id = req.query.id

        //storing the editted category
        try {
            const updatedinterest = await Interest_Area.findOne({ _id })
            // if (!updatedinterest) return res.status(404).send('Interest-Area not found')

            updates.forEach((update) => updatedinterest[update] = req.body[update])

            await updatedinterest.save()

            res.status(200).send({ updatedinterest })
        } catch (e) {
            return console.log(e.message)
        }
    },

    //delete interest
    async delete_interest_area(req, res) {
        const _id = req.query.id

        try {
            const deletedInterest = await Interest_Area.findByIdAndDelete({ _id })

            return res.send(deletedInterest)
        } catch (error) {
            return console.log(error.message)
        }
    }
}