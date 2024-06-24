'use client'
import { TableContainer, Paper, Divider, TableHead, TableRow, TableCell, TableBody, TablePagination, Table as MuiTable } from "@mui/material";
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
    <TableContainer component={Paper} sx={{
      backgroundColor: '#132D46'
    }} elevation={0}>
      <Divider sx={{ borderColor: 'paper' }} />
      <MuiTable sx={{ width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{
            '& .MuiTableCell-root': {
              borderColor: 'paper'
            }
          }}>
            {
              columns.map((item) => (
                <TableCell key={item.field} align={item.align as any}>{item.headerName}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            visibleRows?.map(item => (
              <TableRow
                key={item?.id}
                onClick={() => handleClick?.(item)}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '& .MuiTableCell-root': {
                    borderColor: 'paper'
                  },
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: .7,
                    background: '#111'
                  }
                }}
              >
                {
                  columns.map(row => (
                  <TableCell key={`${row.align}-${item?.id}`} align={row.align as any}>
                    {
                      row?.valueGetter ? row.valueGetter(item) : item[row.field]
                    }
                  </TableCell>
                  ))
                }
              </TableRow>
            ))
          }
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
      />
    </TableContainer>
  )
}