import { Atom, atom, createStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { atomWithImmer } from 'jotai-immer';
import { Chain } from 'wagmi';

import { WalletContextState } from '@suiet/wallet-kit';

// import { } from '@mysten/sui.js/dist/types'

type EvmNetwork = {
  chain?: Chain & {
    unsupported?: boolean;
  };
  chains: Chain[];
};

const store = createStore();

export const atomDarkMode = atomWithStorage<boolean>('darkMode', true);
export const atomTheme = atom((get) => get(atomDarkMode) ? 'dark' : 'light');

/**
 * EVM
 */
export const atomEvmNetwork = atomWithImmer<EvmNetwork | undefined>(undefined);

const unsubEvmNetwork = store.sub(atomEvmNetwork, () => {
  const network = store.get(atomEvmNetwork);
  // console.log(`new network:`, network);
})

export const atomEvmNativeSymbol: Atom<string | undefined> = atom((get) => {
  const network = get(atomEvmNetwork);

  if (network) {
    return network.chain?.nativeCurrency.symbol;
  }

  return undefined;
});

export const atomEvmNativeDecimals: Atom<number | undefined> = atom((get) => {
  const network = get(atomEvmNetwork);

  if (network) {
    return network.chain?.nativeCurrency.decimals;
  }

  return undefined;
});



export const atomEvmAddress = atomWithImmer<`0x${string}` | undefined>(undefined);

const unsubEvmAddress = store.sub(atomEvmAddress, () => {
  const address = store.get(atomEvmAddress);
  // console.log(`new address: ${address}`);
})

export const atomEvmAddressMask: Atom<string | undefined> = atom((get) => {
  const address = get(atomEvmAddress);

  if (address) {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  }

  return undefined;
});

export const atomEvmEnsName = atomWithImmer<string | undefined | null>(undefined);

const unsubEvmEnsName = store.sub(atomEvmEnsName, () => {
  const ensName = store.get(atomEvmEnsName);
  // console.log(`new ensName: ${ensName}`);
})

export const atomWeb3Name: Atom<string | undefined> = atom((get) => {
  const ensName = store.get(atomEvmEnsName);
  if (ensName) {
    if (12 < ensName.length) {
      return `${ensName.slice(0, 6)}...${ensName.slice(-4)}`;
    }

    return ensName;
  }

  return 'Unnamed';
});

export const atomEvmConnecting = atomWithImmer<boolean>(false);
export const atomEvmConnected = atomWithImmer<boolean>(false);
export const atomEvmReconnecting = atomWithImmer<boolean>(false);
export const atomEvmDisconnected = atomWithImmer<boolean>(false);

export const atomEvmBlockNumber = atomWithImmer<number | undefined>(undefined);

const unsubEvmBlockNumber = store.sub(atomEvmBlockNumber, () => {
  const blockNumber = store.get(atomEvmBlockNumber);
  console.log(`new block number: ${blockNumber}`);
})




/**
 * SUI
 */
export const atomSuiWallet = atomWithImmer<WalletContextState | undefined>(undefined);

const unsubSuiWallet = store.sub(atomSuiWallet, () => {
  const wallet = store.get(atomSuiWallet);
  console.log(`atomSuiWallet:`, wallet);
})



export const atomSuiAddress = atom((get) => {
  const wallet = get(atomSuiWallet);
  if (wallet) {
    return wallet.address;
  }

  return undefined;
});

export const atomSuiAddressMask: Atom<string | undefined> = atom((get) => {
  const address = get(atomSuiAddress);

  if (address) {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  }

  return undefined;
});

export const atomSuiConnected = atom((get) => {
  const wallet = get(atomSuiWallet);
  if (wallet) {
    return wallet.connected;
  }

  return false;
});

export const atomSuiConnecting = atom((get) => {
  const wallet = get(atomSuiWallet);
  if (wallet) {
    return wallet.connecting;
  }

  return false;
});


export default store;
