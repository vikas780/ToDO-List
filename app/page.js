import Image from 'next/image'
import Link from 'next/link'
import dashboard from '@/public/dashboard.svg'

export default function Home() {
  return (
    <div className='flex h-screen justify-center items-center gap-10 px-4'>
      <div className='text-center max-w-3xl mx-auto'>
        <p className='my-3 text-sm tracking-widest text-black uppercase dark:text-white'>
          Fast &amp; SEO friendly
        </p>
        <h1 className='my-3 text-3xl font-bold tracking-tight text-black md:text-5xl '>
          <span className='text-indigo-500'>Next.js</span>
        </h1>
        <p className='max-w-2xl mx-auto my-2 text-base text-gray-500 md:leading-relaxed md:text-xl dark:text-white'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam numquam
          veniam vitae excepturi voluptates, ratione commodi dolorem quae, magni
          nihil in corporis labore cum aut facilis fugit iste reprehenderit
          debitis.
        </p>
        <div className='flex flex-col items-center justify-center gap-5 mt-6 md:flex-row'>
          <Link
            href='/register'
            className='inline-block w-full sm:w-auto text-center min-w-[200px] px-6 py-4 text-white transition-all bg-gray-700  rounded-md shadow-xl  hover:bg-gray-400 hover:text-black hover:font-semibold   hover:shadow-2xl  hover:-translate-y-1'
          >
            Register
          </Link>
        </div>
      </div>
      <div className='flex justify-center'>
        <Image
          className='relative '
          src={dashboard}
          alt='Next.js Logo'
          width={480}
          height={237}
          priority
        />
      </div>
    </div>
  )
}
