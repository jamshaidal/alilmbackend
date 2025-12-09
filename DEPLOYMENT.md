# 🚀 Manual Deployment Guide

This guide explains how to manually deploy the backend and update the admin password.

## 1. Prerequisites

- **Node.js** installed on the server.
- **MongoDB Atlas** cluster set up.
- **Git** (optional, for pulling code).

## 2. Environment Variables

Ensure the following environment variables are set on your server (e.g., Render, Heroku, or `.env` file):

```env
MONGO_URI=mongodb+srv://jamshaidofficialtv_db_user:g8W3txWuPKZhUACc@cluster0.iq6yonc.mongodb.net/?appName=Cluster0
MONGODB_URI=mongodb+srv://jamshaidofficialtv_db_user:g8W3txWuPKZhUACc@cluster0.iq6yonc.mongodb.net/?appName=Cluster0
JWT_SECRET=a8b3f2c1e9d8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2
EMAIL_USER=alilmacadmy@gmail.com
EMAIL_PASS=niyfbiiwmentczst
ADMIN_EMAIL=alilmacadmy@gmail.com
ADMIN_PASSWORD=*Aa786Aa#
```

> [!IMPORTANT]
> If using a cloud provider like Render, add these in the **Environment** settings.

## 3. Deployment Steps

1.  **Upload Code**:
    - Upload the `notes-backend-deploy.zip` file to your server (e.g., via cPanel File Manager).
    - Extract the zip file.
2.  **Install Dependencies**:
    - Open a terminal in the extracted folder.
    - Run:
    ```bash
    npm install
    ```
3.  **Start Server**:
    ```bash
    npm start
    ```

## 4. Updating Admin Password

To update the admin password to `*Aa786Aa#` for `alilmacadmy@gmail.com`, run the following command **on the server** (where the database connection works):

```bash
node scripts/reset-admin-password.js alilmacadmy@gmail.com "*Aa786Aa#"
```

## 5. Troubleshooting

- **500 Error on Login**:
    - Check if `ADMIN_EMAIL` is set correctly.
    - Check if `MONGO_URI` is correct and the server IP is whitelisted in MongoDB Atlas (`0.0.0.0/0`).
- **Connection Error**:
    - Verify DNS resolution for the MongoDB URI.
