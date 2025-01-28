export const dynamic = 'force-dynamic'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import Shimmer from './loading'
import axios from 'axios'
import TasksContainer from '@/components/TasksContainer'
import { unstable_noStore } from 'next/cache'

let data = []
async function AllTasks() {
  let error = null
  let token = null

  unstable_noStore()

  try {
    // Get the server-side session
    const session = await getServerSession(authOptions)

    if (!session?.user?.token) {
      throw new Error('Unauthorized. Please login first.')
    }

    const response = await axios(
      'https://todos-api-aeaf.onrender.com/api/v1/todo/getAll',
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    )
    token = session.user.token
    data = response.data
  } catch (err) {
    error =
      'Failed to load tasks. Please check your internet connection or try again later.'
    console.error(err) // Log the error for debugging
  }
  // if (data.length === 0) {
  //   return <p className='text-center text-red-600 text-lg'> No data found</p>
  // }

  if (!data) {
    return <Shimmer />
  }

  return (
    <>
      {error ? (
        <div className='text-center text-red-600 text-lg'>{error}</div>
      ) : (
        <TasksContainer data={data} token={token} />
      )}
    </>
  )
}

export default AllTasks
