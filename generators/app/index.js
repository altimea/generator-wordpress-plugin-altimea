'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.red('Altimea') + ' rules, bitch!'
    ));

    var prompts = [{
      type: 'input',
      name: 'pluginName',
      message: '¿Qué nombre le quieres dar al plugin?',
      default: 'altimea-myplugin'
    },{
      type: 'input',
      name: 'pluginDescription',
      message: 'Descripción del plugin',
      default: 'Plugin developed by Altimea for their beloved client'
    },{
      type: 'input',
      name: 'className',
      message: '¿Qué nombre le quieres dar a la Class del plugin? (usar camelCase)',
      default: 'AltimeaMyPlugin'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: {
    //Copy the configuration files
    config: function () {
      this.fs.copyTpl(
        this.templatePath('config/_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.pluginName
        }
      );
      this.fs.copyTpl(
        this.templatePath('config/_bower.json'),
        this.destinationPath('bower.json'), {
          name: this.props.pluginName
        }
      );
      this.fs.copy(
        this.templatePath('config/bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('config/_editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('config/_gitattributes'),
        this.destinationPath('.gitattributes')
      );
      this.fs.copy(
        this.templatePath('config/_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('config/_jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },


    //Copy the configuration files
    app: function () {
      this.fs.copyTpl(
        this.templatePath('plugin-files/**'),
        this.destinationPath(), 
        {
          name: this.props.pluginName,
          name_function: this.props.pluginName.replace('-', '_'),
          name_class: this.props.className,
          description: this.props.pluginDescription
        }
      );
    },

  },

  install: function () {
    this.installDependencies();
  }
});
