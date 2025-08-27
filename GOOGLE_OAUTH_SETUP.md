# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the AI SOP Generator application.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "AI SOP Generator")
5. Click "Create"

## Step 2: Enable the Google+ API

1. In your Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google Identity" and then "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: "AI SOP Generator"
   - User support email: Your email
   - Developer contact information: Your email
   - Save and continue through the other sections

4. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: "AI SOP Generator Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://your-domain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-domain.com/api/auth/callback/google` (for production)
   - Click "Create"

5. Copy the Client ID and Client Secret

## Step 4: Configure Environment Variables

1. Copy your `.env.local` file (or create one if it doesn't exist)
2. Add the following variables:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true

# Other required variables
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

## Step 5: Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to your application and try signing in with Google
3. You should see the Google sign-in button and be able to authenticate

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**:
   - Make sure the redirect URI in Google Cloud Console exactly matches your application URL
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-domain.com/api/auth/callback/google`

2. **"invalid_client" error**:
   - Check that your Client ID and Client Secret are correct
   - Make sure you copied them from the correct OAuth 2.0 client

3. **Google sign-in button not showing**:
   - Ensure `NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true` is set
   - Check that `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are properly configured

4. **"access_denied" error**:
   - Make sure the Google+ API is enabled in your Google Cloud Console
   - Check that your OAuth consent screen is properly configured

5. **"State cookie was missing" error**:
   - This is a common NextAuth.js issue with OAuth flows
   - **Solution 1**: Clear your browser cookies and try again
   - **Solution 2**: Make sure you're using HTTPS in production (or localhost for development)
   - **Solution 3**: Check that your `NEXTAUTH_URL` matches your actual application URL
   - **Solution 4**: Ensure your browser allows cookies for the domain
   - **Solution 5**: Try using an incognito/private browser window
   - **Solution 6**: Restart your development server after making environment variable changes

6. **"OAuthCallbackError" or "OAuthSigninError"**:
   - Usually related to cookie or session issues
   - Clear browser cookies and cache
   - Ensure `NEXTAUTH_SECRET` is properly set
   - Check that `NEXTAUTH_URL` is correct

### For Production Deployment:

1. Update the authorized origins and redirect URIs in Google Cloud Console to include your production domain
2. Set `NEXTAUTH_URL` to your production URL
3. Set `NODE_ENV=production`
4. Ensure all environment variables are set in your hosting platform (Vercel, Netlify, etc.)
5. Make sure your production domain uses HTTPS

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your Client Secret secure and don't share it publicly
- Use different OAuth clients for development and production
- Regularly rotate your Client Secret for better security
- Set `NODE_ENV=production` in production environments

## Support

If you're still having issues after following this guide, check:
1. The NextAuth.js documentation: https://next-auth.js.org/
2. Google OAuth documentation: https://developers.google.com/identity/protocols/oauth2
3. Your browser's developer console for any error messages
4. The NextAuth.js GitHub issues for similar problems: https://github.com/nextauthjs/next-auth/issues 