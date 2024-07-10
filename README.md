
# EPYC'S IPL DASHBOARD

A simple dashboard to view IPL analytics




## Run Locally

Clone the project

```bash
  git clone https://github.com/Introfect/epyc-ass.git
```

Go to the project directory and install dependencies for this application

now instal the dependency for the application
```bash
  npm i --force
```
Run the application by using the following command

```bash
  npm run dev
```

Please reach out if any issues while running 

aayushmanpratap333@gmail.com


## Demo

https://epyc-ass.vercel.app/
## Tech Stack

**Client:** NextJS, Typescript, TailwindCSS, Recharts, papaparse; 

## Flow
 the data from the csv is parsed and stored , it is then passed in different function in the helpers.ts file to get desired results for the data visualization.

 ## Routing
```bash
 / -> Landing page. 
 /dashboard -> home page for dashboard. 
 /dashboard/team -> team vs team comparison page. 
 /dashboard/player -> player vs player comparison. (used different dataset for this page.)
```


