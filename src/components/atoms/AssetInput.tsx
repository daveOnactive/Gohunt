import { Box, InputBase} from "@mui/material";
import { AssetMenu } from "./AssetMenu";
// import { NumberInput } from ".";

type IProps = {
  onAssetChange?: (value: string) => void;
  onInputChange?: (value: string | number) => void;
  value?: number;
  disabled?: boolean;
}

export function AssetInput({ onAssetChange, onInputChange, value, disabled }: IProps) {
  return (
    <Box sx={{
      borderBottom: 1,
      borderColor: '#6a6868',
      width: '100%',
      display: 'flex',
      py: 1
    }}>
      <Box sx={{
        width: '70%',
        borderRight: 1,
        borderColor: '#6a6868',
        height: 30,
        '& .Mui-disabled': {
          textFillColor: '#fff'
        }
      }}>
        <InputBase
          type="number"
          fullWidth
          onChange={(ev) => onInputChange?.(ev.target.value)}
          value={value}
          disabled={disabled}
          // inputComponent={NumberInput as any}
        />
      </Box>
      <Box sx={{
        display: 'flex',
        mx: 'auto',
      }}>
        <AssetMenu
          onChange={onAssetChange}
        />
      </Box>
    </Box>
  )
}