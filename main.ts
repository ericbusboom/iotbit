ESP8266_IoT.MqttEvent("show/1", ESP8266_IoT.QosList.Qos0, function (message) {
    basic.showString("" + (message))
})
input.onButtonPressed(Button.A, function () {
	
})
function initialize () {
    radio.setGroup(1)
    ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
    basic.showNumber(0)
    ESP8266_IoT.connectWifi("Busboom Mesh", "ycagwywbycbi!")
    while (ESP8266_IoT.wifiState(false)) {
        basic.showNumber(1)
    }
    basic.showNumber(2)
    ESP8266_IoT.setMQTT(
    ESP8266_IoT.SchemeList.TLS,
    "micro:bit",
    "eric.busboom.2",
    "anU2b#MzO2DSAy61",
    ""
    )
    ESP8266_IoT.connectMQTT("35ee9205f0a449178051933f7215d2b1.s1.eu.hivemq.cloud", 8883, true)
    basic.showNumber(3)
    while (!(ESP8266_IoT.isMqttBrokerConnected())) {
        basic.showNumber(4)
    }
    basic.showNumber(5)
    ESP8266_IoT.publishMqttMessage("micro:bit " + convertToText(control.deviceSerialNumber()), "hello", ESP8266_IoT.QosList.Qos0)
    basic.showIcon(IconNames.Happy)
}
initialize()
basic.forever(function () {
    basic.pause(5000)
    ESP8266_IoT.publishMqttMessage("time: " + convertToText(RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE)) + ":" + convertToText(RTC_DS1307.getTime(RTC_DS1307.TimeType.SECOND)), "time", ESP8266_IoT.QosList.Qos0)
})
