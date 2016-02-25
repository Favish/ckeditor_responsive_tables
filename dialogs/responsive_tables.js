CKEDITOR.dialog.add( 'tableDialog', function ( editor ) {
  return {
    title: 'Responsive Table Maker',
    minWidth: 400,
    minHeight: 300,

    contents: [
      {
        id: 'tab-basic',
        label: 'Table Properties',
        elements: [
          {
            type: 'text',
            id: 'rows',
            label: '# Rows (Table Header is included in this)',
            validate: function() {
              var value = this.getValue();

              if(value == 0 || value <=1 ) {
                alert('The number of rows must be greater than 1, as the first row is the table header');
                return false;
              }
            }
          },
          {
            type: 'text',
            id: 'columns',
            label: '# Columns',
            validate: function() {
              if(this.getValue() == 0) {
                alert('The number of columns must be greater than 0');
                return false;
              }
            }
          },
          {
            type: 'radio',
            id: 'tableModes',
            label: 'Table Mode',//Makes the table sortable, swipe, or stack table (default)
            items: [ ['Stack (Default)', 'Stack'], ['Sortable'], ['Swipe'] ],
            default: 'Stack'
          },
          {
            type: 'checkbox',
            id: 'zebra',
            label: 'Enable Alternate Row Coloring',//Adds a class to the table
            default: 'checked'
          }
        ]
      }
    ],
    onOk: function() {
      var table = editor.document.createElement( 'table' );

      //Table Options
      var rows = this.getValueOf('tab-basic', 'rows');
      var columns = this.getValueOf('tab-basic', 'columns');
      var advancedTableMode = this.getValueOf('tab-basic', 'tableModes');
      var zebraStripe = this.getValueOf('tab-basic', 'zebra');

      //add a class if UI option is selected so it can be targeted via CSS
      if(zebraStripe) {
        table.addClass('table-zebra-stripe');
      }

      //create base table elements
      var thead = new CKEDITOR.dom.element('thead');
      var tbody = new CKEDITOR.dom.element('tbody');

      //Set classes and data-attributes that Tablesaw library requires based on UI options. Default is Stack table
      switch(advancedTableMode) {
        case 'Sortable':
          table.addClass('cbs-table tablesaw tablesaw-stack tablesaw-sortable');
          table.data('tablesaw-sortable', '');
          table.data('tablesaw-sortable-switch', '');
          break;
        case 'Swipe':
          table.addClass('cbs-table tablesaw tablesaw-swipe');
          table.data('tablesaw-mode', 'swipe');
          break;
        default:
          table.addClass('cbs-table tablesaw tablesaw-stack');
          table.data('tablesaw-mode', 'stack');
      }

      //Build table
      thead.appendTo(table);
      tbody.appendTo(table);

      for(var y=0; y < rows; y++) {
        var tr = new CKEDITOR.dom.element('tr');

        //if first row, then it's table header
        if(y == 0) {
          tr.appendTo(thead);
        }
        else {
          tr.appendTo(tbody);
        }

        for(var x=0; x < columns; x++) {
          //if first row, then add ths inside the table header, rather than tds
          if(y == 0) {
            var th = new CKEDITOR.dom.element('th');
            //If sortable option selected, add this data-attribute to headers to enable them to be sorted. Required by library
            if(advancedTableMode === 'Sortable') {
              th.data('tablesaw-sortable-col', '');
            }
            th.appendTo(tr);
          }
          else {
            var td = new CKEDITOR.dom.element('td');
            td.appendTo(tr);
          }
        }
      }
      editor.insertElement( table );
    }
  };
});