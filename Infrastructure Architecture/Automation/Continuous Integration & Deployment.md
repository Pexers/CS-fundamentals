> **Note**  
> Work in progress.

### Jenkins

- Groovy is a JVM-based programming language


### Pipeline
Both Declarative and Scripted Pipeline are DSLs [1] to describe portions of your software delivery pipeline. Scripted Pipeline is written in a limited form of Groovy syntax.

A Pipeline can be created in one of the following ways:
- Through Blue Ocean: after setting up a Pipeline project in Blue Ocean, the Blue Ocean UI helps you write the Pipeline's Jenkinsfile and commit it to source control.
- Through the classic UI: you can enter a basic Pipeline directly in Jenkins through the classic UI.
- In Source Code Management (SCM): you can write a Jenkinsfile manually, which you can commit to your project’s source control repository.

The syntax for defining a Pipeline with either approach is the same, but while Jenkins supports entering Pipeline directly into the classic UI, it is generally considered best practice to define the Pipeline in a Jenkinsfile which Jenkins will then load directly from source control.

- **Scripted**:
    - Fully written using Groovy.
    - We gain access to the wide group of APIs packaged with the Java Development Kit (JDK).
    - Usually more complex than declarative pipelines.
    - Can lead to the creation of unstable pipeline code that is difficult to maintain and interpret.
- **Declarative**:
    - Pre-defined structure.

```groovy
pipeline {
    agent { label 'docker-build-node' }  // Agent configured with Docker installed
    environment {
        // It is a good practice to generate an Access Token in Docker Hub and use it as the password 
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')

        // Setting environment variable dynamically using returnStdout
        A_ENV_VARIABLE = """${sh(
                returnStdout: true,
                script: 'echo "A value"'
            )}""" 
    }

    stages {
        stage('Build') {
            steps {
                // Use current build number as the Docker image tag
                sh 'docker build -t user/image_repo:$BUILD_NUMBER'
            }
        }
        stage('Login & Push to Docker Hub') {
            steps {
                // DOCKERHUB_CREDENTIALS => DOCKERHUB_CREDENTIALS_PSW = password; DOCKERHUB_CREDENTIALS_USR = user
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push user/image_repo:$BUILD_NUMBER'
            }
        }
        stage('Test') {
            agent {
                docker { image 'user/image_repo:$BUILD_NUMBER' }
            }
            options {  // Avoid pipeline hanging forever using timeouts
                timeout(time: 5, unit: 'MINUTES')
            }
            steps {
                echo 'Testing...'
            }
        }
        stage('Deployment') {
            when {
              expression {
                // If there were any test failures, the value would be UNSTABLE
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
            steps {
                echo 'Deploying...'
            }
        }
    }
    post {
		always {
			sh 'docker logout'
		}
	}
}
```
The `agent` instructs Jenkins to allocate an executor (on any available agent/node in the Jenkins environment) and workspace for the entire Pipeline.

Groovy string interpolation **should never** be used with credentials. This is because the sensitive environment variable will be interpolated during Groovy evaluation, and the environment variable's value could be made available earlier than intended, resulting in sensitive data leaking in various contexts.

---

Jenkins, GitLab CI/CD, GitHub Actions, Azure DevOps, Circle CI

- Blue/Green Deployment (zero downtime): A blue/green deployment process is a common technique for organizations practicing continuous deployment, as it makes it easier to roll back a release in the event of a problem by keeping the old code online until you’re confident that the changes are working as expected. If required, you can follow an initial canary deployment with a blue/green rollout.
- Hot Deployment
- Canary Deployment

Fix production bugs:
- hot fix: engineers rollout a new update quickly that fixes previous version bugs.

Pipeline performance metrics:
- **Code coverage**: automated tests should provide the majority of your test coverage, freeing up your QA engineers to focus on exploratory testing and defining new test cases.
- **Build duration**: build duration or build time measures the time taken to complete the various stages of the automated pipeline.
- **Test pass rate**: the percentage of test cases that passed successfully for a given build.
- **Time to fix tests**: time to fix tests is the time between a build reporting a failed test and the same test passing on a subsequent build. This metric gives you an indication of how quickly you’re able to respond to issues identified in the pipeline.

CI/CD Pipelines:
Push event	A push is made to the repository.
Tag event	Tags are created or deleted in the repository.
Issue event	A new issue is created or an existing issue is updated, closed, or reopened.
Comment event	A new comment is made on commits, merge requests, issues, and code snippets.
Merge request event	A merge request is created, updated, merged, or closed, or a commit is added in the source branch.
Wiki page event	A wiki page is created, updated, or deleted.
Pipeline event	A pipeline status changes.
Job event	A job status changes.
Deployment event	A deployment starts, succeeds, fails, or is canceled.
Group member event	A user is added or removed from a group, or a user's access level or access expiration date changes.
Subgroup event	A subgroup is created or removed from a group.
Feature flag event	A feature flag is turned on or off.
Release event	A release is created or updated.

