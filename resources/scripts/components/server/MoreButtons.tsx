import React from 'react';
import tw from 'twin.macro';
import Button from '@/components/elements/Button';
import { ServerContext } from '@/state/server';
import isEqual from 'react-fast-compare';
import { useStoreState } from 'easy-peasy';

const MoreButtons = () => {
    const status = ServerContext.useStoreState(state => state.status.value);
    const variables = ServerContext.useStoreState(state => state.server.data!.variables);
    const txAdminOn = variables.find(x => x.envVariable === 'TXADMIN_ENABLE');
    const txAdminPort = variables.find(x => x.envVariable === 'TXADMIN_PORT')?.serverValue;
    const txAdminIp = ServerContext.useStoreState(state => state.server.data!.allocations.filter(alloc => alloc.port === Number(txAdminPort)).map(
        allocation => (allocation.alias || allocation.ip) + ':' + allocation.port,
    )).toString();
    const username = useStoreState(state => state.user.data!.username);
    const id = ServerContext.useStoreState(state => state.server.data!.id);
    const sftp = ServerContext.useStoreState(state => state.server.data!.sftpDetails, isEqual);

    return (
        <div css={tw`shadow-md bg-neutral-700 rounded p-3 flex text-xs mt-4 justify-center`}>
            {Number(txAdminOn?.serverValue) === 1 && txAdminIp ?
                <Button
                    size={'xsmall'}
                    isSecondary
                    css={tw`mr-2`}
                    disabled={!status || status === 'offline' || status === 'stopping'}
                    onClick={() => {
                        window.open(`http://${txAdminIp}`);
                    }}
                >
                        TxAdmin
                </Button>
                : null }
            <Button
                size={'xsmall'}
                isSecondary
                css={tw`mr-2`}
                onClick={() => {
                    window.open('PMA URL');
                }}
            >
                    PhpMyAdmin
            </Button>
            <Button
                size={'xsmall'}
                isSecondary
                css={tw`mr-2`}
                onClick={() => {
                    window.open(`sftp://${username}.${id}@${sftp.ip}:${sftp.port}`);
                }}
            >
                    SFTP
            </Button>
        </div>
    );
};

export default MoreButtons;
