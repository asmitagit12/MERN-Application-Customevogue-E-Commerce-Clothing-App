import { Grid, Box, Typography } from "@mui/material";
import guestList from '../../assets/stunning-picks/guest-list.jpg'
import newArrival from '../../assets/stunning-picks/new-arrival.jpg'
import velvetArrival from '../../assets/stunning-picks/velvet-arrival.jpg'
import winterArrival from '../../assets/stunning-picks/winter-arrival.jpg'

const arrivals = [
  { src: newArrival, alt: "New Arrivals", label: "New Arrivals" },
  { src: winterArrival, alt: "Winter Arrivals", label: "Winter Arrivals" },
  { src: velvetArrival, alt: "Velvet Arrivals", label: "Velvet Arrivals" },
  { src: guestList, alt: "The Guest List Edit", label: "The Guest List Edit" }
];

const ArrivalsSection = () => {
  return (
    <>
      {arrivals.map((arrival, index) => (
        <Grid
          item
          key={index}
          lg={3}
          sm={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box
            sx={{
              width: "90%",
              height: "auto",
              transition: "transform 0.3s ease",
              "&:hover img": {
                transform: "scale(1.05)"
              }
            }}
          >
            <img
              src={arrival.src}
              alt={arrival.alt}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              marginTop: "8px",
              fontSize: 18,
              fontWeight: 500
            }}
          >
            {arrival.label}
          </Typography>
        </Grid>
      ))}
    </>
  );
};

export default ArrivalsSection;
