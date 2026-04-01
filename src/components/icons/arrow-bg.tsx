export const ArrowBg = ({ className = '' }: { className?: string }) => {
  return (
    <svg viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="20.5" cy="20.5" r="20.5" fill="currentColor"></circle>
      <path
        d="M11.25 24.7a1.5 1.5 0 1 0 1.5 2.599zm19.52-8.312a1.5 1.5 0 0 0-1.061-1.837l-13.04-3.494a1.5 1.5 0 0 0-.777 2.898l11.591 3.106-3.105 11.59a1.5 1.5 0 0 0 2.897.777zM12.75 27.3l17.32-10-1.5-2.598-17.32 10z"
        fill="inherit"
      ></path>
    </svg>
  )
}
