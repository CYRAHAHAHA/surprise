import os, math, wave, struct

sfx_dir = os.path.join(os.getcwd(), 'public', 'sfx')
os.makedirs(sfx_dir, exist_ok=True)

samples = 44100

def write_tone(path, duration, freqs, volume=0.5):
    total = int(samples * duration)
    fade = int(samples * min(0.01, duration/5))
    with wave.open(path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(samples)
        for i in range(total):
            t = i / samples
            amp = volume
            if i < fade:
                amp *= i / fade
            elif i > total - fade:
                amp *= (total - i) / fade
            val = 0.0
            for f in freqs:
                val += math.sin(2 * math.pi * f * t)
            val /= len(freqs)
            sample = int(max(-1.0, min(1.0, val * amp)) * 32767)
            wf.writeframes(struct.pack('<h', sample))

sounds = {
    'click': (0.06, [1000]),
    'correct': (0.25, [880, 1320]),
    'incorrect': (0.25, [220]),
    'transition': (0.35, [520, 780]),
    'success': (0.5, [660, 990, 1320])
}

for name, (dur, freqs) in sounds.items():
    path = os.path.join(sfx_dir, f'{name}.wav')
    write_tone(path, dur, freqs)
