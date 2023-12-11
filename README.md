# assistante-dermatologue

This application was generated using JHipster 8.0.0-rc.1, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v8.0.0-rc.1](https://www.jhipster.tech/documentation-archive/v8.0.0-rc.1).



# Project description

### Introduction
This project harnesses artificial intelligence to provide support for dermatological
diagnostics to healthcare professionals. Its aim is to enhance the accuracy of
skin disorder diagnoses through advanced image analysis and machine learning
techniques. The goal is to optimize dermatological care and streamline clinical
decision-making.
The platform prioritizes user-friendliness, featuring intuitive navigation and
clear action prompts. User interfaces are designed to be easily understood and
utilized by healthcare professionals, regardless of their level of technical expertise.
It delivers clear visual responses to user actions, simplifying the skin disease
diagnostic process for dermatologists. This is achieved by enabling direct
queries to the ML model to obtain predicted disease results, along with the capability
to prescribe based on the diagnosis. Additionally, the system facilitates
appointment scheduling and provides a convenient way to view appointments,
whether confirmed or pending. These functionalities are well-implemented, ensuring
effectiveness and practicality in managing appointments.
The platform not only enhances the diagnostic capabilities but also focuses
on improving the overall user experience, making it a valuable tool for dermatological
professionals in their daily operations.

### Project architecture
The Dermatological Diagnostic Assistance Platform is built on a modern and
scalable architecture using the JHipster framework. The architecture consists of
three main components: the Spring Boot backend, the React web application,
and the React Native mobile application. The Spring Boot Backend forms
the foundation, providing robust and scalable support for data processing and
managing interactions with the database. It adopts a monolithic architecture
and incorporates RESTful APIs to enable seamless communication with the
frontend components.
In parallel, the Web front-end is constructed using React, delivering a responsive
and user-friendly interface tailored for dermatologists, secretaries, patients,
and administrative users. This component introduces essential features
like patient management, appointment scheduling, and diagnostic report generation.
State management is handled efficiently with React hooks, ensuring
smooth communication with the backend through API calls.
Complementing the web application, the Mobile Application extends the
platform’s capabilities to patients and dermatologists. Developed with React
Native, it enables secure access to medical records, viewing upcoming appointments,
and receiving diagnostic results. This mobile component significantly
enhances user accessibility, empowering patients and dermatologists to actively
engage in their healthcare journey.
![archi](https://github.com/ElmansouriAMINE/Air-plaine-Flight-Simulator-App/assets/101812229/73de1c7a-d414-4ef0-a90f-5c23329f6901)

### Project functionalities

The Dermatological Diagnostic Assistance Platform boasts a comprehensive set
of functionalities designed to revolutionize the field of dermatological diagnostics.
Built on a modern and scalable architecture using the JHipster framework,
the system accommodates four primary user roles: Doctors, Administrators,
Secretaries, and Patients.
For doctors, the platform provides a dynamic dashboard offering a real-time
snapshot of daily appointments and consultations, empowering efficient schedule
management. The Patient Management feature enables doctors to access,
update, and diagnose patients, leveraging machine learning algorithms for preliminary
analysis. The system ensures a seamless integration of expert review,
allowing dermatologists to confirm, adjust, and prescribe treatments as needed.
The software facilitates secure logout to safeguard patient confidentiality.
Administrators wield powerful user management tools, overseeing accounts
for doctors, patients, and secretaries. Disease and Stage Management functionalities
enable administrators to maintain an accurate and up-to-date disease
database, including associated images for each stage. The system’s security is
further fortified through a secure logout process.
Secretaries leverage their dedicated profile section for easy access to personal
information. Patient and Appointment Management functionalities empower
secretaries to supervise patient records, add new patients, and efficiently schedule
appointments, ensuring optimal coordination between patient schedules and
doctor availability. Like other roles, secretaries benefit from a secure logout
mechanism to uphold data security.
Patients, the end-users, gain access to their comprehensive medical records,
upcoming appointments, and personal profiles. The platform ensures a patientcentric
approach by providing a secure environment for accessing healthcare
information. The software’s intuitive functionalities are tailored to enhance collaboration
among healthcare professionals, streamline administrative processes,
and ultimately elevate the quality of dermatological care. From AI-driven preliminary
diagnoses to efficient appointment management, this platform stands
as a pioneering solution at the intersection of healthcare and technology.


## Project Structure

Node is required for generation and recommended for development. `package.json` is always generated for a better development experience with prettier, commit hooks, scripts and so on.

In the project root, JHipster generates configuration files for tools like git, prettier, eslint, husky, and others that are well known and you can find references in the web.

`/src/*` structure follows default Java structure.

- `.yo-rc.json` - Yeoman configuration file
  JHipster configuration is stored in this file at `generator-jhipster` key. You may find `generator-jhipster-*` for specific blueprints configuration.
- `.yo-resolve` (optional) - Yeoman conflict resolver
  Allows to use a specific action when conflicts are found skipping prompts for files that matches a pattern. Each line should match `[pattern] [action]` with pattern been a [Minimatch](https://github.com/isaacs/minimatch#minimatch) pattern and action been one of skip (default if ommited) or force. Lines starting with `#` are considered comments and are ignored.
- `.jhipster/*.json` - JHipster entity configuration files

- `npmw` - wrapper to use locally installed npm.
  JHipster installs Node and npm locally using the build tool by default. This wrapper makes sure npm is installed locally and uses it avoiding some differences different versions can cause. By using `./npmw` instead of the traditional `npm` you can configure a Node-less environment to develop or test your application.
- `/src/main/docker` - Docker configurations for the application and services that the application depends on

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

```
npm install
```

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

```
./mvnw
npm start
```

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

### PWA Support

JHipster ships with PWA (Progressive Web App) support, and it's turned off by default. One of the main components of a PWA is a service worker.

The service worker initialization code is commented out by default. To enable it, uncomment the following code in `src/main/webapp/index.html`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function () {
      console.log('Service Worker Registered');
    });
  }
</script>
```

Note: [Workbox](https://developers.google.com/web/tools/workbox/) powers JHipster's service worker. It dynamically generates the `service-worker.js` file.

### Managing dependencies

For example, to add [Leaflet][] library as a runtime dependency of your application, you would run following command:

```
npm install --save --save-exact leaflet
```

To benefit from TypeScript type definitions from [DefinitelyTyped][] repository in development, you would run following command:

```
npm install --save-dev --save-exact @types/leaflet
```

Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Note: There are still a few other things remaining to do for Leaflet that we won't detail here.

For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

## Building for production

### Packaging as jar

To build the final jar and optimize the assistante-dermatologue application for production, run:

```
./mvnw -Pprod clean verify
```

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

```
java -jar target/*.jar
```

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```
./mvnw -Pprod,war clean verify
```

### JHipster Control Center

JHipster Control Center can help you manage and control your application(s). You can start a local control center server (accessible on http://localhost:7419) with:

```
docker compose -f src/main/docker/jhipster-control-center.yml up
```

## Testing

### Spring Boot tests

To launch your application's tests, run:

```
./mvnw verify
```

### Client tests

Unit tests are run by [Jest][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

```
npm test
```

## Others

### Code quality using Sonar

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker compose -f src/main/docker/sonar.yml up -d
```

Note: we have turned off forced authentication redirect for UI in [src/main/docker/sonar.yml](src/main/docker/sonar.yml) for out of the box experience while trying out SonarQube, for real use cases turn it back on.

You can run a Sonar analysis with using the [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) or by using the maven plugin.

Then, run a Sonar analysis:

```
./mvnw -Pprod clean verify sonar:sonar -Dsonar.login=admin -Dsonar.password=admin
```

If you need to re-run the Sonar phase, please be sure to specify at least the `initialize` phase since Sonar properties are loaded from the sonar-project.properties file.

```
./mvnw initialize sonar:sonar -Dsonar.login=admin -Dsonar.password=admin
```

Additionally, Instead of passing `sonar.password` and `sonar.login` as CLI arguments, these parameters can be configured from [sonar-project.properties](sonar-project.properties) as shown below:

```
sonar.login=admin
sonar.password=admin
```

For more information, refer to the [Code quality page][].

### Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a mongodb database in a docker container, run:

```
docker compose -f src/main/docker/mongodb.yml up -d
```

To stop it and remove the container, run:

```
docker compose -f src/main/docker/mongodb.yml down
```

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

```
npm run java:docker
```

Or build a arm64 docker image when using an arm64 processor os like MacOS with M1 processor family running:

```
npm run java:docker:arm64
```

Then run:

```
docker compose -f src/main/docker/app.yml up -d
```

When running Docker Desktop on MacOS Big Sur or later, consider enabling experimental `Use the new Virtualization framework` for better processing performance ([disk access performance is worse](https://github.com/docker/roadmap/issues/7)).

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[JHipster Homepage and latest documentation]: https://www.jhipster.tech
[JHipster 8.0.0-rc.1 archive]: https://www.jhipster.tech/documentation-archive/v8.0.0-rc.1
[Using JHipster in development]: https://www.jhipster.tech/documentation-archive/v8.0.0-rc.1/development/
[Using Docker and Docker-Compose]: https://www.jhipster.tech/documentation-archive/v8.0.0-rc.1/docker-compose
[Using JHipster in production]: https://www.jhipster.tech/documentation-archive/v8.0.0-rc.1/production/
[Running tests page]: https://www.jhipster.tech/documentation-archive/v8.0.0-rc.1/running-tests/
[Code quality page]: https://www.jhipster.tech/documentation-archive/v8.0.0-rc.1/code-quality/
[Setting up Continuous Integration]: https://www.jhipster.tech/documentation-archive/v8.0.0-rc.1/setting-up-ci/
[Node.js]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[Webpack]: https://webpack.github.io/
[BrowserSync]: https://www.browsersync.io/
[Jest]: https://facebook.github.io/jest/
[Leaflet]: https://leafletjs.com/
[DefinitelyTyped]: https://definitelytyped.org/
