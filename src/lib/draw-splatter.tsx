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

  function getShadow(): string {
    const { 
      shadowBlur: blur, 
      shadowOffsetY: y, 
      shadowOffsetX: x, 
      shadowOpacity: a 
    } = state
    return `drop-shadow(${x}px ${y}px ${blur}px rgba(0,0,0,${a / 100})) blur(0.5px)`
  }

  
  ctx.save()
  ctx.moveTo(...getRandomCoordinates())
  ctx.lineWidth = getRandomLineWidth()
  ctx.lineDashOffset = state.strokeDashOffset
  ctx.filter = getShadow()
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