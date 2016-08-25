<?php

/**
 * WordPress plugin generator by Altimea
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://www.altimea.com
 * @since             1.0.0
 * @package           <%= name_class %>
 *
 * @wordpress-plugin
 * Plugin Name:       <%= name %>
 * Plugin URI:        http://www.altimea.com
 * Description:       <%= description %>
 * Version:           1.0.0
 * Author:            Altimea
 * Author URI:        http://www.altimea.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       <%= name %>
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-<%= name %>-activator.php
 */
function activate_<%= name_function %>() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-<%= name %>-activator.php';
	<%= name_class %>_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-<%= name %>-deactivator.php
 */
function deactivate_<%= name_function %>() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-<%= name %>-deactivator.php';
	<%= name_class %>_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_<%= name_function %>' );
register_deactivation_hook( __FILE__, 'deactivate_<%= name_function %>' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-<%= name %>.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_<%= name_function %>() {

	$plugin = new <%= name_class %>();
	$plugin->run();

}
run_<%= name_function %>();
