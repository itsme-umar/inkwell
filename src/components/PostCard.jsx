import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import AppwriteImage from './AppwriteImage'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/inkwell/post/${$id}`}
      className="group block h-full rounded-xl overflow-hidden bg-white border border-surface-200 shadow-card hover:shadow-card-hover hover:border-primary-200 transition-all duration-300 animate-fade-in"
    >
      <div className="aspect-[16/10] overflow-hidden bg-surface-100">
        <AppwriteImage
          previewUrl={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h2 className="font-display font-semibold text-stone-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard
