import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard, Loader } from '../components'

function AllPosts() {
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
            All posts
          </h1>
          <p className="text-surface-500">
            Browse all published posts.
          </p>
        </section>
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader size="lg" label="Loading posts..." />
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl border border-surface-200 bg-white p-12 text-center">
            <p className="text-surface-500">No posts yet.</p>
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

export default AllPosts
