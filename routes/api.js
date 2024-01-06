const express = require('express')
const ClaasController = require('../controllers/ClaasController')
const TutorController = require('../controllers/Tutor/TutorController')
const CourseController = require('../controllers/CourseController')
const SubjectController = require('../controllers/SubjectController')
const QualificationController = require('../controllers/QualificationController')
const GuestController = require('../controllers/GuestController')
const StudentController = require('../controllers/Student/StudentController')
const InterestController = require('../controllers/InterestController')
const router = express.Router()




// GuestController
router.post('/home_tutor/register/super_admin',GuestController.register)
router.post('/login',GuestController.login)


// TutorController
router.post('/register_user',TutorController.storeTutorFirstStep)
router.put('/register_user_second_step/:id',TutorController.storeTutorSecondStep)
router.put('/register_user_third_step/:id',TutorController.storeTutorThirdStep)
router.put('/register_user_fourth_step/:id',TutorController.storeTutorFourthStep)
router.get('/fetch_tutors',TutorController.fetchTutors)
router.post('/fetch_filtered_tutors',TutorController.fetchFilteredTutors)
router.post('/fetch_tutors_city_wise',TutorController.fetchTutorsCityWise)
router.get('/fetch_tutor/:id',TutorController.fetchTutor)
router.get('/change_tutor_status/:id',TutorController.changeTutorStatus)
router.put('/update_tutor/:id',TutorController.updateTutor)
router.delete('/delete_tutor/:id',TutorController.deleteTutor)


// StudentController
router.post('/register_student',StudentController.storeStudentFirstStep)
router.put('/register_student_second_step/:id',StudentController.storeStudentSecondStep)
router.put('/register_student_third_step/:id',StudentController.storeStudentThirdStep)
router.get('/fetch_students',StudentController.fetchStudents)
router.get('/fetch_student/:id',StudentController.fetchStudent)
router.get('/change_student_status/:id',StudentController.changeStudentStatus)
router.put('/update_student/:id',StudentController.updateStudent)
router.delete('/delete_student/:id',StudentController.deleteStudent)


//ClaasController
router.post('/store_class',ClaasController.storeClass)
router.get('/fetch_classes',ClaasController.fetchClasses)
router.get('/fetch_class/:id',ClaasController.fetchClass)
router.put('/update_class/:id',ClaasController.updateClass)
router.delete('/delete_class/:id',ClaasController.deleteClass)


//CourseController
router.post('/store_course',CourseController.storeCourse)
router.get('/fetch_courses',CourseController.fetchCourses)
router.get('/fetch_course/:id',CourseController.fetchCourse)
router.put('/update_course/:id',CourseController.updateCourse)
router.delete('/delete_course/:id',CourseController.deleteCourse)


//SubjectController
router.post('/store_subject',SubjectController.storeSubject)
router.get('/fetch_subjects',SubjectController.fetchSubjects)
router.get('/fetch_subject/:id',SubjectController.fetchSubject)
router.put('/update_subject/:id',SubjectController.updateSubject)
router.delete('/delete_subject/:id',SubjectController.deleteSubject)


//QualificationController
router.post('/store_qualification',QualificationController.storeQualification)
router.get('/fetch_qualifications',QualificationController.fetchQualifications)
router.get('/fetch_qualification/:id',QualificationController.fetchQualification)
router.put('/update_qualification/:id',QualificationController.updateQualification)
router.delete('/delete_qualification/:id',QualificationController.deleteQualification)


//InterestController
router.post('/store_interest',InterestController.store)
router.get('/fetch_all_interest',InterestController.fetchAllInterest)
router.get('/fetch_interested_tutor/:id',InterestController.fetchInterestedTutor)
router.get('/fetch_interested_student/:id',InterestController.fetchInterestedStudent)
router.get('/change_interest_status/:id',InterestController.changeInterestStatus)
router.delete('/delete_interest/:id',InterestController.deleteInterest)


module.exports = router