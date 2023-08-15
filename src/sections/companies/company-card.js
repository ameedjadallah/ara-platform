import PropTypes from "prop-types";
import Phone from "@heroicons/react/24/solid/PhoneIcon";
import ClockIcon from "@heroicons/react/24/solid/EnvelopeIcon";
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from "@mui/material";
import BuildingLibraryIcon from "@heroicons/react/24/solid/BuildingLibraryIcon";

export const CompanyCard = (props) => {
  const { company } = props;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <SvgIcon color="primary" fontSize="large">
            <BuildingLibraryIcon />
          </SvgIcon>
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {company.name}
        </Typography>
        <Typography align="center" variant="body1">
          مدينة {company.city}
        </Typography>
        
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {company.email}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <Phone />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {company.phone}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
