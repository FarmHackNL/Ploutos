
## Local development
With Node and Node Package Manager (npm) installed run the commands below from `/app` to install the necessary packages:
```bash
npm install
```

The project is based on Vue 2, and Vue CLI.  
If Vue cli is not already installed, install with:

```bash
npm install -g @vue/cli
```

### Run

To start the app, in `/app`:  

```bash

npm run serve

```

### Docker 

Build the image using:

```bash

docker build . -t dashboard

```

To run the container, use the command below.  
The container can now be accessed through the browser: `http://localhost:80/`  

```bash

docker run -it -p 80:80 dashboard

```
