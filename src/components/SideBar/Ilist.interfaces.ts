import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
export interface IlistItem {
  itemName: string;
  itemIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
export interface IlistItems extends Array<IlistItem> {}
