#include <Servo.h>

Servo myservo;
int value;
double angle;

void setup() 
{
  Serial.begin(9600);
  myservo.attach(13);
}

void loop() 
{
  value = digitalRead(7);
  if(value==HIGH) {
    bro();
    
  }
  Serial.println(angle);
  myservo.write(angle);   
  delay(100);
}


void bro()
{
  if(angle == 90) {
    angle = 0;
    Serial.println(88);
    return;
  }
  else if(angle == 0){
    angle = 90;
    Serial.println(22);
    return;
  } 
}