#![deny(clippy::all)]

use napi::bindgen_prelude::*;
use napi_derive::napi;
use turbovec::IdMapIndex;
use std::sync::{Arc, RwLock};

#[napi(js_name = "TurbovecIdMapIndex")]
pub struct TurbovecIdMapIndexWrapper {
  inner: Arc<RwLock<IdMapIndex>>,
}

#[napi]
impl TurbovecIdMapIndexWrapper {
  #[napi(constructor)]
  pub fn new(dim: u32, bit_width: u32) -> Result<Self> {
    let index = IdMapIndex::new(dim as usize, bit_width as u8).map_err(|e| {
      Error::new(Status::InvalidArg, format!("Failed to create TurbovecIdMapIndex: {:?}", e))
    })?;
    Ok(Self {
      inner: Arc::new(RwLock::new(index)),
    })
  }

  #[napi]
  pub fn add_with_ids(&self, vectors: Float32Array, ids: BigInt64Array) -> Result<()> {
    let mut inner = self.inner.write().unwrap();
    // turbovec requires vectors to be a slice of f32, and ids a slice of u64.
    // Floating point arrays and BigInt arrays need mapping.
    let vec_slice: &[f32] = vectors.as_ref();
    let id_slice: &[i64] = ids.as_ref();
    
    // Convert i64 ids to u64
    let u64_ids: Vec<u64> = id_slice.iter().map(|id| *id as u64).collect();

    inner.add_with_ids(vec_slice, &u64_ids).map_err(|e| {
      Error::new(Status::GenericFailure, format!("Add failed: {:?}", e))
    })?;
    Ok(())
  }

  #[napi]
  pub fn search(&self, queries: Float32Array, k: u32) -> Result<serde_json::Value> {
    let inner = self.inner.read().unwrap();
    let q_slice: &[f32] = queries.as_ref();
    
    let (scores, ids) = inner.search(q_slice, k as usize);
    // serialize to json returning { scores, ids }
    let ids_i64: Vec<i64> = ids.into_iter().map(|id| id as i64).collect();
    serde_json::to_value(serde_json::json!({
        "scores": scores,
        "ids": ids_i64
    })).map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }

  #[napi]
  pub fn load(path: String) -> Result<Self> {
    let index = IdMapIndex::load(&path).map_err(|e| {
      Error::new(Status::GenericFailure, format!("Failed to load from {}: {:?}", path, e))
    })?;
    Ok(Self {
      inner: Arc::new(RwLock::new(index)),
    })
  }

  #[napi]
  pub fn write(&self, path: String) -> Result<()> {
    let inner = self.inner.read().unwrap();
    inner.write(&path).map_err(|e| {
      Error::new(Status::GenericFailure, format!("Failed to write to {}: {:?}", path, e))
    })?;
    Ok(())
  }

  #[napi]
  pub fn sync(&self, path: String) -> Result<()> {
    let mut inner = self.inner.write().unwrap();
    inner.sync(&path).map_err(|e| {
      Error::new(Status::GenericFailure, format!("Failed to sync to {}: {:?}", path, e))
    })?;
    Ok(())
  }

  #[napi]
  pub fn remove(&self, id: i64) -> Result<()> {
    let mut inner = self.inner.write().unwrap();
    inner.remove(id as u64);
    Ok(())
  }
}
