#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

const char* ssid = "TEAM_2.4G"; // WIFI name
const char* password = "Hayko.2005"; //WIFI password

ESP8266WebServer server(80);

bool LEDstatus = LOW;

void setup() {
  Serial.begin(9600);
  delay(100);
  pinMode(D4, OUTPUT);

  Serial.println("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected..!");
  Serial.print("Got IP: ");  
  Serial.println(WiFi.localIP());

  routes();

  server.begin();
  Serial.println("HTTP Server Started");
}

void loop() {
  server.handleClient();
  
  digitalWrite(D4, !LEDstatus);
}

String sendJson(DynamicJsonDocument& data) {
  String json;
  serializeJson(data, json);
  return json;
}

void routes(){
  server.on("/", route_main); // Enable LED
  server.on("/ledon", route_ledon); // Enable LED
  server.on("/ledoff", route_ledoff); //Disable LED
  server.on("/ledstatus", route_ledstatus); // Get LED status
  server.onNotFound(route_NotFound); // If route not found
}

void route_ledstatus() {
  Serial.println("LED: ");

  Serial.print(LEDstatus ? "ON" : "OFF");

  DynamicJsonDocument response(200);

  response["success"] = true;
  response["ledStatus"] = LEDstatus ? "ON" : "OFF";
  
  server.send(200, "application/json", sendJson(response)); 
}

void route_ledon() {
  LEDstatus = HIGH;
  Serial.println("LED: ON");

  DynamicJsonDocument response(200);

  response["success"] = true;
  response["ledStatus"] = "ON";
  
  server.send(200, "application/json", sendJson(response)); 
}

void route_ledoff() {
  LEDstatus = LOW;
  Serial.println("LED: OFF");

  DynamicJsonDocument response(200);

  response["success"] = true;
  response["ledStatus"] = "Off";
  
  server.send(200, "application/json", sendJson(response)); 
}

void route_NotFound(){
  DynamicJsonDocument response(200);

  response["success"] = false;
  response["message"] = "ERR_ENDPOINT_NOT_FOUND";
  
  server.send(404, "application/json", sendJson(response)); 
}

void route_main(){
  server.send(200, "text/html", render_main_page()); 
}

String render_main_page(){
  // String html = "<!DOCTYPE html><html><head><script src=\"http://ball.loc/ajax.js?ver=" + String(random(100000, 1000000)) + "\"></script><script src=\"http://ball.loc/main.js?ver=" + String(random(100000, 1000000)) + "\"></script></head><body></body></html>";
  String html = "<!DOCTYPE html><html><head><script src=\"https://haykbalbabyan.github.io/ball/main.js?ver=" + String(random(100000, 1000000)) + "\"></script></head><body></body></html>";
  
  return html;
}