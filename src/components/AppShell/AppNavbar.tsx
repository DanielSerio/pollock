import { Box, BoxProps, Button, Navbar, useMantineColorScheme } from '@mantine/core';
import React, { ReactElement } from 'react';
import { Moon, Sun } from 'tabler-icons-react';

export interface AppNavbarProps {
  opened: boolean
}

interface NavbarBlockProps extends BoxProps<'div'> {
  icon: ReactElement
}


export default function AppNavbar({ opened }: AppNavbarProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  function NavbarBlock({ children, icon }: NavbarBlockProps) {
    return (
      <Box m={0} p={0} sx={{
        display: 'flex'
        }}>
        <Box sx={{ 
          flex: 1,
          opacity: opened ? 1 : 0,
          maxWidth: opened ? 400 : 0,
          maxHeight: opened ? undefined : '1.62rem',
          overflow: 'hidden',
          transition: 'all 240ms ease',
          borderRight: `1px solid hsla(240,30%,${colorScheme === 'dark' ? 40 : 70}%,0.1)`
          }}>{children}</Box>
        <Box sx={{
          flex: 0, 
          display: 'inline-grid',
          minHeight: 24,
          maxHeight: 24,
          minWidth: 24,
          maxWidth: 24,
          width: 24,
          height: 24,
          alignItems: 'center',
          justifyContent: 'center' 
          }}>{icon}</Box>
      </Box>
    )
  }
  
  return (
    <Navbar 
      width={opened ? { xs: 200 } : { xs: 24 }}
      sx={{
          transition: 'all 180ms ease', 
          overflow: 'hidden' 
      }}>
      <NavbarBlock 
        icon={colorScheme === 'dark' ? <Sun size={16} /> : <Moon size={16}/>}>
        <Button 
          color={'gray'} 
          variant='subtle' 
          fullWidth 
          size='xs'
          onClick={() => toggleColorScheme()}>
          {colorScheme === 'dark' ? 'Lightmode' : 'Darkmode' }
        </Button>
      </NavbarBlock>
    </Navbar>
  );
}
