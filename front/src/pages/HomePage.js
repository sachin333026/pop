import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import Footer from '../components/Footer';
import a1 from '../image/homepage/a1.jfif';
import b1 from '../image/homepage/b1.jfif';
import c1 from '../image/homepage/c1.jfif';
import d1 from '../image/homepage/d1.jfif';
import e1 from '../image/homepage/e1.jfif';
import f1 from '../image/homepage/f1.jfif';

const games = [
  {
    image: c1,
    title: 'Battlegrounds Mobile India',
    description: 'Ancient ruins appear in Erangel, Miramar, and Livik. Each ruin has its own secret, and you can check the location of these ruins from the map.',
    link: 'https://play.google.com/store/apps/details?id=com.pubg.imobile',
    backgroundColor: '#039be5',
  },
  {
    image: a1,
    title: 'Mario Kart Tour',
    description: 'Challenge players worldwide in multiplayer! You can race against up to seven other players, whether they\'re registered as in-game friends.',
    link: 'https://play.google.com/store/apps/details?id=com.nintendo.zaka',
    backgroundColor: '#0097a7',
  },
  {
    image: b1,
    title: 'BTS WORLD',
    description: "It's 2022 you work at Big Hit. As BTS's manager, their debut is up to you! Is this the beginning of your success story?",
    link: 'https://play.google.com/store/apps/details?id=com.netmarble.btsw',
    backgroundColor: '#9c27b0',
  },
  {
    image: d1,
    title: 'Call of Duty®',
    description: "Call of Duty®: Mobile - Garena's latest update brings you the new revolutionary customization feature and many more cool additions!",
    link: 'https://play.google.com/store/apps/details?id=com.garena.game.codm',
    backgroundColor: '#2e7d32',
  },
  {
    image: e1,
    title: 'State of Survival',
    description: "It's been six months since the zombie apocalypse began. The virus has infected the city. Six months of terror, horror, survival, and fighting against zombies.",
    link: 'https://play.google.com/store/apps/details?id=com.kingsgroup.sos',
    backgroundColor: '#ffc400',
  },
  {
    image: f1,
    title: 'Rise of Empires',
    description: 'Real Time Nation vs. Nation medieval strategy war game. Join now! Train your troops and go to war! Rise of Empires is a Massive Multi-Player, Real-Time strategy war game.',
    link: 'https://play.google.com/store/apps/details?id=com.im30.ROE.gp',
    backgroundColor: '#546e7a',
  },
];

const HomePage = () => {
  return (
    <>
      <Header>
        <h1>Amusebox</h1>
      </Header>

      <MainDiv>
        {games.map((game, index) => (
          <GameCard key={index} style={{ backgroundColor: game.backgroundColor }}>
            <GameImage src={game.image} alt={game.title} />
            <GameDetails>
              <h4>{game.title}</h4>
              <p>{game.description}</p>
              <ButtonContainer>
                <Button variant="contained" color="primary" href={game.link} target="_blank">
                  START
                </Button>
              </ButtonContainer>
            </GameDetails>
          </GameCard>
        ))}
      </MainDiv>

      <Footer />
    </>
  );
};

const Header = styled.div`
  background-color: #0288d1;
  color: white;
  font-weight: 500;
  height: 4rem;
  font-size: 1.5rem;
  line-height: 4rem;
  padding-left: 1rem;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const GameCard = styled.div`
  width: 250px;
  border-radius: 8px;
  overflow: hidden;
`;

const GameImage = styled.img`
  width: 100%;
  height: auto;
`;

const GameDetails = styled.div`
  color: white;
  padding: 15px;
  font-family: 'futuru';
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

export default HomePage;
