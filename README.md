[![GitHub Views](https://github.com/andrewindechemain/modern-man)]
# Modern Man Fashion Website

|Tool                | Description                    | Tags for tools used                                                                                               |
| ------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| 1.GitHub| Version Control| [Version-Control]; [Repo];|
| 2.ReactJs| JSX-Based FrontEnd Library|[Frontend]; [Javascript];|
| 3.Django| Python-Based Backend Framework|[Frontend]; [Javascript];|
| 4.ESLint| Linting Framework| [Lint]; [syntax];|
| 5.Figma | Interface Design| [Prototype]; [Wireframe];|
| 6.PostgreSQL | Relational Database| [Relational Integrity]; [Database];|
| 7.Jest | Javascript Testing Framework| [Testing Framework]; [Javascript];|

<p>The README documents details for the Implementation of a ReactJs and Django Application</p>

## <h1> Description</h1>
<p>The Aim of the project is to build a React.js and Python Django web project for an Ecommerce site for a mens wear with searchable categories of men's attire including: Suits, Shirts, NeckWear & Accessories   </p>

## Tool Implementation Choices/Decisions
<p><b>Github</b></p>
<ul>
<li>Github was used as a default repository for storing the codebase.It is popular, allows for collaboration and reviews, it allows for integration of other CI/CD tools and versioning for building of scalable applications</li>
</ul>
<p><b>NextJs</b></p>
<ul>
<li>The project was built using NextJs, A React Based Javascript FrontEnd Framework. Typescript syntax was used for the project. A minimal NextJs App was used to build the application from scratch for efficiency in space uilization and simplicity in the Application functionality.
<p><b>Configuration Process</b></p>
<ul>
<li> Creation of a new directory and initialization of Package.json using npm init</li>
<li> Dependency installations (npm v.10.4.0 and node v.21.4.0) for React,Typescript,NextJs</li>
<li> Building up of components for reusable code and pages for routing </li>
<li>Once the NextJs server starts a .next directory containing NextJs configurations is generated <li>
</ul>
</ul>
<p><b>ESLint</b></p>
<ul>
<li>ESLint was configured for Typescript and used for linting the Application's syntax. It is an efficient, easy to use and popular tool for checking language rules in Javascript</li>
</ul>
<p><b>MySql</b></p>
<ul>
<li>MySql relational database has been used for storing consistent information/notes regarding a cartoon character.It is opensource, popular,run on multiple environments</li>
<li> to access DB use .env variables</li>
</ul>
<p><b>Figma</b></p>
<ul>The design implementation was implemented using Figma, an online tool for designing wireframes and Prototypes.It is a user friendly and simple tool used for designing</ul>
<p></p>

## Design Implementation
<p><b>Colors</b></p>
<ul>
<li>Shades of Green (Monochromatic colors) #55BB25 and #518D34 were dominant throughout the project as they are the main brand colors of Rick and Morty cartoon series</li>
<li>Orange #F7825E and Red #AC3131 were also used as complementary colors to the main colors to add an accent  and  break monotony in the color scheme</li>
<li>White was also used to break cognitive overload of bright colors,to enable visibility of text in the case of dull colors and to bring focus to the searchbar which is the main interactive User Interface element</li>
<li>Black color was also used on fonts to bring contract/focus to text in the case of using bright colors</li>
</ul>
<p><b>Font Style</b></p>
<ul>
<li>Creepster font was used in the project as it is the theme font for the Ricka and Morty series</li>
</ul>
<p><b>Animation</b></p>
<ul>
<li>Moving stars were used on the navbar to capture emotive interest of a user.</li>
<li>Images with slideshow animation effects were used to showcase different characters in the Rick and Morty series and to also capture the emotive interest of users</li>
<li>A hover over design has been implemented on buttons and search results for call to action and to catch the attention of a user</li>
</ul>
<p><b>Modal</b></p>
<ul>
<li>A modal screen has been added so that a user can view more details about a character and add notes. The modal design reduces unneccessary navigation and adds modularity to the project so that the component can be reused</li>
</ul>

## <h1> Commands for Running the Project</h1>
## Development server

Run `npm run dev` for a development server. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Production server
Run `npm run start` for a production server, after building the project and generating neccesary statis files. Navigate to `http://localhost:3000/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `touch component.tsx` to generate a new component. The pages are located in the pages directory and are useful in routing while the components are located in a components directory for modularity and reusability.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `.next` directory.

## Run Linter

Run`npm run lint` to execute linting of the Next Js application. The dependency can be configured using `npm install` command.


## Figma Design

https://www.figma.com/file/jnMvsOEENiEnb8dCw01oXI/Untitled?type=design&node-id=0-1&mode=design&t=B2Yp0sZdtXKK8X2M-0


## Authors

Andrew Indeche - *Final work*