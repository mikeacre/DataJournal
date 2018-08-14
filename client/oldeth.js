
let contractId = '0x71ddd1925d3724b1b490054709e8c4a67965e4b9';

adGameContract = web3.eth.contract(TestContract.abi).at(contractId);
account = web3.eth.accounts[0];

var scoreEvent = adGameContract.sendScore();

scoreEvent.watch(function(error, result){
    if(!error)
        console.log(JSON.stringify(result.args.name));
    else
        console.error(error);
      });

adGameContract.getScores(function(error, result){
    if(!error)
        console.log(JSON.stringify(result));
    else
        console.error(error);
      });


//console.log(hasAccount)


function sendScore(name, score){
  console.log(name, score);
};
