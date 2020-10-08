import React, { useContext } from 'react';
import { Translation as SuiteTranslation } from '@suite-components/Translation';

export const TranslationModeContext = React.createContext(false);

type TranslationProps = React.ComponentProps<typeof SuiteTranslation>;
const Translation = (props: TranslationProps) => {
    const translationMode = useContext(TranslationModeContext);
    return <SuiteTranslation noRedux translationMode={translationMode} {...props} />;
};

export default Translation;
