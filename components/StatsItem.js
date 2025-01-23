const StatsItem = ({ count, title, icon, color, bcg }) => {
  return (
    <article className={`p-4 bg-white rounded-lg border-b-4 ${bcg} shadow-md`}>
      <header className='flex items-center justify-between'>
        <span className={`block text-5xl font-bold ${color}`}>{count}</span>
        <div
          className={`w-16 h-14 flex items-center justify-center rounded-lg ${bcg}`}
        >
          <span className={`text-2xl ${color}`}>{icon}</span>
        </div>
      </header>
      <h5 className='mt-2 text-lg font-semibold text-gray-800 capitalize'>
        {title}
      </h5>
    </article>
  )
}

export default StatsItem
