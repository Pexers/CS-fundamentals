> **Note**  
> Work in progress.

### Jenkins
Jenkins is an open source automation platform which enables developers to reliably build, test, and deploy their software using pipelines. It's not limited to creating pipelines for code, it can be used to automate any task, such as running Bash and Python scripts as well as Ansible playbooks.

Jenkins provides a web GUI where we can create jobs and customize all the functionality that we want, such as Source Control Management (SCM), pre/post build actions, as well as build triggers. We can run tasks on demand by clicking a button, or have them triggered automatically via webhooks.


#### Running Jenkins system
Jenkins' source code is mostly Java, with a few Groovy, Ruby, and Antlr files. We  can run the Jenkins WAR standalone or as a servlet in a Java application server such as Tomcat. In either case, it produces a web user interface and accepts calls to its REST API. 

The recommended way to install Jenkins is though Docker. The Docker image to use is the official `jenkins/jenkins` image from the Docker Hub repository. This image contains the current Long-Term Support (LTS) release of Jenkins (which is production-ready). However this image doesn’t have docker CLI inside it and is not bundled with frequently used Blue Ocean plugins and features. 

Blue Ocean as it stands provides easy-to-use Pipeline visualization. It was intended to be a rethink of the Jenkins user experience, designed from the ground up for Jenkins Pipeline. Blue Ocean was intended to reduce clutter and increases clarity for all users.

_Build the Jenkins BlueOcean Docker Image_
```sh
$ docker build -t myjenkins-blueocean:TAG .
```

<p align="center">
  <img src="https://user-images.githubusercontent.com/47757441/222973544-9780c963-3e02-4c08-94d2-4b33ceafd99f.png" width="350">
</p>

- Jenkins requires Java 11 or 17 since Jenkins 2.357 and LTS 2.361.1.
- SSH should also be installed given that the Master server usually makes connections over SSH.
- Any type of build tools should be installed on Agents. Agents are going to be the work horses that run builds.

#### Setting up agents
TODO:
**Menu**: _Dashboard :arrow_right: Manage Jenkins :arrow_right: Manage Nodes and Clouds_.
- _Permanent Agent_:
- _Cloud Agent_:

#### Pipeline syntax
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
    - A more strict and pre-defined structure.
    - Easy to read syntax.
    - Ideal choice for simpler CI/CD pipelines.

_Jenkinsfile - Declarative pipeline_
```groovy
pipeline {
    agent { label 'docker-agent-alpine' }  // Agent configured with Docker installed
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
        stage('Test') {
            options {  // Avoid pipeline hanging forever using timeouts
                timeout(time: 5, unit: 'MINUTES')
            }
            steps {
                // Run container in interactive mode & run NPM tests
                sh '''
                docker run -it IMAGE EXECUTABLE
                npm run test
                '''
            }
        }
        stage('Package') {  // Login & Push image to Docker Hub
            steps {
                // DOCKERHUB_CREDENTIALS => DOCKERHUB_CREDENTIALS_PSW = password; DOCKERHUB_CREDENTIALS_USR = user
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push user/image_repo:$BUILD_NUMBER'
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

