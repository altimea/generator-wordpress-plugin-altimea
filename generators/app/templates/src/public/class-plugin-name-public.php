<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://www.altimea.com
 * @since      1.0.0
 *
 * @package    <%= name_class %>
 * @subpackage <%= name_class %>/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    <%= name_class %>
 * @subpackage <%= name_class %>/public
 * @author     Altimea <apps@altimea.com>
 */
class <%= name_class %>Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $<%= name_function %>    The ID of this plugin.
	 */
	private $<%= name_function %>;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $<%= name_function %>       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $<%= name_function %>, $version ) {

		$this-><%= name_function %> = $<%= name_function %>;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in <%= name_class %>Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The <%= name_class %>Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		$fileName = '<%= name %>-main.css';
		$newFileName = <%= name_class %>Gulpfile::getFileNameMD5( $fileName );

		if ( file_exists( plugin_dir_path( <%= constant_file %> ) . 'public/assets/css/' . $newFileName ) ) {
			wp_enqueue_style( $this-><%= name_function %>, plugin_dir_url( <%= constant_file %> ) . 'public/assets/css/' . $newFileName, array(), $this->version, 'all' );
		} else {
			wp_enqueue_style( $this-><%= name_function %>, plugin_dir_url( <%= constant_file %> ) . 'public/assets/css/' . $fileName, array(), $this->version, 'all' );
		}

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in <%= name_class %>Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The <%= name_class %>Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		$fileName = '<%= name %>-main.js';
		$newFileName = <%= name_class %>Gulpfile::getFileNameMD5( $fileName );

		if ( file_exists( plugin_dir_path( <%= constant_file %> ) . 'public/assets/js/' . $newFileName ) ) {
			wp_enqueue_script( $this-><%= name_function %>, plugin_dir_url( <%= constant_file %> ) . 'public/assets/js/' . $newFileName, array( 'jquery' ), $this->version, false );
		} else {
			wp_enqueue_script( $this-><%= name_function %>, plugin_dir_url( <%= constant_file %> ) . 'public/assets/js/' . $fileName, array( 'jquery' ), $this->version, false );
		}

	}

}
