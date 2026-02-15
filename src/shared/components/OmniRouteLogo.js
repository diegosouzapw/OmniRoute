import PropTypes from "prop-types";

/**
 * OmniRoute logo SVG — network hub icon with connected nodes.
 * Matches the favicon and app icon design.
 */
export default function OmniRouteLogo({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Central node */}
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      {/* Outer nodes */}
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <circle cx="24" cy="8" r="2" fill="currentColor" />
      <circle cx="8" cy="24" r="2" fill="currentColor" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <circle cx="16" cy="5" r="1.5" fill="currentColor" />
      <circle cx="16" cy="27" r="1.5" fill="currentColor" />
      {/* Connection lines */}
      <line
        x1="16"
        y1="13"
        x2="8"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="13"
        x2="24"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="19"
        x2="8"
        y2="24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="19"
        x2="24"
        y2="24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="13"
        x2="16"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="19"
        x2="16"
        y2="27"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

OmniRouteLogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
};
