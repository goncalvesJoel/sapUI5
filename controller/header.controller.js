sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/format/DateFormat",

], function (Controller, MessageToast, JSONModel, ResourceModel, DateFormat) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.header", {
        onInit: function () {
            // set data model on view
            var oData = {
                recipient: {
                    name: "World"
                }
            };

            // set json model view
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);


            // set i18n model on view
            var i18nModel = new ResourceModel({
                bundleName: "sap.ui.demo.wt.i18n.i18n"
            });
            this.getView().setModel(i18nModel, "i18n");
        },

        BTN_HEADER_onShowHello: function () {
            // show a native JavaScript alert
            alert("page header");
            MessageToast.show("Hello World");

            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },




        //Teste CSV....

        convertToCSV: function (objArray) {
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';

            for (var i = 0; i < array.length; i++) {
                var line = '';
                for (var index in array[i]) {
                    if (line != '') line += ','

                    line += array[i][index];
                }

                str += line + '\r\n';
            }

            return str;
        },


        exportCSVFile: function (headers, items, fileTitle) {
            if (headers) {
                items.unshift(headers);
            }

            // Convert Object to JSON
            var jsonObject = JSON.stringify(items);

            var csv = this.convertToCSV(jsonObject);

            var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, exportedFilenmae);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", exportedFilenmae);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }

        },



        BTN_HEADER_Download_onShowHello: function () {

            var headers = {
                model: 'Phone Model'.replace(/,/g, ''), // remove commas to avoid errors
                chargers: "Chargers",
                cases: "Cases",
                earphones: "Earphones"
            };

            var itemsNotFormatted = [
                {
                    model: 'Samsung S7',
                    chargers: '55',
                    cases: '56',
                    earphones: '57',
                    scratched: '2'
                },
                {
                    model: 'Pixel XL',
                    chargers: '77',
                    cases: '78',
                    earphones: '79',
                    scratched: '4'
                },
                {
                    model: 'iPhone 7',
                    chargers: '88',
                    cases: '89',
                    earphones: '90',
                    scratched: '6'
                }
            ];

            var itemsFormatted = [];

            // format the data
            itemsNotFormatted.forEach((item) => {
                itemsFormatted.push({
                    model: item.model.replace(/,/g, ''), // remove commas to avoid errors,
                    chargers: item.chargers,
                    cases: item.cases,
                    earphones: item.earphones
                });
            });

            var fileTitle = 'orders'; // or 'my-unique-title'

            this.exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download

        },


        BTN_counter: function () {

            var myTextElem = this.getView().byId("counter");
            var myNum = parseInt(myTextElem.getText());
            var myNewNum = myNum + 1;

            myTextElem.setText(myNewNum);

        },

        returnDateHour: function(){
            var oDateTimeWithTimezoneFormat = sap.ui.core.format.DateFormat.getDateTimeWithTimezoneInstance();
            var date_hour = oDateTimeWithTimezoneFormat.format(new Date()); // Returns "10.02.2022, 10:01:14 America/New_York"
            return date_hour;
        },



        BTN_counter_time: function () {
           
            var myTextElem = this.getView().byId("counter_time");
            var myNewNum = this.returnDateHour();
            myTextElem.setText(myNewNum);

        },

        writeJson: function(){
            var obj = {
                table: []
             };

             obj.table.push({id: 1, square:2});

             var json = JSON.stringify(obj);

             var fs = sap.ui.require('fs');
             fs.sap.ui.writeFile('myjsonfile.json', json, 'utf8', callback);


             fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                obj = JSON.parse(data); //now it an object
                obj.table.push({id: 2, square:3}); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
            }});

        },

        onDisplayNotFound : function (oEvent) {
			//display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound");
		}
    });
});