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
			default: 'My Altimea Plugin'
		},{
			type: 'input',
			name: 'pluginSlashName',
			message: 'Nombre de ficheros del plugin',
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
		},{
			type: 'input',
			name: 'urlProxy',
			message: '¿Url localhost del proyecto? ejm: local.app.com, localhost/proyect-name',
			default: 'local.app.com'
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
				name: this.props.pluginSlashName
			}
			);
			this.fs.copyTpl(
			this.templatePath('config/_gulpfile.js'),
			this.destinationPath('gulpfile.js'), {
				name: this.props.pluginSlashName,
				urlProxy: this.props.urlProxy
			}
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
				this.templatePath('src/**'),
				this.destinationPath(),
				{
					pretty_name: this.props.pluginName,
					name: this.props.pluginSlashName,
					name_function: this.props.pluginSlashName.replace('-', '_'),
					name_class: this.props.className,
					description: this.props.pluginDescription
				}
			);

			/**
			* admin
			*/
			this.fs.move(
				this.destinationPath('admin/css/plugin-name-admin.css'),
				this.destinationPath('admin/css/' + this.props.pluginSlashName + '-admin.css')
			);
			this.fs.move(
				this.destinationPath('admin/js/plugin-name-admin.js'),
				this.destinationPath('admin/js/' + this.props.pluginSlashName + '-admin.js')
			);
			this.fs.move(
				this.destinationPath('admin/partials/plugin-name-admin-display.php'),
				this.destinationPath('admin/partials/' + this.props.pluginSlashName + '-admin-display.php')
			);
			this.fs.move(
				this.destinationPath('admin/class-plugin-name-admin.php'),
				this.destinationPath('admin/class-' + this.props.pluginSlashName + '-admin.php')
			);

			/**
			* includes
			*/
			this.fs.move(
				this.destinationPath('includes/class-plugin-name-activator.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '-activator.php')
			);
			this.fs.move(
				this.destinationPath('includes/class-plugin-name-deactivator.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '-deactivator.php')
			);
			this.fs.move(
				this.destinationPath('includes/class-plugin-name-i18n.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '-i18n.php')
			);
			this.fs.move(
				this.destinationPath('includes/class-plugin-name-loader.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '-loader.php')
			);
			this.fs.move(
				this.destinationPath('includes/class-plugin-name.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '.php')
			);

			/**
			* languages
			*/
			this.fs.move(
				this.destinationPath('languages/plugin-name.pot'),
				this.destinationPath('languages/' + this.props.pluginSlashName + '.pot')
			);

			/**
			* public
			*/
			this.fs.move(
				this.destinationPath('public/partials/plugin-name-public-display.php'),
				this.destinationPath('public/partials/' + this.props.pluginSlashName + '-public-display.php')
			);
			this.fs.move(
				this.destinationPath('public/class-plugin-name-public.php'),
				this.destinationPath('public/class-' + this.props.pluginSlashName + '-public.php')
			);

			/**
			* Root
			*/
			this.fs.move(
				this.destinationPath('plugin-name.php'),
				this.destinationPath(this.props.pluginSlashName + '.php')
			);
		},

	},

	install: function () {
		this.installDependencies({
			bower: false
		});
	}
});
