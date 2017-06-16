'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
	constructor: function () {
		yeoman.Base.apply(this, arguments);

		this.option('skip-install', {
			desc: 'Omite la instalación de dependencias',
			type: Boolean
		});
	},
	prompting: function () {
		// Have Yeoman greet the user.
		this.log(yosay(
			chalk.red('Altimea') + ' rules, bitch!'
		));

		var prompts = [{
			type: 'checkbox',
			name: 'features',
			message: '¿Que componentes de gustaria incluir?',
			choices: [{
				name: 'Admin',
				value: 'includeAdmin',
				checked: true
			}, {
				name: 'Public',
				value: 'includePublic',
				checked: false
			}],
		},{
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


		return this.prompt(prompts).then(answers => {
			const features = answers.features;
			const hasFeature = feat => features && features.indexOf(feat) !== -1;

			// manually deal with the response, get back and store the results.
			// we change a bit this way of doing to automatically do this in the self.prompt() method.
			this.props = answers;
			this.includeAdmin = hasFeature('includeAdmin');
			this.includePublic = hasFeature('includePublic');
			// set to componentAdmin to true: when you do not select anything
			if (this.includeAdmin === false && this.includePublic === false) {
				this.includeAdmin = true;
			}
		});
	},

	//Writing Logic here
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

			var params = {
				pretty_name: this.props.pluginName,
				name: this.props.pluginSlashName,
				name_function: this.props.pluginSlashName.replace('-', '_'),
				name_class: this.props.className,
				description: this.props.pluginDescription,
				includeAdmin: this.includeAdmin,
				includePublic: this.includePublic
			};

			/**
			* admin
			*/
			if (this.includeAdmin) {
				this.fs.copyTpl(
					this.templatePath('src/admin/css/plugin-name-admin.css'),
					this.destinationPath('admin/css/' + this.props.pluginSlashName + '-admin.css'),
					params
				);
				this.fs.copyTpl(
					this.templatePath('src/admin/js/plugin-name-admin.js'),
					this.destinationPath('admin/js/' + this.props.pluginSlashName + '-admin.js'),
					params
				);
				this.fs.copyTpl(
					this.templatePath('src/admin/partials/plugin-name-admin-display.php'),
					this.destinationPath('admin/partials/' + this.props.pluginSlashName + '-admin-display.php'),
					params
				);
				this.fs.copyTpl(
					this.templatePath('src/admin/class-plugin-name-admin.php'),
					this.destinationPath('admin/class-' + this.props.pluginSlashName + '-admin.php'),
					params
				);
			}
			/**
			* includes
			*/
			this.fs.copyTpl(
				this.templatePath('src/includes/class-plugin-name-activator.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '-activator.php'),
				params
			);
			this.fs.copyTpl(
				this.templatePath('src/includes/class-plugin-name-deactivator.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '-deactivator.php'),
				params
			);
			this.fs.copyTpl(
				this.templatePath('src/includes/class-plugin-name-i18n.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '-i18n.php'),
				params
			);
			this.fs.copyTpl(
				this.templatePath('src/includes/class-plugin-name-loader.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '-loader.php'),
				params
			);
			this.fs.copyTpl(
				this.templatePath('src/includes/class-plugin-name.php'),
				this.destinationPath('includes/class-' + this.props.pluginSlashName + '.php'),
				params
			);
			/**
			* languages
			*/
			this.fs.copyTpl(
				this.templatePath('src/languages/plugin-name.pot'),
				this.destinationPath('languages/' + this.props.pluginSlashName + '.pot'),
				params
			);
			/**
			* public
			*/
			if (this.includePublic) {
				this.fs.copyTpl(
					this.templatePath('src/public/partials/plugin-name-public-display.php'),
					this.destinationPath('public/partials/' + this.props.pluginSlashName + '-public-display.php'),
					params
				);
				this.fs.copyTpl(
					this.templatePath('src/public/class-plugin-name-public.php'),
					this.destinationPath('public/class-' + this.props.pluginSlashName + '-public.php'),
					params
				);
				this.fs.copyTpl(
					this.templatePath('src/src/**'),
					this.destinationPath(),
					params
				)
			}
			/**
			* Root
			*/
			this.fs.copyTpl(
				this.templatePath('src/plugin-name.php'),
				this.destinationPath(this.props.pluginSlashName + '.php'),
				params
			);

		},

	},

	install: function () {

		if (this.options['skip-install'] ) {
			// installer all dependencies by default
			this.installDependencies({
				bower: false
			});
		}
	}
});
