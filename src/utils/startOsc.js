export function startOsc(ctx, frequency, adsr, oscType = 'sine') {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  const now = ctx.currentTime;
  const attack = adsr.attack;
  const decay = adsr.decay;
  const sustain = adsr.sustain / 100; 

  osc.type = oscType;
  osc.frequency.setValueAtTime(frequency, now);

  // ADSR envelope: Attack → Decay → Sustain
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(1, now + attack);
  gainNode.gain.linearRampToValueAtTime(sustain, now + attack + decay);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start();

  return { osc, gainNode };
}

export function stopOsc(gainNode, ctx, osc, release) {
  const now = ctx.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0, now + release);
  osc.stop(now + release + 0.01);
}
