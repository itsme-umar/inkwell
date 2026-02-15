import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class AuthService {
  client = new Client()
  account

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount({ email, password, name }) {
    if (!email || !password) throw new Error('Email and password are required')
    const userAccount = await this.account.create(ID.unique(), email, password, name ?? '')
    if (userAccount) return this.login(email, password)
    return userAccount
  }

  async login(email, password) {
    if (!email || !password) throw new Error('Email and password are required')
    if (!this.client.config.project) throw new Error('Appwrite project ID is missing. Check your .env (VITE_APPWRITE_PROJECT_ID or VITE_APPWIRTE_PROJECT_ID).')
    return this.account.createEmailPasswordSession(email, password)
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch {
      return null
    }
  }

  async logout() {
    try {
      await this.account.deleteSession('current')
    } catch (e) {
      console.warn('Logout session delete failed:', e?.message)
    }
  }
}

const authService = new AuthService()
export default authService
