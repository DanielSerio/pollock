import { AppShell, MantineTheme, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import AppHeader from './components/AppShell/AppHeader';
import AppNavbar from './components/AppShell/AppNavbar';

export default function App() {
  const [opened, setOpened] = useState<boolean>(false)
  const openMenu = useCallback(() => setOpened(!opened), [setOpened, opened])
  return (
    <AppShell 
      sx={(t: MantineTheme) => ({
        background: t.colorScheme === 'dark' ? t.colors.dark : t.colors.gray[0],
        color: t.colorScheme === 'dark' ? t.colors.gray[0] : t.colors.dark[9]
      })}
      header={<AppHeader opened={opened} openMenu={openMenu}/>}
      navbar={<AppNavbar opened={opened}/>}>

    </AppShell>
  );
}
