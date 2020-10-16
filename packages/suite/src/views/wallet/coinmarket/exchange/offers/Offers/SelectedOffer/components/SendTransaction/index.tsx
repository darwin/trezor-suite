import React from 'react';
import styled from 'styled-components';
import { Translation, AccountLabeling } from '@suite-components';
import { colors, Button } from '@trezor/components';
import { useCoinmarketExchangeOffersContext } from '@wallet-hooks/useCoinmarketExchangeOffers';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const LabelText = styled.div`
    color: ${colors.NEUE_TYPE_LIGHT_GREY};
`;

const Value = styled.div`
    padding-top: 6px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    border-top: 1px solid ${colors.NEUE_STROKE_GREY};
    margin: 20px 0;
`;

const Row = styled.div`
    margin: 24px;
`;

const Address = styled.div``;

const SendTransactionComponent = () => {
    const {
        account,
        selectedQuote,
        exchangeInfo,
        sendTransaction,
    } = useCoinmarketExchangeOffersContext();
    if (!selectedQuote) return null;
    const { exchange, sendAddress } = selectedQuote;
    if (!exchange) return null;
    const providerName =
        exchangeInfo?.providerInfos[exchange]?.companyName || selectedQuote.exchange;
    return (
        <Wrapper>
            <Row>
                <LabelText>
                    <Translation id="TR_EXCHANGE_SEND_FROM" />
                </LabelText>
                <Value>
                    <AccountLabeling account={account} />
                </Value>
            </Row>
            <Row>
                <LabelText>
                    <Translation id="TR_EXCHANGE_SEND_TO" values={{ providerName }} />
                </LabelText>
                <Value>
                    <Address>{sendAddress}</Address>
                </Value>
            </Row>

            <ButtonWrapper>
                <Button onClick={sendTransaction}>
                    <Translation id="TR_EXCHANGE_CONFIRM_ON_TREZOR_SEND" />
                </Button>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default SendTransactionComponent;
