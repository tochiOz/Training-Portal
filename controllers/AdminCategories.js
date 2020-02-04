const Category = require('../models/Categories');

module.exports = {
	//add-categories
	async add_categories(req, res) {
		const category = new Category(req.body);

		try {
			await category.save();

			res.redirect('/admin-departments');
		} catch (error) {
			console.log(error.message);
			req.flash('danger', 'The category was not added');
		}
	},

	//get-categories
	async get_categories(req, res) {
		try {
			let count = 0;
			const utility = await Category.find();
			console.log(utility);
			res.render('utility', {
				title: 'KodeHauz Training Portal',
				utility_addLlink: '/admin/add_categories',
				utility_link: '/admin-departments',
				utility_name: 'Departments',
				utility_edit: '/admin/categories/edit',
				count: count++,
				utility
			});
		} catch (e) {
			res.status(400).send(e.message);
		}
	},

	//updating categories
	async update_categories(req, res) {
		// console.log(req.body.name)
		// return res.send('Hello')
		//checking if the sent keys is equilvalent to the stored schema
		const updates = Object.keys(req.body);
		const eligibleEdit = [ 'name' ];
		const isValid = updates.every((update) => eligibleEdit.includes(update));
		// return console.log(isValid)
		if (!isValid) {
			res.status(404).send('Error: Invalid Category Key');
		}

		//querying the db,to get the picked id
		const _id = req.query.id;

		//storing the editted category
		try {
			const updatedCategory = await Category.findOne({ _id });
			// return console.log(updatedCategory)
			if (!updatedCategory) return res.status(404).send('Category not found');

			updates.forEach((update) => (updatedCategory[update] = req.body[update]));

			await updatedCategory.save();

			res.status(200).send({ updatedCategory });
		} catch (e) {
			return console.log(e.message);
		}
	},

	//delete categories
	async delete_categories(req, res) {
		const _id = req.query.id;

		try {
			const deleteCat = await Category.findByIdAndDelete({ _id });
			res.status(200).send({ deleteCat });
			//    next()
		} catch (error) {
			res.status(400).send(error.message);
		}
	}
};
