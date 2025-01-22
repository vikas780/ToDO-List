'use client'

import React, { useMemo, useState } from 'react'
import ShowAllTasks from './ShowAllTasks'
import SearchBar from './SearchBar'
import { filterAndSortTasks } from '@/util/FilterLogic'
import Link from 'next/link'

const TasksContainer = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [tasks, setTasks] = useState(data)
  const [filter, setFilter] = useState('all') // Default filter is 'all'

  // Handle search queries
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // Handle filter selection
  const handleFilterChange = (value) => {
    setFilter(value)
  }

  // Bulk remove completed tasks
  const handleRemoveCompleted = () => {
    const remainingTasks = tasks.filter((task) => !task.status)
    setTasks(remainingTasks)
  }

  // Filter and sort tasks based on selected filter and search query
  const filteredTasks = useMemo(() => {
    return filterAndSortTasks(tasks, searchQuery, filter)
  }, [searchQuery, tasks, filter])

  // Toggle task completion status
  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: !task.status } : task
    )
    setTasks(updatedTasks)
  }

  return (
    <section>
      <div className='p-4 mx-auto lg:max-w-[87rem] sm:max-w-full mb-16'>
        <header>
          <h2 className='text-4xl font-bold text-gray-800 mb-12'>All Tasks</h2>
        </header>

        {/* Search Bar */}
        <SearchBar OnSearch={handleSearch} />

        {/* Action Menu */}
        <div className='mt-4 flex justify-between items-center gap-4'>
          <div>
            <label htmlFor='task-filter' className='font-semibold'>
              Actions:
            </label>
            <select
              id='task-filter'
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className='border-2 border-blue-300 rounded-md px-3 py-2'
            >
              <option value='all'>All Tasks</option>
              <option value='active'>Active Tasks</option>
              <option value='completed'>Completed Tasks</option>
            </select>
          </div>
          <button
            onClick={handleRemoveCompleted}
            className='bg-green-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md'
          >
            Remove Completed Tasks
          </button>
        </div>

        <div className='mt-8'>
          <Link
            href={'tasks/create'}
            className='bg-gray-700 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded-md'
          >
            Add Task
          </Link>
        </div>

        {/* Task Lists */}
        <header>
          <h3 className='text-2xl font-semibold text-gray-800 mb-8 mt-8'>
            {filter === 'all'
              ? 'All Tasks:'
              : filter === 'active'
              ? 'Active Tasks:'
              : filter === 'completed'
              ? 'Completed Tasks:'
              : ''}
          </h3>
        </header>

        <main>
          {/* Active Tasks */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 mt-8'>
            {filteredTasks.length === 0 ? (
              <p className='text-2xl text-red-600'>No tasks found</p>
            ) : (
              filteredTasks
                .filter((item) => item.status === false)
                .map((task) => (
                  <article key={task._id}>
                    <ShowAllTasks
                      key={task._id}
                      {...task}
                      toggleComplete={toggleComplete}
                    />
                  </article>
                ))
            )}
          </div>

          {/* Completed Tasks */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6'>
            {filteredTasks
              .filter((item) => item.status === true)
              .map((task) => (
                <article key={task._id}>
                  <ShowAllTasks
                    key={task._id}
                    {...task}
                    toggleComplete={toggleComplete}
                  />
                </article>
              ))}
          </div>
        </main>
      </div>
    </section>
  )
}

export default TasksContainer
