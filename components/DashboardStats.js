'use client'
import { FaTasks, FaCheckSquare } from 'react-icons/fa'
import { MdOutlinePendingActions } from 'react-icons/md'
import StatsItem from '@/components/StatsItem'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const DashboardStats = ({ data }) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  let active = data.filter((task) => !task.status)
  let completed = data.filter((task) => task.status)

  // Calculate the percentage of active tasks
  const totalTasks = data.length
  const activeCount = active.length
  const activePercentage =
    totalTasks > 0 ? ((activeCount / totalTasks) * 100).toFixed(2) : 0
  const defaultStats = [
    {
      title: 'Total Tasks',
      count: data.length,
      icon: <FaTasks />,
      color: 'text-yellow-500',
      bcg: 'bg-yellow-100',
    },
    {
      title: 'Active Task',
      count: `${activePercentage}%`,
      icon: <MdOutlinePendingActions />,
      color: 'text-blue-500',
      bcg: 'bg-blue-200',
    },
    {
      title: 'Completed Task',
      count: completed.length,
      icon: <FaCheckSquare />,
      color: 'text-orange-500',
      bcg: 'bg-orange-200',
    },
  ]
  const handleSubmit = async () => {
    await router.push('/tasks')
    router.refresh()
  }
  return (
    <section>
      <div className='flex flex-col md:flex-row justify-between  p-3 md:mb-8 mt-2'>
        <h2 className=' text-2xl'>
          Welcome,
          <span className=' font-semibold'>
            {status === 'loading' ? '...' : session?.user?.name}
          </span>
        </h2>
        <div className='flex items-center gap-2'>
          <button
            onClick={handleSubmit}
            className='bg-gray-700 hover:bg-gray-500 text-white font-normal p-2 rounded-md'
            aria-label='Show Tasks'
          >
            Show Tasks
          </button>
        </div>
      </div>
      <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3 p-2'>
        {defaultStats.map((item, index) => (
          <StatsItem key={index} {...item} />
        ))}
      </div>
    </section>
  )
}

export default DashboardStats
