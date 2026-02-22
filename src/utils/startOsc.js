export function startOsc(ctx, frequency) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  gainNode.gain.setValueAtTime(1, ctx.currentTime);
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();
  
  return { osc, gainNode };
}

export function stopOsc(gainNode, ctx, osc) {
  gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.015);
  osc.stop(ctx.currentTime + 0.075);
}
