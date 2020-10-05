// This Plugin is developed by Amit Kumar Sah, amitkumars954@gmail.com

(function () { 
    if (!mstrmojo.plugins.QRScanner) {
        mstrmojo.plugins.QRScanner = {};
    }

    mstrmojo.requiresCls(
        "mstrmojo.CustomVisBase",
        "mstrmojo.models.template.DataInterface",
        "mstrmojo.vi.models.editors.CustomVisEditorModel"
    );

    mstrmojo.plugins.QRScanner.NM_PROPERTIES = {
        isScannedName: 'isScannedName',
        isScannedImg: 'isScannedImg',
        iconurl: 'iconurl',
        cameraIndex:'cameraIndex',
        boundedBox: 'boundedBox',
        btnBGColor: 'btnBGColor',
        btnFontColor: 'btnFontColor',
        btnStartText: 'btnStartText',
        btnCloseText: 'btnCloseText'
        // btnWidth: 'btnWidth'
        
    };

    mstrmojo.plugins.QRScanner.QRScanner = mstrmojo.declare(
        mstrmojo.CustomVisBase,
        null,
        {
            scriptClass: "mstrmojo.plugins.QRScanner.QRScanner",
            cssClass: "qrscanner",
            errorMessage: "There is either not enough data to display the visualization or an error occurred while executing the visualization.",
            errorDetails: "This visualization requires one or more attributes and one metric.",
            externalLibraries: [{url: (mstrApp.getPluginsRoot && mstrApp.getPluginsRoot() || "../plugins/") +"QRScanner/lib/Js/jquery.min.js"},
            {url: (mstrApp.getPluginsRoot && mstrApp.getPluginsRoot() || "../plugins/") +"QRScanner/lib/Js/html5-qrcode.min.js"}],
            useRichTooltip: false,
            reuseDOMNode: false,
            supportNEE: true,
            plot:function(){

                var me = this;

                if(me.domNode.childNodes.length===1){

                    me.domNode.removeChild(me.domNode.childNodes[0]);
                }

                var isDocument = me.zonesModel;//undefined if it's a document

                // set property 
                me.setDefaultPropertyValues (  

                    {    
                       
                        isScannedName: "true",
                        isScannedImg: "true",
                        iconurl :  "" ,
                        cameraIndex : "",
                        boundedBox: '250',
                        btnBGColor :{fillColor : "#629acc" , fillAlpha : 100  },
                        btnFontColor: {fillColor : "#ffffff" , fillAlpha : 100  },
                        btnStartText: 'Start Scanning',
                        btnCloseText: 'Close Scanning'
                        // btnWidth: '150'

                });

                var NM_PROPERTIES = mstrmojo.plugins.QRScanner.NM_PROPERTIES,
                    propIsScannedName = me.getProperty(NM_PROPERTIES.isScannedName),
                    propIsScannedImg = me.getProperty(NM_PROPERTIES.isScannedImg),
                    propIconurl = me.getProperty(NM_PROPERTIES.iconurl),
                    propCameraIndex = me.getProperty(NM_PROPERTIES.cameraIndex),
                    propBoundedBox = me.getProperty(NM_PROPERTIES.boundedBox),
                    propBtnBGColor = me.getProperty(NM_PROPERTIES.btnBGColor).fillColor,
                    // propBtnBGColorA = me.getProperty(NM_PROPERTIES.btnBGColor).fillAlpha,
                    propbtnFontColor = me.getProperty(NM_PROPERTIES.btnFontColor).fillColor,
                    // propbtnFontColorA = me.getProperty(NM_PROPERTIES.btnFontColor).fillAlpha,
                    propBtnStartText = me.getProperty(NM_PROPERTIES.btnStartText),
                    propBtnCloseText = me.getProperty(NM_PROPERTIES.btnCloseText);

                //debugger;
                var dataConfig = {hasSelection: true};
                me.addUseAsFilterMenuItem();
                var indexMap = {};
                
                //var rawD = me.dataInterface.getRawData(mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT.TREE, dataConfig);
                var rawD = me.dataInterface.getRawData(mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT.ROWS_ADV, dataConfig);
                var rows = rawD.length;

                console.log(rawD);
                // debugger;
                // var QrScannData=[];
                // for (var i = 0; i < rows; i++) {
                
                //     QrScannData.push({
                 
                //       Name: rawD[i].headers[i].name,
                //       Value:  rawD.children[0].value
                      
                      
                     
                //     });
                //     indexMap[QrScannData[i].Name] = i;
                 
                // }

                
                var gridID = me.domNode.id;
                gridID = gridID.replace(/\*/g,'\\*');
                
                var gridIDSplit = gridID.split("*");
                var len = gridIDSplit[2].length;
                var QrScannSuffixID =gridIDSplit[2].substring((len-5),(len-1));
                
                var height1=parseInt($("#"+gridID).css('height'));  //Get grid height
                var width1=parseInt($("#"+gridID).css('width'));    //Get grid width 
                var top1=parseInt(me.top);
                var left1=parseInt(me.left);
                
                $("#"+gridID).css('height',height1);
                $("#"+gridID).css('width', width1); 
                $("#"+gridID).css('top', top1);
                $("#"+gridID).css('left', left1);

                var renderQrScannPadding={top: 20, right:20, bottom:20,left:20},
                renderQrScannWidth=parseInt(me.width,10) - renderQrScannPadding.left - renderQrScannPadding.right,
                renderQrScannHeight=parseInt(me.height,10) - renderQrScannPadding.top - renderQrScannPadding.bottom;

                //var chkQrScannDiv = document.getElementById('renderQrScanner'+QrScannSuffixID);

                // if(!chkQrScannDiv)
                // {

                var html = document.createElement('div');
                html.setAttribute('id','renderQrScanner'+QrScannSuffixID);
                html.setAttribute("style", "padding:"+20+"px; width:"+ renderQrScannWidth+"px; height:"+renderQrScannHeight+"px;");
                //debugger;

                //Start Scanning

                var startScanParentDiv = document.createElement('div');
                startScanParentDiv.setAttribute('class','startScanParentDiv');
                startScanParentDiv.setAttribute('id','startScanParentDiv'+QrScannSuffixID);

                var startScanDiv = document.createElement('div');
                startScanDiv.setAttribute('class','btn-scan');
                startScanDiv.setAttribute('id','startScanning'+QrScannSuffixID);
                startScanDiv.setAttribute("style","background-color:"+propBtnBGColor+";color:"+propbtnFontColor);
                startScanDiv.innerHTML = propBtnStartText;

                //End Start Scanning

                //Close Scanning

                var closeScanParentDiv = document.createElement('div');
                closeScanParentDiv.setAttribute('class','closeScanParentDiv');
                closeScanParentDiv.setAttribute('id','closeScanParentDiv'+QrScannSuffixID);

                var closeScanDiv = document.createElement('div');
                closeScanDiv.setAttribute('class','close-scan');
                closeScanDiv.setAttribute('id','closeScanning'+QrScannSuffixID);
                closeScanDiv.setAttribute("style","background-color:"+propBtnBGColor+";color:"+propbtnFontColor);
                closeScanDiv.innerHTML = propBtnCloseText;

                //End Close Scanning

                //debugger;
                var scanIcon;

                if(propIconurl == "")
                {
                    scanIcon = (mstrApp.getPluginsRoot && mstrApp.getPluginsRoot() || '../plugins/') +'QRScanner/style/images/camera-scan.gif';
                }
                else
                {
                    scanIcon = propIconurl.replace(/ /g,"%20");
                }


                var imgDiv = document.createElement('div');
                imgDiv.setAttribute('class','imgDiv');
                imgDiv.setAttribute('id','imgDiv'+QrScannSuffixID);

                var imgTag = document.createElement('img');
                imgTag.setAttribute('id','scanIcon'+QrScannSuffixID);
                imgTag.setAttribute('class','QRScanImg');
                imgTag.setAttribute('src',scanIcon);

                var readerWidth;
                if(renderQrScannWidth>renderQrScannHeight)
                {
                    readerWidth = renderQrScannHeight;
                }

                else
                {
                    readerWidth = renderQrScannWidth;
                }

                var scanReaderDiv = document.createElement('div');
                scanReaderDiv.setAttribute('id','reader'+QrScannSuffixID);
                scanReaderDiv.setAttribute("style","width:"+readerWidth+"px;margin:0 auto;");

                //var scanningContainerElements = $("<div id='scanningContainer'><div id='cancelScanning'>Cancel</div>
                // <div style='text-align: center;'><img id='QRScanImg' src='../plugins/QRScanner/style/images/camera-scan.gif'>
                // </div><div style='text-align: center;padding-top: 15px;height: 40px;'><div class='btn-scan' id='startScanning'>
                // Start Scanning</div></div><div id='reader' style='width: 500px;height: 500px;padding-top: 12px'></div></div>");

                var clearScanDiv = document.createElement('div');
                clearScanDiv.setAttribute('class','clearScanDiv');
                clearScanDiv.setAttribute('id','clearScanDiv'+QrScannSuffixID);
                clearScanDiv.setAttribute("style","display:none;font-size:12px;height:32px;padding-top: 10px;");

                var clearScanBtn = document.createElement('div');
                clearScanBtn.setAttribute('class','clearScanBtn');
                clearScanBtn.setAttribute('id','clearScanBtn'+QrScannSuffixID);
                clearScanBtn.setAttribute("style","float:right;width: 80px;padding: 7px;border-radius:5px;background-color: #98a0a7;color: #ffffff;margin: 0 auto;");
                clearScanBtn.innerHTML = 'Clear Scan';

                

                var scannedimgTag = document.createElement('img');
                scannedimgTag.setAttribute('id','QRScanImg'+QrScannSuffixID);
                scannedimgTag.setAttribute('class','QRScanImg');
                scannedimgTag.setAttribute("style","display:none;height:"+(renderQrScannHeight-120)+"px;");
                //scannedimgTag.setAttribute('src',(mstrApp.getPluginsRoot && mstrApp.getPluginsRoot() || '../plugins/') +'QRScanner/style/images/camera-scan.gif');
                

                var scannedObjName = document.createElement('div');
                scannedObjName.setAttribute('class','scannedObjName');
                scannedObjName.setAttribute('id','scannedObjName'+QrScannSuffixID);
                scannedObjName.setAttribute("style","display:none;font-size:25px");
                
                html.appendChild(startScanParentDiv);
                startScanParentDiv.appendChild(startScanDiv);

                html.appendChild(closeScanParentDiv);
                closeScanParentDiv.appendChild(closeScanDiv);

                html.appendChild(imgDiv);
                imgDiv.appendChild(imgTag);

                html.appendChild(scanReaderDiv);

                //Scanned Image

                html.appendChild(clearScanDiv);
                clearScanDiv.appendChild(clearScanBtn);

                html.appendChild(scannedimgTag);
                html.appendChild(scannedObjName);

                if(width1 >= 300 && height1 >=300)
                {

                    $('#' + gridID).append(html);
                }
                else
                {

                    var minWidthError = $("<div id='minWidthErrorMsg' style='height:"+height1+"px'>The Minimum width & height to use this viz is 300px, please increase the width Or Go to presentation mode</div>");
                    $('#' + gridID).append(minWidthError);                    

                }
                //$('#renderQrScanner'+QrScannSuffixID).append(scanningContainerElements);

                $('#clearScanBtn'+QrScannSuffixID).on("click", clearScann);

                function clearScann()
                {
                    me.clearSelections();
                    me.endSelections();

                    $('#clearScanDiv'+QrScannSuffixID).css({"display":"none"});
                    $('#imgDiv'+QrScannSuffixID).css({"display":"block"}); 
                    $('#scannedObjName'+QrScannSuffixID).css({"display":"none"});
                    $('#QRScanImg'+QrScannSuffixID).css({"display":"none"});
                }


                $('#startScanning'+QrScannSuffixID).on("click", startscanning);

                function startscanning()
                {

                  $('#closeScanParentDiv'+QrScannSuffixID).css({"display":"block"});
                  $('#imgDiv'+QrScannSuffixID).css({"display":"none"}); 
                  $('#startScanParentDiv'+QrScannSuffixID).css({"display":"none"}); 
                  $('#scannedObjName'+QrScannSuffixID).css({"display":"none"});
                  $('#clearScanDiv'+QrScannSuffixID).css({"display":"none"});
                  $('#QRScanImg'+QrScannSuffixID).css({"display":"none"});
                  $('#QRScanImg'+QrScannSuffixID).removeAttr("src");

                  // This method will trigger user permissions
                  Html5Qrcode.getCameras().then(devices => {
                    /**
                     * devices would be an array of objects of type:
                     * { id: "id", label: "label" }
                     */
                    if (devices && devices.length) {

                        var maxCameraIndex;

                        var deviceCameraLen = devices.length-1;

                        if( propCameraIndex == "")
                        {
                            maxCameraIndex = deviceCameraLen;

                        }
                        else
                        {
                            var cameraIndex =parseInt(propCameraIndex);
                            if(cameraIndex > devices.length)
                            {
                                maxCameraIndex = cameraIndex;

                            }
                            else
                            {
                                maxCameraIndex = deviceCameraLen;
                            }
                            
                        }

                        var cameraId = devices[maxCameraIndex].id;
                        // .. use this to start scanning.
                        console.log(devices);

                        const html5QrCode = new Html5Qrcode("reader"+QrScannSuffixID);

                        $('#closeScanning'+QrScannSuffixID).on("click", function(){

                            $('#closeScanParentDiv'+QrScannSuffixID).css({"display":"none"});
                            $('#startScanParentDiv'+QrScannSuffixID).css({"display":"block"});
                            $('#imgDiv'+QrScannSuffixID).css({"display":"block"}); 
                            $('#clearScanDiv'+QrScannSuffixID).css({"display":"none"});
                            $('#QRScanImg'+QrScannSuffixID).css({"display":"none"});

                            stopScan();               

                        });

                        //Stop Scan

                        function stopScan(){

                            //To stop QR Scanner
                            html5QrCode.stop().then(ignore => {
                            // QR Code scanning is stopped.
                            }).catch(err => {
                            // Stop failed, handle it.
                            });
                        }

                        //End Stop Scan


                        html5QrCode.start(
                        cameraId, 
                        {
                            fps: 10,    // Optional frame per seconds for qr code scanning
                            qrbox: parseInt(propBoundedBox)  // Optional if you want bounded box UI
                        },
                        qrCodeMessage => {
                            // do something when code is read
                            //alert(qrCodeMessage);
                            console.log(qrCodeMessage);
                            //alert(qrCodeMessage);
                            //console.log(`QR Code detected: ${qrCodeMessage}`);
                            //debugger;

                            //Below for loop to change color to green to qrshadedreagion
                            for(i=1;i<5;i++)
                            {
                                var qrShadedRegion = $('#qr-shaded-region_'+i);
                                qrShadedRegion.children().css('background-color', '#4CAF50');

                            }

                            var snd = new  Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
                            snd.play();

                            var scannedName = "",
                                scannedStatus = 0,
                                scannedImg="";

                               
                                //debugger;
                            setTimeout(function(){
                            for(i=0;i<rows;i++)
                            {
                                var attributeCount = rawD[i].headers.length;
                                if(rawD[i].headers[0].name == qrCodeMessage)
                                {
                                    
                                    scannedStatus = 1;
                                    //$('#QRScanImg'+QrScannSuffixID).css({"display":"block"}); 


                                    if(attributeCount == 2)
                                    {
                                        scannedImg = rawD[i].headers[attributeCount-1].name;

                                        if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/i.test(scannedImg))
                                        {
                                            //2nd attribute is a image type and display image but hide name 
                                            
                                            $('#QRScanImg'+QrScannSuffixID).attr('src',scannedImg);
                                            $('#QRScanImg'+QrScannSuffixID).css('height',(renderQrScannHeight-120));
                                            
                                        }
                                        else
                                        {
                                            //2nd attribute is a name/string type and display name but display deafult image
                                            scannedName = rawD[i].headers[attributeCount-1].name; 
                                            $('#QRScanImg'+QrScannSuffixID).css('height','auto');                                           
                                            $('#QRScanImg'+QrScannSuffixID).attr('src',(mstrApp.getPluginsRoot && mstrApp.getPluginsRoot() || '../plugins/') +'QRScanner/style/images/ScannedImageNotFound.png');
                                            
                                            
                                        }

                                    }
                                    else
                                    {
                                        var imgAttrCheck = rawD[i].headers[1].name;
                                        $('#QRScanImg'+QrScannSuffixID).css('height',(renderQrScannHeight-120));
                                        

                                        if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/i.test(imgAttrCheck))
                                        {
                                            //2nd attribute is a image type
                                            scannedName = rawD[i].headers[2].name;                                            
                                            $('#QRScanImg'+QrScannSuffixID).attr('src',imgAttrCheck);
                                            
                                            
                                        }
                                        else
                                        {
                                            //3rd attribute is a image type
                                            scannedName = rawD[i].headers[1].name;
                                            scannedImg = rawD[i].headers[2].name;
                                            if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/i.test(scannedImg))
                                            {
                                                $('#QRScanImg'+QrScannSuffixID).attr('src',scannedImg);
                                            }
                                            else
                                            {
                                                $('#QRScanImg'+QrScannSuffixID).attr('src',(mstrApp.getPluginsRoot && mstrApp.getPluginsRoot() || '../plugins/') +'QRScanner/style/images/ScannedImageNotFound.png');
                                            }
                                            

                                        }

                                    }


                                    me.applySelection(rawD[i].headers[0].attributeSelector);
                                    $('#clearScanDiv'+QrScannSuffixID).css({"display":"block"});

                                    break;
                                }
                                else
                                {
                                    $('#QRScanImg'+QrScannSuffixID).css({"display":"none"});
                                    $('#clearScanDiv'+QrScannSuffixID).css({"display":"none"});
                                }
                            }
                            //debugger;

                            //Hide and show the Image and Name div based on property selection
                                    if(propIsScannedImg == 'false')
                                    {
                                        $('#QRScanImg'+QrScannSuffixID).css({"display":"none"});

                                    }
                                    else if( propIsScannedImg == 'true' && scannedStatus ==1)
                                    {
                                        $('#QRScanImg'+QrScannSuffixID).css({"display":"block"});
                                    }

                                    if(propIsScannedName == 'false')
                                    {
                                        $('#scannedObjName'+QrScannSuffixID).css({"display":"none"});

                                    }  
                                    else
                                    {
                                        $('#scannedObjName'+QrScannSuffixID).css({"display":"block"});
                                    } 
                            
                            document.getElementById('scannedObjName'+QrScannSuffixID).innerHTML = (parseInt(scannedStatus) > 0) ? scannedName : 'Not a valid scan, Please Scan Again!';                           

                            
                            $('#closeScanParentDiv'+QrScannSuffixID).css({"display":"none"});                            
                            $('#imgDiv'+QrScannSuffixID).css({"display":"none"}); 
                            $('#startScanParentDiv'+QrScannSuffixID).css({"display":"block"});                            
                            //$('#scannedObjName'+QrScannSuffixID).css({"display":"block"});
                            
                             
                                stopScan();
                            }, 100);


                        },
                        errorMessage => {
                        // parse error, ignore it.
                        })
                        .catch(err => {
                        // Start failed, handle it.
                        });
                    }
                  }).catch(err => {
                    // handle err
                  });
                }



                //}

                










}})}());
//@ sourceURL=QRScanner.js