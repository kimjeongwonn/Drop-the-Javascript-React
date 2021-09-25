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
  wavUrl: string;
  SvgIcon: React.ReactNode;
}

export const instInfo = {
  drum: { wavUrl: drumWavUrl, SvgIcon: DrumIcon },
  kick: { wavUrl: kickWavUrl, SvgIcon: KickIcon },
  highTom: { wavUrl: highTomWavUrl, SvgIcon: HightomIcon },
  lowTom: { wavUrl: lowTomWavUrl, SvgIcon: LowtomIcon },
  ride: { wavUrl: rideWavUrl, SvgIcon: RideIcon },
  clap: { wavUrl: clapWavUrl, SvgIcon: ClapIcon },
  closedHihat: { wavUrl: closedHihatWavUrl, SvgIcon: ClosedHihatIcon },
  openedHihat: { wavUrl: openedHihatWavUrl, SvgIcon: OpenedHihatIcon },
  cymbal: { wavUrl: cymbalWavUrl, SvgIcon: CymbalIcon },
  sideStick: { wavUrl: sidestickWavUrl, SvgIcon: SidestickIcon }
};

export type InstNameUnion = keyof typeof instInfo;

export type InstInfo = Record<InstNameUnion, InstData>;

export type InstIcon = Record<InstNameUnion, React.FC<React.SVGProps<SVGSVGElement>>>;
