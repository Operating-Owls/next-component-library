import { ComponentType } from "react";
import { IconBaseProps } from 'react-icons';

import { LuLayoutDashboard } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { RiTeamLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";


export type LinkProps = {
  name: string;
  href: string;
  icon: ComponentType<IconBaseProps>;
}

export const links: LinkProps[] = [
  {name: 'Dashboard', href: '/sidebar/dashboard', icon: LuLayoutDashboard},
  {name: 'Mail', href: '/sidebar/mail', icon: MdMailOutline},
  {name: 'Calendar', href: '/sidebar/calendar', icon: FaRegCalendarAlt},
  {name: 'Notes', href: '/sidebar/notes', icon: FaRegNoteSticky},
  {name: 'Team', href: '/sidebar/team', icon: RiTeamLine},
  {name: 'Settings', href: '/sidebar/settings', icon: IoMdSettings},
];