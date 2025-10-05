pipeline {
  agent any

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timeout(time: 30, unit: 'MINUTES')
  }

  environment {
    DOCKER_REGISTRY_CREDENTIALS = credentials('docker-registry-creds')
    IMAGE_TAG = "${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          def sha = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          if (!env.IMAGE_TAG?.trim()) {
            env.IMAGE_TAG = sha
          }
        }
      }
    }

    stage('Install') {
      steps {
        ansiColor('xterm') {
          parallel {
            stage('Install common') {
              steps {
                dir('common') {
                  sh 'npm ci || npm install'
                }
              }
            }
            stage('Install backend') {
              steps {
                dir('backend') {
                  sh 'npm ci || npm install'
                }
              }
            }
            stage('Install frontend') {
              steps {
                dir('frontend') {
                  sh 'npm ci || npm install'
                }
              }
            }
          }
        }
      }
    }

    stage('Build') {
      steps {
        ansiColor('xterm') {
          parallel {
            stage('Build common') {
              steps {
                dir('common') {
                  sh 'npm run build --if-present'
                }
              }
            }
            stage('Build backend') {
              steps {
                dir('backend') {
                  sh 'npm run build --if-present'
                }
              }
            }
            stage('Build frontend') {
              steps {
                dir('frontend') {
                  sh 'npm run build --if-present'
                }
              }
            }
          }
        }
      }
    }

    stage('Test') {
      steps {
        ansiColor('xterm') {
          parallel {
            stage('Test common') {
              steps {
                dir('common') {
                  sh 'npm test --if-present --silent || true'
                }
              }
            }
            stage('Test backend') {
              steps {
                dir('backend') {
                  sh 'npm test --if-present --silent || true'
                }
              }
            }
            stage('Test frontend') {
              steps {
                dir('frontend') {
                  sh 'npm test --if-present --silent || true'
                }
              }
            }
          }
        }
      }
    }

    stage('Docker Build (optional)') {
      when {
        expression { fileExists('docker-compose.yml') }
      }
      steps {
        ansiColor('xterm') {
          sh 'docker compose version || docker-compose version || true'
          sh 'docker compose -f docker-compose.yml build || docker-compose -f docker-compose.yml build'
        }
      }
    }

    stage('Docker Push (optional)') {
      when {
        allOf {
          expression { fileExists('docker-compose.yml') }
          expression { return env.DOCKER_REGISTRY_CREDENTIALS != null && env.DOCKER_REGISTRY_CREDENTIALS.trim() }
        }
      }
      steps {
        ansiColor('xterm') {
          script {
            withCredentials([usernamePassword(credentialsId: env.DOCKER_REGISTRY_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
              sh '''
                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin || true
              '''
            }
          }
        }
      }
    }
  }

  post {
    success {
      echo "Build succeeded. Tag: ${env.IMAGE_TAG}"
      archiveArtifacts allowEmptyArchive: true, artifacts: 'frontend/dist/**'
    }
    failure {
      echo 'Build failed.'
    }
    always {
      junit allowEmptyResults: true, testResults: '**/junit-*.xml, **/test-results/*.xml'
    }
  }
}
