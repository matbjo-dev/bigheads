const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', name: 'index', component: () => import('pages/Index.vue')},
      {
        path: 'auth',
        name: 'auth',
        component: () => import('pages/Auth.vue'),
        children: [
          {
            path: 'login',
            name: 'login',
            component: () => import('components/auth/Login.vue'),
          },
          {
            path: 'signup',
            name: 'signup',
            component: () => import('components/auth/Signup.vue'),
          },
        ],
      },
      {
        path: 'user',
        component: () => import('pages/Standard.vue'),
        children: [
          {
            path: '',
            name: 'user',
            component: () => import('components/user/UserProfile.vue'),
          },
        ],
      },
      {
        path: 'workout',
        component: () => import('pages/Standard.vue'),
        children: [
          {
            path: '',
            name: 'workout',
            component: () => import('components/workout/Workout.vue'),
          },
          {
            path: 'results',
            name: 'workoutResults',
            props: true,
            component: () => import('components/workout/Results.vue'),
          },
           {
            path: 'sessions',
            name: 'sessions',
            component: () => import('components/workout/workoutSessions.vue'),
          },
          {
            path: 'sessions/:id',
            name: 'sessions_view',
            params: 'id',
            component: () => import('components/workout/Session.vue'),
          },
           {
            path: 'exercises',
            name: 'exercise_list',
            component: () => import('src/components/workout/ExerciseList.vue'),
          },
          {
            path: 'exercises/:id',
            name: 'exercise_view',
            params: 'id',
            component: () => import('components/workout/Exercise.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
