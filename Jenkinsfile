pipeline {
  agent any

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timeout(time: 30, unit: 'MINUTES')
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
        git url: 'https://github.com/Codebreaker04/blogo.git', branch: 'dev'
      }
    }

    stage('Build Docker Image') {
        steps {
            script {
                // Build the Docker image
                docker.build("${DOCKER_IMAGE_NAME}:latest")
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
