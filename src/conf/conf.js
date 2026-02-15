// Support both typo (APPWIRTE) and correct (APPWRITE) env var names
const getEnv = (typo, correct) => {
  const v = import.meta.env[correct] ?? import.meta.env[typo]
  return typeof v === 'string' ? v.trim() : ''
}

const appwriteUrl = getEnv('VITE_APPWIRTE_URL', 'VITE_APPWRITE_URL')
const appwriteProjectId = getEnv('VITE_APPWIRTE_PROJECT_ID', 'VITE_APPWRITE_PROJECT_ID')
const appwriteCollectionId = getEnv('VITE_APPWIRTE_COLLECTION_ID', 'VITE_APPWRITE_COLLECTION_ID')
const appwriteDatabaseId = getEnv('VITE_APPWIRTE_DATABASE_ID', 'VITE_APPWRITE_DATABASE_ID')
const appwriteBucketId = getEnv('VITE_APPWIRTE_BUCKET_ID', 'VITE_APPWRITE_BUCKET_ID')

const required = { appwriteUrl, appwriteProjectId, appwriteDatabaseId, appwriteCollectionId, appwriteBucketId }
const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k)
if (missing.length) {
  console.error('[megaBlog] Missing Appwrite env:', missing.join(', '), '- Check .env has VITE_APPWRITE_* or VITE_APPWIRTE_*')
}

const conf = {
  appwriteUrl: appwriteUrl || 'https://cloud.appwrite.io/v1',
  appwriteProjectId,
  appwriteCollectionId,
  appwriteDatabaseId,
  appwriteBucketId,
}

export default conf
