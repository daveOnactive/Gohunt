import { Status } from "@/type";
import { Typography } from "@mui/material";
import { StatusColorMapper } from "@/constant/statusColorMapper";

type IProps = {
  type: Status;
}

export function TransactionStatus({ type }: IProps) {
  return (
    <Typography
      variant='subtitle2'
      sx={{
        background: StatusColorMapper[type]?.background,
        color: StatusColorMapper[type]?.color,
        paddingY: .25,
        paddingX: 1.3,
        borderRadius: '8px',
        width: 'fit-content'
      }}
    >
      {type}
    </Typography>
  )
}