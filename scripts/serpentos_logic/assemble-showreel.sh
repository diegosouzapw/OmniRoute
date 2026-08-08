#!/bin/bash
# =============================================================================
# AI Generation Showreel — FFmpeg Assembly Script
# Project: serpentos
# Author: VideoGen Agent
# Date: 2026-06-27
# =============================================================================
# Usage: ./assemble-showreel.sh [input_dir] [output_dir]
#   input_dir  — directory with clip-01.mp4 ... clip-10.mp4 + title-card.mp4
#   output_dir — where to write final showreel (default: ./output)
#
# Requirements: ffmpeg, ffprobe (install via: brew install ffmpeg)
# Tested on: macOS (Mac Studio M2, M1)
# =============================================================================

set -euo pipefail

# --- Config ------------------------------------------------------------------
INPUT_DIR="${1:-/Users/work/serpentos/output/clips}"
OUTPUT_DIR="${2:-/Users/work/serpentos/output}"
TEMP_DIR="$(mktemp -d /tmp/showreel-XXXXXX)"
DURATION_PER_CLIP=6
TITLE_DURATION=5
CROSSFADE_DURATION=0.5
TOTAL_CLIPS=10
FINAL_OUTPUT="${OUTPUT_DIR}/showreel_final.mp4"

# Color grading params
TEAL_ORANGE_LUT="${INPUT_DIR}/teal-orange-lut.png"  # optional LUT image
GRAIN_INTENSITY=0.03
AUDIO_LUFS=-14

# --- Helpers -----------------------------------------------------------------
log() { echo "[$(date +%H:%M:%S)] $*" >&2; }
cleanup() {
    log "Cleaning up temp dir: ${TEMP_DIR}"
    rm -rf "${TEMP_DIR}"
}
trap cleanup EXIT

check_deps() {
    if ! command -v ffmpeg &>/dev/null; then
        echo "ERROR: ffmpeg not found. Install: brew install ffmpeg"
        exit 1
    fi
    if ! command -v ffprobe &>/dev/null; then
        echo "ERROR: ffprobe not found. Install: brew install ffmpeg"
        exit 1
    fi
    log "Dependencies OK: ffmpeg $(ffmpeg -version | head -1 | awk '{print $3}')"
}

# Generate procedural teal-orange LUT PNG if not present
make_lut() {
    local lut_path="${TEMP_DIR}/teal-orange-lut.png"
    if [[ -f "${TEAL_ORANGE_LUT}" ]]; then
        cp "${TEAL_ORANGE_LUT}" "${lut_path}"
        echo "${lut_path}"
        return
    fi
    log "Generating procedural teal-orange LUT..."
    ffmpeg -f lavfi -i "color=c=black:s=64x64:d=1" \
        -vf "geq=r='min(255, max(0, 1.2*(X/64)*255 + 0.1*(Y/64)*255))':g='min(255, max(0, 0.9*(Y/64)*255 + 0.05*(X/64)*255))':b='min(255, max(0, 1.3*(X/64)*255 - 0.2*(Y/64)*255))'" \
        -frames:v 1 -y "${lut_path}" 2>/dev/null
    echo "${lut_path}"
}

# Generate procedural film grain overlay
make_grain() {
    local grain_path="${TEMP_DIR}/film-grain.mp4"
    local total_duration=$((TITLE_DURATION + TOTAL_CLIPS * DURATION_PER_CLIP))
    log "Generating ${total_duration}s film grain overlay..."
    ffmpeg -f lavfi -i "color=c=black:s=1920x1080:d=${total_duration}" \
        -vf "noise=alls=${GRAIN_INTENSITY}:allf=t+u" \
        -c:v libx264 -pix_fmt yuv420p -y "${grain_path}" 2>/dev/null
    echo "${grain_path}"
}

# --- Build Steps -------------------------------------------------------------
main() {
    log "=== AI Generation Showreel Assembly ==="
    check_deps
    mkdir -p "${OUTPUT_DIR}"

    # Validate inputs
    for i in $(seq -w 1 ${TOTAL_CLIPS}); do
        clip="${INPUT_DIR}/clip-${i}.mp4"
        if [[ ! -f "${clip}" ]]; then
            echo "ERROR: Missing ${clip}"
            exit 1
        fi
        # Validate duration
        dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "${clip}")
        if (( $(echo "${dur} < ${DURATION_PER_CLIP} - 0.5" | bc -l) )); then
            log "WARNING: clip-${i}.mp4 is ${dur}s (expected ~${DURATION_PER_CLIP}s)"
        fi
    done

    if [[ ! -f "${INPUT_DIR}/title-card.mp4" ]]; then
        echo "ERROR: Missing title-card.mp4"
        exit 1
    fi

    # Prepare inputs in TEMP_DIR with guaranteed audio tracks
    mkdir -p "${TEMP_DIR}/inputs"
    
    # Process title-card
    if ffprobe -v error -select_streams a -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "${INPUT_DIR}/title-card.mp4" | grep -q .; then
        cp "${INPUT_DIR}/title-card.mp4" "${TEMP_DIR}/inputs/title-card.mp4"
    else
        log "🔊 Injecting silent audio into title-card.mp4..."
        ffmpeg -y -i "${INPUT_DIR}/title-card.mp4" -f lavfi -i "anullsrc=channel_layout=stereo:sample_rate=48000" \
            -c:v copy -c:a aac -shortest "${TEMP_DIR}/inputs/title-card.mp4" 2>/dev/null
    fi

    # Process all clips
    for i in $(seq -w 1 ${TOTAL_CLIPS}); do
        src="${INPUT_DIR}/clip-${i}.mp4"
        dst="${TEMP_DIR}/inputs/clip-${i}.mp4"
        if ffprobe -v error -select_streams a -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "${src}" | grep -q .; then
            cp "${src}" "${dst}"
        else
            log "🔊 Injecting silent audio into clip-${i}.mp4..."
            ffmpeg -y -i "${src}" -f lavfi -i "anullsrc=channel_layout=stereo:sample_rate=48000" \
                -c:v copy -c:a aac -shortest "${dst}" 2>/dev/null
        fi
    done

    LUT_PATH=$(make_lut)
    GRAIN_PATH=$(make_grain)

    log "Building filter_complex for ${TOTAL_CLIPS} clips + title card..."

    local filter=""
    local inputs=""
    local n=0

    # Title card
    inputs="${inputs}-i '${TEMP_DIR}/inputs/title-card.mp4' "
    filter+="[${n}:v]trim=0:${TITLE_DURATION},setpts=PTS-STARTPTS[v${n}];"
    filter+="[${n}:a]atrim=0:${TITLE_DURATION},asetpts=PTS-STARTPTS[a${n}];"
    n=$((n+1))

    # All clips
    for i in $(seq -w 1 ${TOTAL_CLIPS}); do
        inputs="${inputs}-i '${TEMP_DIR}/inputs/clip-${i}.mp4' "
        filter+="[${n}:v]trim=0:${DURATION_PER_CLIP},setpts=PTS-STARTPTS[v${n}];"
        filter+="[${n}:a]atrim=0:${DURATION_PER_CLIP},asetpts=PTS-STARTPTS[a${n}];"
        n=$((n+1))
    done

    # Chain xfade transitions
    local offset=${TITLE_DURATION}
    local prev="v0"
    local aprev="a0"

    for i in $(seq 1 ${TOTAL_CLIPS}); do
        idx=$((i))
        if (( i == TOTAL_CLIPS )); then
            # Last clip
            filter+="[${prev}][v${idx}]xfade=transition=fade:duration=${CROSSFADE_DURATION}:offset=${offset}[vx${i}];"
            filter+="[${aprev}][a${idx}]acrossfade=d=${CROSSFADE_DURATION}[ax${i}];"
        else
            filter+="[${prev}][v${idx}]xfade=transition=fade:duration=${CROSSFADE_DURATION}:offset=${offset}[vx${i}];"
            filter+="[${aprev}][a${idx}]acrossfade=d=${CROSSFADE_DURATION}[ax${i}];"
        fi
        prev="vx${i}"
        aprev="ax${i}"
        offset=$(echo "${offset} + ${DURATION_PER_CLIP} - ${CROSSFADE_DURATION}" | bc -l)
    done

    # Apply native color grade + noise
    filter+="[${prev}]format=pix_fmts=yuv420p[gradv];"
    filter+="[gradv]eq=brightness=0.02:contrast=1.1:saturation=1.05,colorbalance=rs=.05:gs=-.02:bs=.08[graded];"
    filter+="[graded]noise=alls=${GRAIN_INTENSITY}:allf=t+u[grainv];"
    filter+="[${aprev}]loudnorm=i=${AUDIO_LUFS}:lra=11:tp=-1.5[finala]"

    log "Running ffmpeg assembly..."
    log "Total estimated duration: ~65s"
    log "Filter length: ${#filter} chars"

    echo "FILTER: ${filter}" >&2
    eval ffmpeg ${inputs} \
        -filter_complex \"${filter}\" \
        -map "[grainv]" -map "[finala]" \
        -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p \
        -c:a aac -b:a 256k \
        -movflags +faststart \
        -y "${FINAL_OUTPUT}" 2>&1 | tee "${OUTPUT_DIR}/ffmpeg.log"

    # Verify output
    if [[ -f "${FINAL_OUTPUT}" ]]; then
        local final_dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "${FINAL_OUTPUT}")
        local final_size=$(du -h "${FINAL_OUTPUT}" | cut -f1)
        log "SUCCESS: ${FINAL_OUTPUT}"
        log "Duration: ${final_dur}s | Size: ${final_size}"
        log "Log saved: ${OUTPUT_DIR}/ffmpeg.log"
    else
        echo "ERROR: Assembly failed"
        exit 1
    fi
}

main "$@"
