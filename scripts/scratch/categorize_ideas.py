import os
import shutil
import subprocess

categories = {
    "viable": [1718, 1731, 1764],
    "need_details": [1765, 1679, 1594, 1584],
    "defer": [1845, 1833, 1814, 1786, 1737, 1736, 1735, 1716, 1591, 1590, 1589, 1588, 1587],
    "notfit": [1826, 1788, 1529, 1586] # 1586 is already exists, goes to notfit
}

# Create dirs
os.makedirs("_ideia/viable/need_details", exist_ok=True)
os.makedirs("_ideia/defer", exist_ok=True)
os.makedirs("_ideia/notfit", exist_ok=True)

files = os.listdir("_ideia")

for f in files:
    if not f.endswith(".md"): continue
    num_str = f.split('-')[0]
    if not num_str.isdigit(): continue
    num = int(num_str)
    
    src = os.path.join("_ideia", f)
    
    if num in categories["viable"]:
        dst = os.path.join("_ideia/viable", f)
    elif num in categories["need_details"]:
        dst = os.path.join("_ideia/viable/need_details", f)
    elif num in categories["defer"]:
        dst = os.path.join("_ideia/defer", f)
    elif num in categories["notfit"]:
        dst = os.path.join("_ideia/notfit", f)
    else:
        continue
        
    shutil.move(src, dst)
    print(f"Moved {f} to {dst}")
