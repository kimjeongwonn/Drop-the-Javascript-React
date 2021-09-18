import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import useMobile from '../Hook/useMobile';
import { SetStateType, useMusic } from './MusicContext';

interface PageContextInterface {
  isMobile: boolean;
  pageUnit: number;
  totalPage: number;
  currentPage: number;
  setCurrentPage: SetStateType<number>;
}

const PageContext = createContext<PageContextInterface>(null);

interface Props {
  children: ReactNode;
}

export default function PageProvider({ children }: Props): ReactElement {
  const { beat } = useMusic();
  const isMobile = useMobile();
  const pageUnit = isMobile ? 8 : 16;
  const totalPage = Math.ceil(beat / pageUnit);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(totalPage);
    }
  }, [isMobile, beat]);

  const contextValue = useMemo(
    () => ({
      isMobile,
      pageUnit,
      totalPage,
      currentPage,
      setCurrentPage
    }),
    [beat, currentPage, isMobile]
  );
  return <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>;
}

export function usePage(): PageContextInterface {
  const context = useContext<PageContextInterface>(PageContext);
  if (!context) throw new Error('PageContext의 Provider 내에서 사용해야 합니다!');
  return context;
}
