
pipeline {
    agent any
    environment {
        IMAGE_NAME = 'dockerimage:latest'
        DOCKERHUB_CREDENTIALS = 'Docker_cred'
        DOCKERHUB_REPO = 'jaiswathi1234/devops-dockerhub'
        SONARQUBE = 'sonarserver'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Jayasuriya-S-S/week-12.git'
            }
        }

        stage('Install & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

     stage('SonarQube Analysis') {
    steps {
        withSonarQubeEnv('sonarserver') {
            sh '''
                sonar-scanner \
                  -Dsonar.projectKey=emc-nodejs-app \
                  -Dsonar.sources=. \
                  -Dsonar.token=$SONAR_TOKEN
            '''
        }
    }
}



        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        def customImage = docker.build("${DOCKERHUB_REPO}:latest")
                        customImage.push()
                    }
                }
            }
        }

        stage('Deploy Container') {
            steps {
                echo 'Deployment can be done on any host by pulling the image from Docker Hub'
            }
        }
    }
}
