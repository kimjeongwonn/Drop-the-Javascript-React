import { ReactComponent as ClapIcon } from '../Assets/Image/clap_icon.svg';
import { ReactComponent as ClosedHihatIcon } from '../Assets/Image/closed_hihat_icon.svg';
import { ReactComponent as CymbalIcon } from '../Assets/Image/cymbal_icon.svg';
import { ReactComponent as DrumIcon } from '../Assets/Image/drum_icon.svg';
import { ReactComponent as HightomIcon } from '../Assets/Image/hightom_icon.svg';
import { ReactComponent as KickIcon } from '../Assets/Image/kick_icon.svg';
import { ReactComponent as LowtomIcon } from '../Assets/Image/lowtom_icon.svg';
import { ReactComponent as OpenedHihatIcon } from '../Assets/Image/opened_hihat_icon.svg';
import { ReactComponent as RideIcon } from '../Assets/Image/ride_icon.svg';
import { ReactComponent as SidestickIcon } from '../Assets/Image/sidestick_icon.svg';

import clapWavUrl from '../Assets/Sound/clap.wav';
import closedHihatWavUrl from '../Assets/Sound/closed-hihat.wav';
import cymbalWavUrl from '../Assets/Sound/cymbal.wav';
import drumWavUrl from '../Assets/Sound/drum.wav';
import highTomWavUrl from '../Assets/Sound/high-tom.wav';
import kickWavUrl from '../Assets/Sound/kick.wav';
import lowTomWavUrl from '../Assets/Sound/low-tom.wav';
import openedHihatWavUrl from '../Assets/Sound/opened-hihat.wav';
import rideWavUrl from '../Assets/Sound/ride.wav';
import sidestickWavUrl from '../Assets/Sound/sidestick.wav';

interface InstData {
  instName: string;
  wavUrl: string;
  SvgIcon: React.ReactNode;
}

export const instInfo: InstData[] = [
  { instName: 'Drum', wavUrl: drumWavUrl, SvgIcon: DrumIcon },
  { instName: 'Kick', wavUrl: kickWavUrl, SvgIcon: KickIcon },
  { instName: 'High Tom', wavUrl: highTomWavUrl, SvgIcon: HightomIcon },
  { instName: 'Low Tom', wavUrl: lowTomWavUrl, SvgIcon: LowtomIcon },
  { instName: 'Ride', wavUrl: rideWavUrl, SvgIcon: RideIcon },
  { instName: 'Clap', wavUrl: clapWavUrl, SvgIcon: ClapIcon },
  { instName: 'Closed Hihat', wavUrl: closedHihatWavUrl, SvgIcon: ClosedHihatIcon },
  { instName: 'Opened Hihat', wavUrl: openedHihatWavUrl, SvgIcon: OpenedHihatIcon },
  { instName: 'Cymbal', wavUrl: cymbalWavUrl, SvgIcon: CymbalIcon },
  { instName: 'Side Stick', wavUrl: sidestickWavUrl, SvgIcon: SidestickIcon }
];

export type InstName = keyof typeof instInfo;

export type InstAudio = Record<InstName, null | AudioBuffer>;
export type InstIcon = Record<InstName, React.FC<React.SVGProps<SVGSVGElement>>>;
