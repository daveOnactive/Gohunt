import { Status } from "@/type";
import { green, red, yellow } from "@mui/material/colors";

export const StatusColorMapper = {
  [Status.SUCCESSFUL]: {
    color: green[900],
    background: green[400]
  },
  [Status.PENDING]: {
    color: yellow[900],
    background: yellow[400]
  },
  [Status.FAILED]: {
    color: red[900],
    background: red[400]
  }
}