import { ThemeButton } from './theme-button'
import { Link } from './ui/link'
import { Modal } from './ui/modal'

export const HeaderNavModal = ({
  navMap,
  className = '',
}: {
  navMap: { href: string; label: string }[]
  className?: string
}) => {
  return (
    <Modal>
      <Modal.Trigger className={className} variant="ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>
      </Modal.Trigger>
      <Modal.Content>
        <ul class="bg-muted rounded-layout mx-4 flex flex-col items-center gap-4 p-8">
          <li>
            <ThemeButton />
          </li>
          {navMap.map(({ href, label }, i) => (
            <li key={i}>
              <Link href={href} variant={i === navMap.length - 1 ? 'outline' : 'link'}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Modal.Content>
    </Modal>
  )
}
