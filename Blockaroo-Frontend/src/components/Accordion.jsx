import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScheduleIcon from '@mui/icons-material/Schedule';
import OfferTable from "./OfferTable"

export default function AccordionExpandDefault() {
  return (
      <Accordion defaultExpanded sx={{backgroundColor: "#212229", color: "#E0E0E0", marginTop: "16px", borderRadius: "4px"}}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color: "#E0E0E0"}}/>}
            aria-controls="panel1-content"
            id="panel1-header"
        >
            <div style={{display: "flex"}}>
                <ScheduleIcon sx={{color: "#E0E0E0"}} />
                <Typography sx={{marginLeft: "10px"}}>Item Activity</Typography>
            </div>
        </AccordionSummary>
        <AccordionDetails>
            <OfferTable />
        </AccordionDetails>
      </Accordion>
  );
}