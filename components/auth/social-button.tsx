interface SocialButtonProps {
  provider: 'google' | 'wallet'
  text: string
  onClick: () => void
  disabled: boolean
}

const SocialButton = ({ provider, text, onClick, disabled }: SocialButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full h-10 md:h-12 bg-[#1D9BF01A] border border-[#3772FE80] rounded-xl flex cursor-pointer items-center justify-center space-x-2 hover:bg-[#1D9BF033]"
  >
    {provider === 'google' ? (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.76 10.22c0-.66-.06-1.29-.17-1.91H10.1v3.61h5.39a4.61 4.61 0 01-2 3.03v2.52h3.23c1.9-1.74 2.98-4.3 2.98-7.25z" fill="#4285F4" />
        <path d="M10.09 20c2.7 0 4.97-.9 6.63-2.53l-3.23-2.52c-.9.6-2.04.95-3.4.95-2.62 0-4.83-1.77-5.63-4.14H1.1v2.6A10 10 0 0010.1 20z" fill="#34A853" />
        <path d="M4.47 11.76a6 6 0 010-3.82V5.34H1.1a10 10 0 000 8.98l3.37-2.56z" fill="#FABB05" />
        <path d="M10.09 3.86c1.48 0 2.8.51 3.84 1.5l2.86-2.86A9.96 9.96 0 0010.1 0 10 10 0 001.1 5.34l3.37 2.6c.8-2.37 3-4.08 5.63-4.08z" fill="#E94235" />
      </svg>
    ) : (
      <svg width="18" height="19" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.68 6.33398H4.27116C3.9834 6.33398 3.75033 6.10091 3.75033 5.81315C3.75033 5.52539 3.9834 5.29232 4.27116 5.29232H16.7712C17.0589 5.29232 17.292 5.05924 17.292 4.77148C17.292 3.90853 16.5924 3.20898 15.7295 3.20898H3.75033C2.59961 3.20898 1.66699 4.1416 1.66699 5.29232V15.709C1.66699 16.8597 2.59961 17.7923 3.75033 17.7923H16.68C17.5922 17.7923 18.3337 17.0915 18.3337 16.2298V7.89648C18.3337 7.03483 17.5922 6.33398 16.68 6.33398ZM15.2087 13.1048C14.6335 13.1048 14.167 12.6383 14.167 12.0632C14.167 11.488 14.6335 11.0215 15.2087 11.0215C15.7838 11.0215 16.2503 11.488 16.2503 12.0632C16.2503 12.6383 15.7838 13.1048 15.2087 13.1048Z" fill="#3861FB" />
      </svg>
    )}
    <span className="text-white text-xs md:text-sm font-semibold">{text}</span>
  </button>
)

export default SocialButton