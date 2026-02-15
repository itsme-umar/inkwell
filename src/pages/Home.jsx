import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Container, PostCard, Loader } from '../components'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    appwriteService.getPosts([]).then((result) => {
      if (result?.documents) setPosts(result.documents)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <section className="mb-8 sm:mb-10">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            Latest posts
          </h1>
          <p className="text-surface-500">
            Stories and ideas from the community.
          </p>
        </section>
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader size="lg" label="Loading posts..." />
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl border border-surface-200 bg-white p-12 text-center">
            <p className="text-surface-500 mb-4">No posts yet. Sign up to add your own or log in to see and manage posts.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/inkwell/signup"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Sign up
              </Link>
              <Link
                to="/inkwell/login"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium border border-surface-300 text-stone-700 hover:bg-surface-50 transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default Home
