import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from "clsx";
import { LinkProps } from '@/components/sidebar/sidebarLinks';


type NavLinksProps = {
  links: LinkProps[];
  onLinkClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ links, onLinkClick }) => {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href

        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onLinkClick}
            className={clsx(
              'flex md:flex-col lg:flex-row items-center justify-start mb-1 md:justify-center lg:justify-start gap-4 md:gap-1 lg:gap-4 py-2 px-2 lg:px-3 md:mb-4 hover:bg-gray-300 font-medium rounded-md mx-4',
              isActive? 'bg-black text-white md:bg-white md:text-black': 'text-black md:text-white'
            )}
          >
            <LinkIcon className="text-xl"/>
            <p className="text-sm lg:text-base">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}

export default NavLinks