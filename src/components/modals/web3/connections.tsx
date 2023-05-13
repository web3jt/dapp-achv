'use client';

import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { WalletIcon, DocumentDuplicateIcon, XMarkIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { useDisconnect as useEvmDisconnect } from 'wagmi';
import { useWallet } from '@suiet/wallet-kit';
import { useAtom } from 'jotai';
import {
  atomEvmConnected,
  atomEvmConnecting,
  atomEvmChainTestnet,
  atomEvmAddressMask,
  atomEvmChainName,

  atomSuiConnected,
  atomSuiConnecting,
  atomSuiAddressMask,
  atomSuiChainName,

  atomWeb3Connected,
  atomShowWeb3ConnectionsModal,
} from '@/store/store';
import { EvmConnect } from '@/components/web3/evm/connect';
import { SuiConnect } from '@/components/web3/sui/connect';
import EthereumIcon from '@/images/svg/ethereum.svg';




const defaultClassName = clsx(
  'group',
  'relative inline-flex w-full items-center justify-start gap-x-3',
  'rounded-md shadow-sm px-5 py-4',
  'bg-indigo-600 hover:bg-indigo-700',
  'dark:bg-indigo-700 dark:hover:bg-indigo-600',
  'text-sm font-semibold text-gray-200 hover:text-white',
  'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
);

export function Web3ConnectionsModal() {
  const [open, setOpen] = useAtom(atomShowWeb3ConnectionsModal);
  const [web3Connected] = useAtom(atomWeb3Connected);

  const [evmConnected] = useAtom(atomEvmConnected);
  const [evmConnecting] = useAtom(atomEvmConnecting);
  const [evmChainName] = useAtom(atomEvmChainName);
  const [evmChainTestnet] = useAtom(atomEvmChainTestnet);
  const [evmAddressMask] = useAtom(atomEvmAddressMask);

  const [suiConnected] = useAtom(atomSuiConnected);
  const [suiConnecting] = useAtom(atomSuiConnecting);
  const [suiChainName] = useAtom(atomSuiChainName);
  const [suiAddressMask] = useAtom(atomSuiAddressMask);

  const initialNull = useRef(null);

  const { disconnect: evmDisconnect } = useEvmDisconnect();
  const handleEvmDisconnect = () => evmDisconnect();

  const { disconnect: suiDisconnect } = useWallet();
  const handleSuiDisconnect = () => suiDisconnect();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen} initialFocus={initialNull}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                    <WalletIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Web3 Connections
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {web3Connected} connection{web3Connected > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 space-y-3">
                  {evmConnected ? (
                    <div className={clsx(
                      "group relative rounded-lg border border-gray-300 hover:border-gray-400 bg-white shadow-sm"
                    )}>
                      <div className={clsx(" flex items-center justify-between space-x-3 px-6 py-5")}>
                        <div className="flex-shrink-0">
                          <EthereumIcon className="h-8 w-8 fill-gray-400 group-hover:fill-gray-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 font-mono">
                            {evmAddressMask}
                          </p>
                          <p className="truncate text-sm text-gray-500">
                            {evmChainName} {evmChainTestnet ? 'Testnet' : 'Mainnet'}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pb-3">
                        <button type="button" className="space-y-1 text-center text-gray-400 hover:text-gray-600">
                          <DocumentDuplicateIcon className="mx-auto w-5 h-5" />
                          <div className="text-xs">
                            Copy Address
                          </div>
                        </button>
                        <button type="button" className="space-y-1 text-center text-gray-400 hover:text-gray-600" onClick={handleEvmDisconnect}>
                          <XMarkIcon className="mx-auto w-5 h-5" />
                          <div className="text-xs">
                            Disconnect
                          </div>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <EvmConnect className={defaultClassName}>
                      <EthereumIcon
                        className={clsx(
                          "-ml-0.5 h-5 w-5 fill-gray-200 dark:fill-white group-hover:fill-white",
                          evmConnecting ? 'animate-bounce' : '',
                        )}
                        aria-hidden="true"
                      />
                      <span>
                        Connect to ETH/EVM
                      </span>
                    </EvmConnect>
                  )}

                  {suiConnected ? (
                    <div className={clsx(
                      "group relative rounded-lg border border-gray-300 hover:border-gray-400 bg-white shadow-sm"
                    )}>
                      <div className={clsx(" flex items-center justify-between space-x-3 px-6 py-5")}>
                        <div className="flex-shrink-0">
                          <BeakerIcon className="h-8 w-8 text-gray-400 group-hover:text-gray-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 font-mono">
                            {suiAddressMask}
                          </p>
                          <p className="truncate text-sm text-gray-500">
                            {suiChainName}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pb-3">
                        <button type="button" className="space-y-1 text-center text-gray-400 hover:text-gray-600">
                          <DocumentDuplicateIcon className="mx-auto w-5 h-5" />
                          <div className="text-xs">
                            Copy Address
                          </div>
                        </button>
                        <button type="button" className="space-y-1 text-center text-gray-400 hover:text-gray-600" onClick={handleSuiDisconnect}>
                          <XMarkIcon className="mx-auto w-5 h-5" />
                          <div className="text-xs">
                            Disconnect
                          </div>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <SuiConnect className={defaultClassName}>
                      <BeakerIcon
                        className={clsx(
                          "-ml-0.5 h-5 w-5",
                          suiConnecting ? 'animate-bounce' : '',
                        )}
                        aria-hidden="true"
                      />
                      <span>
                        Connect to SUI
                      </span>
                    </SuiConnect>
                  )}

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
