import { ArtFormState } from "../features/ArtForm/ArtFormSlice";

export function drawSplatter(ctx: CanvasRenderingContext2D, state: ArtFormState, amount: number = 16): void {
  function getRandomCoordinates(): [number, number] {
    const { random, ceil } = Math
    const { width, height } = ctx.canvas
    const min: number = -100
    const maxX: number = width + 100
    const maxY: number = height + 100

    const randomInt = (axis: 'x'|'y'): number => {
      return (random() * ((axis === 'x' ? maxX : maxY) - min)) + min
    }

    return [randomInt('x'), randomInt('y')]
  }

  function getRandomLineWidth(): number {
    const { random } = Math
    const { maxLineWidth, minLineWidth } = state
    return (random() * (maxLineWidth - minLineWidth)) + minLineWidth
  }

  function randomColor(): string {
    return state.colors[~~(Math.random() * state.colors.length)]
  }

  
  ctx.save()
  ctx.moveTo(...getRandomCoordinates())
  ctx.lineWidth = getRandomLineWidth()
  ctx.lineDashOffset = state.strokeDashOffset
  ctx.setLineDash(state.strokeDashArray)
  ctx.lineCap = 'round'
  ctx.strokeStyle = randomColor()
  ctx.beginPath()
  for (let i = 0; i < amount; i += 1) {
    const cp = getRandomCoordinates()
    const ep = getRandomCoordinates()
    ctx.quadraticCurveTo(...cp, ...ep)
  }
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}