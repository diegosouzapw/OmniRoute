//! GPU metrics collection, feature-gated behind `cfg(feature = "gpu")`.
//!
//! When the `gpu` feature is enabled, uses `nvml-wrapper` to query NVIDIA GPU
//! utilization, memory usage, and temperature. When disabled, all functions
//! return `None`.

use crate::health::types::GpuMetrics;

/// Collect GPU metrics from all available NVIDIA GPUs.
///
/// Returns the first GPU's metrics. If no GPU is found or NVML cannot be
/// initialized, returns `None`.
///
/// # Errors
///
/// Returns an error string if NVML is available but fails to initialize.
#[cfg(feature = "gpu")]
pub fn collect() -> Result<Option<GpuMetrics>, String> {
    use nvml_wrapper::Nvml;

    let nvml = Nvml::init().map_err(|e| format!("failed to init NVML: {e}"))?;

    let device_count = nvml.device_count().map_err(|e| format!("failed to get device count: {e}"))?;

    if device_count == 0 {
        return Ok(None);
    }

    // Get first device
    let device = nvml
        .device_by_index(0)
        .map_err(|e| format!("failed to get device 0: {e}"))?;

    let util = device
        .utilization_rates()
        .map_err(|e| format!("failed to get utilization: {e}"))?;
    let util_percent = util.gpu as f64;

    let mem_info = device
        .memory_info()
        .map_err(|e| format!("failed to get memory info: {e}"))?;
    let memory_used_bytes = mem_info.used;
    let memory_total_bytes = mem_info.total;

    let temp = device
        .temperature(nvml_wrapper::enum_wrappers::device::TemperatureSensor::Gpu)
        .map_err(|e| format!("failed to get temperature: {e}"))?;
    let temperature_celsius = temp as f32;

    Ok(Some(GpuMetrics {
        util_percent,
        memory_used_bytes,
        memory_total_bytes,
        temperature_celsius,
    }))
}

/// GPU metrics collection stub when feature is disabled.
#[cfg(not(feature = "gpu"))]
pub fn collect() -> Result<Option<GpuMetrics>, String> {
    Ok(None)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_collect_no_panic() {
        // Should not panic on any platform, with or without GPU.
        let result = collect();
        assert!(result.is_ok());
    }
}
