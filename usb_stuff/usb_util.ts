var usb = require('usb');
var buffer = require('node:buffer')
// import {usb} from 'usb'

usb.usb.on('attach', device_inserted);
usb.usb.on('detach', function(device) { console.log("goodbye") });

function device_inserted(device) {
    // usb.usb.useUsbDkBackend()
    device.open()
    var buf = Buffer.from('hello world', 'utf8');
    console.log(device.interfaces[0].endpoints[0].descriptor)
    device.controlTransfer(0, )

}