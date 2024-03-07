
const web3 = require('@solana/web3.js');

// 连接到Solana主网
const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

async function getWalletTransactionHistory(walletAddress) {
    const publicKey = new web3.PublicKey(walletAddress);
    
    // 获取钱包的最近交易签名
    const signatures = await connection.getConfirmedSignaturesForAddress2(publicKey, { limit: 1000 });
    
    // 这里只计数，实际应用中可能需要分析每个交易的时间戳来计算活跃天数/月数/年数
    let totalTransactions = signatures.length;

    // 假设每个签名代表一个独立的活动次数
    console.log(`Total activities for ${walletAddress}: ${totalTransactions}`);

    // 示例：计算交互过的合约数量
    // 注意：这是一个非常简化的示例。在实际应用中，应当通过解析交易的具体内容来确定交互的合约。
    let interactedContracts = new Set();
    for (let signature of signatures) {
        const transactionDetail = await connection.getConfirmedTransaction(signature.signature);
        transactionDetail.transaction.message.accountKeys.forEach(account => {
            interactedContracts.add(account.toString());
        });
    }

    console.log(`Interacted contracts for ${walletAddress}: ${interactedContracts.size}`);
}

// 测试钱包地址，请使用有效的Solana钱包地址替换下面的字符串
const testWalletAddress = 'YOUR_WALLET_ADDRESS_HERE';
getWalletTransactionHistory(testWalletAddress).catch(console.error);
