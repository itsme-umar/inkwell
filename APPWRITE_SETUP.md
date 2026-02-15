# Appwrite setup for InkWell

## Login not working

If you can’t sign in (or see no error / “Session created but user could not be loaded”):

1. **Add your app as a Web platform**
   - In **[Appwrite Console](https://cloud.appwrite.io)** → your project → **Auth** → **Settings** (or **Overview**).
   - Under **Platforms**, click **Add platform** → **Web app**.
   - Set **Name** to e.g. `InkWell local`.
   - Set **Hostname** to your app’s URL:
     - Local: `localhost` (or `http://localhost:5173` if your host requires a full URL).
     - Production: your real domain, e.g. `myblog.com`.
   - Save. Without this, cookies won’t work and login will fail or not persist.

2. **Enable Email/Password auth**
   - In the same project go to **Auth** → **Settings** (or **Providers**).
   - Ensure **Email/Password** is **enabled** and **Sign in** (and optionally **Sign up**) are on.

3. **Check .env**
   - Your `.env` must have:
     - `VITE_APPWIRTE_URL` or `VITE_APPWRITE_URL` = `https://cloud.appwrite.io/v1`
     - `VITE_APPWIRTE_PROJECT_ID` or `VITE_APPWRITE_PROJECT_ID` = your project ID from the console.
   - Restart the dev server after changing `.env`.

4. **Use the same email/password you used to sign up** in this Appwrite project (or create an account via your app’s Sign up page first).

---

## Fix: "Content must be no longer than 255 chars"

Your posts use rich HTML from the editor, which is much longer than 255 characters. The database collection’s `content` attribute is currently limited to 255 characters and must be increased.

### Steps in Appwrite Console

1. Open **[Appwrite Console](https://cloud.appwrite.io)** → your project.
2. Go to **Databases** → select the database used by InkWell.
3. Open the **collection** that stores posts (same as `VITE_APPWRITE_COLLECTION_ID` in your `.env`).
4. Open the **Attributes** tab.
5. Find the **content** attribute:
   - If you can **edit** it: set **Size** to `1000000` (or at least `100000`) and save.
   - If size cannot be edited: **Delete** the `content` attribute, then **Create attribute** → **String** → key: `content`, size: `1000000`, and create it.

6. Wait for the attribute to be ready (status “available”), then try adding a post again.

### Collection attributes required by InkWell

| Attribute       | Type   | Notes                          |
|----------------|--------|--------------------------------|
| title          | string | e.g. size 500                  |
| slug           | string | e.g. size 500                  |
| content        | string | **size 1000000** (for HTML)    |
| featuredImage  | string | e.g. size 255 (file ID)        |
| status         | string | e.g. size 50                   |
| userId         | string | e.g. size 255                  |

After increasing the `content` size (or recreating it with size `1000000`), post create/update should work.
