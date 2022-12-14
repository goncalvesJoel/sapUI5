sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",

], function (Controller, MessageToast, JSONModel, ResourceModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.footer", {
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
            alert("page footer");
            MessageToast.show("Hello World");

            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },

        BTN_NEXT_PAGE1: function (oEvent) {
            // display the "notFound" target without changing the hash
            this.getRouter().getTargets().display("notFound", {
                fromTarget: "main"
            });


        }
    });
});