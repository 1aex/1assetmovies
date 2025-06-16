
import { aeneid, mainnet, StoryClient, StoryConfig } from '@story-protocol/core-sdk'
import { Chain, createPublicClient, createWalletClient, http, WalletClient } from 'viem'
import { privateKeyToAccount, Address, Account } from 'viem/accounts'

// Network configuration types
type NetworkType = 'aeneid' | 'mainnet'

interface NetworkConfig {
    rpcProviderUrl: string
    blockExplorer: string
    protocolExplorer: string
    defaultNFTContractAddress: Address | null
    defaultSPGNFTContractAddress: Address | null
    chain: Chain
}

// Network configurations
const networkConfigs: Record<NetworkType, NetworkConfig> = {
    aeneid: {
        rpcProviderUrl: 'https://aeneid.storyrpc.io',
        blockExplorer: 'https://aeneid.storyscan.io',
        protocolExplorer: 'https://aeneid.explorer.story.foundation',
        defaultNFTContractAddress: '0x937bef10ba6fb941ed84b8d249abc76031429a9a' as Address,
        defaultSPGNFTContractAddress: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc' as Address, // Token Contract of the asset
        chain: aeneid,
    },
    mainnet: {
        rpcProviderUrl: 'https://mainnet.storyrpc.io',
        blockExplorer: 'https://storyscan.io',
        protocolExplorer: 'https://explorer.story.foundation',
        defaultNFTContractAddress: null,
        defaultSPGNFTContractAddress: null,
        chain: mainnet,
    },
} as const

// Helper functions
const getNetwork = (): NetworkType => {
    const network = import.meta.env.VITE_STORY_NETWORK as NetworkType
    if (network && !(network in networkConfigs)) {
        console.warn(`Invalid network: ${network}. Must be one of: ${Object.keys(networkConfigs).join(', ')}. Falling back to 'aeneid'.`)
        return 'aeneid'
    }
    return network || 'aeneid'
}

// Initialize client configuration
export const network = getNetwork()

export const networkInfo = {
    ...networkConfigs[network],
    rpcProviderUrl: import.meta.env.VITE_RPC_PROVIDER_URL || networkConfigs[network].rpcProviderUrl,
}

const privateKey = import.meta.env.VITE_WALLET_PRIVATE_KEY;

if (!privateKey) {
    console.warn(
        "VITE_WALLET_PRIVATE_KEY is not set. Using a dummy account for the common wallet. " +
        "Write operations with the common wallet will fail. " +
        "Please connect your own wallet (e.g., MetaMask) to perform transactions."
    );
}

// Use a dummy private key if the env var is not set. This allows the app to initialize.
// The dummy account won't be able to sign any transactions, which is the desired behavior.
const DUMMY_PRIVATE_KEY = '0x0000000000000000000000000000000000000000000000000000000000000001';

export const account: Account = privateKeyToAccount(
    privateKey ? `0x${privateKey}` : DUMMY_PRIVATE_KEY
);

const config: StoryConfig = {
    account,
    transport: http(networkInfo.rpcProviderUrl),
    chainId: network,
}

export const client = StoryClient.newClient(config)

// Export additional useful constants
export const PROTOCOL_EXPLORER = networkInfo.protocolExplorer

const baseConfig = {
    chain: networkInfo.chain,
    transport: http(networkInfo.rpcProviderUrl),
} as const
export const publicClient = createPublicClient(baseConfig)
export const walletClient = createWalletClient({
    ...baseConfig,
    account,
}) as WalletClient
