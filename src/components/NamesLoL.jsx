import React from 'react';
import Container from '@mui/material/Container';
import Summoner from './Summoner';
import NameInput from './NameInput';
import Summoners from './Summoners';
import Footer from './Footer';

const NamesLoL = () => (
  <>
    <Container color='secondary'>
      <NameInput />
      <Summoner />
      <Summoners />
    </Container>
    <Footer />
  </>
);

export default NamesLoL;
