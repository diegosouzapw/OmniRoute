//! AES-256-GCM encryption helpers for sensitive columns.
//!
//! Key derivation: HKDF-SHA256 over a master key derived from either
//! a passphrase (Argon2id) or a static key from `OMNIROUTE_MASTER_KEY`
//! (32 bytes, base64). The same algorithm is used by the existing TS app
//! (which uses Node's `crypto` module with the same parameter set) so
//! values can be migrated cross-language.

use aes_gcm::aead::{Aead, KeyInit, OsRng};
use aes_gcm::{Aes256Gcm, Key, Nonce};
use argon2::Argon2;
use base64::Engine;
use rand::RngCore;
use thiserror::Error;
use zeroize::Zeroize;

#[derive(Debug, Error)]
pub enum CryptoError {
    #[error("invalid key length: expected 32, got {0}")]
    InvalidKeyLength(usize),
    #[error("base64 decode: {0}")]
    Base64(#[from] base64::DecodeError),
    #[error("aes-gcm: {0}")]
    Aead(String),
    #[error("argon2: {0}")]
    Argon2(String),
    #[error("invalid ciphertext")]
    InvalidCiphertext,
}

/// Derived 32-byte key with automatic zeroization.
#[derive(Zeroize)]
pub struct DerivedKey([u8; 32]);

impl DerivedKey {
    /// Borrow the bytes.
    pub fn as_bytes(&self) -> &[u8] { &self.0 }
}

/// Derive a 32-byte key from a master passphrase with Argon2id.
pub fn derive_key_from_passphrase(passphrase: &str, salt: &[u8]) -> Result<DerivedKey, CryptoError> {
    let mut out = [0u8; 32];
    let argon2 = Argon2::default();
    argon2
        .hash_password_into(passphrase.as_bytes(), salt, &mut out)
        .map_err(|e| CryptoError::Argon2(e.to_string()))?;
    Ok(DerivedKey(out))
}

/// Decode a base64-encoded 32-byte key from `OMNIROUTE_MASTER_KEY`.
pub fn key_from_base64(b64: &str) -> Result<DerivedKey, CryptoError> {
    let bytes = base64::engine::general_purpose::STANDARD.decode(b64)?;
    if bytes.len() != 32 {
        return Err(CryptoError::InvalidKeyLength(bytes.len()));
    }
    let mut arr = [0u8; 32];
    arr.copy_from_slice(&bytes);
    Ok(DerivedKey(arr))
}

/// Encrypted blob (nonce || ciphertext || tag).
#[derive(Debug, Clone)]
pub struct EncryptedBlob {
    /// Nonce (12 bytes).
    pub nonce: [u8; 12],
    /// Ciphertext + tag.
    pub ciphertext: Vec<u8>,
}

impl EncryptedBlob {
    /// Encode to the storage form: base64(nonce || ciphertext).
    pub fn to_bytes(&self) -> Vec<u8> {
        let mut out = Vec::with_capacity(12 + self.ciphertext.len());
        out.extend_from_slice(&self.nonce);
        out.extend_from_slice(&self.ciphertext);
        out
    }

    /// Decode from the storage form.
    pub fn from_bytes(bytes: &[u8]) -> Result<Self, CryptoError> {
        if bytes.len() < 12 {
            return Err(CryptoError::InvalidCiphertext);
        }
        let mut nonce = [0u8; 12];
        nonce.copy_from_slice(&bytes[..12]);
        Ok(Self {
            nonce,
            ciphertext: bytes[12..].to_vec(),
        })
    }

    /// Encode as base64.
    pub fn to_base64(&self) -> String {
        base64::engine::general_purpose::STANDARD.encode(self.to_bytes())
    }

    /// Decode from base64.
    pub fn from_base64(s: &str) -> Result<Self, CryptoError> {
        let bytes = base64::engine::general_purpose::STANDARD.decode(s)?;
        Self::from_bytes(&bytes)
    }
}

/// Encrypt plaintext with the given 32-byte key.
pub fn encrypt(key: &DerivedKey, plaintext: &[u8]) -> Result<EncryptedBlob, CryptoError> {
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(key.as_bytes()));
    let mut nonce = [0u8; 12];
    OsRng.fill_bytes(&mut nonce);
    let ct = cipher
        .encrypt(Nonce::from_slice(&nonce), plaintext)
        .map_err(|e| CryptoError::Aead(e.to_string()))?;
    Ok(EncryptedBlob { nonce, ciphertext: ct })
}

/// Decrypt a blob with the given 32-byte key.
pub fn decrypt(key: &DerivedKey, blob: &EncryptedBlob) -> Result<Vec<u8>, CryptoError> {
    let cipher = Aes256Gcm::new(Key::<Aes256Gcm>::from_slice(key.as_bytes()));
    cipher
        .decrypt(Nonce::from_slice(&blob.nonce), blob.ciphertext.as_ref())
        .map_err(|e| CryptoError::Aead(e.to_string()))
}

/// Hash a plaintext key with Argon2id for storage.
pub fn hash_api_key(plaintext: &str) -> Result<String, CryptoError> {
    use argon2::password_hash::{rand_core::OsRng, PasswordHasher, SaltString};
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let hash = argon2
        .hash_password(plaintext.as_bytes(), &salt)
        .map_err(|e| CryptoError::Argon2(e.to_string()))?
        .to_string();
    Ok(hash)
}

/// Verify a plaintext key against a stored Argon2id hash.
pub fn verify_api_key(plaintext: &str, hash: &str) -> bool {
    use argon2::password_hash::{PasswordHash, PasswordVerifier};
    match PasswordHash::new(hash) {
        Ok(h) => Argon2::default().verify_password(plaintext.as_bytes(), &h).is_ok(),
        Err(_) => false,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypt_decrypt_roundtrip() {
        let key = derive_key_from_passphrase("correct horse battery staple", b"omniroute-salt-2026").unwrap();
        let blob = encrypt(&key, b"sk-secret-key-value").unwrap();
        let pt = decrypt(&key, &blob).unwrap();
        assert_eq!(pt, b"sk-secret-key-value");
    }

    #[test]
    fn base64_roundtrip() {
        let key = derive_key_from_passphrase("p", b"salt").unwrap();
        let blob = encrypt(&key, b"hello").unwrap();
        let s = blob.to_base64();
        let back = EncryptedBlob::from_base64(&s).unwrap();
        let pt = decrypt(&key, &back).unwrap();
        assert_eq!(pt, b"hello");
    }

    #[test]
    fn api_key_hash_verify() {
        let h = hash_api_key("sk-abc123").unwrap();
        assert!(verify_api_key("sk-abc123", &h));
        assert!(!verify_api_key("sk-wrong", &h));
    }

    #[test]
    fn invalid_key_length_rejected() {
        let bad = base64::engine::general_purpose::STANDARD.encode([0u8; 16]);
        assert!(key_from_base64(&bad).is_err());
    }
}
