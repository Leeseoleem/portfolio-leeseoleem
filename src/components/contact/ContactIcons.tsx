interface IconProps {
  size?: number;
}

export function GitHubIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path
        d="M9 1.5a7.5 7.5 0 0 0-2.37 14.61c.375.07.51-.163.51-.36v-1.27c-2.08.453-2.52-1.006-2.52-1.006-.34-.865-.83-1.096-.83-1.096-.679-.464.051-.455.051-.455.75.053 1.16.771 1.16.771.662 1.135 1.738.807 2.162.617.067-.48.26-.807.473-.993-1.664-.19-3.413-.832-3.413-3.702 0-.818.292-1.485.771-2.009-.077-.19-.334-.95.073-1.98 0 0 .628-.2 2.056.767a7.17 7.17 0 0 1 1.876-.252c.636.003 1.276.086 1.875.252 1.427-.968 2.054-.767 2.054-.767.408 1.03.151 1.79.074 1.98.48.524.77 1.191.77 2.009 0 2.878-1.753 3.51-3.422 3.695.27.232.51.69.51 1.39v2.061c0 .2.134.435.516.36A7.502 7.502 0 0 0 9 1.5Z"
        fill="#1A1A1A"
      />
    </svg>
  );
}

export function LinkedInIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="16" height="16" rx="3.5" fill="#0A66C2" />
      <rect x="3.5" y="7.5" width="2.5" height="7" fill="white" />
      <circle cx="4.75" cy="5" r="1.4" fill="white" />
      <path
        d="M8.5 7.5h2.3v1.1c.4-.8 1.3-1.3 2.3-1.3 2 0 2.9 1.2 2.9 3.3V14.5h-2.4v-3.4c0-1.1-.3-1.8-1.2-1.8-.9 0-1.5.6-1.5 1.9v3.3H8.5V7.5Z"
        fill="white"
      />
    </svg>
  );
}

export function VelogIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect width="18" height="18" rx="4" fill="#1D9E75" />
      <path
        d="M4.5 5.5 L9 13 L13.5 5.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
