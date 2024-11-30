import win32com.client as win32
import serial
import time

lock = False
connect = False

arduino = serial.Serial(port='COM3', baudrate=9600)

wmi_service = win32.GetObject("winmgmts:\\\\.\\root\\cimv2")

query = "SELECT * FROM Win32_PnPEntity WHERE DeviceID LIKE \"%USB%\""
devices = wmi_service.ExecQuery(query)

prevDevCount = len(devices)

while True:
    while True:
        data = float(arduino.readline())
        if data == 22:
            print("Locked")
            lock = True
            break
        elif data == 88:
            print("unlocked")
            lock = False
            break              
    while True:
        time.sleep(5)  # sample every 5 seconds

        devices = wmi_service.ExecQuery(query)
        curDevCount = len(devices)
        print(curDevCount)

        if curDevCount < prevDevCount:
            print("A USB device was disconnected")
            connect = False
            break
            

        elif curDevCount > prevDevCount:
            print("A USB device was connected")
            connect = True
            break  
    print(lock & connect)
    prevDevCount = curDevCount