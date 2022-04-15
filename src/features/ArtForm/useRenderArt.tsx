import { RefObject, useEffect } from "react";
import { drawSplatter } from "../../lib";
import { ArtFormState } from "./ArtFormSlice";

export function useRenderArt(ref: RefObject<HTMLCanvasElement>, state: ArtFormState): void {
  useEffect(() => {
    if (state && ref && ref.current) {
      const ctx: CanvasRenderingContext2D = ref.current.getContext('2d') as CanvasRenderingContext2D
      for (let i = 0; i < state.passes; i += 1) {
        drawSplatter(ctx, state)
      }
    }
  }, [ref, state])
}