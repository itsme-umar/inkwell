import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select, AppwriteImage } from '..'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title ?? '',
      slug: post?.$id ?? '',
      content: post?.content ?? '',
      status: post?.status ?? 'active',
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.userData)
  const [submitError, setSubmitError] = React.useState('')

  const submit = async (data) => {
    setSubmitError('')
    try {
      if (post) {
        const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null
        if (file) await appwriteService.deleteFile(post.featuredImage)
        const dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage: file ? file.$id : post.featuredImage,
        })
        if (dbPost) navigate(`/megaBlog/post/${dbPost.$id}`)
      } else {
        const file = await appwriteService.uploadFile(data.image[0])
        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredImage: file.$id,
          userId: userData?.$id,
        })
        if (dbPost) navigate(`/megaBlog/post/${dbPost.$id}`)
      }
    } catch (error) {
      const raw = error?.message ?? error?.toString?.() ?? ''
      const isContentSizeError =
        raw.includes('content') &&
        (raw.includes('255') || raw.includes('no longer than') || raw.includes('document_invalid_structure'))
      const message = isContentSizeError
        ? "Post content is too long for the database. In Appwrite Console: Database → your collection → Attributes → set 'content' attribute size to 1000000 (or delete and recreate the attribute with a larger size)."
        : raw || 'Something went wrong'
      setSubmitError(message)
      console.error('PostForm submit error:', error)
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
    return ''
  }, [])

  React.useEffect(() => {
    const sub = watch((value, { name }) => {
      if (name === 'title') setValue('slug', slugTransform(value.title), { shouldValidate: true })
    })
    return () => sub.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <div className="py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
          {post ? 'Edit post' : 'New post'}
        </h1>
        <p className="mt-1 text-surface-500">Fill in the details below.</p>
      </div>
      {submitError && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
          {submitError}
        </div>
      )}
      <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <Input
            label="Title"
            placeholder="Post title"
            className="mb-4"
            {...register('title', { required: true })}
          />
          <Input
            label="Slug"
            placeholder="url-slug"
            className="mb-4"
            {...register('slug', { required: true })}
            onInput={(e) =>
              setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
            }
          />
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues('content')}
          />
        </div>
        <div className="lg:w-80 space-y-6">
          <Input
            label="Featured image"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            className="mb-4"
            {...register('image', { required: !post })}
          />
          {post && (
            <div className="rounded-lg overflow-hidden border border-surface-200">
              <AppwriteImage
                previewUrl={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}
          <Select
            options={['active', 'inactive']}
            label="Status"
            {...register('status', { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? 'bg-primary-600' : 'bg-primary-600'}
            className="w-full"
          >
            {post ? 'Update post' : 'Publish post'}
          </Button>
        </div>
      </form>
    </div>
  )
}
