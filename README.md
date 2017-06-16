# generator-wordpress-plugin-altimea
> Generador para estructura de plugin en WordPress para los proyectos de Altimea

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wordpress-plugin-altimea using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
sudo npm install -g yo
```
Clone the repository then go inside the directory:

```bash
sudo npm link
```

## Then generate your new project(:

```bash
mkdir myplugin
cd myplugin
yo wordpress-plugin-altimea
```

Extra functions
Useful for not install all dependencies by (npm, gulp, bower)

```bash
yo wordpress-plugin-altimea --skip-install
```
