import { usb, getDeviceList } from 'usb';
const devices: usb.Device[] = getDeviceList();

console.log(devices);