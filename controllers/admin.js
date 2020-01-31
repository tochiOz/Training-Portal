const Category = require('../models/Categories');
const Skills = require('../models/SkillLevel');
const Interest_Area = require('../models/InterestArea');
const Internet = require('../models/Internet');
const Education = require('../models/TraineeEducation');
const Trainee_Skill = require('../models/TraineeSkill');
const Guardian = require('../models/TraineeGuardian');
const Admin = require('../models/Admin');
const Trainee = require('../models/TraineeProfile');

module.exports = {
	async createAdmin(req, res) {
		const admin = new Admin(req.body);

		const adminEmailCheck = await Admin.findEmail(req.body.email);

		if (adminEmailCheck) {
			return res.status(400).send({ message: `${adminEmailCheck.email} already exist` });
		}

		try {
			await admin.save();
			const token = await admin.generateAuthToken();
			res.cookie('admin_jwt', token, { maxAge: 400000000 });
			return res.redirect('/admin-dashboard');
		} catch (err) {
			res.status(400).send(err.message);
		}
	},

	async adminLogin(req, res) {
		try {
			const admin = await Admin.findByCredentials(req.body.email, req.body.password);
			const token = await admin.generateAuthToken();

			res.cookie('admin_jwt', token, { maxAge: 400000000 });
			req.flash('sucess', `You Have Sucessfully Logged In Admin ${admin.email}`);

			return res.redirect('/admin-dashboard');
		} catch (e) {
			if (e) {
				return res.redirect('/login');
			}
		}
	},

	//view users page
	async view_user_profile(req, res) {
		// return console.log(trainee_profile)

		try {
			const trainee = trainee_profile;

			const trainee_id = trainee._id;
			const deptId = trainee.category_id;

			//get trainee education
			const education = await Education.findOne({ trainee_id });

			//get trainee skills
			const skill = await Trainee_Skill.findOne({ trainee_id });

			//get guardian
			const guardian = await Guardian.findOne({ trainee_id });

			//Getting the category
			const dept = await Category.findOne({ deptId });

			const skill_id = skill.level_id;
			const interest_id = skill.interest_id;

			//Getting skills
			const skillSet = await Skills.findOne({ skill_id });

			//Getting Interest-area
			const interestSet = await Interest_Area.findOne({ interest_id });

			// return console.log(interestSet)

			res.status(200).render('dashboard_profile_form', {
				title: 'Training Profile',
				guardian,
				skill,
				education,
				dept,
				skillSet,
				interestSet,
				trainee
			});
		} catch (e) {
			console.log(e);
		}
	},

	async delete_user(req, res) {
		_id = req.query.id;

		try {
			const traineeProfile = await Trainee.findOne({ _id });

			//delete account
			await traineeProfile.remove();

			res.send(traineeProfile);
		} catch (e) {
			console.log(e);
		}
	},

	//admin logging out
	async adminLogout(req, res) {
		try {
			adminProfile.tokens = [];
			await adminProfile.save();
			res.clearCookie('admin_jwt');
			req.flash('success', 'Thank You for using our Portal');
			return res.redirect('/');
		} catch (e) {
			res.status(400).send(e.message);
		}
	},

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
	async delete_categories(req, res, next) {
		const _id = req.query.id;

		try {
			const deleteCat = await Category.findByIdAndDelete({ _id });
			res.status(200).send({ deleteCat });
			//    next()
		} catch (error) {
			res.status(400).send(error.message);
		}
	},

	//add skill level
	async addSkills(req, res) {
		const skill = new Skills(req.body);

		try {
			await skill.save();
			res.redirect('/admin-skill-levels');
		} catch (error) {
			console.log(error.message);
			req.flash('danger', 'The Skill-Level was not added');
		}
	},

	async get_Skills(req, res) {
		try {
			const utility = await Skills.find();
			// const count = parseInt('0')
			// return console.log(skills)
			res.render('utility', {
				title: 'KodeHauz Training Portal',
				utility_addLlink: '/admin/add-skill-level',
				utility_link: '/admin-skill-levels',
				utility_name: 'Skills',
				utility_edit: '/admin/skill-level/edit',
				utility_amount: '10,000',
				utility
			});
			// req.flash('success', 'Skill-Levels Gotten')
		} catch (e) {
			res.status(400).send(e.message);
		}
	},

	//update skills for admin
	async update_skills(req, res) {
		//checking if the sent keys is equilvalent to the stored schema
		const updates = Object.keys(req.body);
		const eligibleEdit = [ 'name', 'amount' ];
		const isValid = updates.every((update) => eligibleEdit.includes(update));

		if (!isValid) {
			res.status(404).send('Error: Invalid Skill-Level Key');
		}

		//querying the db,to get the picked id
		const _id = req.query.id;

		//storing the editted category
		try {
			const updatedSkillLevel = await Skills.findOne({ _id });
			// if (!updatedSkillLevel) return res.status(404).send('Skill-Level not found')

			updates.forEach((update) => (updatedSkillLevel[update] = req.body[update]));

			await updatedSkillLevel.save();

			res.status(200).send({ updatedSkillLevel });
		} catch (e) {
			return console.log(e.message);
		}
	},

	//delete skill levels
	async deleteSkills(req, res) {
		const _id = req.query.id;

		try {
			const deletedSkillLevel = await Skills.findByIdAndDelete({ _id });
			res.send(deletedSkillLevel);
		} catch (error) {
			res.status(400).send(error.message);
		}
	},

	//adding interest areas for users
	async add_interest_area(req, res) {
		const interest = new Interest_Area(req.body);

		try {
			await interest.save();
			Swal.fire('Good job!', 'Item Added Successfully', 'success');

			res.redirect('/admin-interest-areas');
		} catch (error) {
			console.log(error.message);
			req.flash('danger', 'The Interest-Area was not added');
		}
	},

	//get interest
	async get_interest_area(req, res) {
		try {
			const utility = await Interest_Area.find();
			res.render('utility', {
				title: 'KodeHauz Training Portal',
				utility_addLlink: '/admin/add-interest-area',
				utility_link: '/admin-interest-areas',
				utility_name: 'Interest Area',
				utility_edit: '/admin/interest-area/edit',
				utility
			});
		} catch (e) {
			res.status(400).send(e.message);
		}
	},

	//edit interest_area
	async update_interest_area(req, res) {
		//checking if the sent keys is equilvalent to the stored schema
		const updates = Object.keys(req.body);
		const eligibleEdit = [ 'name' ];
		const isValid = updates.every((update) => eligibleEdit.includes(update));

		if (!isValid) {
			res.status(404).send('Error: Invalid Interest-Area Key');
		}

		//querying the db,to get the picked id
		const _id = req.query.id;

		//storing the editted category
		try {
			const updatedinterest = await Interest_Area.findOne({ _id });
			// if (!updatedinterest) return res.status(404).send('Interest-Area not found')

			updates.forEach((update) => (updatedinterest[update] = req.body[update]));

			await updatedinterest.save();

			res.status(200).send({ updatedinterest });
		} catch (e) {
			return console.log(e.message);
		}
	},

	//delete interest
	async delete_interest_area(req, res) {
		const _id = req.query.id;

		try {
			const deletedInterest = await Interest_Area.findByIdAndDelete({ _id });

			return res.send(deletedInterest);
		} catch (error) {
			return console.log(error.message);
		}
	}
};
