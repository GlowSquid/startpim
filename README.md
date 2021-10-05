# StartPIM

**StartPIM** is a free online bookmark-manager written using React (Next.js + Redux), Node+Express & PostgreSQL.

![Screenshots](https://github.com/GlowSquid/startpim/blob/master/screenshots.gif)

## Features

- Complete CRUD through API

- React Hooks

- Auto-fetching title, ogImage & favicon through the given URL

- Switch between list- or grid-mode

- Mobile Responsive

- Option to completely delete account and all bookmarks attached to it

To use the Lynx-browser as a backup title-fetcher, append this line at the bottom of `/etc/lynx.cfg`:

`PRINTER:P:printenv LYNX_PRINT_TITLE>/path/to/startpim/bin/title/title.txt:TRUE:1000`
