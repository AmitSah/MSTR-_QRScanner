(function () { 
    if (!mstrmojo.plugins.QRScanner) {
        mstrmojo.plugins.QRScanner = {};
    }

    mstrmojo.requiresCls(
        "mstrmojo.vi.models.CustomVisDropZones",
        "mstrmojo.array"
    );

    mstrmojo.plugins.QRScanner.QRScannerDropZones = mstrmojo.declare(
        mstrmojo.vi.models.CustomVisDropZones,
        null,
        {
            scriptClass: "mstrmojo.plugins.QRScanner.QRScannerDropZones",
            cssClass: "qrscannerdropzones",
            getCustomDropZones: function getCustomDropZones(){


                return [ 
                { 
                    name: "Scanner Attribute", 
                    maxCapacity:3, 
                    title:"[Drag Scannable Attribute]", 
                    allowObjectType:1
                }, 
                { 
                    name: "Metric", 
                    maxCapacity:1, 
                    title:"[Drag Metric Here]", 
                    allowObjectType:2
                }
                ];

 },
            shouldAllowObjectsInDropZone: function shouldAllowObjectsInDropZone(zone, dragObjects, idx, edge, context) {
 
 








},
            getActionsForObjectsDropped: function getActionsForObjectsDropped(zone, droppedObjects, idx, replaceObject, extras) {
 
 








},
            getActionsForObjectsRemoved: function getActionsForObjectsRemoved(zone, objects) { 
  
 








},
            getDropZoneContextMenuItems: function getDropZoneContextMenuItems(cfg, zone, object, el) {
 
 








}
})}());
//@ sourceURL=QRScannerDropZones.js