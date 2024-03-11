import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyCollection from "./components/MyCollection"
import TransactionHistory from './components/TransactionHistory';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const storedTransactionHistory = JSON.parse(sessionStorage.getItem('transactionHistory')) || [];
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="Owned NFTs" {...a11yProps(0)} style={{ color: 'white' }} />
    <Tab label="Transaction History" {...a11yProps(1)} style={{ color: 'white' }} />
  </Tabs>
</Box>
      <CustomTabPanel value={value} index={0}>
        <MyCollection/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TransactionHistory transactions={storedTransactionHistory.reverse()} />
      </CustomTabPanel>
    </Box>
  );
}