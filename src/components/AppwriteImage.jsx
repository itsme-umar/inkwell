import { useState, useEffect, useRef } from 'react'

/** Placeholder image URL when Appwrite image fails (deterministic per title) */
const getPlaceholderUrl = (seed = 'post', width = 800, height = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`

/**
 * Renders an image from Appwrite Storage using the preview URL.
 * Fetches with credentials so the session cookie is sent (fixes 401 on cross-origin).
 * When the image fails, shows a dummy/placeholder image so the post still looks good.
 */
export default function AppwriteImage({ previewUrl, alt = '', className = '', ...props }) {
  const [src, setSrc] = useState(null)
  const [error, setError] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const blobUrlRef = useRef(null)

  useEffect(() => {
    if (!previewUrl) {
      setError(true)
      return
    }

    let cancelled = false

    fetch(previewUrl, { credentials: 'include', mode: 'cors' })
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.blob()
      })
      .then((blob) => {
        if (cancelled) return
        const url = URL.createObjectURL(blob)
        blobUrlRef.current = url
        setSrc(url)
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setSrc(previewUrl)
        }
      })

    return () => {
      cancelled = true
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
        blobUrlRef.current = null
      }
    }
  }, [previewUrl])

  const handleImgError = () => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = null
    }
    setLoadError(true)
  }

  const usePlaceholder = (error && !src) || loadError
  const placeholderSrc = getPlaceholderUrl(alt || 'post')

  if (usePlaceholder) {
    return (
      <img
        src={placeholderSrc}
        alt={alt || 'Post image'}
        className={className}
        loading="lazy"
        {...props}
      />
    )
  }

  return (
    <img
      src={src || previewUrl}
      alt={alt}
      className={className}
      onError={handleImgError}
      loading="lazy"
      {...props}
    />
  )
}
