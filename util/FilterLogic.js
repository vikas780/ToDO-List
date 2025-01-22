export const filterAndSortTasks = (data, searchQuery, filter) => {
  let filteredTasks = data

  // Filter tasks by search query
  if (searchQuery) {
    filteredTasks = filteredTasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Apply additional filters
  if (filter === 'active') {
    filteredTasks = filteredTasks.filter((task) => !task.status) // Active tasks (not completed)
  } else if (filter === 'completed') {
    filteredTasks = filteredTasks.filter((task) => task.status) // Completed tasks
  }

  return filteredTasks
}
