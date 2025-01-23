import axios from 'axios'

import { getServerSession } from 'next-auth'
import AddTask from '../../create/page'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

const EditTask = async ({ params }) => {
  const { id } = await params

  let task = null
  let errorMessage = null

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
  } catch (error) {
    errorMessage =
      'Failed to load task. Please check your internet connection or try again later.'
    console.error(error)
  }

  if (errorMessage) {
    return <h3 className='text-center text-red-600 text-lg'>{errorMessage}</h3>
  }

  return <AddTask taskToEdit={task} />
}

export default EditTask
