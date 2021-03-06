CKEDITOR.plugins.add( 'responsive_tables', {
  icons: 'icon',
  init: function( editor ) {
    CKEDITOR.dialog.add( 'openTableDialog', this.path + 'dialogs/responsive_tables.js' );
    CKEDITOR.dialog.add( 'RT-tableProperties', this.path + 'dialogs/responsive_tables.js' );

    editor.ui.addButton( 'Responsive Tables', {
      label: 'Create Responsive Table',
      command: 'openTableDialog',
      toolbar: 'insert',
      icon: this.path + 'icon.png'
    });

    editor.addCommand('openTableDialog', new CKEDITOR.dialogCommand('openTableDialog'));
    editor.addCommand('RT-tableProperties', new CKEDITOR.dialogCommand('RT-tableProperties', createDef() ) );

    // If the "menu" plugin is loaded, register the menu items.
    if ( editor.addMenuItems ) {
      //This removes the exsisting table plugin from the menu, because uninstalling the plugin doesn't
      editor.removeMenuItem('table');
      editor.addMenuItems( {
        rtTable: {
          label: 'Table Properties',
          command: 'RT-tableProperties',
          group: 'table',
          icon:  this.path + 'icon.png',
          order: 5
        }
      } );
    }

    function createDef( def ) {
      return CKEDITOR.tools.extend( def || {}, {
        contextSensitive: 1,
        refresh: function( editor, path ) {
          this.setState( path.contains( 'table', 1 ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED );
        }
      } );
    }

    // If the "contextmenu" plugin is loaded, register the listeners.
    if ( editor.contextMenu ) {
      editor.contextMenu.addListener( function() {
        // menu item state is resolved on commands.
        return {
          rtTable: CKEDITOR.TRISTATE_OFF
        };
      } );
    }
  },
  //Special case CSS that is loaded directly into ckeditor
  onLoad: function() {
    CKEDITOR.addCss(
      'table.tablesaw {' +
      'width: 95%;' +
      'margin: 0 auto;' +
      '}' +
      'table.tablesaw td {' +
        'border: 1px dotted #d8d8d8 !important;' +
      '}' +
      'table.tablesaw th {' +
      'border: 2px solid #d8d8d8 !important;' +
      '}'
    );
  }
});