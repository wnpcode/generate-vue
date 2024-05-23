# generate-vue

## Project setup

```
# node version
node 14

npm install -g @vue/cli
npm install -g vue-crudgen

```

## Usage

Create model

```
mkdir src/models
cd src/models
touch author.js
```

define model

```
//author.js

const resource = {
  endPoint: "authors"
};

const model = {
  name: {
    type: "text",
    required: true
  },
  birth: {
    type: "date",
    required: true
  },
  active: {
    type: "radio",
    options: [{ id: "Active", value: true }, { id: "Inactive", value: false }]
  },
  sponsor: {
    type: "select",
    options: ["Patreon", "Legacy"]
  }
};

module.exports = { model, resource };
```

execute command

```
vue-crudgen -m ./src/models/
```

<!-- ## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/). -->
