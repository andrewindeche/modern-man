# Modern Man Fashion Website

|Tool                | Description                    | Tags for tools used                                                                                               |
| ------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| 1.ReactJs| JSX-Based FrontEnd Library|[Frontend]; [Javascript];|
| 2.Redux| State Management Library|[State]; [Slice]; [Thunks];[Reducers];[Store];|
| 3.Django| Python-Based Backend Framework|[Backend]; [Python];|
| 4.ESLint| Linting Framework| [Lint]; [syntax];|
| 5.Figma| Interface Design| [Prototype]; [Wireframe];|
| 6.PostgreSQL| Relational Database| [Relational Integrity]; [SQL];|
| 7.Jest| Javascript Testing Framework| [Testing Framework]; [Javascript];|
| 8.Docker| Virtulization| [Virtualization]; [Containers];|
| 9.Django Rest Framework| API Toolkit| [API]; [REST Framework];|
| 10.Pipenv| Packaging & Virtual Environment Tool| [Virtual Environment]; [Dependency Management];|
| 11.CircleCI|Continous Intergration and Continous Delivery Tool| [Continous Intergration/Continous Delivery];|
| 12.SMTP bucket|Fake SMTP Server| [Simple Mail Transfer Protocol] ; [Email Server];|
| 13.Redis|Database,Message & Cache Broker Server| [Server] ; [Cache];|
| 14.Django-Mpesa and Stripe |Payment Gateway| [Payment] ; [Mpesa]; [STK];|

<p>The README documents details for the Implementation of a ReactJs and Django Application for a Men's wear website</p>

## <h1> Description</h1>
<p>The aim of the project is to build a React.js and Python Django web application for an e-commerce men’s wear store. The application will include searchable categories of men’s attire, such as suits, shirts, shoes, neckwear, and accessories</p>

## Tool Implementation Choices/Decisions
<p><b>Github</b></p>
<ul>
<li>Github was used as a default repository for storing the codebase.It is popular, allows for collaboration and reviews, it allows for integration of other CI/CD tools and versioning for building of scalable applications</li>
</ul>
<p><b>ReactJs</b></p>
<ul>
<li>The project was built using ReactJs Based Javascript FrontEnd Library. Jsx syntax was used for the project. A minimal ReactJs App was used to build the application from scratch for efficiency in space uilization and simplicity in the Application functionality.
</ul>
<p><b>Django</b></p>
<ul>
<li>The project was built using Python Based Javascript Backend Library: Django. Python syntax was used for the project. Postgres was used as the DB and packages installed through pipenv. Django is a versatile stack with a user friendly admin dashboard for adding data.
</ul>
<p><b>Docker</b></p>
<ul>
<li>A dockerized environment has been used for the backend and frontend. Docker virtualizes the apps in a container and decouples the applications for the host for production purpose.
</ul>
</ul>

## <h1> Commands for Running the Project</h1>
## Docker Environment
Run `Docker compose build` to build a new image and `Docker compose up`  to open up the virtulized container version of the project. Navigate to  development server at `localhost://0.0.0.0:8000/` to open up the project.

## Development server
Run `npm start` for a development server. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Production server
<p><b>React</b></p>
Run `npm run start` for a production server, after building the project and generating neccesary statis files. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

<p><b>Django</b></p>
Run `pipenv shell` to run python virtual environment with pipenv then `python3 manage.py runserver` so as to run the django server and start the app. Navigate to server at http://127.0.0.1:8000/. for admin dashboard navigate to http://127.0.0.1:8000/admin

## Code scaffolding

Run `touch component.jsx` to generate a new component. The pages are located in the pages directory and are useful in routing while the components are located in a components directory for modularity and reusability.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `build` directory.

## Run Linter

Run`npm run lint` to execute linting of the Next Js application. The dependency can be configured using `npm install` command.

## Payment Intergrations

Create Stripe account on: https://stripe.com/
Refer to backend\env.example for env variables

## Payment Intergrations
Create Mpesa Daraja account on: https://developer.safaricom.co.ke/
Refer to backend\env.example for env variables

## Figma Design

https://www.figma.com/file/jnMvsOEENiEnb8dCw01oXI/Untitled?type=design&node-id=0-1&mode=design&t=B2Yp0sZdtXKK8X2M-0


## Authors

Andrew Indeche - *Final work*