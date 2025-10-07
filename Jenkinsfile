pipeline {
  agent any

  options {
    timestamps()
    // buildDiscarder(logRotator(numToKeepStr: '20'))
    // timeout(time: 30, unit: 'MINUTES')
  }

  environment {
    DOCKER_IMAGE_NAME = 'blogo-frontend'
    // DOCKER_REGISTRY_CREDENTIALS = credentials('docker-registry-creds')
    // IMAGE_TAG = "${env.BUILD_NUMBER}"
  }

  stages {

    stage('Checkout') {
      steps {
        // Checkout the source code from the repository
        echo "Checking out the source code from the repository"
        git url: 'https://github.com/Codebreaker04/blogo.git', branch: 'dev'
        echo "Checking out the source code from the repository completed"
      }
    }

    stage('Build Docker Image') {
        steps {
            script {
                // Build the Docker image
                echo "Building the Docker image"
                docker.build("${DOCKER_IMAGE_NAME}:latest", "frontend")
                echo "Building the Docker image completed"
            }
        }
    }

    stage('Run Docker Container') {
        steps {
            script {
                echo "Running the Docker container"
                sh "docker stop ${DOCKER_IMAGE_NAME}:latest || true"
                sh "docker rm ${DOCKER_IMAGE_NAME}:latest || true"
                sh "docker run -d -p 80:80 --name ${DOCKER_IMAGE_NAME} ${DOCKER_IMAGE_NAME}:latest"
                sh "docker ps -f name=${DOCKER_IMAGE_NAME}"
                echo "Running the Docker container completed"
            }
        }
    }

    // stage('Push Docker Image') {
    //     steps {
    //         script {
    //             // Log in to Docker registry
    //             docker.withRegistry("https://${DOCKER_REGISTRY}", "${DOCKER_REGISTRY_CREDENTIALS_ID}") {
    //                 // Push Docker image to registry
    //                 docker.image("${DOCKER_IMAGE_NAME}:latest").push('latest')
    //             }
    //         }
    //     }
    // }
  }

  post {
    success {
      echo "✅ Build succeeded. " // Tag: ${env.IMAGE_TAG}
    //   archiveArtifacts allowEmptyArchive: true, artifacts: 'frontend/dist/**'
    }
    failure {
      echo '❌ Build failed.'
    }
    // always {
    //   junit allowEmptyResults: true, testResults: '**/junit-*.xml, **/test-results/*.xml'
    // }
  }
}
