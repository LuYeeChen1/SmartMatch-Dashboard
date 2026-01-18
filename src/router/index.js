import AdminMenu from '@/AdminMenu.vue'
import Login from '@/Auth/Login.vue'
import Register from '@/Auth/Register.vue'
import CandidateMatching from '@/HumanResource/CandidateMatching.vue'
import HRApplicants from '@/HumanResource/HRApplicants.vue'
import HRDashboard from '@/HumanResource/HRDashboard.vue'
import JobPosting from '@/HumanResource/JobPosting.vue'
import ManageJobs from '@/HumanResource/ManageJobs.vue'
import EditResume from '@/Jobseeker/EditResume.vue'
import JobRecommend from '@/Jobseeker/JobRecommend.vue'
import JobSeekerDashboard from '@/Jobseeker/JobSeekerDashboard.vue'
import JobSeekerMenu from '@/Jobseeker/JobSeekerMenu.vue'
import Resume from '@/Jobseeker/Resume.vue'
import CourseFees from '@/Lecturer/CourseFees.vue'
import CreateCourse from '@/Lecturer/CreateCourse.vue'
import EditCourse from '@/Lecturer/EditCourse.vue'
import LecturerMenu from '@/Lecturer/LecturerMenu.vue'
import LecturerProfile from '@/Lecturer/LecturerProfile.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ApplicationTracking from '../Jobseeker/ApplicationTracking.vue'
import CourseList from '../Jobseeker/CourseList.vue'
import LecturerCourseList from '../Lecturer/CourseList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/jobseeker/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/jobseeker/edit-resume',
      name: 'EditResume',
      component: EditResume
    },
    {
      path: '/jobPosting',
      name: 'jobPosting',
      component: JobPosting,
    },
    {
      path: '/jobseeker/dashboard',
      name: 'JobSeekerDashboard',
      component: JobSeekerDashboard,
    },
    {
      path: '/hr/dashboard',
      name: 'HRDashboard',
      component: HRDashboard,
    },
    {
      path: '/AdminMenu',
      name: 'AdminMenu',
      component: AdminMenu,
    },
    {
      path: '/JobRecommend',
      name: 'JobRecommend',
      component: JobRecommend
    },
    {
      path: '/JobSeekerMenu',
      name: 'JobSeekerMenu',
      component: JobSeekerMenu
    },
    {
      path: '/jobseeker/application-tracking',
      name: 'ApplicationTracking',
      component: ApplicationTracking
    },
    {
      path: '/jobseeker/job-recommend',
      name: 'JobSeekerJobRecommend',
      component: JobRecommend
    },
    {
      path: '/lecturer/dashboard',
      name: 'LecturerDashboard',
      component: LecturerMenu
    },
    {
      path: '/lecturer/profile',
      name: 'LecturerProfile',
      component: LecturerProfile
    },
    {
      path: '/lecturer/create-course',
      name: 'CreateCourse',
      component: CreateCourse
    },
    {
      path: '/lecturer/edit-course/:id',
      name: 'EditCourse',
      component: EditCourse,
      props: true
    },
    {
      path: '/lecturer/course-list',
      name: 'LecturerCourseList',
      component: LecturerCourseList
    },
    {
      path: '/lecturer/course-fees',
      name: 'CourseFees',
      component: CourseFees
    },
    {
      path: '/resume',
      name: 'resume',
      component: Resume
    },
    {
      path: '/hr/applicants',
      name: 'HRApplicants',
      component: HRApplicants
    },
    {
      path: '/hr/manage-jobs',
      name: 'ManageJobs',
      component: ManageJobs
    },
    {
      path: '/hr/candidate-matching',
      name: 'CandidateMatching',
      component: CandidateMatching
    },
    {
      path: '/jobseeker/course-list',
      name: 'JobSeekerCourseList',
      component: CourseList
    },
  ],
})

export default router 