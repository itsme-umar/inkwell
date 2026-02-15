import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client()
  databases
  bucket

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    const documentId = ID.unique()
    const res = await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      documentId,
      {
        title: title ?? '',
        slug: slug ?? documentId,
        content: content ?? '',
        featuredImage: featuredImage ?? '',
        status: status ?? 'active',
        userId: userId ?? '',
      }
    )
    return res
  }

  async updatePost(documentId, { title, content, featuredImage, status }) {
    if (!documentId) throw new Error('Document ID is required for update')
    const payload = {}
    if (title !== undefined) payload.title = title
    if (content !== undefined) payload.content = content
    if (status !== undefined) payload.status = status
    if (featuredImage !== undefined) payload.featuredImage = featuredImage
    return this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      documentId,
      payload
    )
  }

  async deletePost(documentId) {
    if (!documentId) return false
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      )
      return true
    } catch (e) {
      console.error('deletePost failed:', e?.message)
      return false
    }
  }

  async getPost(documentId) {
    if (!documentId) return null
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      )
    } catch (e) {
      console.error('getPost failed:', e?.message)
      return null
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      const q = Array.isArray(queries) && queries.length > 0 ? queries : [Query.equal('status', 'active')]
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        q
      )
    } catch (e) {
      console.error('getPosts failed:', e?.message)
      return { documents: [] }
    }
  }

  async uploadFile(file) {
    if (!file) throw new Error('File is required')
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
    } catch (e) {
      console.error('uploadFile failed:', e?.message)
      throw e
    }
  }

  async deleteFile(fileId) {
    if (!fileId) return
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
    } catch (e) {
      console.warn('deleteFile failed:', e?.message)
    }
  }

  getFilePreview(fileId) {
    if (!fileId) return null
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
    } catch (e) {
      console.error('getFilePreview failed:', e?.message)
      return null
    }
  }
}

const service = new Service()
export default service
