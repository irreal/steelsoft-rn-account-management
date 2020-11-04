import type { AppProps } from 'next/app'
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { customTheme } from '../theme/customTheme';
import { RecoilRoot } from 'recoil'
import '../services/firebase';

function MyApp({ Component, pageProps }: AppProps) {


    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default MyApp