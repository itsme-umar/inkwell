import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import appwriteService from '../appwrite/config'
import { Button, Container, AppwriteImage } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((p) => {
        if (p) setPost(p)
        else navigate('/megaBlog/')
      })
    } else navigate('/megaBlog/')
  }, [slug, navigate])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate('/megaBlog/')
      }
    })
  }

  if (!post) return null

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <article className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-surface-100 mb-8 shadow-soft">
            <AppwriteImage
              previewUrl={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full aspect-[21/9] object-cover"
            />
            {isAuthor && (
              <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                <Link to={`/megaBlog/edit-post/${post.$id}`}>
                  <Button bgColor="bg-primary-600" className="shadow-lg">
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500 hover:bg-red-600"
                  onClick={deletePost}
                  className="shadow-lg"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <header className="mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              {post.title}
            </h1>
          </header>
          <div className="browser-css">
            {parse(DOMPurify.sanitize(post.content))}
          </div>
        </article>
      </Container>
    </div>
  )
}
