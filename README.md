# Zoom-Change-Caller-Id-Sample
> **Note**
> 
> The following sample application is a personal, open-source project shared by the app creator and not an officially supported Zoom Video Communications, Inc. sample application. Zoom Video Communications, Inc., its employees and affiliates are not responsible for the use and maintenance of this application. Please use this sample application for inspiration, exploration and experimentation at your own risk and enjoyment. You may reach out to the app creator and broader Zoom Developer community on https://devforum.zoom.us/ for technical discussion and assistance, but understand there is no service level agreement support for this application. Thank you and happy coding!

This is a sample app for a specific Zoom Phone Management use case.

Changes all users' outbound callerId by site

scopes:
- phone:read:admin
- phone:write:admin

### Setup
```bash
# clone the repo
git clone https://github.com/Will4950/Zoom-Change-Caller-Id-Sample.git

# Navigate into the cloned project directory
cd Zoom-Change-Caller-Id-Sample

# edit .env
nano .env

# Build docker images
docker-compose build

# Start the container
docker-compose up
```

App is listening on localhost:3000/:siteId/e164
