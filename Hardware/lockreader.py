# # import win32com.client as win32
# # import serial
# # import time

# # lock = False
# # connect = False

# # arduino = serial.Serial(port='COM3', baudrate=9600)

# # wmi_service = win32.GetObject("winmgmts:\\\\.\\root\\cimv2")

# # query = "SELECT * FROM Win32_PnPEntity WHERE DeviceID LIKE \"%USB%\""
# # devices = wmi_service.ExecQuery(query)

# # prevDevCount = len(devices)

# # while True:
# #     while True:
# #         # data = float(arduino.readline())
# #         data = 22
# #         if data == 22:
# #             print("Locked")
# #             lock = True
# #             break
# #         elif data == 88:
# #             print("unlocked")
# #             lock = False
# #             break              
# #     while True:
# #         time.sleep(5)  # sample every 5 seconds

# #         devices = wmi_service.ExecQuery(query)
# #         curDevCount = len(devices)
# #         print(curDevCount)

# #         if curDevCount < prevDevCount:
# #             print("A USB device was disconnected")
# #             connect = False
# #             break
            

# #         elif curDevCount > prevDevCount:
# #             print("A USB device was connected")
# #             connect = True
# #             break  
# #     bool = lock & connect
# #     print(bool)
# #     prevDevCount = curDevCount

# import win32com.client as win32
# import serial
# import time
# import asyncio
# import websockets

# lock = False
# connect = False

# arduino = serial.Serial(port='COM3', baudrate=9600)

# wmi_service = win32.GetObject("winmgmts:\\\\.\\root\\cimv2")

# query = "SELECT * FROM Win32_PnPEntity WHERE DeviceID LIKE \"%USB%\""
# devices = wmi_service.ExecQuery(query)

# prevDevCount = len(devices)

# # WebSocket handler
# async def send_bool_updates(websocket):
#     global lock, connect, prevDevCount
#     while True:
#         while True:
#             # Simulate data from Arduino
#             data = 22
#             if data == 22:
#                 print("Locked")
#                 lock = True
#                 break
#             elif data == 88:
#                 print("Unlocked")
#                 lock = False
#                 break

#         while True:
#             time.sleep(5)  # Sample every 5 seconds

#             devices = wmi_service.ExecQuery(query)
#             curDevCount = len(devices)
#             print(curDevCount)

#             if curDevCount < prevDevCount:
#                 print("A USB device was disconnected")
#                 connect = False
#                 break

#             elif curDevCount > prevDevCount:
#                 print("A USB device was connected")
#                 connect = True
#                 break
        
#         # Evaluate the boolean
#         current_bool = lock & connect
#         print(f"Bool value: {current_bool}")

#         # Send updates to frontend
#         await websocket.send(str(current_bool))

#         prevDevCount = curDevCount

# async def main():
#     async with websockets.serve(send_bool_updates, "localhost", 6789):
#         await asyncio.Future()  # Run server forever

# if __name__ == "__main__":
#     asyncio.run(main())


import asyncio
import websockets

# Simulated boolean variable
current_bool = True

# WebSocket handler
async def send_bool_updates(websocket):
    global current_bool
    while True:
        print("1")
        await websocket.send(str(current_bool).lower())  # Send the boolean value as a string
        print(f"Sent bool value: {current_bool}")

        # Simulate the boolean changing to False after 5 seconds
        await asyncio.sleep(30)
        current_bool = not current_bool  # Flip the boolean value

async def main():
    async with websockets.serve(send_bool_updates, "localhost", 6789):
        print("WebSocket server started at ws://localhost:6789")
        await asyncio.Future()  # Run server forever

if __name__ == "__main__":
    asyncio.run(main())
