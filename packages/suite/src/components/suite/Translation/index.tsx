import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ExtendedMessageDescriptor } from '@suite-types';
import ConnectedHelperTooltip from './components/HelperTooltip/Container';
import HelperTooltip from './components/HelperTooltip/index';
import messages from '@suite/support/messages';

type ownProps = {
    isNested?: boolean;
    noRedux?: boolean;
    translationMode?: boolean;
};
type MsgType = ownProps & ExtendedMessageDescriptor;

export const isMsgType = (props: MsgType | React.ReactNode): props is MsgType => {
    return typeof props === 'object' && props !== null && (props as MsgType).id !== undefined;
};

type PrimitiveType = string | number | boolean | Date | null | undefined;

const Translation = (props: MsgType) => {
    const values: Record<string, PrimitiveType | React.ReactNode | ExtendedMessageDescriptor> = {};
    // message passed via props (id, defaultMessage, values)
    Object.keys(props.values || []).forEach(key => {
        // Iterates through all values. The entry may also contain a MessageDescriptor.
        // If so, Renders MessageDescriptor by passing it to `Translation` component
        const maybeMsg = props.values![key];
        values[key] = isMsgType(maybeMsg) ? <Translation {...maybeMsg} isNested /> : maybeMsg;
    });

    // prevent runtime errors
    if (
        !props.defaultMessage &&
        Object.prototype.hasOwnProperty.call(props, 'id') &&
        !messages[props.id]
    ) {
        return <>{`Unknown translation id: ${props.id}`}</>;
    }

    const messageComponent = (
        <FormattedMessage
            id={props.id}
            tagName={props.isNested ? undefined : 'span'}
            defaultMessage={props.defaultMessage || messages[props.id].defaultMessage}
            // pass undefined to a 'values' prop in case of an empty values object
            values={Object.keys(values).length === 0 ? undefined : values}
        />
    );

    if (props.noRedux) {
        // Wrap with Tooltip component that is not connected to redux
        // used by suite-web-landing as it does not use redux
        return (
            <HelperTooltip
                isNested={props.isNested}
                messageId={props.id}
                translationMode={props.translationMode ?? false}
                language="en"
            >
                {messageComponent}
            </HelperTooltip>
        );
    }

    return (
        <ConnectedHelperTooltip isNested={props.isNested} messageId={props.id}>
            {messageComponent}
        </ConnectedHelperTooltip>
    );
};

export { Translation };
