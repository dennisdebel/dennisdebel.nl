// IMPORTANT if you are behind the GFW ... choose and image host accessible from within...
#include <M5Unified.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

//#define GPIO GPIO_NUM_2 // try use exposed pin for emi, but doesnt really work
#define GPIO GPIO_NUM_4 //(use ir led as ir sensor ;)


// WiFi credentials
const char* ssid = "OtaNew";
const char* password = "1234567890";

// -----------------------------
// Frame URLs
// -----------------------------
const char* loopFramesURLs[] = {
    "https://profolio.art/frame1.jpg",
    "https://profolio.art/frame2.jpg"
};

const char* mainFramesURLs[] = {
    "https://profolio.art/frame3.jpg",
    "https://profolio.art/frame4.jpg",
    "https://profolio.art/frame5.jpg",
    "https://profolio.art/frame6.jpg",
    "https://profolio.art/frame7.jpg",
    "https://profolio.art/frame8.jpg"
    //"https://profolio.art/frame9.jpg"
    //"https://profolio.art/frame10.jpg"
    //"https://profolio.art/frame11.jpg"
    // add up to frame10
};

// -----------------------------
// Frame cache structure
// -----------------------------
struct Frame {
    uint8_t* data = nullptr;
    size_t len = 0;
};

Frame loopFrames[sizeof(loopFramesURLs)/sizeof(loopFramesURLs[0])];
Frame mainFrames[sizeof(mainFramesURLs)/sizeof(mainFramesURLs[0])];

// -----------------------------
// Condition function
// -----------------------------
bool conditionMet() {
    if (analogRead(GPIO) > 100) return true;
    return false;
}

// -----------------------------
// Download JPEG into memory
// -----------------------------
bool downloadFrame(const char* url, Frame &frame) {
    HTTPClient http;
    WiFiClientSecure client;
    client.setInsecure();

    if (!http.begin(client, url)) return false;
    http.addHeader("User-Agent","Mozilla/5.0");

    int code = http.GET();
    if (code != HTTP_CODE_OK) {
        http.end();
        return false;
    }

    int len = http.getSize();
    if (len <= 0) {
        http.end();
        return false;
    }

    frame.data = new uint8_t[len];
    frame.len = len;

    WiFiClient* stream = http.getStreamPtr();
    int readBytes = 0;
    while(readBytes < len) {
        while(stream->available()) {
            frame.data[readBytes++] = stream->read();
            if (readBytes >= len) break;
        }
        delay(1);
    }

    http.end();
    return true;
}

// -----------------------------
// Preload all frames
// -----------------------------
void preloadFrames() {
    Serial.println("Preloading loop frames...");
    for(int i=0;i<sizeof(loopFrames)/sizeof(loopFrames[0]);i++){
        Serial.printf("Downloading %s ...\n", loopFramesURLs[i]);
        if(downloadFrame(loopFramesURLs[i], loopFrames[i]))
            Serial.println("OK");
        else
            Serial.println("Failed");
    }

    Serial.println("Preloading main frames...");
    for(int i=0;i<sizeof(mainFrames)/sizeof(mainFrames[0]);i++){
        Serial.printf("Downloading %s ...\n", mainFramesURLs[i]);
        if(downloadFrame(mainFramesURLs[i], mainFrames[i]))
            Serial.println("OK");
        else
            Serial.println("Failed");
    }
}

// -----------------------------
// Draw frame from memory
// -----------------------------
void drawFrame(Frame &frame) {
    if(frame.data && frame.len > 0){
        M5.Display.drawJpg(frame.data, frame.len, 0, 0);
        Serial.print("PIN2: ");
        Serial.println(analogRead(GPIO));
    }
}

// -----------------------------
// Setup
// -----------------------------
void setup() {
    Serial.begin(115200);
    M5.begin(M5.config());
    delay(100);  // ensure display is ready
    M5.Display.setRotation(1);

    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
        delay(500);
    }
    Serial.println("\nWiFi connected");

    pinMode(GPIO, INPUT);

    preloadFrames();
}

// -----------------------------
// Main loop
// -----------------------------
void loop() {
    // Loop frames 1-2 until condition is met
    while(!conditionMet()) {
        for(int i=0;i<sizeof(loopFrames)/sizeof(loopFrames[0]);i++){
            drawFrame(loopFrames[i]);
            delay(5);  // fast playback so adc does not miss spikes
        }
    }

    // Play main frames 3-10 once
    for(int i=0;i<sizeof(mainFrames)/sizeof(mainFrames[0]);i++){
        drawFrame(mainFrames[i]);
        delay(50);  // fast playback
    }

    // Optionally, loop back to frame 1-2
}

//void loop() {
//    // Loop frames 1-2 until condition is met
//    while(!conditionMet()) {
//        for(int i=0; i<sizeof(loopFrames)/sizeof(loopFrames[0]); i++){
//            drawFrame(loopFrames[i]);
//            delay(5);  // fast playback for ADC spikes
//        }
//    }
//
//    // Loop main frames 3-10 forever
//    while(true) {
//        for(int i=0; i<sizeof(mainFrames)/sizeof(mainFrames[0]); i++){
//            drawFrame(mainFrames[i]);
//            delay(50);  // fast playback
//        }
//    }
//}


//
//#include <M5Unified.h>
//#include <HTTPClient.h>
//#include <WiFiClientSecure.h>
//
//#include <WiFi.h>
//const char* ssid = "OtaNew";
//const char* password = "1234567890";
////const char* imageUrl = "http://httpbin.org/image/jpeg"; // works
//const char* imageUrl = "https://profolio.art/heart.jpg"; 
//
//
//
//#define GPIO GPIO_NUM_2
//
//
//
//void setup() {
//  auto cfg = M5.config();
//  M5.begin(cfg);
//
//  M5.Display.setRotation(1);
//  M5.Display.fillScreen(BLACK);
//  M5.Display.setTextColor(WHITE);
//  M5.Display.setTextSize(2);
//
//  M5.Display.println("Connecting WiFi...");
//
//  WiFi.begin(ssid, password);
//
//  while (WiFi.status() != WL_CONNECTED) {
//    delay(500);
//    M5.Display.print(".");
//  }
//    
//  M5.Display.println("\nWiFi Connected!");
//  delay(500);
//
//  // Sync time (for HTTPS)
//  configTime(0, 0, "pool.ntp.org");
//  Serial.println("Waiting for time sync...");
//  time_t now = time(nullptr);
//  while (now < 8 * 3600 * 2) {
//    delay(500);
//    now = time(nullptr);
//  }
//  Serial.println("Time synced!");
//
//  pinMode(GPIO, INPUT);
//  //pinMode(GPIO_NUM_8, INPUT); // this works with no battery...
//
//  // gpio_pulldown_dis(GPIO_NUM_23);
//  // gpio_pullup_dis(GPIO_NUM_23);
//  Serial.begin(115200);
//}
//
//void loop() {
//  downloadAndDisplay();
//  delay(5000);
//
//  
////  Serial.println(analogRead(GPIO));
////  if (analogRead(GPIO) > 100){
////    // Draw center marker
////    M5.Display.drawCircle(64, 64, 5, WHITE);
////    delay(50);
////    M5.Display.fillScreen(BLACK);
////    downloadAndDisplayImage();
////  }
////delay(10);
//
//
//}
//
//
//void downloadAndDisplay() {
//    WiFiClientSecure client;
//    client.setInsecure();  
//
//    HTTPClient http;
//    http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);
//
//    if (!http.begin(client, imageUrl)) {
//        M5.Display.println("Begin failed");
//        return;
//    }
//
//    http.addHeader("User-Agent", "Mozilla/5.0");
//
//    int httpCode = http.GET();
//    Serial.println(http.header("Content-Type")); // what content is the server serving
//
//    
//    Serial.print("HTTP Code: ");
//    Serial.println(httpCode);
//    Serial.println(http.errorToString(httpCode));
//
//    if (httpCode != HTTP_CODE_OK) {
//        M5.Display.fillScreen(BLACK);
//        M5.Display.printf("HTTP: %d\n", httpCode);
//        http.end();
//        return;
//    }
//
//    WiFiClient* stream = http.getStreamPtr();
//
//    // Clear previous image
//    M5.Display.fillScreen(BLACK);
//
//    // Read all bytes into a buffer
//    std::vector<uint8_t> buffer;
//    while (http.connected()) {
//        while (stream->available()) {
//            buffer.push_back(stream->read());
//        }
//    }
//
//    if (buffer.size() > 0) {
//        // Draw JPEG from buffer
//        M5.Display.drawJpg(buffer.data(), buffer.size(), 0, 0);
//    }
//
//    http.end();
//}
