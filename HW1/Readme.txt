HW1 Documentation
Saman Hosseini

S3 setup:
1. Created a bucket named “shossei-hw1-homepage”.
2. Unblocked public access.
3. Enabled S3 static website hosting.
4. Added bucket policy for web access.

EC2 setup:
1. Created EC2 instance with Amazon Linux image.
2. Updated the instance with “yum update -y.”
3. Installed Apache service with “yum install httpd -y”.
4. Copied all required files inside “/var/www/html” directory.
5. Enabled the Apache service with “systemctl enable httpd”.
6. Started the service with “systemctl start httpd”.

Part 1 – Homepage
. S3 URL: http://shossei-hw1-homepage.s3-website-us-east-1.amazonaws.com/
. EC2 URL: http://3.88.107.109/Homepage/

Part 2 – CS Department
. S3 URL: http://shossei-hw1-cspage.s3-website-us-east-1.amazonaws.com/
. EC2 URL: http://3.88.107.109/GMU-CS-Department/

