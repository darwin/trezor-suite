import { connect } from 'react-redux';
import { AppState, Dispatch } from '@suite-types';
import HelperTooltip from './index';

const mapStateToProps = (state: AppState) => ({
    translationMode: state.suite.settings.debug.translationMode,
    language: state.suite.settings.language,
});

const mapDispatchToProps = (_dispatch: Dispatch) => ({});

interface OwnProps {
    messageId?: string;
    isNested?: boolean;
    children: any;
}

export type Props = OwnProps &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(HelperTooltip);
