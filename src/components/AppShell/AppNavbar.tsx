import { Box, BoxProps, Button, Navbar, useMantineColorScheme } from '@mantine/core';
import React, { ReactElement } from 'react';
import { Moon, Settings, Sun } from 'tabler-icons-react';

export interface AppNavbarProps {
  opened: boolean
}

interface NavbarBlockProps extends BoxProps<'div'> {
  icon: ReactElement
}


export default function AppNavbar({ opened }: AppNavbarProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  function NavbarBlock({ children, icon }: NavbarBlockProps) {
    const iconBlockSize: number = 48
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
          minHeight: iconBlockSize,
          maxHeight: iconBlockSize,
          height: iconBlockSize,
          minWidth: iconBlockSize,
          maxWidth: iconBlockSize,
          width: iconBlockSize,
          alignItems: 'center',
          justifyContent: 'center' 
          }}>{icon}</Box>
      </Box>
    )
  }
  
  return (
    <Navbar 
      width={opened ? { xs: 200 } : { xs: 48 }}
      sx={{
        width: opened ? 200 : 48,
        transition: 'all 180ms ease', 
        overflow: 'hidden' 
      }}>
      <NavbarBlock 
        icon={colorScheme === 'dark' ? <Sun size={18} /> : <Moon size={18}/>}>
        <Button 
          color={'gray'} 
          variant='subtle' 
          fullWidth 
          size='xs'
          sx={{height: '100%'}}
          onClick={() => toggleColorScheme()}>
          {colorScheme === 'dark' ? 'Lightmode' : 'Darkmode' }
        </Button>
      </NavbarBlock>
      <NavbarBlock icon={<Settings size={18} />}>

      </NavbarBlock>
    </Navbar>
  );
}
