import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import URLs from "@general/libraries/urls";

const NAV_ITEMS = Object.freeze([
  {
    id: 0,
    title: "home",
    icon: Object.freeze({
      Active: HomeIcon,
      Inactive: HomeOutlinedIcon,
    }),
    href: URLs.home,
  },
  {
    id: 1,
    title: "collections",
    icon: Object.freeze({
      Active: CollectionsIcon,
      Inactive: CollectionsOutlinedIcon,
    }),
    href: URLs.collections,
  },
  {
    id: 2,
    title: "search",
    icon: Object.freeze({
      Active: SearchIcon,
      Inactive: SearchIcon,
    }),
    href: URLs.search.main,
  },
  {
    id: 3,
    title: "user",
    icon: Object.freeze({
      Active: PersonIcon,
      Inactive: PersonOutlineOutlinedIcon,
    }),
    href: URLs.member.main,
  },
]);

export default NAV_ITEMS;
