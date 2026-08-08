import os
import glob
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom
import subprocess
import json

def get_video_duration(filepath):
    cmd = [
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", filepath
    ]
    try:
        duration_sec = float(subprocess.check_output(cmd).decode('utf-8').strip())
        return int(duration_sec * 2400) # Duration in 2400 timebase (1/24th sec = 100/2400s)
    except:
        return 12000 # Default to 5 seconds (5 * 2400)

input_dir = "/Users/work/Movies/ai portfolio/best casino/cropped"
output_fcpxml = os.path.join(input_dir, "casino_showreel.fcpxml")

videos = glob.glob(os.path.join(input_dir, "*.mp4"))
videos.sort() # Ensure some order
audio_file = os.path.join(input_dir, "cinematic_drone.wav")

fcpxml = Element('fcpxml', {'version': '1.9'})
resources = SubElement(fcpxml, 'resources')

# Main video format
format_el = SubElement(resources, 'format', {
    'id': 'r1',
    'name': 'FFVideoFormat1200x360p24',
    'frameDuration': '100/2400s',
    'width': '1200',
    'height': '360'
})

# Audio format
audio_format_el = SubElement(resources, 'format', {
    'id': 'r2',
    'name': 'FFAudioFormat44100Hz',
    'sampleRate': '44100'
})

# Add assets for videos
total_duration = 0
for i, video in enumerate(videos):
    dur = get_video_duration(video)
    SubElement(resources, 'asset', {
        'id': f'v{i}',
        'name': os.path.basename(video),
        'src': f'file://{video}',
        'start': '0s',
        'duration': f'{dur}/2400s',
        'hasVideo': '1',
        'hasAudio': '0',
        'format': 'r1'
    })

# Add asset for audio
SubElement(resources, 'asset', {
    'id': 'a1',
    'name': 'cinematic_drone',
    'src': f'file://{audio_file}',
    'start': '0s',
    'duration': '144000/2400s', # 60 seconds
    'hasAudio': '1',
    'hasVideo': '0',
    'format': 'r2'
})

library = SubElement(fcpxml, 'library')
event = SubElement(library, 'event', {'name': 'Casino AI Showreel'})
project = SubElement(event, 'project', {'name': 'Casino Showreel Timeline'})

# Sequence
sequence = SubElement(project, 'sequence', {'format': 'r1'})
spine = SubElement(sequence, 'spine')

# Add video clips to spine
current_offset = 0
for i, video in enumerate(videos):
    dur = get_video_duration(video)
    clip = SubElement(spine, 'asset-clip', {
        'ref': f'v{i}',
        'name': os.path.basename(video),
        'offset': f'{current_offset}/2400s',
        'start': '0s',
        'duration': f'{dur}/2400s'
    })
    
    # Attach audio to the first clip (connected clip)
    if i == 0:
        audio_clip = SubElement(clip, 'asset-clip', {
            'ref': 'a1',
            'name': 'cinematic_drone.wav',
            'offset': '0s',
            'start': '0s',
            'duration': '144000/2400s',
            'lane': '-1' # Audio lane
        })

    current_offset += dur

sequence.set('duration', f'{current_offset}/2400s')

# Save to file
xmlstr = minidom.parseString(tostring(fcpxml)).toprettyxml(indent="    ")
with open(output_fcpxml, "w") as f:
    f.write(xmlstr)

print(f"Successfully generated FCPXML timeline: {output_fcpxml}")
