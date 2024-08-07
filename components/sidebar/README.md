# Reusable Sidebar Component

This is a responsive Sidebar component built using React, Next.js, and Tailwind CSS. 

## Overview

The Sidebar component dynamically renders a navigation menu, adapting its layout for mobile and desktop devices. On mobile devices, the menu is accessible via a modal triggered by a menu button, while on larger screens, the links are displayed directly in a sidebar.

## File Structure
```
app/
|
|- layout.tsx
|- page.tsx (Dashboard)
|- globals.css
|
|- sidebar/
|     |- calendar/
|     |     |- page.tsx
|     |- dashboard/
|     |     |- page.tsx
|     |- mail/
|     |     |- page.tsx
|     |- notes/
|     |     |- page.tsx
|     |- settings/
|     |     |- page.tsx
|     |- team/
|     |     |- page.tsx
|
|- components
      |- Sidebar/
            |- Modal.tsx
            |- NavLinks.tsx
            |- Sidebar.tsx
            |- sidebarLinks.ts
```

## Usage

#### 1. Import the Sidebar Component.
Ensure you have the Sidebar component imported and included in your layout or main component.

```tsx
import Sidebar from '@/components/sidebar/Sidebar';
```

#### 2. Add to Layout
Include the Sidebar in your application's layout. For example, in `layout.tsx`:

```tsx
import Sidebar from "@/components/sidebar/Sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-row w-full min-h-screen">
          <Sidebar />
          <div className="w-full h-screen overflow-y-auto p-4 flex flex-col items-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
```

#### 3. Customize Links:
To customize the links in your sidebar, modify `links` array in `sidebarLinks.ts` to suit your application's navigation structure.

```ts
import { ComponentType } from "react";
import { IconBaseProps } from 'react-icons';

// import icons
import { LuLayoutDashboard } from "react-icons/lu"; //Dashboard icon
import { MdMailOutline } from "react-icons/md"; // Mail icon
import { FaRegCalendarAlt } from "react-icons/fa"; // Calendar icon
import { FaRegNoteSticky } from "react-icons/fa6"; // Notes icon
import { RiTeamLine } from "react-icons/ri"; // Team icon
import { IoMdSettings } from "react-icons/io"; // Setting icon


export type LinkProps = {
  name: string;
  href: string;
  icon: ComponentType<IconBaseProps>;
}


//modify the links array to add or change the sidebar links. 
export const links: LinkProps[] = [
  {name: 'Dashboard', href: '/', icon: LuLayoutDashboard},
  {name: 'Mail', href: '/mail', icon: MdMailOutline},
  {name: 'Calendar', href: '/calendar', icon: FaRegCalendarAlt},
  {name: 'Notes', href: '/notes', icon: FaRegNoteSticky},
  {name: 'Team', href: '/team', icon: RiTeamLine},
  {name: 'Settings', href: '/settings', icon: IoMdSettings},
];
```

##### Notes:

- You can import any icon from the [react-icons](https://react-icons.github.io/react-icons/) library or any other icon library you prefer.

- To add a new link, import the desired icon and add an object to the links array with the name, href, and icon properties.

#### 4. Setting Up Page Routing
Each item in the links array has an href property that specifies the path for the navigation link. This path should correspond to a route in your Next.js application. Ensure that each href matches the file structure in your app directory or follows the configured routing rules.

```ts
export const links: LinkProps[] = [
  { name: 'Dashboard', href: '/', icon: LuLayoutDashboard },
  { name: 'Mail', href: '/mail', icon: MdMailOutline },
  { name: 'Calendar', href: '/calendar', icon: FaRegCalendarAlt },
  { name: 'Notes', href: '/notes', icon: FaRegNoteSticky },
  { name: 'Team', href: '/team', icon: RiTeamLine },
  { name: 'Settings', href: '/settings', icon: IoMdSettings },
];
```

###### Example Routing Setup:

- `/`: This typically corresponds to the `index.tsx` file or the `page.tsx` file in the root of the `app` directory.
- `/mail`: Should match a page file located at `app/mail/page.tsx`.
- `/calendar`: Corresponds to `app/calendar/page.tsx`.
- `/notes`: Corresponds to `app/notes/page.tsx`.
- `/team`: Corresponds to `app/team/page.tsx`.
- `/settings`: Corresponds to `app/settings/page.tsx`.

Ensure that the `href` paths are correctly set according to your Next.js application's file structure.
If using dynamic routes, make sure to handle them accordingly in both the `href` and the Next.js routing setup.