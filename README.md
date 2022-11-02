# Zoom-Change-Caller-Id-Sample
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
