import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { GitHub } from '@mui/icons-material';
import { getLoading } from '../state/summonersSlice';
import theme from '../styles/theme';

const footerStyles = css`
  padding-top: 5px;
`;

const containerStyles = css`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const disclaimerStyles = css`
  color: ${theme.textSecondary};
  font-size: 12px;
  max-width: 800px;
  text-align: center;
  margin: auto;
`;

const copyrightStyles = css`
  display: block;
  margin-bottom: 5px;
`;

const flexStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const githubStyles = css`
  margin-right: 5px;
  color: rgb(66, 135, 245);
  cursor: pointer;
`;

const linkStyles = css`
  color: rgb(66, 135, 245);
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Footer = () => {
  const loading = useSelector(getLoading);

  if (loading) return null;

  return (
    <Box sx={footerStyles}>
      <Divider />
      <Container sx={containerStyles}>
        <Typography sx={disclaimerStyles} component='div'>
          <Box component='span' sx={copyrightStyles}>
            {new Date().getFullYear()} © NamesLoL
          </Box>
          <Box sx={flexStyles}>
            <a
              target='_blank'
              rel='noreferrer noopener'
              href='https://github.com/bricefrisco/NamesLoL'
            >
              <GitHub sx={githubStyles} />
            </a>
            <span>
              Open source. Like this project?{' '}
              <Box
                component='a'
                target='_blank'
                rel='noreferrer noopener'
                href='https://github.com/bricefrisco/NamesLoL'
                sx={linkStyles}
              >
                View the code
              </Box>{' '}
              and give it a star! To report a bug or request a feature,{' '}
              <Box
                component='a'
                target='_blank'
                rel='noreferrer noopener'
                href='https://github.com/bricefrisco/NamesLoL/issues'
                sx={linkStyles}
              >
                open an issue.
              </Box>
            </span>
          </Box>

          <p>
            NamesLoL isn&apos;t endorsed by Riot Games and doesn&apos;t reflect
            the views or opinions of Riot Games or anyone officially involved in
            producing or managing Riot Games properties. Riot Games, and all
            associated properties are trademarks or registered trademarks of
            Riot Games, Inc.
          </p>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
