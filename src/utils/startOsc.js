export function startOsc(ctx, frequency, adsr, oscType = 'sine') {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

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

  console.log(filter);

  // Filter
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2000, now, 0);
  filter.gain.value = 25;

  osc.connect(gainNode);
  gainNode.connect(filter);
  filter.connect(ctx.destination);
  osc.start();

  return { osc, filter, gainNode };
}

export function stopOsc(gainNode, ctx, osc, release) {
  const now = ctx.currentTime;
  gainNode.gain.cancelScheduledValues(now);
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0, now + release);
  osc.stop(now + release + 0.01);
}
