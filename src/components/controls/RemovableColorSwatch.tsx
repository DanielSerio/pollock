import { Box, ColorSwatch, createStyles, CSSObject, MantineTheme } from '@mantine/core';
import React from 'react';
import { X } from 'tabler-icons-react';

export interface RemovableColorSwatchProps {
  onDeleteClick: (color: string) => void
  color: string
}

function createSwatchStyles(t: MantineTheme): Record<string, CSSObject> {
  return ({
    container: {
      position: 'relative'
    },
    button: {
      position: 'absolute',
      height: 14,
      width: 14,
      top: -3.5,
      left: -3.5,
      zIndex: 99999,
      background: t.colors.dark[9],
      border: `1px solid ${t.colors.gray[0]}`,
      borderRadius: '96px',
      color: 'white',
      display: 'inline-grid',
      placeItems: 'center',
      placeContent: 'center',
      cursor: 'pointer'
    }
  })
}

const useSwatchStyles = createStyles(createSwatchStyles)

export default function RemovableColorSwatch({ color, onDeleteClick }: RemovableColorSwatchProps) {
  const { classes } = useSwatchStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.button} component="button" onClick={() => onDeleteClick(color)}>
        <X size={8}/>
      </Box>
      <ColorSwatch size={18} color={color}></ColorSwatch>
    </Box>
  );
}
