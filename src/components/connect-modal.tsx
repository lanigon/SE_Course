'use client'

import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import { useState } from 'react';
 
export function Connect() {
	const currentAccount = useCurrentAccount();
	const [open, setOpen] = useState(false);
 
	return (
		<ConnectModal
			trigger={
				<button disabled={!!currentAccount}> {currentAccount ? currentAccount.address.slice(0, 8) + '...' : 'Connect'}</button>
			}
			open={open}
			onOpenChange={(isOpen) => setOpen(isOpen)}
		/>
	);
}
