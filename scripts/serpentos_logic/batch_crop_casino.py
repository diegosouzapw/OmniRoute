import os
import subprocess
import glob

# Paths
input_dir = "/Users/work/Movies/ai portfolio/best casino"
output_dir = os.path.join(input_dir, "cropped")

# Create output dir if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Find all mp4 files
mp4_files = glob.glob(os.path.join(input_dir, "*.mp4"))

# The precise crop filter we found
crop_filter = "crop=1200:360:40:20"

print(f"Found {len(mp4_files)} videos. Starting crop process...")

for file_path in mp4_files:
    filename = os.path.basename(file_path)
    output_path = os.path.join(output_dir, filename)
    
    # ffmpeg command to crop without re-encoding audio (if any), but re-encoding video
    cmd = [
        "ffmpeg",
        "-y",
        "-i", file_path,
        "-vf", crop_filter,
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "18",
        "-c:a", "copy",
        output_path
    ]
    
    print(f"Processing {filename}...")
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

print("All videos cropped and centered successfully!")
