import { Box, Burger, Container, createStyles, CSSObject, Header, MantineTheme } from '@mantine/core';
import React from 'react';

function createHeaderStyles(t: MantineTheme): Record<string, CSSObject> {
  return ({
    headerContainer: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  })
}

const useHeaderStyles = createStyles(createHeaderStyles)

interface AppHeaderProps {
  openMenu: () => void
  opened: boolean
}

export default function AppHeader({ openMenu, opened }: AppHeaderProps) {
  const { classes } = useHeaderStyles()
  return (
    <Box component='header'>
      <Header height={64}>
        <Container className={classes.headerContainer}>
          <Box>Logo</Box>
          <Box>
            <Burger opened={opened} onClick={openMenu}/>
          </Box>
        </Container>
      </Header>
    </Box>
  );
}
