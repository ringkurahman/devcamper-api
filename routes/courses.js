const express = require('express')
const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require('../controllers/courses')
const Course = require('../models/Course')
const advancedResults = require('../middleware/advancedResults')



const router = express.Router({ mergeParams: true })

// Import protect middleware for routes
const { protect } = require('../middleware/auth')


router.route('/')
    .get(advancedResults(Course, {
            path: 'bootcamp',
            select: 'name description email'
        }), getCourses)
    .post(protect, addCourse)

router.route('/:id').get(getCourse).put(protect, updateCourse).delete(protect, deleteCourse)


module.exports = router