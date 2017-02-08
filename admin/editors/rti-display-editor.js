Ext.widget({
  xtype: 'mz-form-widget',
  itemId: 'rti-display-editor',
  initComponent: function(){

    var me = this;
    Ext.Ajax.request({
      url: "/admin/app/entities/read?list=rtiSettings%40KiboDD&entityType=mzdb",
      method: 'get',
      success: function (res) {
        var response = JSON.parse(res.responseText);
        var customerCode = response.items[0].item.customerCode;
        var customerId = response.items[0].item.customerId;
        var widgetNameReqUrl = '//' + customerId + '-' + customerCode + '.baynote.net/merch/1/' + customerId + '_' + customerCode + '/production/pageTypes';
        me.getComboboxOptions(widgetNameReqUrl, 'page-template');

      }
    });

        this.items = [

            {
             xtype: 'mz-input-dropdown',
             name: 'pageType',
             fieldLabel: 'Page Template',
             itemId: 'page-template',
             store: {
                fields: ['name', 'placeholders'],
                data: []
              },
             allowBlank: false,
             displayField: 'name',
             valueField: 'placeholders',
             queryMode: 'local',
             editable: true,
             forceSelection: true,
             margin: '0 0 30px 0',
             listeners: {
               select: function(element, selection){
                 var listOfPlaceholders = selection[0].data.placeholders;
                 var select = me.down('#placeholders');
                 var store = select.getStore();
                 store.removeAll();
                 store.insert(0, listOfPlaceholders);
               }
             }
          },

          {
            xtype: 'mz-input-dropdown',
            name: 'placeholders',
            itemId: 'placeholders',
            fieldLabel: 'Placeholder Name',
            store: {
              fields: ['name'],
              data: []
            },
            allowBlank: false,
            displayField: 'name',
            valueField: 'name',
            queryMode: 'local'
          },

          {
            xtype: 'numberfield',
            cls: 'dropdown',
            name: 'numberOfItems',
            fieldLabel: 'Quantity of Items to Display',
            minValue: 1,
            value: 5,
            margin: '0 0 30px 0'
          },

      ];

          this.superclass.initComponent.apply(this, arguments);

      },
    getComboboxOptions: function(reqUrl, boxId){
      var me = this;

      //boxId can be given with or without the # at the front.
      if (boxId.charAt(0)!=='#'){
        boxId = '#'+boxId;
      }

      var request = new XMLHttpRequest();
      request.open('GET', reqUrl, true);
      request.addEventListener('load', function(res) {
              var items = JSON.parse(res.currentTarget.responseText);
              var select = me.down(boxId);
              var store = select.getStore();
              store.insert(0, items);
          }
      );
      request.send(null);
    }
    });