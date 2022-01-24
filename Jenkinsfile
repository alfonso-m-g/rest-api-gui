pipeline {
    agent any
    environment {
        USER = "ubuntu"
        HOST = "192.168.100.86"
    }
    stages {
        stage('Fetch code from Github') {
            steps {
                sh("ssh $USER@$HOST 'sudo rm -r /home/ubuntu/api && mkdir /home/ubuntu/api'")
                sh("ssh $USER@$HOST 'cd /home/ubuntu/api && git clone https://github.com/alfonso-m-g/rest-api-gui.git'")
            }
        }

        stage('Build app on docker') {
            steps {
                sh("ssh $USER@$HOST 'sudo docker stop rest-api && sudo docker rm rest-api'")
                sh("ssh $USER@$HOST 'sudo docker run -d -it -p 8080:80 -v /home/ubuntu/app/images-app:/usr/share/nginx/html --name rest-api nginx:latest'")
            }
        }
    }
}