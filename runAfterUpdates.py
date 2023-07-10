import os

folders = os.listdir("./pictures")
for folder in folders:
    files = os.listdir("./pictures/" + folder)
    i = str(0)
    for file in files:
        try:
            os.rename("./pictures/" + folder + "/" + file, "./pictures/" + folder + "/" + i + ".jpg")
            i = str(int(i) + 1)
        except:
            i = str(int(i) + 1)