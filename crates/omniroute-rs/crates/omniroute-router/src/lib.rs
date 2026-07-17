//! omniroute-router: combo routing, fallback, load balancing, scoring.

#![deny(unsafe_code)]
#![warn(missing_docs)]

pub mod combo;
pub mod fallback;
pub mod load_balance;
pub mod scoring;
pub mod selector;

pub use combo::ComboRouter;
pub use fallback::FallbackPolicy;
pub use selector::{RouteContext, RouteDecision, Router};

#[cfg(test)]
mod tests {
    #[test]
    fn placeholder() { assert!(true); }
}
