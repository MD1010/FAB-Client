import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryIcon from "@material-ui/icons/History";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PollIcon from "@material-ui/icons/Poll";
import SettingsIcon from "@material-ui/icons/Settings";

export interface IlistItem {
  itemName: string;
  itemIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  linkPath: string;
}

export interface IlistItems extends Array<IlistItem> {}

export const listItems: IlistItems = [
  {
    itemName: "My Accounts",
    itemIcon: AccountCircleIcon,
    linkPath: "/accounts",
  },
  {
    itemName: "Coins Earned",
    itemIcon: MonetizationOnIcon,
    linkPath: "/",
  },
  {
    itemName: "Stats",
    itemIcon: PollIcon,
    linkPath: "/",
  },
  {
    itemName: "History",
    itemIcon: HistoryIcon,
    linkPath: "/",
  },
  {
    itemName: "Settings",
    itemIcon: SettingsIcon,
    linkPath: "/",
  },
];
