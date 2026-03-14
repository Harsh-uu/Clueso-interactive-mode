"use client";

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

type Props = {
  src: string;
  artboard: string;
  stateMachine?: string;
};

export default function RiveAnimation({ src, artboard, stateMachine }: Props) {
  const { RiveComponent } = useRive({
    src,
    artboard,
    stateMachines: stateMachine ? [stateMachine] : undefined,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div className="w-full h-full">
      <RiveComponent className="w-full h-full pointer-events-none" />
    </div>
  );
}