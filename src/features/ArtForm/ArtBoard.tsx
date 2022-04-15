import { Box, Container, createStyles, MantineTheme, Paper, ScrollArea } from '@mantine/core';
import React, { useRef } from 'react';
import { useAppSelector } from '../../components/app/hooks';
import { useRenderArt } from './useRenderArt';

const useArtboardStyles = createStyles((t: MantineTheme) => ({
  root: {
    boxShadow: t.shadows.md
  }
}))

export default function ArtBoard() {
  const { classes } = useArtboardStyles()
  const ref = useRef<HTMLCanvasElement>(null)
  const imageHeight = useAppSelector((state) => state.artForm.imgHeight)
  const imageWidth = useAppSelector((state) => state.artForm.imgWidth)
  const form = useAppSelector((state) => state.artForm)
  useRenderArt(ref, form)

  return (
    <Box>
      <Container mt={'xl'} sx={{ width: 'auto', maxWidth:'80%'}}>
        <ScrollArea classNames={classes} dir='ltr'>
          <Paper py={'md'} sx={{textAlign: 'center'}}>
            <canvas ref={ref} height={imageHeight} width={imageWidth}/>
          </Paper>
        </ScrollArea>
      </Container>
    </Box>
  );
}
