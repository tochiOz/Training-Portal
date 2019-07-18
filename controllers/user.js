const Category = require('../models/embedded/categories')
const emSkills = require('../models/embedded/skill_level');
const Interest_Area = require('../models/embedded/interest_area');
const Trainee = require('../models/trainee_profile')
const sharp = require('sharp')
const cloudinary = require('cloudinary')
const Datauri = require('datauri')
const path = require('path')
const dUri = new Datauri();
const Education = require('../models/trainee_education')
const train_Skill = require('../models/trainee_skill')
const Internet = require('../models/internet')
const Guardian = require('../models/trainee_guardian')
const axios = require('axios')
// const upload = require('../config/upload')
require('../config/cloudinary')


module.exports = {

    //creating user
    async trainee_SignUp(req, res) {
        // return console.log(req.body)

        try {
            if (
                req.body.captcha === undefined ||
                req.body.captcha === ' ' ||
                req.body.captcha === null
            ) {
                return res.json({ "success": false, "msg": "Please Select Captcha" })
            }

            //secret key
            const secretKey = process.env.RECAPTCHA_SECRET;
           
            //verify URL
            const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
            //  return console.log(verifyUrl)
            //make request to verifyUrl
            await axios.get(verifyUrl).then( async (response) => {
            //    return console.log(res.data)
                // body = JSON.parse(body)
                const body = response.data;
             
                if (body.success !== undefined && !body.success) {
                    res.json({
                        "success": false,
                        "message": "Failed Captcha Verification, Are You a Bot??"
                    })
                    return console.log(error)
                }
                // return console.log(req.body)
                const buffer = await sharp(req.file.buffer).resize({
                    width: 250, height: 300
                }).png().toBuffer()
                // return console.log(buffer)

                const dataUri = dUri.format(path.extname(req.file.originalname).toString(), buffer);
                const imageFile = dataUri.content;
                // return console.log(imageFile)
                const image = await cloudinary.v2.uploader.upload(imageFile)
                // return console.log(image)
                const trainee = new Trainee({
                    full_name: req.body.full_name,
                    email: req.body.email,
                    category_id: req.body.category_id,
                    gender: req.body.gender,
                    phone_number: req.body.phone_number,
                    address: req.body.address,
                    dob: req.body.dob,
                    avatar: image.secure_url,
                    password: req.body.password
                });

                await trainee.save();

                //ex tracting the user_id
                const userId = trainee._id;

                //creating new instance of educational table
                const trainee_education = new Education({
                    school: req.body.school,
                    academic_discipline: req.body.academic_discipline,
                    academic_status: req.body.academic_status,
                    trainee_id: userId,
                });

                await trainee_education.save()

                //creating new instance of internet details 
                const training_skill = new train_Skill({
                    programming_skill: req.body.programming_skill,
                    teaching_experience: req.body.teaching_experience,
                    level_id: req.body.level_id,
                    interest_id: req.body.interest_id,
                    trainee_id: userId,
                })

                await training_skill.save()


                //creating new instance of programming skill
                const training_internet_account = new Internet({
                    account_name: req.body.account_name,
                    account_password: req.body.account_password,
                    trainee_id: userId,
                })

                await training_internet_account.save()

                const token = await trainee.generateAuthToken()

                //login trainees at once
                res.cookie('jwt', token, { maxAge: 400000000 })

                // return res.redirect('/trainee-profile')
                res.status(201).send({
                    trainee, trainee_education, training_skill, training_internet_account, token,
                    "success": true, "msg": "Captcha was verified Successfully"
                })
            })
        } catch (e) {
            res.status(400).send(e.message)
            console.log(e)
        }
    },

    //login trainee
    async trainee_login(req, res) {

        try {
            const trainee = await Trainee.findByCredentials(req.body.email, req.body.password)
            const token = await trainee.generateAuthToken()
            res.cookie('jwt', token, { maxAge: 400000000 })

            return res.redirect('/trainee-profile')
        } catch (e) {
            res.status(500).send(e.message)
        }
    },

    //Fetching Trainee Details
    async get_trainee_profile(req, res) {

        try {
            if (trainee_profile) {
                if (trainee_profile.tokens == '') {
                    return res.redirect('/')
                }
                const trainee = trainee_profile

                const trainee_id = trainee._id
                const deptId = trainee.category_id
                
                //get trainee education
                const education = await Education.findOne({ trainee_id })

                //get trainee skills
                const skill = await train_Skill.findOne({ trainee_id })
                
                //get guardian
                const guardian = await Guardian.findOne({ trainee_id })

                //Getting the category
                const dept = await Category.findOne(deptId)
                
                //Getting Id's
                const skill_id = skill.level_id
                const interest_id = skill.interest_id
                // return console.log(interest_id)
                //Getting skills
                const skillSet = await emSkills.findOne(skill_id)
                

                //Getting Interest-area
                const interestSet = await Interest_Area.findOne(interest_id)
                // return console.log(skillSet)
                res.status(200).render('trainee_profile', {
                    title: 'Trainee Profile',
                    trainee,
                    guardian,
                    skill,
                    education,
                    dept,
                    skillSet,
                    interestSet
                })

            }
        } catch (error) {
            console.log(error.message)
            return res.send(error.message)
        }
    },

    //Fetching Trainee details to confirm payment
    async get_trainee_paystack(req, res) {

        try {
            if (trainee_profile) {
                if (trainee_profile.tokens == '') {
                    return res.redirect('/')
                }
                const trainee = trainee_profile

                const trainee_id = trainee._id
                const deptId = trainee.category_id

                //get trainee skills
                const skill = await train_Skill.findOne({ trainee_id })

                //Getting Id's
                const skill_id = skill.level_id
        
                const skillSet = await emSkills.findOne(skill_id)
                
                //Getting the category
                const dept = await Category.findOne(deptId)
                
                res.status(200).render('paystack', {
                    title: 'Activate Profile',
                    trainee,
                    skillSet,
                    dept
                })

            }
        } catch (error) {
            console.log(error.message)
            return res.send(error.message)
        }
    },

    async get_interns(req, res) {
        try {
            
            const _id = '5d14af7a7c817a1634fce6c7'
            const trainee = await Trainee.find({ category_id: _id })
           
            res.render('dashboard_trainee', {
                trainee,
                title: 'KodeHauz Admin Dashboard',
                code: 'Intern'
            })
        } catch (e) {
            res.status(400).send(e)
        }        
    },

    //Getting trainings
    async get_trainings(req, res) {
        try {
            
            const _id = '5d14af8a7c817a1634fce6c9'
        
            const trainee = await Trainee.find({ category_id: _id })
            res.render('dashboard_trainee', {
                code: 'Trainees',
                title: 'KodeHauz Admin Dashboard',
                trainee,
            })
        } catch (e) {
            res.status(400).send(e)
        }
    },

    //Getting trainings
    async get_hub(req, res) {
        try {
            
            const _id = '5d14af837c817a1634fce6c8'
        
            const trainee = await Trainee.find({ category_id: _id })
            res.render('dashboard_trainee', {
                code: 'Hub Users',
                title: 'KodeHauz Admin Dashboard',
                trainee,
            })
        } catch (e) {
            res.status(400).send(e)
        }
    },

    //Getting trainers
    async get_trainer(req, res) {
        try {
            
            const _id = '5d135c4e2bc64035f4d1f8fa'
        
            const trainee = await Trainee.find({ category_id: _id })
            res.render('dashboard_trainee', {
                code: 'Train The Trainer',
                title: 'KodeHauz Admin Dashboard',
                trainee,
            })
        } catch (e) {
            res.status(400).send(e)
        }
    },

     //editing trainee profile picture
    async edit_trainee_profile_avatar(req, res) {
        const updates = Object.keys(req.body.avatar)
        const eligibleUpdateKeys = ["avatar"]
        const isValid = updates.every((update) => eligibleUpdateKeys.includes(update))

        if (!isValid) {
            return res.status(404).send({ Error: 'Invalid Key Update'})
        }

        try {

            const buffer = await sharp(req.body.avatar).resize({
                width: 200, height: 200
            }).png().toBuffer()

            const dataUri = dUri.format(path.extname(req.file.originalname).toString(), buffer);
            const imageFile = dataUri.content;

            const updatedImage = await cloudinary.v2.uploader.upload(imageFile)

            trainee_profile.avatar = updatedImage.secure_url

            await trainee_profile.save()
        } catch (error) {
            return res.status(400).send(error.message)
        }
    },


    //editing trainee profile 
    async edit_trainee_profile(req, res) {

        const updates = Object.keys(req.body)
        const eligibleUpdateKeys = ['email', 'full_name', 'phone_number', 'address']
        const isValid = updates.every((update) => eligibleUpdateKeys.includes(update))

        if (!isValid) {
            return res.status(404).send({ Error: 'Invalid Key Update' })
        }

        try {
            updates.forEach((update) => trainee_profile[update] = req.body[update])
            await trainee_profile.save()

            res.status(200).send({
                Update: 'Details updated Succefully',
                trainee_profile
            })
            return req.flash('success', 'Personal Profile Updated successfully')
        } catch (error) {
            return res.status(400).send(error.message)
        }
    },

   
    //editing trainee education profile
    async edit_trainee_education_profile(req, res) {

        const educationalUpdates = Object.keys(req.body)
        const eligibleUpdateKeys = ['school', 'academic_discipline', 'academic_status' ]
        const isValid = educationalUpdates.every((update) => eligibleUpdateKeys.includes(update))

        if (!isValid) {
            return res.status(404).send({ Error: 'Invalid Key Update' })
        }

        try {
            const _id = trainee_profile._id

            const education = await Education.findOne({ _id })

            educationalUpdates.forEach((update) => education[update] = req.body[update])
            await education.save()

            res.status(200).send({
                Update: 'Details updated Succefully',
                education
            })
            return req.flash('success', 'Personal Profile Updated successfully')
        } catch (error) {
            return res.status(400).send(error.message)
        }
    },

    //logout a trainee
    async trainee_logout(req, res) {
        try {

            trainee_profile.tokens = []
            await trainee_profile.save()
            res.clearCookie('jwt')
            req.flash('success', 'Thank You for using our Portal')
            return res.redirect('/')
        } catch (e) {
            res.status(400).send(e.message)
        }
    },

    //getting runs from admin routes
    async get_formDetails(req, res) {
        try {
            //get categories
            const categories = await Category.find()

            //get interest areas
            const interests = await Interest_Area.find()

            //get skills
            const skills = await emSkills.find()


            res.status(200).render('profile_form', {
                departments: categories,
                title: 'Training Registration zone',
                interests,
                skills
            })
        } catch (e) {
            res.status(400).send(e.message)
        }

    },



    async profile(req, res, next) {
        res.render('trainee_profile', {
            title: 'Trainee HomePage',
            profile_name: trainee_profile.full_name,
            avatar: trainee_profile.avatar,
            email: trainee_profile.email
        });
    }
}