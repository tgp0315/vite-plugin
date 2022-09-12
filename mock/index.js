import Mock from 'mockjs'

const usersList = Mock.mock({
  'data|100': [{
    name: '@cname'
  }]
})
export default [
  {
    url: '/api/users',
    method: 'post',
    response: ({ query }) => {
      return {
        code: 0,
        data: usersList.data,
      }
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'vben',
      },
    },
  }
]