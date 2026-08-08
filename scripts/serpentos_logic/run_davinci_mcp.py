import os
import sys
import asyncio
import json
import glob
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def run_mcp_pipeline():
    print("🚀 Starting DaVinci Resolve MCP Pipeline for Cropped Casino Clips...")
    
    server_path = "/Users/work/serpentos/packages/davinci-resolve-mcp/src/davinci_mcp_server.py"
    server_params = StdioServerParameters(
        command="python3",
        args=[server_path]
    )
    
    # Gather cropped clips and audio
    input_dir = "/Users/work/Movies/ai portfolio/best casino/cropped"
    clip_paths = sorted(glob.glob(os.path.join(input_dir, "*.mp4")))
    audio_path = os.path.join(input_dir, "cinematic_drone.wav")
    
    if audio_path not in clip_paths:
        clip_paths.append(audio_path) # Append audio so it gets imported
        
    try:
        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                print("✅ Connected to DaVinci MCP Server.")
                
                # 1. Import Clips
                print(f"Importing {len(clip_paths)} clips into Media Pool...")
                import_res = await session.call_tool("import_clips", {"clip_paths": clip_paths})
                import_data = json.loads(import_res.content[0].text)
                print(f"Import Result: {json.dumps(import_data, indent=2)}")
                if not import_data.get("success"):
                    raise RuntimeError(import_data.get("error"))
                
                # 2. Create Timeline
                timeline_name = "Casino_MCP_Timeline"
                print(f"Creating Timeline '{timeline_name}'...")
                timeline_res = await session.call_tool("create_timeline", {
                    "name": timeline_name,
                    "clips": clip_paths
                })
                timeline_data = json.loads(timeline_res.content[0].text)
                print(f"Timeline Result: {json.dumps(timeline_data, indent=2)}")
                
                # 3. Apply LUT (Cinematic Kodak)
                print("Applying Kodak 2383 LUT...")
                lut_res = await session.call_tool("apply_lut", {
                    "lut_path": "Film Looks/Rec709 Kodak 2383 D65.cube"
                })
                lut_data = json.loads(lut_res.content[0].text)
                print(f"LUT Result: {json.dumps(lut_data, indent=2)}")
                
                # 4. Open Timeline in UI (MCP tool if exists, or DaVinci handles it)
                print("Timeline should now be open in DaVinci Resolve!")
                
    except Exception as e:
        print(f"❌ Failed to execute DaVinci MCP pipeline: {e}")

if __name__ == "__main__":
    asyncio.run(run_mcp_pipeline())
