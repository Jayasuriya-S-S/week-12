pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonarkey') // Jenkins Secret Text credential ID
    }

    stages {
        stage('Code Checkout') {
            steps {
                 git branch: 'main', url: 'https://github.com/Jayasuriya-S-S/week-12.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarserver') { // 'sonarserver' is the SonarQube server configured in Jenkins
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=demo-check \
                          -Dsonar.projectName="SonarQube Jenkins Demo" \
                          -Dsonar.projectVersion=1.0 \
                          -Dsonar.sources=src/main/java \
                          -Dsonar.token=$SONAR_TOKEN
                    '''
                }
            }
        }
    }
}
