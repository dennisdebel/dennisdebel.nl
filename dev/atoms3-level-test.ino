#include <M5Unified.h>

void setup() {
    auto cfg = M5.config();
    M5.begin(cfg);

    M5.Display.setRotation(1);
    M5.Display.fillScreen(BLACK);
    M5.Display.setTextSize(2);

    M5.Imu.begin();
}

void loop() {
    float ax, ay, az;

    M5.Imu.getAccel(&ax, &ay, &az);

    // Proper 3D orientation math
    float pitch = atan2(ax, sqrt(ay*ay + az*az)) * 180 / PI;
    float roll  = atan2(ay, sqrt(ax*ax + az*az)) * 180 / PI;

    // Map to screen coordinates
    int x = map((int)roll, -45, 45, 10, 118);
    int y = map((int)pitch, -45, 45, 10, 118);

    M5.Display.fillScreen(BLACK);

    // Draw reference circle
    M5.Display.drawCircle(64, 64, 40, WHITE);

    // Bubble position
    M5.Display.fillCircle(x, y, 6, BLUE);

    // Numeric readout
    M5.Display.setCursor(5, 5);
    M5.Display.printf("P:%d R:%d", (int)pitch, (int)roll);

    // we can now use the R (rotation) value to be send to our render relay via websockets and control our sound (effects)

    delay(20);
}
