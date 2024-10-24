'use client'
import { 
  TableContainer, 
  Paper, 
  Divider, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  TablePagination, 
  Table as MuiTable,
  useTheme 
} from "@mui/material";
import { useMemo, useState } from "react";

type IProps = {
  columns: {
    field: string;
    headerName: string;
    align: string;
    valueGetter?: (value: any) => void;
  }[]
  data?: any[];
  handleClick?: (value: any) => void;
}

export function Table({ columns, data, handleClick }: IProps) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage, data],
  );

  return (
    <TableContainer 
      component={Paper} 
      elevation={0}
      sx={{
        backgroundColor: theme.palette.mode === 'light' 
          ? theme.palette.background.paper 
          : '#132D46',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Divider sx={{ 
        borderColor: theme.palette.divider 
      }} />
      
      <MuiTable 
        sx={{ 
          width: '100%',
          '& .MuiTableCell-root': {
            color: theme.palette.text.primary,
            borderColor: theme.palette.divider,
          },
        }} 
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {columns.map((item) => (
              <TableCell 
                key={item.field} 
                align={item.align as any}
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 600,
                  backgroundColor: theme.palette.mode === 'light'
                    ? theme.palette.grey[50]
                    : '#0f2235',
                }}
              >
                {item.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        
        <TableBody>
          {visibleRows?.map(item => (
            <TableRow
              key={item?.id}
              onClick={() => handleClick?.(item)}
              sx={{
                '&:last-child td, &:last-child th': { 
                  border: 0 
                },
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'light'
                    ? theme.palette.action.hover
                    : '#111',
                  opacity: theme.palette.mode === 'dark' ? 0.7 : 1,
                }
              }}
            >
              {columns.map(row => (
                <TableCell 
                  key={`${row.align}-${item?.id}`} 
                  align={row.align as any}
                >
                  {row?.valueGetter ? row.valueGetter(item) : item[row.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: theme.palette.text.primary,
          borderTop: `1px solid ${theme.palette.divider}`,
          '& .MuiToolbar-root': {
            color: theme.palette.text.primary,
          },
          '& .MuiSelect-icon': {
            color: theme.palette.text.primary,
          },
        }}
      />
    </TableContainer>
  );
}