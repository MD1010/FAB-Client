import { IlistItems } from '../Interfaces/Ilist.interfaces';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PollIcon from '@material-ui/icons/Poll';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const listItems: IlistItems = [
  {
    itemName: 'My Accounts',
    itemIcon: AccountCircleIcon,
  },
  {
    itemName: 'Coins Earned',
    itemIcon: MonetizationOnIcon,
  },
  {
    itemName: 'Stats',
    itemIcon: PollIcon,
  },
  {
    itemName: 'History',
    itemIcon: HistoryIcon,
  },
  {
    itemName: 'Settings',
    itemIcon: SettingsIcon,
  },
  {
    itemName: 'Log Out',
    itemIcon: ExitToAppIcon,
  },
];
