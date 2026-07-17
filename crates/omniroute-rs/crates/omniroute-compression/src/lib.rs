//! omniroute-compression: RTK + Caveman + adaptive selector + harness.

#![deny(unsafe_code)]
#![warn(missing_docs)]

pub mod adaptive;
pub mod caveman;
pub mod engines;
pub mod harness;
pub mod rtk;
pub mod rules;

pub use adaptive::AdaptiveCompressor;
pub use engines::CompressionEngineImpl;
pub use rules::RuleEngine;

#[cfg(test)]
mod tests {
    #[test]
    fn placeholder() { assert!(true); }
}
