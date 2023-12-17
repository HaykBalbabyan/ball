#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

const char* ssid = "Hayko"; // WIFI name
const char* password = "00001111"; // WIFI password

ESP8266WebServer server(80);

byte d5 = 14;
byte d6 = 12;
byte d7 = 13;
byte d8 = 15;

bool LEDstatus = LOW;

String direction = "";

unsigned long lastConnectionAttempt = 0;
const unsigned long connectionInterval = 500; // Change to 5000 milliseconds (5 seconds)

bool canPrintConnecting = true;

void setup() {
  Serial.begin(9600);
  delay(100);
  pinMode(D4, OUTPUT);
  pinMode(d5, OUTPUT);
  pinMode(d6, OUTPUT);
  pinMode(d7, OUTPUT);
  pinMode(d8, OUTPUT);

  connectToWiFi();
}

void loop() {
  server.handleClient();

  move();

  checkAndReconnectWiFi(); // Check and reconnect WiFi asynchronously
}

void connectToWiFi() {
  if (canPrintConnecting){
    Serial.println("Connecting to ");
    Serial.println(ssid);
    canPrintConnecting = false;
    direction = "";
  }
  digitalWrite(D4, !LEDstatus); // Turn on the LED initially
  WiFi.begin(ssid, password);
  lastConnectionAttempt = millis(); // Record the time of this connection a

  while (!isConnected() && millis() - lastConnectionAttempt < connectionInterval) {
    Serial.print(".");
    digitalWrite(D4, !LEDstatus);
    delay(300);

    LEDstatus = !LEDstatus;
  }

  digitalWrite(D4, LOW); // Turn off the LED

  if (isConnected()) {
    routes();

    Serial.println("");
    Serial.println("WiFi connected..!");
    Serial.print("Got IP: ");
    Serial.println(WiFi.localIP());

    routes();
    server.begin();
    Serial.println("HTTP Server Started");

    delay(500);

    LEDstatus = HIGH;
    digitalWrite(D4, !LOW);
    delay(300);
    digitalWrite(D4, !LEDstatus);

    server.begin();
  }
}

bool isConnected() {
  return WiFi.status() == WL_CONNECTED;
}

void checkAndReconnectWiFi() {
  if (!isConnected() && millis() - lastConnectionAttempt >= connectionInterval) {
    connectToWiFi();
  }
}

String sendJson(DynamicJsonDocument& data) {
  String json;
  serializeJson(data, json);
  return json;
}

void move(){
  if (direction == "") {
    digitalWrite(d5, 0);
    digitalWrite(d6, 0);
    digitalWrite(d7, 0);
    digitalWrite(d8, 0);
  } else if (direction == "right") {
    digitalWrite(d5, 0);
    digitalWrite(d6, 1);
    digitalWrite(d7, 0);
    digitalWrite(d8, 1);
  } else if (direction == "left") {
    digitalWrite(d5, 1);
    digitalWrite(d6, 0);
    digitalWrite(d7, 1);
    digitalWrite(d8, 0);
  } else if (direction == "forward") {
    digitalWrite(d5, 0);
    digitalWrite(d6, 1);
    digitalWrite(d7, 1);
    digitalWrite(d8, 0);
  } else if (direction == "backward") {
    digitalWrite(d5, 1);
    digitalWrite(d6, 0);
    digitalWrite(d7, 0);
    digitalWrite(d8, 1);
  } else {
    digitalWrite(d5, 0);
    digitalWrite(d6, 0);
    digitalWrite(d7, 0);
    digitalWrite(d8, 0);
  }
}


void routes(){
  server.on("/", route_main);
  server.on("/move-right", route_move_right);
  server.on("/move-left", route_move_left);
  server.on("/move-forward", route_move_forward);
  server.on("/move-backward", route_move_backward);
  server.on("/brake", route_brake);
  server.onNotFound(route_main); // If route not found
}


void route_move_right() {
  direction = "right";
  Serial.println("direction: " + direction);

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}
void route_move_left() {
  direction = "left";
  Serial.println("direction: " + direction);

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}
void route_move_forward() {
  direction = "forward";
  Serial.println("direction: " + direction);

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}
void route_move_backward() {
  direction = "backward";
  Serial.println("direction: " + direction);

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}
void route_brake() {
  direction = "";
  Serial.println("direction: Brake");

  DynamicJsonDocument response(200);

  response["success"] = true;

  server.send(200, "application/json", sendJson(response));
}

void route_main(){
  server.send(200, "text/html", render_main_page());
}

String render_main_page(){
  // ?" + String(random(100000, 1000000)) + "
  String html = "<!DOCTYPE html><html lang=\"en\"><head><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta charset=\"UTF-8\"><title>Title</title><link rel=\"stylesheet\" href=\"http://ball.infinitycloud.ru/public/css/loader.css?" + String(random(100000, 1000000)) + "\"></head><body><div id=\"page-loader-wrapper\"><div class=\"loader\"></div></div><main id=\"app\"></main><script src=\"http://ball.infinitycloud.ru/public/js/app.js?" + String(random(100000, 1000000)) + "\"></script></body></html>";
  
  return html;
}