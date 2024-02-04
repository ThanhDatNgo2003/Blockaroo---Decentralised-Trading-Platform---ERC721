import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Transfer', "---", "657E4D", "D1A105", "2h ago"),
  createData('Sale', "0,1 ETH", "CalvinLe", "657E4D", "20d ago"),
  createData('Sale', "0,1198 ETH", "27192B", "CalvinLe", "1mo ago"),
  createData('Transfer', "---", "D8C9F1", "27192B", "1mo ago"),
  createData('Mint', "---", "NullAddress", "D8C9F1", "2mo ago"),
];

export default function OfferTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: "#212229"}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{color: "#E0E0E0"}}>Event</TableCell>
            <TableCell align="left" sx={{color: "#E0E0E0"}}>Price</TableCell>
            <TableCell align="left" sx={{color: "#E0E0E0"}}>From</TableCell>
            <TableCell align="left" sx={{color: "#E0E0E0"}}>To</TableCell>
            <TableCell align="left" sx={{color: "#E0E0E0"}}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell component="th" scope="row" sx={{color: "#E0E0E0"}}>
                {row.name}
              </TableCell>
              <TableCell align="left" sx={{color: "#E0E0E0"}}>{row.calories}</TableCell>
              <TableCell align="left" sx={{color: "#E0E0E0"}}>{row.fat}</TableCell>
              <TableCell align="left" sx={{color: "#E0E0E0"}}>{row.carbs}</TableCell>
              <TableCell align="left" sx={{color: "#419AE0"}}>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}