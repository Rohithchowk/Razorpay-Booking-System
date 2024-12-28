import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter();

  const carouselItems = [
    { id: 1, content: "Carousel Item 1", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLYQKhXZtRaWO3jZpiU_JVL5xYMvcW0T0u_A&s" },
    { id: 2, content: "Carousel Item 2", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLYQKhXZtRaWO3jZpiU_JVL5xYMvcW0T0u_A&s" },
    { id: 3, content: "Carousel Item 3", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQutO2FNvuoR1_kBA7NA4E8N91Vb1kcssrjgw&s" },
  ];
  

  return (
    <div className="container">
      <div className="left">
        <div className="header">Day Outing</div>
        <div className="sub-header">Timings: 10AM to 11PM</div>
        <Carousel>
          {carouselItems.map((item) => (
            <Paper key={item.id} className="carousel-item">
              <img src={item.imgSrc} alt={item.content} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
            </Paper>
          ))}
        </Carousel>

      </div>
      <div className="right">
        <div className="book-div"  onClick={()=>{router.push('/bookings')} }>
          <CalendarMonthIcon/>
          <Button sx={{color:'#fff'}} >Book</Button>
        </div>
        <div className="accordion-container">
          <Accordion className="accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Question 1: Lorem ipsum dolor sit amet?</AccordionSummary>
            <AccordionDetails>Answer: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Question 2: Sed do eiusmod tempor incididunt?</AccordionSummary>
            <AccordionDetails>Answer: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</AccordionDetails>
          </Accordion>
          <Accordion className="accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Question 3: Ut enim ad minim veniam?</AccordionSummary>
            <AccordionDetails>Answer: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</AccordionDetails>
          </Accordion>
        </div>
      </div>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          display: flex;
          width: 80%;
          height: 80vh;
          border: 1px solid #ccc;
          background-color: #fff;
          margin: auto;
          margin-top: 50px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .left {
          flex: 6;
          padding: 20px;
          border-right: 1px solid #ccc;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .right {
          flex: 4;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          overflow-y: auto;
        }

        .header {
          font-size: 26px;
          font-weight: bold;
          color: #333;
        }

        .sub-header {
          font-size: 18px;
          color: #555;
          margin-bottom: 10px;
        }

        .carousel-item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 150px;
          background-color: #f0f0f0;
          border-radius: 5px;
          font-size: 18px;
          font-weight: bold;
        }

        .book-div {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 15px;
          background-color: #4caf50;
          color: #fff;
          font-size: 18px;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          height: 50px;
        }

        .book-div i {
          font-size: 20px;
        }

        .accordion-container {
          max-height: calc(100% - 80px);
          overflow-y: auto;
          padding-right: 5px;
        }

        .accordion {
         border: 1px solid #ddd;
         border-radius: 5px;
         box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
         margin-bottom: 10px;
         border-color: green; 
        }

        .accordion:last-of-type {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default Home;
