import axios from 'axios'

import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/options'
import DetailPageComponent from '@/components/DetailPageComponent'

const TaskDetailsPage = async ({ params }) => {
  const { id } = await params

  let task = null
  let errorMessage = null
  let token = null

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.token) {
      throw new Error('Unauthorized. Please login first.')
    }

    const response = await axios.get(
      `https://todos-api-aeaf.onrender.com/api/v1/todo/getById?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    )

    task = response.data
    token = session.user.token
  } catch (error) {
    errorMessage =
      'Failed to load task. Please check your internet connection or try again later.'
    console.error(error)
  }

  if (errorMessage) {
    return <h3 className='text-center text-red-600 text-lg'>{errorMessage}</h3>
  }

  return <DetailPageComponent task={task} token={token} />
}

export default TaskDetailsPage
