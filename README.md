Put the resources folder in /var/www/pterodactyl


Please add this line to resources/scripts/components/server/ServerConsole.tsx under import PowerControls from '@/components/server/PowerControls';,

import MoreButtons from '@/components/server/MoreButtons';


Please add this line to resources/scripts/components/server/ServerConsole.tsx under <PowerControls/>,

<MoreButtons/>


After you do that, build the panel. https://pterodactyl.io/community/customization/panel.html
cd /var/www/pterodactyl && yarn && yarn build:production


If you want to remove the buttons just follow the upgrading guide on pterodactyl's website.