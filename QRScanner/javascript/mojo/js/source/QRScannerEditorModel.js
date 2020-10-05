// This Plugin is developed by Amit Kumar Sah, amitkumars954@gmail.com

(function () { 
    if (!mstrmojo.plugins.QRScanner) {
        mstrmojo.plugins.QRScanner = {};
    }

    mstrmojo.requiresCls(
        "mstrmojo.vi.models.editors.CustomVisEditorModel",
        "mstrmojo.array"
    );

    var $WT = mstrmojo.vi.models.editors.CustomVisEditorModel.WIDGET_TYPE ; 

    mstrmojo.plugins.QRScanner.QRScannerEditorModel = mstrmojo.declare(
        mstrmojo.vi.models.editors.CustomVisEditorModel,
        null,
        {
            scriptClass: "mstrmojo.plugins.QRScanner.QRScannerEditorModel",
            cssClass: "qrscannereditormodel",
            getCustomProperty: function getCustomProperty(){


                var host = this.getHost();               
                //var allfont = "Arial" ; 
                
                return [

    {
        name: "Configuration",
        value: [


            {
                style: $WT.EDITORGROUP,
                items: [

                    {
                        style: $WT.CHECKBOXANDLABEL,
                        value: true,
                        propertyName: 'isScannedName',
                        labelText: "Show Scanned Name ",
                        config: {
                            suppressData: true,

                            callback: function() {

                                host.refresh();
                            }

                        }
                    },
                    {
                        style: $WT.CHECKBOXANDLABEL,
                        value: true,
                        propertyName: 'isScannedImg',
                        labelText: "Show Scanned Image ",
                        config: {
                            suppressData: true,

                            callback: function() {

                                host.refresh();
                            }

                        }
                    },
                    {
                        style: $WT.LABEL,
                        name: "text",
                        width: "100%",
                        labelText: "Set Scanner Icon Url"
                    }, {
                        style: $WT.LABEL,
                        name: "text",
                        width: "100%",
                        labelText: "ex): url+{@id}.png/{@desc}.gif"
                    }, {
                        style: $WT.TEXTBOX,
                        propertyName: "iconurl",
                        value: "Input scan icon url",
                        config: {
                            suppressData: true,
                            callback: function() {

                                host.refresh();
                            }
                        }
                    },
                    {
                        style: $WT.LABEL,
                        name: "text",
                        width: "100%",
                        labelText: "Set Camera Index"
                    },
                    {
                        style: $WT.LABEL,
                        name: "text",
                        width: "100%",
                        labelText: "ex): 0 for front camera"
                    },
                    {

                        style: $WT.TWOCOLUMN,
                        items: [{
                            style: $WT.LABEL,
                            name: "text",
                            width: "50%",
                            labelText: "Index:"
                        }, {
                            style: $WT.TEXTBOX,
                            width: "50%",
                            propertyName: "cameraIndex",
                            config: {
                                suppressData: true,
                                callback: function() {

                                    host.refresh();
                                }
                            }
                        }]

                    },
                    {
                        style: $WT.LABEL,
                        name: "text",
                        width: "100%",
                        labelText: "Set Camera Bounded Box UI"
                    },                
                    {

                        style: $WT.TWOCOLUMN,
                        items: [{
                            style: $WT.LABEL,
                            name: "text",
                            width: "50%",
                            labelText: "Bounded Box:"
                        }, {
                            style: $WT.TEXTBOX,
                            width: "50%",
                            propertyName: "boundedBox",
                            value: 250,
                            config: {
                                suppressData: true,
                                callback: function() {

                                    host.refresh();
                                }
                            }
                        }]

                    },
                    {

                        style: $WT.TWOCOLUMN,
                        items: [{
                            style: $WT.LABEL,
                            name: "text",
                            width: "50%",
                            labelText: "Start Scan Text:"
                        }, {
                            style: $WT.TEXTBOX,
                            width: "50%",
                            propertyName: "btnStartText",                            
                            config: {
                                suppressData: true,
                                callback: function() {

                                    host.refresh();
                                }
                            }
                        }]

                    },
                    {

                        style: $WT.TWOCOLUMN,
                        items: [{
                            style: $WT.LABEL,
                            name: "text",
                            width: "50%",
                            labelText: "Close Scan Text:"
                        }, {
                            style: $WT.TEXTBOX,
                            width: "50%",
                            propertyName: "btnCloseText",                            
                            config: {
                                suppressData: true,
                                callback: function() {

                                    host.refresh();
                                }
                            }
                        }]

                    },
                    
                    {

                        style: $WT.TWOCOLUMN,
                        items: [{
                                    style: $WT.LABEL,
                                    name: "text", 
                                    width: "35%",
                                    labelText: "Button BG Color:"
                                }, {
                                    style: $WT.FILLGROUP,
                                    width: "65%",
                                    propertyName: "btnBGColor",                                    
                                    config: {
                                          suppressData: true,
                                         
                                                callback: function () {
                                                    
                                                    host.refresh();
                                                } 
                                          
                                        },
                                    items: [{
                                        childName: "fillAlpha",
                                        disabled: true
                                    }]
                                }]

                    }
                    ,
                    {

                        style: $WT.TWOCOLUMN,
                        items: [{
                                    style: $WT.LABEL,
                                    name: "text", 
                                    width: "35%",
                                    labelText: "Button Font Color:"
                                }, {
                                    style: $WT.FILLGROUP,
                                    width: "65%",
                                    propertyName: "btnFontColor",                                    
                                    config: {
                                          suppressData: true,
                                         
                                                callback: function () {
                                                    
                                                    host.refresh();
                                                } 
                                          
                                        },
                                    items: [{
                                        childName: "fillAlpha",
                                        disabled: true
                                    }]
                                }]

                    }
                    /*,
                    {
                        style: $WT.CHECKBOXANDLABEL,
                        propertyName: 'roundimage',
                        labelText: "Round Image"
                    }*/
                ]
            }




        ]
    }

];









}
})}());
//@ sourceURL=QRScannerEditorModel.js