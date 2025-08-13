# SSI Studios Admin - Deployment Guide

## Overview
This Next.js application is ready for deployment on Vercel with MongoDB integration.

## Prerequisites
- Node.js 18+ 
- MongoDB database (MongoDB Atlas recommended)
- Vercel account
- GitHub repository

## Environment Variables

### Required Environment Variables
Set these in your Vercel project settings or `.env.local` for local development:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority

# Optional: MongoDB Database Name (can be included in URI)
MONGODB_DB=your_database_name

# Node.js Environment
NODE_ENV=production
```

### Setting Environment Variables in Vercel
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: Set to `production`

## Deployment Steps

### 1. Prepare Your MongoDB Database
1. Create a MongoDB Atlas account (or use your existing MongoDB instance)
2. Create a new cluster and database
3. Create a database user with read/write permissions
4. Get your connection string
5. Replace `<username>`, `<password>`, and `<database_name>` in the connection string

### 2. Deploy to Vercel via GitHub

#### Option A: Automatic Deployment (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect it's a Next.js project
4. Set your environment variables in Vercel dashboard
5. Deploy!

#### Option B: Manual Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

### 3. Post-Deployment Setup
1. Test the login functionality with the predefined admin users:
   - Username: `puneet`, Password: `puneet@ssi`
   - Username: `ravinder`, Password: `ravinder@ssi`
   - Username: `varsha`, Password: `varsha@ssi`
   - Username: `shrijal`, Password: `shrijal@ssi`
   - Username: `yash`, Password: `yash@ssi`
   - Username: `tanmay`, Password: `tanmay@ssi`

2. Test the member management functionality
3. Verify database connections are working

## Build Configuration
The project includes:
- ✅ Next.js 15.4.6 with App Router
- ✅ TypeScript configuration
- ✅ Tailwind CSS v3 setup
- ✅ MongoDB/Mongoose integration
- ✅ Custom authentication system
- ✅ Responsive design with mobile support
- ✅ Build-time optimizations

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Errors
- Verify your `MONGODB_URI` is correct
- Check that your MongoDB cluster allows connections from Vercel IPs
- Ensure your database user has proper permissions

#### 2. Build Failures
- Check that all environment variables are set
- Verify Node.js version compatibility (18+)
- Review build logs for specific error messages

#### 3. Authentication Issues
- Verify the admin credentials are correct
- Check browser cookies are enabled
- Ensure the middleware is working correctly

#### 4. Middleware Errors (500: MIDDLEWARE_INVOCATION_FAILED)
- This has been fixed with optimized middleware configuration
- The middleware now properly handles Vercel's edge runtime
- Includes error handling and proper static asset exclusion

### Performance Optimization
The application is optimized for production with:
- Static page generation where possible
- Optimized images and fonts
- Minimal JavaScript bundles
- Efficient database queries

## Security Considerations
- Passwords are stored in plain text for demo purposes - implement proper hashing in production
- Add rate limiting for authentication endpoints
- Consider implementing HTTPS-only cookies in production
- Add CSRF protection for forms

## Support
For deployment issues, check:
1. Vercel deployment logs
2. Browser developer console
3. MongoDB Atlas logs
4. This deployment guide

## File Structure
```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Admin dashboard
│   ├── login/            # Login page
│   └── layout.tsx        # Root layout
├── components/           # React components
├── lib/                 # Database connections
├── models/              # MongoDB models
├── public/              # Static assets
├── .env.example         # Environment variables template
├── vercel.json          # Vercel configuration
└── DEPLOYMENT.md        # This file
```
