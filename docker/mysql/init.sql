-- CSE 18th Batch Academic Portal - MySQL Init Script
-- This runs when the Docker MySQL container is first created

CREATE DATABASE IF NOT EXISTS cse18_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE cse18_portal;

-- Grant privileges
GRANT ALL PRIVILEGES ON cse18_portal.* TO 'cse18_user'@'%';
FLUSH PRIVILEGES;
